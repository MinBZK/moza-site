"""Tests voor de Walletbrief (publieke nieuwsbrief, data/items.json + data/agenda.json)."""

import logging
from datetime import datetime

import httpx
import yaml

import fetch
from _model import Period, Report
from _references import STATUS_OK
from _walletbrief import bouw_tekst, collect_walletbrief
from fetch import BRON_WALLETBRIEF, DEFAULT_WALLETBRIEF_URL, NL_TZ, _walletbrief_url

BASE = "https://nieuwsbrief.example.nl/brief/"
PERIODE = Period(
    start=datetime(2026, 10, 7, 0, 0, tzinfo=NL_TZ),
    end=datetime(2026, 10, 14, 23, 59, 59, tzinfo=NL_TZ),
)


def _item(datum, titel, **extra):
    return {
        "title": titel,
        "url": f"https://bron.example/{titel}",
        "summary": "",
        "date": datum,
        "source_name": "Bron",
        "moza_level": "middel",
        **extra,
    }


ITEMS = [
    _item("2026-10-06", "voor-de-periode"),
    _item("2026-10-07", "eerste-dag", summary="Samenvatting."),
    _item("2026-10-10", "midden", moza_level="hoog"),
    _item("2026-10-14", "laatste-dag"),
    _item("2026-10-15", "na-de-periode"),
]
EVENTS = [
    {"title": "later", "url": "https://e.example/2", "start": "2026-11-17T09:00:00+01:00",
     "end": "", "location": "Brussel", "online": False},
    {"title": "verleden", "url": "https://e.example/0", "start": "2026-10-01", "end": ""},
    {"title": "kick-off", "url": "https://e.example/1", "start": "2026-10-20",
     "end": "2026-10-21", "location": "", "online": True},
    {"title": "op-einddatum", "url": "https://e.example/3", "start": "2026-10-14",
     "end": "", "location": "", "online": True},
]


def _client(items=ITEMS, events=EVENTS, status=200):
    def handler(request):
        if status != 200:
            return httpx.Response(status)
        if request.url.path == "/brief/data/items.json":
            return httpx.Response(200, json={"items": items})
        if request.url.path == "/brief/data/agenda.json":
            return httpx.Response(200, json={"evenementen": events})
        return httpx.Response(404)

    return httpx.Client(transport=httpx.MockTransport(handler))


def _geen_netwerk(monkeypatch):
    monkeypatch.setattr("_walletbrief.assert_public_url", lambda url: None)


def test_periode_inclusief_grenzen_en_nieuwste_eerst():
    tekst, n_items, _ = bouw_tekst(ITEMS, EVENTS, PERIODE)
    assert n_items == 3
    regels = [r for r in tekst.splitlines() if r.startswith("- 2026-10")]
    volgorde = regels[:3]
    assert "laatste-dag" in volgorde[0]
    assert "midden" in volgorde[1]
    assert "eerste-dag" in volgorde[2]
    assert "voor-de-periode" not in tekst
    assert "na-de-periode" not in tekst


def test_regelformaat_met_en_zonder_samenvatting():
    tekst, _, _ = bouw_tekst(ITEMS, [], PERIODE)
    assert (
        "- 2026-10-07 [middel] eerste-dag (Bron): Samenvatting. <https://bron.example/eerste-dag>"
        in tekst
    )
    assert "- 2026-10-10 [hoog] midden (Bron) <https://bron.example/midden>" in tekst


def test_komende_evenementen_vanaf_einddatum_gesorteerd():
    tekst, _, n_events = bouw_tekst(ITEMS, EVENTS, PERIODE)
    assert n_events == 3
    assert "verleden" not in tekst
    kop = tekst.index("## Komende evenementen")
    regels = [r for r in tekst[kop:].splitlines() if r.startswith("- ")]
    assert [("op-einddatum" in regels[0]), ("kick-off" in regels[1]), ("later" in regels[2])] == [True] * 3
    assert "- 2026-10-20 t/m 2026-10-21 kick-off (online) <https://e.example/1>" in tekst
    assert "- 2026-11-17 later (Brussel) <https://e.example/2>" in tekst


def test_lege_periode_meldt_dat_er_gecontroleerd_is():
    tekst, n_items, _ = bouw_tekst([_item("2026-01-01", "oud")], [], PERIODE)
    assert n_items == 0
    assert "Geen berichten in de Walletbrief in deze periode (gecontroleerd)." in tekst


def test_collect_maakt_referentie(monkeypatch):
    _geen_netwerk(monkeypatch)
    ref = collect_walletbrief(BASE, PERIODE, client=_client())
    assert ref.kind == "web"
    assert ref.status == STATUS_OK
    assert ref.url == BASE
    assert ref.title == "Walletbrief EUDI & EBW"
    assert ref.site == "nieuwsbrief.example.nl"
    assert "eerste-dag" in ref.text


def test_ophaalfout_waarschuwt_en_geeft_niets(monkeypatch, caplog):
    _geen_netwerk(monkeypatch)
    with caplog.at_level(logging.WARNING):
        assert collect_walletbrief(BASE, PERIODE, client=_client(status=500)) is None
    assert "Walletbrief" in caplog.text


def test_kapotte_json_waarschuwt_en_geeft_niets(monkeypatch, caplog):
    _geen_netwerk(monkeypatch)
    client = httpx.Client(transport=httpx.MockTransport(lambda r: httpx.Response(200, text="<html>")))
    with caplog.at_level(logging.WARNING):
        assert collect_walletbrief(BASE, PERIODE, client=client) is None
    assert "Walletbrief" in caplog.text


def test_niet_publieke_host_wordt_geblokkeerd(caplog):
    with caplog.at_level(logging.WARNING):
        assert collect_walletbrief("http://127.0.0.1:8080/", PERIODE, client=_client()) is None
    assert "Walletbrief" in caplog.text


def test_url_uit_env(monkeypatch):
    monkeypatch.delenv("MOZA_WEEKLY_WALLETBRIEF_URL", raising=False)
    assert _walletbrief_url(False) == DEFAULT_WALLETBRIEF_URL
    monkeypatch.setenv("MOZA_WEEKLY_WALLETBRIEF_URL", "https://x.example/n/")
    assert _walletbrief_url(False) == "https://x.example/n/"
    monkeypatch.setenv("MOZA_WEEKLY_WALLETBRIEF_URL", "")
    assert _walletbrief_url(False) == ""
    monkeypatch.setenv("MOZA_WEEKLY_WALLETBRIEF_URL", "https://x.example/n/")
    assert _walletbrief_url(True) == ""


def test_bron_komt_in_de_yaml(monkeypatch, tmp_path):
    _geen_netwerk(monkeypatch)
    ref = collect_walletbrief(BASE, PERIODE, client=_client())
    ref.bron = BRON_WALLETBRIEF
    ref.id = "ref_1"
    assert ref.to_dict()["bron"] == "walletbrief"

    report = Report(
        generated_at=datetime(2026, 10, 14, tzinfo=NL_TZ), generator="t", period=PERIODE,
        server="s", team="t", channels=[], references=[ref],
    )
    uit = tmp_path / "r.yaml"
    fetch._write_yaml(report, uit, force=False)
    geladen = yaml.safe_load(uit.read_text(encoding="utf-8"))
    assert geladen["references"][0]["bron"] == "walletbrief"
    assert "eerste-dag" in geladen["references"][0]["text"]
