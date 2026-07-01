"""Tests voor fetch: periode-afbakening en bot-detectie."""

from datetime import date, timedelta

import pytest

from _mattermost import RawPost
from fetch import _build_period, _is_bot


def test_build_period_explicit_bounds():
    period = _build_period("2026-05-20", "2026-05-27")
    assert period.start.date() == date(2026, 5, 20)
    assert period.end.date() == date(2026, 5, 27)
    # start op begin van de dag, end op einde van de dag
    assert (period.start.hour, period.start.minute) == (0, 0)
    assert (period.end.hour, period.end.minute, period.end.second) == (23, 59, 59)


def test_build_period_default_is_seven_days():
    period = _build_period(None, None)
    assert (period.end.date() - period.start.date()) == timedelta(days=7)


def test_build_period_rejects_reversed_range():
    with pytest.raises(ValueError):
        _build_period("2026-05-28", "2026-05-27")


def _raw(props):
    return RawPost(
        id="p1",
        user_id="u1",
        root_id="",
        channel_id="c1",
        create_at=0,
        edit_at=0,
        delete_at=0,
        message="",
        type="",
        props=props,
        file_ids=[],
    )


@pytest.mark.parametrize(
    "props,expected",
    [
        ({}, False),
        ({"from_bot": "true"}, True),
        ({"from_webhook": "true"}, True),
    ],
)
def test_is_bot(props, expected):
    assert _is_bot(_raw(props)) is expected
