"""Tests voor anonymize: pseudoniemen en naam-/mention-redactie (privacy-kritisch)."""

from collections import OrderedDict

from anonymize import (
    _build_anonymized,
    _build_name_redactor,
    _build_pseudonym_map,
    _redact_message,
)


def _authors(*items):
    """items: tuples (username, display_name, is_bot)."""
    od = OrderedDict()
    for username, display, is_bot in items:
        od[username] = {"display_name": display, "is_bot": is_bot}
    return od


def test_pseudonym_map_orders_humans_and_bots():
    authors = _authors(
        ("alice", "Alice Ansems", False),
        ("weekbot", "Week Bot", True),
        ("bob", "Bob de Boer", False),
    )
    assert _build_pseudonym_map(authors) == {
        "alice": "person_1",
        "weekbot": "bot_1",
        "bob": "person_2",
    }


def test_redactor_replaces_full_name_and_long_firstname():
    name_re = _build_name_redactor(_authors(("rbos", "Robbert Bos", False)))
    assert _redact_message("groet Robbert Bos", name_re) == "groet [collega]"
    assert _redact_message("hoi Robbert!", name_re) == "hoi [collega]!"


def test_redactor_skips_short_name_parts():
    # 'Ed' en 'Bos' zijn <4 letters → losse delen worden niet vervangen,
    # de volledige naam wel.
    name_re = _build_name_redactor(_authors(("ed", "Ed Bos", False)))
    assert _redact_message("cc Ed morgen", name_re) == "cc Ed morgen"
    assert _redact_message("cc Ed Bos morgen", name_re) == "cc [collega] morgen"


def test_redact_mentions_without_names():
    assert _redact_message("hoi @jan en @piet.puk", None) == "hoi [@collega] en [@collega]"


def test_github_attributie_wordt_geschrubd():
    # De handle in een GitHub-paginatitel staat niet in de auteur-set, en zou
    # zonder deze regel als naam in de LLM-input belanden.
    titel = "feat(demo): iets by ericwout-overheid · Pull Request #240 · MinBZK/moza-poc"
    assert _redact_message(titel, None) == (
        "feat(demo): iets by [collega] · Pull Request #240 · MinBZK/moza-poc"
    )


def test_gewoon_woord_by_blijft_staan():
    # Zonder de middot is het geen GitHub-attributie maar gewone tekst.
    assert _redact_message("dit is by design zo", None) == "dit is by design zo"


def test_non_author_name_is_not_redacted():
    # Gedocumenteerde beperking: namen buiten de auteur-set blijven staan (geen NER).
    name_re = _build_name_redactor(_authors(("rbos", "Robbert Bos", False)))
    assert _redact_message("cc Pietje", name_re) == "cc Pietje"


def _sample_data():
    return {
        "meta": {"team": "moza"},
        "stats": {},
        "channels": [
            {
                "name": "check-in",
                "id": "c1",
                "url": "http://x",
                "threads": [
                    {
                        "root": {
                            "id": "p1",
                            "author": {"username": "rbos", "display_name": "Robbert Bos"},
                            "timestamp": "2026-05-21T10:00:00+02:00",
                            "permalink": "http://pl/1",
                            "in_scope": True,
                            "bot": False,
                            "message": "Hoi @jan, groet Robbert Bos",
                        },
                        "replies": [
                            {
                                "id": "p2",
                                "author": {"username": "weekbot", "display_name": "Week Bot"},
                                "timestamp": "2026-05-21T11:00:00+02:00",
                                "permalink": "http://pl/2",
                                "in_scope": True,
                                "bot": True,
                                "message": "Automatisch bericht",
                            }
                        ],
                    }
                ],
            }
        ],
    }


def test_build_anonymized_pipeline():
    out = _build_anonymized(_sample_data())
    thread = out["channels"][0]["threads"][0]
    root, reply = thread["root"], thread["replies"][0]

    assert root["author"] == "person_1"
    assert root["message"] == "Hoi [@collega], groet [collega]"
    assert reply["author"] == "bot_1"
    assert reply["is_bot"] is True
    assert root["id"] == "p1"  # post-id blijft (permalink-traceerbaarheid)
    assert out["meta"]["anonymization"]["pseudonym_counts"] == {"humans": 1, "bots": 1}


def _sample_data_met_references():
    data = _sample_data()
    data["channels"][0]["threads"][0]["root"]["references"] = ["ref_1", "ref_2"]
    data["references"] = [
        {
            "id": "ref_1",
            "kind": "mattermost",
            "url": "http://pl/9",
            "status": "ok",
            "title": "Verslag van Sanne Vermeulen",
            "channel": "gespreksverslagen",
            "posts": [
                {
                    "id": "p9",
                    "author": {"username": "svermeulen", "display_name": "Sanne Vermeulen"},
                    "timestamp": "2026-05-19T09:00:00+02:00",
                    "permalink": "http://pl/9",
                    "in_scope": False,
                    "bot": False,
                    "message": "Verslag, cc @jan",
                }
            ],
        },
        {
            "id": "ref_2",
            "kind": "web",
            "url": "https://example.org/nota",
            "status": "ok",
            "site": "example.org",
            "title": "Nota",
            "description": "Van Robbert Bos",
            "truncated": False,
            "text": "Robbert Bos schreef dit. Mail @jan voor vragen.",
        },
    ]
    return data


def test_reference_authors_krijgen_pseudoniem():
    out = _build_anonymized(_sample_data_met_references())
    ref = out["references"][0]
    assert ref["posts"][0]["author"] == "person_2"
    assert ref["posts"][0]["message"] == "Verslag, cc [@collega]"
    assert ref["title"] == "Verslag van [collega]"
    assert out["meta"]["anonymization"]["pseudonym_counts"]["humans"] == 2


def test_webtekst_wordt_geredigeerd():
    out = _build_anonymized(_sample_data_met_references())
    ref = out["references"][1]
    assert ref["text"] == "[collega] schreef dit. Mail [@collega] voor vragen."
    assert ref["description"] == "Van [collega]"
    assert ref["site"] == "example.org"


def test_post_behoudt_verwijzing_naar_ref_ids():
    out = _build_anonymized(_sample_data_met_references())
    assert out["channels"][0]["threads"][0]["root"]["references"] == ["ref_1", "ref_2"]


def test_referenties_zonder_inhoud_blijven_leeg():
    data = _sample_data()
    data["references"] = [
        {
            "id": "ref_1",
            "kind": "web",
            "url": "https://intranet.example/x",
            "status": "niet_publiek",
            "note": "Loginpagina - niet publiek",
            "truncated": False,
            "text": "",
        }
    ]
    ref = _build_anonymized(data)["references"][0]
    assert ref["status"] == "niet_publiek"
    assert ref["text"] == ""
