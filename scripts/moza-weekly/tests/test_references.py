"""Tests voor het volgen van verwijzingen: link-extractie, permalinks, webpagina's."""

import pytest

from _references import (
    STATUS_GEBLOKKEERD,
    STATUS_GEEN_TOEGANG,
    STATUS_NIET_PUBLIEK,
    STATUS_OK,
    STATUS_PDF,
    ReferenceCollector,
    UnsafeUrlError,
    WebResult,
    _decode_body,
    assert_public_url,
    extract_readable,
    extract_urls,
    is_login_page,
    normalize_url,
    parse_permalink,
)

SERVER = "https://digilab.overheid.nl/chat"


# --------------------------------------------------------------------------- extract_urls


def test_extract_urls_vindt_kale_url():
    assert extract_urls("zie https://example.org/verslag voor details") == [
        "https://example.org/verslag"
    ]


def test_extract_urls_vindt_markdown_link_zonder_haakje():
    assert extract_urls("[het verslag](https://example.org/verslag) staat er") == [
        "https://example.org/verslag"
    ]


def test_extract_urls_strip_afsluitende_leestekens():
    assert extract_urls("kijk op https://example.org/pagina.") == [
        "https://example.org/pagina"
    ]


def test_extract_urls_behoudt_gebalanceerde_haakjes():
    assert extract_urls("https://nl.wikipedia.org/wiki/Model_(begrip)") == [
        "https://nl.wikipedia.org/wiki/Model_(begrip)"
    ]


def test_extract_urls_bij_markdown_link_met_url_als_label():
    # Komt in de check-in voor: [https://x](https://x). Zonder dat `]` de URL
    # afbakent, slurpt de match `](` mee en ontstaat er een onzin-URL.
    msg = "[https://github.com/orgs/MinBZK/projects/40](https://github.com/orgs/MinBZK/projects/40)"
    assert extract_urls(msg) == ["https://github.com/orgs/MinBZK/projects/40"]


def test_extract_urls_ondersteunt_autolink_haakjes():
    assert extract_urls("<https://example.org/x> en meer") == ["https://example.org/x"]


def test_extract_urls_dedupliceert_met_behoud_van_volgorde():
    msg = "https://b.example/2 en https://a.example/1 en nogmaals https://b.example/2"
    assert extract_urls(msg) == ["https://b.example/2", "https://a.example/1"]


def test_extract_urls_negeert_niet_http_schemas():
    assert extract_urls("mail naar mailto:iemand@example.org of ftp://host/x") == []


def test_extract_urls_lege_message():
    assert extract_urls("") == []


# --------------------------------------------------------------------------- normalize_url


@pytest.mark.parametrize(
    "url,expected",
    [
        ("https://Example.ORG/Pad", "https://example.org/Pad"),
        ("https://example.org/pad#kopje", "https://example.org/pad"),
        ("https://example.org/pad/", "https://example.org/pad"),
        ("https://example.org/", "https://example.org/"),
        (
            "https://example.org/pad?utm_source=mattermost&id=7",
            "https://example.org/pad?id=7",
        ),
        ("https://example.org/pad?utm_medium=x", "https://example.org/pad"),
    ],
)
def test_normalize_url(url, expected):
    assert normalize_url(url) == expected


def test_normalize_url_maakt_varianten_gelijk():
    a = normalize_url("https://example.org/verslag/?utm_source=chat#top")
    b = normalize_url("https://example.org/verslag")
    assert a == b


# --------------------------------------------------------------------------- parse_permalink


def test_parse_permalink_herkent_post_id():
    url = f"{SERVER}/mijnoverheid-zakelijk/pl/abcdefghijklmnopqrstuvwxyz"
    assert parse_permalink(url, SERVER) == "abcdefghijklmnopqrstuvwxyz"


def test_parse_permalink_negeert_telemetrie_query():
    url = f"{SERVER}/mijnoverheid-zakelijk/pl/abcdefghijklmnopqrstuvwxyz?telem_action=copy_post_link"
    assert parse_permalink(url, SERVER) == "abcdefghijklmnopqrstuvwxyz"


