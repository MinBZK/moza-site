"""Tests voor render: datum-/periodeformattering, slug en markdown/mentions."""

import pytest

from render import (
    _build_markdown_renderer,
    _format_date,
    _format_dt,
    _format_period,
    _format_size,
    _markdown_with_mentions,
    _slugify,
)


def test_format_dt_and_date():
    assert _format_dt("2026-05-21T09:15:00+02:00") == "21 mei 09:15"
    assert _format_date("2026-05-20T00:00:00+02:00") == "20 mei 2026"


@pytest.mark.parametrize(
    "start,end,expected",
    [
        ("2026-05-20T12:00:00+02:00", "2026-05-27T12:00:00+02:00", "20 – 27 mei 2026"),
        ("2026-05-28T12:00:00+02:00", "2026-06-03T12:00:00+02:00", "28 mei – 3 juni 2026"),
        (
            "2025-12-30T12:00:00+01:00",
            "2026-01-02T12:00:00+01:00",
            "30 december 2025 – 2 januari 2026",
        ),
    ],
)
def test_format_period(start, end, expected):
    assert _format_period({"from": start, "to": end}) == expected


@pytest.mark.parametrize(
    "n,expected",
    [(512, "512 B"), (2048, "2.0 KB"), (5 * 1024 * 1024, "5.0 MB")],
)
def test_format_size(n, expected):
    assert _format_size(n) == expected


@pytest.mark.parametrize(
    "name,expected",
    [("Check-in!", "check-in"), ("agenda", "agenda"), ("###", "channel")],
)
def test_slugify(name, expected):
    assert _slugify(name) == expected


def test_markdown_renders_mention_span():
    md = _build_markdown_renderer()
    out = str(_markdown_with_mentions("hoi @jan", md))
    assert '<span class="mention">@jan</span>' in out


def test_markdown_renders_bold():
    md = _build_markdown_renderer()
    out = str(_markdown_with_mentions("dit is **vet**", md))
    assert "<strong>vet</strong>" in out


def test_markdown_escapes_raw_html():
    # html=False → ruwe HTML in berichten wordt geëscaped (geen XSS).
    md = _build_markdown_renderer()
    out = str(_markdown_with_mentions("<script>alert(1)</script>", md))
    assert "<script>" not in out
    assert "&lt;script&gt;" in out
