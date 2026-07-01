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
