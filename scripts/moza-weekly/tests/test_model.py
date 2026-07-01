"""Tests voor _model: periode-grenzen en statistiek."""

from datetime import datetime
from zoneinfo import ZoneInfo

from _model import Author, Channel, Period, Post, Report, Thread

NL = ZoneInfo("Europe/Amsterdam")


def _period():
    return Period(
        start=datetime(2026, 5, 20, 0, 0, tzinfo=NL),
        end=datetime(2026, 5, 27, 23, 59, 59, tzinfo=NL),
    )


def _post(username, ts, *, in_scope=True, context_only=False, bot=False):
    return Post(
        id=f"p-{username}-{ts.isoformat()}",
        author=Author(username=username, display_name=username.title()),
        timestamp=ts,
        permalink="http://x",
        in_scope=in_scope,
        edited=False,
        bot=bot,
        context_only=context_only,
    )


def test_period_contains_boundaries():
    p = _period()
    assert p.contains_ms(p.start_ms) is True
    assert p.contains_ms(p.end_ms) is True
    assert p.contains_ms(p.start_ms - 1) is False
    assert p.contains_ms(p.end_ms + 1) is False


def test_report_stats_counts_scope_and_authors():
    ts = datetime(2026, 5, 21, 10, 0, tzinfo=NL)
    ts_before = datetime(2026, 5, 1, 10, 0, tzinfo=NL)

    thread_in = Thread(
        root=_post("alice", ts),
        replies=[_post("bob", ts), _post("alice", ts)],  # alice dubbel = 1 auteur
    )
    thread_ctx = Thread(
        root=_post("carol", ts_before, in_scope=False, context_only=True),
        replies=[_post("dave", ts)],
    )
    ch = Channel(name="check-in", id="c1", url="http://x", threads=[thread_in, thread_ctx])
    report = Report(
        generated_at=ts,
        generator="test",
        period=_period(),
        server="s",
        team="t",
        channels=[ch],
    )

    stats = report.stats()
    assert stats["channels"] == 1
    assert stats["threads_in_period"] == 2
    # in-scope posts: alice, bob, alice, dave = 4
    assert stats["posts_in_period"] == 4
    # context: carol root buiten periode = 1
    assert stats["posts_out_of_period_for_context"] == 1
    # unieke auteurs met in-scope post: alice, bob, dave = 3 (carol niet in scope)
    assert stats["unique_authors"] == 3