def test_parse_permalink_negeert_kanaallink():
    url = f"{SERVER}/mijnoverheid-zakelijk/channels/check-in"
    assert parse_permalink(url, SERVER) is None


def test_parse_permalink_negeert_andere_host():
    url = "https://elders.example/team/pl/abcdefghijklmnopqrstuvwxyz"
    assert parse_permalink(url, SERVER) is None


def test_parse_permalink_negeert_ongeldig_id():
    url = f"{SERVER}/mijnoverheid-zakelijk/pl/kort"
    assert parse_permalink(url, SERVER) is None


# --------------------------------------------------------------------------- is_login_page


@pytest.mark.parametrize(
    "final_url,html",
    [
        ("https://intranet.example/login?next=/x", "<html><body>Welkom</body></html>"),
        ("https://intranet.example/sso/start", "<html><body>Welkom</body></html>"),
        (
            "https://intranet.example/pagina",
            '<html><body><input type="password" name="w"></body></html>',
        ),
    ],
)
def test_is_login_page_true(final_url, html):
    assert is_login_page(final_url, html) is True


def test_is_login_page_false_bij_gewone_pagina():
    html = "<html><body><h1>Verslag</h1><p>Tekst</p></body></html>"
    assert is_login_page("https://example.org/verslag", html) is False


# --------------------------------------------------------------------------- assert_public_url


@pytest.mark.parametrize(
    "url",
    [
        "http://127.0.0.1:8080/admin",
        "http://localhost:1313/",
        "http://10.0.0.5/intern",
        "http://192.168.1.1/",
        "http://172.16.0.9/",
        "http://169.254.169.254/latest/meta-data/",  # cloud-metadata
        "http://[::1]:8080/",
        "http://0.0.0.0/",
    ],
)
def test_assert_public_url_blokkeert_intern_adres(url):
    with pytest.raises(UnsafeUrlError):
        assert_public_url(url)


@pytest.mark.parametrize(
    "url",
    ["file:///etc/passwd", "ftp://host/x", "gopher://host/x", "http:///geenhost"],
)
def test_assert_public_url_blokkeert_ander_schema_of_lege_host(url):
    with pytest.raises(UnsafeUrlError):
        assert_public_url(url)


def test_assert_public_url_laat_publiek_ip_door():
    assert_public_url("https://93.184.216.34/pagina")  # geen DNS nodig


def test_collector_markeert_geblokkeerde_url():
    url = "http://127.0.0.1:8080/admin"
    fetcher = _FakeFetcher(
        {
            url: WebResult(
                status=STATUS_GEBLOKKEERD,
                final_url=url,
                title="",
                description="",
                text="",
                truncated=False,
                content_type="",
                error="127.0.0.1 wijst naar een niet-publiek adres",
            )
        }
    )
    c = _collector(client=_mattermost_fakes(), fetcher=fetcher)
    c.collect_from(url)
    assert c.references[0].status == STATUS_GEBLOKKEERD
    assert c.references[0].text == ""


# --------------------------------------------------------------------------- extract_readable


HTML_PAGINA = """
<html><head>
  <title>Verslag werksessie</title>
  <meta name="description" content="Korte samenvatting">
  <script>var x = 1;</script>
  <style>body { color: red }</style>
</head><body>
  <nav>Menu Home Contact</nav>
  <main><h1>Verslag</h1><p>Eerste alinea.</p><p>Tweede alinea.</p></main>
  <footer>Copyright</footer>
</body></html>
"""


def test_extract_readable_neemt_titel_en_description():
    page = extract_readable(HTML_PAGINA, max_chars=4000)
    assert page.title == "Verslag werksessie"
    assert page.description == "Korte samenvatting"


def test_extract_readable_gebruikt_main_en_negeert_boilerplate():
    page = extract_readable(HTML_PAGINA, max_chars=4000)
    assert "Eerste alinea." in page.text
    assert "Tweede alinea." in page.text
    assert "Menu" not in page.text
    assert "Copyright" not in page.text
    assert "var x" not in page.text
    assert "color: red" not in page.text


def test_extract_readable_valt_terug_op_body_zonder_main():
    html = "<html><body><p>Alleen body-tekst.</p></body></html>"
    assert "Alleen body-tekst." in extract_readable(html, max_chars=4000).text


