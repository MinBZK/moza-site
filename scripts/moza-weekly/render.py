#!/usr/bin/env python3
"""Render YAML-input (van fetch.py) naar single-file HTML-rapport.

Usage:
    uv run --project scripts/moza-weekly scripts/moza-weekly/render.py <input.yaml> [--output PATH]
"""

from __future__ import annotations

import argparse
import logging
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

from jinja2 import Environment, FileSystemLoader, select_autoescape
from markdown_it import MarkdownIt
from markupsafe import Markup, escape

# De scriptmap staat op sys.path, zodat de _-modules hiernaast importeerbaar zijn.
sys.path.insert(0, str(Path(__file__).parent))

from _util import MENTION_RE, load_yaml  # noqa: E402

NL_TZ = ZoneInfo("Europe/Amsterdam")
TEMPLATES_DIR = Path(__file__).parent / "templates"
MAANDEN = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december",
]

EXIT_OK = 0
EXIT_CONFIG = 2
EXIT_YAML = 8

log = logging.getLogger("moza-weekly.render")


def _parse_args(argv: list[str]) -> argparse.Namespace:
    p = argparse.ArgumentParser(prog="moza-weekly-render", description=__doc__)
    p.add_argument("input", type=Path, help="Pad naar YAML-input van fetch.py")
    p.add_argument("--output", type=Path, default=None)
    p.add_argument("--verbose", action="store_true")
    return p.parse_args(argv)


def _to_nl(iso_str: str) -> datetime:
    """Parse ISO 8601 en normaliseer naar Europe/Amsterdam (naïeve tijd = NL-tijd)."""
    dt = datetime.fromisoformat(iso_str)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=NL_TZ)
    return dt.astimezone(NL_TZ)


def _format_dt(iso_str: str) -> str:
    """ISO 8601 met tz → '21 mei 09:15'."""
    dt = _to_nl(iso_str)
    return f"{dt.day} {MAANDEN[dt.month - 1]} {dt:%H:%M}"


def _format_date(iso_str: str) -> str:
    """ISO 8601 → '20 mei 2026'."""
    dt = _to_nl(iso_str)
    return f"{dt.day} {MAANDEN[dt.month - 1]} {dt.year}"


def _format_period(period: dict[str, str]) -> str:
    """{from, to} ISO-paar → '20 - 27 mei 2026' of '28 mei - 3 juni 2026'."""
    start = _to_nl(period["from"])
    end = _to_nl(period["to"])
    if start.year == end.year and start.month == end.month:
        return f"{start.day} – {end.day} {MAANDEN[end.month - 1]} {end.year}"
    if start.year == end.year:
        return f"{start.day} {MAANDEN[start.month - 1]} – {end.day} {MAANDEN[end.month - 1]} {end.year}"
    return f"{_format_date(start.isoformat())} – {_format_date(end.isoformat())}"


def _format_size(n: int) -> str:
    if n < 1024:
        return f"{n} B"
    if n < 1024 * 1024:
        return f"{n / 1024:.1f} KB"
    return f"{n / (1024 * 1024):.1f} MB"


def _build_markdown_renderer() -> "MarkdownIt":
    md = MarkdownIt("commonmark", {"html": False, "linkify": True, "breaks": True})
    md.enable(["strikethrough", "table"])
    return md


def _markdown_with_mentions(text: str, md: MarkdownIt) -> Markup:
    """Pre-process @mentions naar inline-spans, dan markdown renderen.

    Strategie: vervang @user door een unieke ASCII-placeholder vóór markdown-rendering
    (zodat de placeholder als platte tekst door markdown-it heen gaat), en vervang die
    placeholder ná rendering door de definitieve <span>. NULL-bytes werken niet als
    placeholder — markdown-it normaliseert die naar U+FFFD per HTML-spec.
    """
    if not text:
        return Markup("")
    placeholders: dict[str, str] = {}

    def _to_placeholder(m: re.Match[str]) -> str:
        key = f"MOZAMENTION{len(placeholders):04d}END"
        placeholders[key] = m.group(1)
        return key

    pre = MENTION_RE.sub(_to_placeholder, text)
    html = md.render(pre)
    for key, name in placeholders.items():
        html = html.replace(key, f'<span class="mention">@{escape(name)}</span>')
    return Markup(html)


def _slugify(name: str) -> str:
    return re.sub(r"[^a-zA-Z0-9-]+", "-", name).strip("-").lower() or "channel"


def _prepare_channels(channels: list[dict[str, Any]]) -> list[dict[str, Any]]:
    prepared = []
    for ch in channels:
        ch = dict(ch)
        ch["tab_id"] = f"tab-{_slugify(ch['name'])}"
        prepared.append(ch)
    return prepared


def _setup_env() -> Environment:
    env = Environment(
        loader=FileSystemLoader(TEMPLATES_DIR),
        autoescape=select_autoescape(["html", "j2"]),
        trim_blocks=False,
        lstrip_blocks=False,
    )
    md = _build_markdown_renderer()
    env.globals["format_dt"] = _format_dt
    env.globals["format_size"] = _format_size
    env.globals["render_markdown"] = lambda text: _markdown_with_mentions(text, md)
    return env


def main(argv: list[str] | None = None) -> int:
    args = _parse_args(argv if argv is not None else sys.argv[1:])
    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(levelname)s %(message)s",
    )

    try:
        data = load_yaml(args.input, required_keys=("meta", "stats", "channels"))
    except (FileNotFoundError, ValueError) as e:
        log.error("%s", e)
        return EXIT_YAML

    env = _setup_env()
    template = env.get_template("report.html.j2")

    channels = _prepare_channels(data.get("channels") or [])
    if not channels:
        log.warning("Geen kanalen in YAML — render levert lege tab-bar op.")

    period = data["meta"]["period"]
    period_label = _format_period(period)

    html = template.render(
        meta=data["meta"],
        stats=data["stats"],
        channels=channels,
        references=data.get("references") or [],
        period_label=period_label,
    )

    output: Path = args.output or args.input.with_suffix(".html")
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html, encoding="utf-8")
    log.info("Schreef %s", output)
    return EXIT_OK


if __name__ == "__main__":
    sys.exit(main())
