"""Tests voor _util: gedeelde YAML-loader en @mention-regex."""

import pytest

from _util import MENTION_RE, load_yaml


def test_load_yaml_roundtrip(tmp_path):
    p = tmp_path / "in.yaml"
    p.write_text("meta:\n  team: moza\nchannels: []\n", encoding="utf-8")
    data = load_yaml(p)
    assert data["meta"]["team"] == "moza"
    assert data["channels"] == []


def test_load_yaml_missing_file(tmp_path):
    with pytest.raises(FileNotFoundError):
        load_yaml(tmp_path / "bestaat-niet.yaml")


def test_load_yaml_non_dict_root(tmp_path):
    p = tmp_path / "list.yaml"
    p.write_text("- een\n- twee\n", encoding="utf-8")
    with pytest.raises(ValueError):
        load_yaml(p)


def test_load_yaml_required_key_missing(tmp_path):
    p = tmp_path / "in.yaml"
    p.write_text("meta: {}\n", encoding="utf-8")
    with pytest.raises(ValueError, match="channels"):
        load_yaml(p, required_keys=("meta", "channels"))


def test_load_yaml_invalid_yaml(tmp_path):
    p = tmp_path / "bad.yaml"
    p.write_text("meta: [onafgesloten\n", encoding="utf-8")
    with pytest.raises(ValueError, match="parse-fout"):
        load_yaml(p)


@pytest.mark.parametrize(
    "text,expected",
    [
        ("hoi @jan", ["jan"]),
        ("cc @jan.jansen en @piet", ["jan.jansen", "piet"]),
        ("mail foo@bar.nl", []),  # geen mention: @ voorafgegaan door woordteken
    ],
)
def test_mention_regex(text, expected):
    assert MENTION_RE.findall(text) == expected