def test_extract_readable_kapt_af_op_max_chars():
    html = "<html><body><main>" + ("woord " * 2000) + "</main></body></html>"
    page = extract_readable(html, max_chars=200)
    assert page.truncated is True
    assert len(page.text) <= 200


def test_host_matcht_op_host_en_subdomein():
    from _references import host_matcht

    hosts = {"github.com"}
    assert host_matcht("https://github.com/MinBZK/x/pull/1", hosts) is True
    assert host_matcht("https://gist.github.com/x", hosts) is True
    assert host_matcht("https://github.com.kwaadaardig.example/x", hosts) is False
    assert host_matcht("https://example.org/github.com", hosts) is False


def test_lijkt_javascript_shell():
    from _references import lijkt_javascript_shell

    assert lijkt_javascript_shell('<html><body><div id="root"></div><script src="a.js">') is True
    assert lijkt_javascript_shell("<html><body><p>Tekst</p></body></html>") is False


def test_extract_readable_zet_truncated_false_bij_korte_tekst():
    page = extract_readable(HTML_PAGINA, max_chars=4000)
    assert page.truncated is False


# --------------------------------------------------------------------------- _decode_body


def test_decode_body_gebruikt_opgegeven_charset():
    assert _decode_body("café".encode("latin-1"), "latin-1") == "café"


def test_decode_body_valt_terug_bij_onbekende_charset():
    # Een server die onzin in de Content-Type-header zet mag de run niet slopen.
    assert _decode_body(b"hallo", "utf-8-onzin") == "hallo"


def test_decode_body_zonder_charset():
    assert _decode_body("café".encode(), None) == "café"


def test_decode_body_vervangt_ongeldige_bytes():
    assert _decode_body(b"a\xffb", "utf-8") == "a�b"


# --------------------------------------------------------------------------- collector


class _FakePost:
    """Minimale stand-in voor _mattermost.RawPost."""

    def __init__(self, post_id, root_id="", channel_id="c1", message="", create_at=0):
        self.id = post_id
        self.root_id = root_id
        self.channel_id = channel_id
        self.message = message
        self.create_at = create_at
        self.delete_at = 0
        self.type = ""


class _FakeClient:
    def __init__(self, posts, threads, channel_name="gespreksverslagen"):
        self._posts = posts
        self._threads = threads
        self._channel_name = channel_name
        self.thread_calls = []
        self.post_calls = []

    def get_post(self, post_id):
        self.post_calls.append(post_id)
        return self._posts[post_id]

    def get_thread(self, root_id):
        self.thread_calls.append(root_id)
        return self._threads[root_id]

    def get_channel_name(self, channel_id):
        return self._channel_name


class _FakeFetcher:
    def __init__(self, results):
        self._results = results
        self.calls = []

    def fetch(self, url):
        self.calls.append(url)
        return self._results[url]


def _build_post(raw):
    """Stand-in voor fetch._build_post: geeft een dict terug in plaats van een Post."""
    return {"id": raw.id, "message": raw.message}


def _collector(client=None, fetcher=None, known_post_ids=frozenset()):
    return ReferenceCollector(
        client=client,
        server=SERVER,
        build_post=_build_post,
        fetcher=fetcher,
        known_post_ids=known_post_ids,
    )


ROOT_ID = "r" * 26
REPLY_ID = "y" * 26


def _mattermost_fakes():
    root = _FakePost(ROOT_ID, message="Verslag van de werksessie", create_at=1)
    reply = _FakePost(REPLY_ID, root_id=ROOT_ID, message="Aanvulling", create_at=2)
    return _FakeClient(
        posts={ROOT_ID: root, REPLY_ID: reply},
        threads={ROOT_ID: [root, reply]},
    )


def test_collector_haalt_thread_op_bij_permalink():
    client = _mattermost_fakes()
    c = _collector(client=client)
    ids = c.collect_from(f"zie {SERVER}/team/pl/{ROOT_ID}")
    assert ids == ["ref_1"]
    ref = c.references[0]
    assert ref.kind == "mattermost"
    assert ref.status == STATUS_OK
    assert ref.channel == "gespreksverslagen"
    assert [p["message"] for p in ref.posts] == ["Verslag van de werksessie", "Aanvulling"]


