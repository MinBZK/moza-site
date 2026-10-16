"""De Walletbrief (publieke nieuwsbrief over EUDI en European Business Wallet).

De pagina zelf is een lege JavaScript-shell; de inhoud staat als JSON ernaast
(`data/items.json` en `data/agenda.json`). Deze module maakt daar één Reference
van: de berichten uit de periode en de komende evenementen.
"""

from __future__ import annotations

import logging
from urllib.parse import urlsplit

import httpx

from _model import Period, Reference
from _references import (
    DEFAULT_TIMEOUT,
    STATUS_OK,
    USER_AGENT,
    UnsafeUrlError,
    assert_public_url,
)

log = logging.getLogger("moza-weekly.walletbrief")

TITEL = "Walletbrief EUDI & EBW"


def _datum(waarde: object) -> str:
    """Alleen het datumdeel; in de agenda staat soms een tijd achter."""
    return str(waarde or "")[:10]


def _haal_json(client: httpx.Client, url: str) -> dict:
    assert_public_url(url)
    response = client.get(url)
    response.raise_for_status()
    data = response.json()
    if not isinstance(data, dict):
        raise ValueError(f"{url}: JSON-object verwacht")
    return data


def bouw_tekst(items: list[dict], evenementen: list[dict], period: Period) -> tuple[str, int, int]:
    """Geeft de Markdown-tekst, het aantal berichten en het aantal evenementen."""
    van = period.start.date().isoformat()
    tot = period.end.date().isoformat()
    in_periode = sorted(
        (i for i in items if van <= _datum(i.get("date")) <= tot),
        key=lambda i: _datum(i.get("date")),
        reverse=True,
    )
    komend = sorted(
        (e for e in evenementen if _datum(e.get("start")) >= tot),
        key=lambda e: _datum(e.get("start")),
    )

    regels = [f"## Berichten in de periode ({van} t/m {tot})", ""]
    if in_periode:
        for i in in_periode:
            regel = (
                f"- {_datum(i.get('date'))} [{i.get('moza_level', '')}] "
                f"{i.get('title', '')} ({i.get('source_name', '')})"
            )
            if i.get("summary"):
                regel += f": {i['summary']}"
            regels.append(f"{regel} <{i.get('url', '')}>")
    else:
        regels.append("Geen berichten in de Walletbrief in deze periode (gecontroleerd).")

    regels += ["", "## Komende evenementen", ""]
    if komend:
        for e in komend:
            start, eind = _datum(e.get("start")), _datum(e.get("end"))
            wanneer = f"{start} t/m {eind}" if eind and eind != start else start
            waar = e.get("location") or "online"
            regels.append(f"- {wanneer} {e.get('title', '')} ({waar}) <{e.get('url', '')}>")
    else:
        regels.append("Geen komende evenementen bekend.")
    return "\n".join(regels), len(in_periode), len(komend)


def collect_walletbrief(
    base_url: str, period: Period, *, client: httpx.Client | None = None
) -> Reference | None:
    """Haal de Walletbrief op; bij een fout een waarschuwing en geen referentie."""
    base = base_url.rstrip("/") + "/"
    eigen = client is None
    if eigen:
        client = httpx.Client(
            timeout=DEFAULT_TIMEOUT,
            follow_redirects=False,
            headers={"User-Agent": USER_AGENT, "Accept": "application/json"},
        )
    try:
        items = _haal_json(client, base + "data/items.json").get("items") or []
        evenementen = _haal_json(client, base + "data/agenda.json").get("evenementen") or []
    except (httpx.HTTPError, UnsafeUrlError, ValueError) as e:
        log.warning("⚠ Walletbrief %s niet opgehaald: %s: %s", base, type(e).__name__, e)
        return None
    finally:
        if eigen:
            client.close()

    tekst, n_items, n_events = bouw_tekst(items, evenementen, period)
    log.info("Walletbrief: %d berichten in de periode, %d komende evenementen", n_items, n_events)
    return Reference(
        id="",
        kind="web",
        url=base,
        status=STATUS_OK,
        bron="walletbrief",
        title=TITEL,
        site=urlsplit(base).netloc or None,
        text=tekst,
    )
