"""Tests voor Docs-mappen en extra links (--docs-folder, --extra-url)."""

import logging
from datetime import datetime

import httpx

from _model import Period
from _references import (
    STATUS_GEEN_TOEGANG,
    STATUS_OK,
    DocsClient,
    DocsMapResult,
    DocsResult,
    ReferenceCollector,
)
from fetch import NL_TZ, _bijgewerkt_in_periode, _collect_docs_folders

DOCS = "https://docs.rijksapp.nl"
SERVER = "https://digilab.overheid.nl/chat"
MAP = "00000000-0000-0000-0000-000000000000"
UUID_A = "8e032c52-8bcc-4133-b883-b3e3302e5372"
UUID_B = "11111111-2222-3333-4444-555555555555"
ROOT_ID = "r" * 26
PERIODE = Period(
    start=datetime(2026, 10, 8, 0, 0, tzinfo=NL_TZ),
    end=datetime(2026, 10, 14, 23, 59, 59, tzinfo=NL_TZ),
)


# --------------------------------------------------------------------------- DocsClient.list_children


def _docs_client(handler):
    client = DocsClient(DOCS, "cookie")
    client._client = httpx.Client(transport=httpx.MockTransport(handler))
    return client


def test_list_children_volgt_paginering():
    paginas = []

    def handler(request):
        assert request.url.path == f"/api/v1.0/documents/{MAP}/children/"
        pagina = int(request.url.params["page"])
        paginas.append(pagina)
        if pagina == 1:
            return httpx.Response(200, json={"results": [{"id": UUID_A}], "next": "x?page=2"})
        return httpx.Response(200, json={"results": [{"id": UUID_B}], "next": None})

    result = _docs_client(handler).list_children(MAP)
    assert result.status == STATUS_OK
    assert [d["id"] for d in result.items] == [UUID_A, UUID_B]
    assert paginas == [1, 2]


def test_list_children_401_is_geen_toegang():
    result = _docs_client(lambda r: httpx.Response(401)).list_children(MAP)
    assert result.status == STATUS_GEEN_TOEGANG
    assert "verlopen" in result.error


# --------------------------------------------------------------------------- periode


def test_bijgewerkt_in_periode():
    assert _bijgewerkt_in_periode("2026-10-10T09:30:00.123456Z", PERIODE)
    assert not _bijgewerkt_in_periode("2026-10-01T09:30:00Z", PERIODE)
    assert not _bijgewerkt_in_periode("2026-10-15T09:30:00+02:00", PERIODE)
    assert not _bijgewerkt_in_periode(None, PERIODE)
    assert not _bijgewerkt_in_periode("geen datum", PERIODE)


# --------------------------------------------------------------------------- collector


class _FakeDocs:
    def __init__(self, listing=None):
        self.calls = []
        self._listing = listing

    def fetch(self, uuid):
        self.calls.append(uuid)
        return DocsResult(status=STATUS_OK, title=f"Titel {uuid[:4]}", text="inhoud")

    def list_children(self, uuid):
        return self._listing


class _FakeMattermost:
    def get_post(self, post_id):
        raise AssertionError("Mattermost mag hier niet aangeroepen worden")


def _collector(docs_client=None, known_post_ids=frozenset()):
    return ReferenceCollector(
        client=_FakeMattermost(),
        server=SERVER,
        build_post=lambda raw: raw,
        known_post_ids=known_post_ids,
        docs_client=docs_client,
        docs_url=DOCS,
    )


def _map(items, status=STATUS_OK):
    return _FakeDocs(DocsMapResult(status, items, "" if status == STATUS_OK else "HTTP 401"))


def test_map_neemt_alleen_documenten_uit_de_periode_mee():
    client = _map(
        [
            {"id": UUID_A, "title": "Recent", "updated_at": "2026-10-12T10:00:00Z"},
            {"id": UUID_B, "title": "Oud", "updated_at": "2026-09-01T10:00:00Z"},
        ]
    )
    c = _collector(docs_client=client)
    _collect_docs_folders(c, client, [MAP], PERIODE, DOCS)
    assert len(c.references) == 1
    assert c.references[0].url == f"{DOCS}/docs/{UUID_A}/"
    assert c.references[0].bron == "docs-map"
    assert client.calls == [UUID_A]


def test_map_dedupliceert_met_link_in_een_bericht():
    client = _map([{"id": UUID_A, "updated_at": "2026-10-12T10:00:00Z"}])
    c = _collector(docs_client=client)
    assert c.collect_from(f"zie {DOCS}/docs/{UUID_A}") == ["ref_1"]
    _collect_docs_folders(c, client, [MAP], PERIODE, DOCS)
    assert len(c.references) == 1
    assert c.references[0].bron is None
    assert client.calls == [UUID_A]


def test_map_zonder_sessie_waarschuwt_en_slaat_over(caplog):
    c = _collector()
    with caplog.at_level(logging.WARNING):
        _collect_docs_folders(c, None, [MAP], PERIODE, DOCS)
    assert c.references == []
    assert "DOCS_SESSION" in caplog.text


def test_map_met_verlopen_sessie_waarschuwt(caplog):
    client = _map([], status=STATUS_GEEN_TOEGANG)
    c = _collector(docs_client=client)
    with caplog.at_level(logging.WARNING):
        _collect_docs_folders(c, client, [MAP], PERIODE, DOCS)
    assert c.references == []
    assert "docs_sessionid" in caplog.text


def test_extra_url_krijgt_bron_en_staat_in_de_yaml():
    c = _collector(docs_client=_FakeDocs())
    ref = c.resolve_extra(f"{DOCS}/docs/{UUID_A}/", "extra")
    assert ref.bron == "extra"
    assert ref.to_dict()["bron"] == "extra"


def test_extra_permalink_naar_bekende_post_wordt_overgeslagen():
    c = _collector(known_post_ids={ROOT_ID})
    assert c.resolve_extra(f"{SERVER}/team/pl/{ROOT_ID}", "extra") is None
    assert c.references == []


def test_extra_url_van_bestaande_referentie_krijgt_geen_bron():
    c = _collector(docs_client=_FakeDocs())
    c.collect_from(f"{DOCS}/docs/{UUID_A}/")
    ref = c.resolve_extra(f"{DOCS}/docs/{UUID_A}", "extra")
    assert ref.bron is None
    assert len(c.references) == 1