def test_collector_dedupliceert_op_thread_root():
    client = _mattermost_fakes()
    c = _collector(client=client)
    first = c.collect_from(f"{SERVER}/team/pl/{ROOT_ID}")
    second = c.collect_from(f"en ook {SERVER}/team/pl/{REPLY_ID}")
    assert first == second == ["ref_1"]
    assert len(c.references) == 1
    assert client.thread_calls == [ROOT_ID]


def test_collector_slaat_reeds_opgehaalde_posts_over():
    client = _mattermost_fakes()
    c = _collector(client=client, known_post_ids={ROOT_ID})
    assert c.collect_from(f"{SERVER}/team/pl/{ROOT_ID}") == []
    assert c.references == []


def test_collector_markeert_afgeschermde_thread():
    class _DeniedClient(_FakeClient):
        def get_post(self, post_id):
            from _mattermost import AuthError

            raise AuthError("403 Forbidden")

    client = _DeniedClient(posts={}, threads={})
    c = _collector(client=client)
    assert c.collect_from(f"{SERVER}/team/pl/{ROOT_ID}") == ["ref_1"]
    assert c.references[0].status == STATUS_GEEN_TOEGANG


def test_collector_haalt_publieke_webpagina_op():
    url = "https://example.org/verslag"
    fetcher = _FakeFetcher(
        {
            url: WebResult(
                status=STATUS_OK,
                final_url=url,
                title="Verslag",
                description="Samenvatting",
                text="De inhoud.",
                truncated=False,
                content_type="text/html",
            )
        }
    )
    c = _collector(client=_mattermost_fakes(), fetcher=fetcher)
    assert c.collect_from(f"zie {url}") == ["ref_1"]
    ref = c.references[0]
    assert ref.kind == "web"
    assert ref.status == STATUS_OK
    assert ref.text == "De inhoud."
    assert ref.site == "example.org"


def test_collector_haalt_dezelfde_pagina_maar_een_keer_op():
    url = "https://example.org/verslag"
    fetcher = _FakeFetcher(
        {
            url: WebResult(
                status=STATUS_OK,
                final_url=url,
                title="Verslag",
                description="",
                text="De inhoud.",
                truncated=False,
                content_type="text/html",
            )
        }
    )
    c = _collector(client=_mattermost_fakes(), fetcher=fetcher)
    c.collect_from(f"{url}#top")
    c.collect_from(f"{url}/?utm_source=chat")
    assert len(c.references) == 1
    assert len(fetcher.calls) == 1


def test_collector_bewaart_niet_publieke_pagina_zonder_inhoud():
    url = "https://intranet.example/verslag"
    fetcher = _FakeFetcher(
        {
            url: WebResult(
                status=STATUS_NIET_PUBLIEK,
                final_url="https://intranet.example/login",
                title="",
                description="",
                text="Geheime inhoud",
                truncated=False,
                content_type="text/html",
            )
        }
    )
    c = _collector(client=_mattermost_fakes(), fetcher=fetcher)
    c.collect_from(url)
    ref = c.references[0]
    assert ref.status == STATUS_NIET_PUBLIEK
    assert ref.text == ""


def test_collector_verzamelt_pdfs_voor_terugkoppeling():
    url = "https://example.org/rapport.pdf"
    fetcher = _FakeFetcher(
        {
            url: WebResult(
                status=STATUS_PDF,
                final_url=url,
                title="",
                description="",
                text="",
                truncated=False,
                content_type="application/pdf",
            )
        }
    )
    c = _collector(client=_mattermost_fakes(), fetcher=fetcher)
    c.collect_from(url)
    assert c.pdf_urls == [url]
    assert c.references[0].status == STATUS_PDF


def test_collector_zonder_fetcher_slaat_externe_links_over():
    c = _collector(client=_mattermost_fakes(), fetcher=None)
    assert c.collect_from("https://example.org/verslag") == []
    assert c.references == []
    assert c.skipped_external == 1
