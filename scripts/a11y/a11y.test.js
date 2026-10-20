import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { collectRoutes } from "./routes.js";
import { checkLayouts } from "./layouts.js";
import {
  checkHeadingOrder,
  checkDiagramAlt,
  checkContentImageAlt,
  checkDiagramBeschrijving,
  checkVoetnootRol,
  checkSvgGesloten,
  presentatieSoort,
} from "./regels.js";

test("koppenstructuur: een oplopende hiërarchie levert geen bevindingen", () => {
  const html = "<h1>Titel</h1><h2>Deel</h2><h3>Subdeel</h3><h2>Ander deel</h2>";
  assert.deepEqual(checkHeadingOrder(html), []);
});

test("koppenstructuur: een sprong over een niveau wordt gemeld", () => {
  const findings = checkHeadingOrder("<h1>Titel</h1><h2>Deel</h2><h4>Te diep</h4>");
  assert.equal(findings.length, 1);
  assert.match(findings[0], /van h2 naar h4/);
});

test("koppenstructuur: een pagina die niet met h1 begint wordt gemeld", () => {
  const findings = checkHeadingOrder("<h2>Geen titel</h2>");
  assert.match(findings[0], /verwacht een h1/);
});

test("koppenstructuur: meerdere h1-koppen worden gemeld", () => {
  const findings = checkHeadingOrder("<h1>Een</h1><h1>Twee</h1>");
  assert.match(findings[0], /2 h1-koppen/);
});

test("koppenstructuur: attributen op de kop verstoren de controle niet", () => {
  const html = '<h1 id="titel" class="x">Titel</h1><h2 data-a="3">Deel</h2>';
  assert.deepEqual(checkHeadingOrder(html), []);
});

test("koppenstructuur: een pagina zonder koppen levert geen bevindingen", () => {
  assert.deepEqual(checkHeadingOrder("<p>Tekst</p>"), []);
});

test("diagram-alt: een gevulde alt-tekst levert geen bevindingen", () => {
  const html = '<img class="mermaid-img mermaid-img--light" src="/a.svg" alt="Stroomschema">';
  assert.deepEqual(checkDiagramAlt(html), []);
});

test("diagram-alt: een lege alt-tekst wordt gemeld", () => {
  const html = '<img class="mermaid-img mermaid-img--light" src="/a.svg" alt="">';
  const findings = checkDiagramAlt(html);
  assert.equal(findings.length, 1);
  assert.match(findings[0], /accDescr/);
});

test("diagram-alt: een ontbrekend alt-attribuut wordt gemeld", () => {
  const findings = checkDiagramAlt('<img class="mermaid-img" src="/a.svg">');
  assert.match(findings[0], /zonder alt-attribuut/);
});

test("diagram-alt: afbeeldingen buiten een diagram blijven buiten beschouwing", () => {
  assert.deepEqual(checkDiagramAlt('<img class="logo" src="/logo.svg" alt="">'), []);
});

test("koppenstructuur: de rechterkolom maskeert een sprong niet", () => {
  const html =
    '<h1>Titel</h1><aside class="page-aside"><nav id="toc" class="toc">' +
    "<h2>Op deze pagina</h2></nav><h2>Download deze pagina</h2></aside>" +
    "<h3>Te diep</h3>";
  const findings = checkHeadingOrder(html);
  assert.equal(findings.length, 1);
  assert.match(findings[0], /h1 naar h3/);
});

test("diagram-beschrijving: een gevulde beschrijving levert geen bevindingen", () => {
  const html =
    '<div class="mermaid-diagram"><img class="mermaid-img" src="/a.svg" alt="Naam">' +
    '<p class="mermaid-beschrijving visually-hidden">Wat er te zien is.</p></div>';
  assert.deepEqual(checkDiagramBeschrijving(html), []);
});

test("diagram-beschrijving: een ontbrekende beschrijving wordt gemeld", () => {
  const html =
    '<div class="mermaid-diagram"><img class="mermaid-img" src="/a.svg" alt="Naam"></div>';
  const findings = checkDiagramBeschrijving(html);
  assert.equal(findings.length, 1);
  assert.match(findings[0], /accDescr/);
});

test("diagram-beschrijving: een lege beschrijving wordt gemeld", () => {
  const html =
    '<div class="mermaid-diagram"><img class="mermaid-img" src="/a.svg" alt="Naam">' +
    '<p class="mermaid-beschrijving visually-hidden"> </p></div>';
  assert.match(checkDiagramBeschrijving(html)[0], /lege beschrijving/);
});

test("voetnoten: een blok zonder doc-endnotes-rol levert geen bevindingen", () => {
  const html = '<div class="footnotes"><hr><ol><li id="fn:1"><p>Noot.</p></li></ol></div>';
  assert.deepEqual(checkVoetnootRol(html), []);
});

test("voetnoten: de rol wordt ook zonder aanhalingstekens gemeld (geminificeerd)", () => {
  const html = '<div class=footnotes role=doc-endnotes><hr><ol><li id=fn:1><p>Noot.</p></li></ol></div>';
  assert.equal(checkVoetnootRol(html).length, 1);
});

test("voetnoten: de doc-endnotes-rol van Goldmark wordt gemeld", () => {
  const html =
    '<div class="footnotes" role="doc-endnotes"><hr><ol><li id="fn:1"><p>Noot.</p></li></ol></div>';
  const findings = checkVoetnootRol(html);
  assert.equal(findings.length, 1);
  assert.match(findings[0], /inhoud\.html/);
});

test("layouts: elke paginatemplate stuurt .Content door inhoud.html", () => {
  const layouts = fileURLToPath(new URL("../../layouts", import.meta.url));
  assert.deepEqual(checkLayouts(layouts), []);
});

test("layouts: een template die .Content rechtstreeks uitvoert wordt gemeld", () => {
  const root = mkdtempSync(join(tmpdir(), "moza-layouts-"));
  writeFileSync(join(root, "list.html"), '{{ define "main" }}{{ .Content }}{{ end }}');
  const findings = checkLayouts(root);
  rmSync(root, { recursive: true, force: true });
  assert.equal(findings.length, 1);
  assert.match(findings[0], /inhoud\.html/);
});

test("layouts: een template die de partial gebruikt levert geen bevinding", () => {
  const root = mkdtempSync(join(tmpdir(), "moza-layouts-"));
  writeFileSync(join(root, "list.html"), '{{ partial "inhoud.html" .Content }}');
  const findings = checkLayouts(root);
  rmSync(root, { recursive: true, force: true });
  assert.deepEqual(findings, []);
});

test("layouts: .Content in een voorwaarde wordt gelezen, niet uitgevoerd", () => {
  const root = mkdtempSync(join(tmpdir(), "moza-layouts-"));
  writeFileSync(
    join(root, "aside.html"),
    '{{ if strings.Contains $p.Content `class="footnotes"` }}{{ end }}',
  );
  const findings = checkLayouts(root);
  rmSync(root, { recursive: true, force: true });
  assert.deepEqual(findings, []);
});

test("layouts: .Content in een shortcode telt niet als paginainhoud", () => {
  const root = mkdtempSync(join(tmpdir(), "moza-layouts-"));
  mkdirSync(join(root, "_shortcodes"));
  writeFileSync(join(root, "_shortcodes", "label.html"), "{{ $svg.Content }}");
  const findings = checkLayouts(root);
  rmSync(root, { recursive: true, force: true });
  assert.deepEqual(findings, []);
});

test("collectRoutes vindt elke map met index.html, plus losse HTML in de root", () => {
  const root = mkdtempSync(join(tmpdir(), "moza-a11y-"));
  try {
    writeFileSync(join(root, "index.html"), "<h1>Home</h1>");
    writeFileSync(join(root, "404.html"), "<h1>Niet gevonden</h1>");
    mkdirSync(join(root, "handboek"), { recursive: true });
    writeFileSync(join(root, "handboek", "index.html"), "<h1>Handboek</h1>");
    // Een map zonder index.html is geen route.
    mkdirSync(join(root, "images"), { recursive: true });
    writeFileSync(join(root, "images", "logo.svg"), "<svg/>");

    assert.deepEqual(collectRoutes(root), ["/", "/404.html", "/handboek/"]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("collectRoutes slaat Hugo-aliassen over", () => {
  const root = mkdtempSync(join(tmpdir(), "moza-a11y-"));
  try {
    writeFileSync(join(root, "index.html"), "<h1>Home</h1>");
    mkdirSync(join(root, "oud"), { recursive: true });
    writeFileSync(
      join(root, "oud", "index.html"),
      '<html><head><meta http-equiv="refresh" content="0; url=/nieuw/"></head></html>'
    );

    assert.deepEqual(collectRoutes(root), ["/"]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("contentafbeelding: een beschreven afbeelding levert geen bevindingen", () => {
  const html = '<article><img src="foto.jpg" alt="Twee mensen ondertekenen een verklaring"></article>';
  assert.deepEqual(checkContentImageAlt(html), []);
});

test("contentafbeelding: een lege alt-tekst wordt gemeld", () => {
  const findings = checkContentImageAlt('<article><img src="diagram.svg" alt=""></article>');
  assert.equal(findings.length, 1);
  assert.match(findings[0], /diagram\.svg/);
});

test("contentafbeelding: een ontbrekend alt-attribuut wordt gemeld", () => {
  const findings = checkContentImageAlt('<article><img src="foto.jpg"></article>');
  assert.match(findings[0], /zonder alt-attribuut/);
});

test("contentafbeelding: een decoratieve afbeelding mag een lege alt hebben", () => {
  const html = '<article><img src="streep.svg" alt="" role="presentation"></article>';
  assert.deepEqual(checkContentImageAlt(html), []);
});

test("contentafbeelding: Mermaid-diagrammen blijven aan checkDiagramAlt", () => {
  const html = '<article><img class="mermaid-img" src="d.svg" alt=""></article>';
  assert.deepEqual(checkContentImageAlt(html), []);
});

test("contentafbeelding: afbeeldingen buiten het artikel tellen niet mee", () => {
  const html = '<header><img src="logo.svg" alt=""></header><article><p>Tekst</p></article>';
  assert.deepEqual(checkContentImageAlt(html), []);
});

test("presentatiesoort: Reveal.js, ook als de minifier de aanhalingstekens weghaalt", () => {
  assert.equal(presentatieSoort('<div class="reveal">'), "reveal");
  assert.equal(presentatieSoort("<div class=reveal><div class=slides>"), "reveal");
});

test("presentatiesoort: nldd-deck, ook tussen andere klassen", () => {
  assert.equal(presentatieSoort('<main class="deck">'), "nldd-deck");
  assert.equal(presentatieSoort("<main class=deck>"), "nldd-deck");
  assert.equal(presentatieSoort('<main class="x deck y">'), "nldd-deck");
});

test("presentatiesoort: een klasse die er alleen op lijkt telt niet", () => {
  assert.equal(presentatieSoort('<div class="deck-close revealed">'), null);
  assert.equal(presentatieSoort("<p>class=deck staat hier als tekst</p>"), null);
});

test("svg: een geminificeerde tekening met zelfsluitende elementen levert geen bevindingen", () => {
  const html =
    '<article><svg viewBox="0 0 100 100" role="img"><title>Tekening</title><g>' +
    '<rect class="dg-node" x="0" y="0" width="10" height="10" rx="2"/>' +
    '<path d="M0 0 L10 10"/><circle cx="5" cy="5" r="2"/><text x="1" y="1">Tekst</text>' +
    "</g></svg></article>";
  assert.deepEqual(checkSvgGesloten(html), []);
});

test("svg: een <rect> zonder slash na een geneste <svg> wordt gemeld", () => {
  const html =
    '<svg viewBox="0 0 100 100"><g><svg x="4" y="4" viewBox="0 0 24 24"><path d="M0 0h24"/></svg>' +
    "<rect class=dg-node x=10 y=10 width=50 height=20 rx=12>" +
    '<text x="12" y="20">Verdwijnt</text></g></svg>';
  const findings = checkSvgGesloten(html);
  assert.equal(findings.length, 1);
  assert.match(findings[0], /^<rect class=dg-node .*> is niet gesloten$/);
});

test("svg: elk open element wordt apart gemeld, ook aan het eind van de tekening", () => {
  const html = "<svg><rect x=1><circle r=2></svg><p>Na de tekening</p>";
  const findings = checkSvgGesloten(html);
  assert.equal(findings.length, 2);
  assert.match(findings[0], /^<rect/);
  assert.match(findings[1], /^<circle/);
});

test("svg: een expliciet gesloten <rect></rect> levert geen bevindingen", () => {
  const html = '<svg viewBox="0 0 10 10"><rect x="0" y="0" width="5" height="5"></rect></svg>';
  assert.deepEqual(checkSvgGesloten(html), []);
});

test("svg: een vorm met een eigen <title> en sluittag levert geen bevindingen", () => {
  const html = '<svg><path d="M0 0"><title>Lijn</title></path></svg>';
  assert.deepEqual(checkSvgGesloten(html), []);
});

test("svg: tekeningen buiten het artikel tellen ook mee", () => {
  const html =
    '<header><svg class="menu-icon" viewBox="0 0 24 24"><path d="M3 6h18"></svg></header>' +
    "<article><p>Tekst</p></article>";
  const findings = checkSvgGesloten(html);
  assert.equal(findings.length, 1);
  assert.match(findings[0], /<path d="M3 6h18">/);
});

test("svg: HTML buiten een <svg> blijft buiten beschouwing", () => {
  const html =
    "<p>Een <span>open element<p>buiten SVG</p><!-- <svg><rect x=1></svg> -->" +
    '<script>const s = "<svg><rect x=1></svg>";</script>';
  assert.deepEqual(checkSvgGesloten(html), []);
});

test("svg: een lange tag wordt ingekort in de melding", () => {
  const html = `<svg><path d="${"M0 0 L1 1 ".repeat(20)}"></svg>`;
  const [finding] = checkSvgGesloten(html);
  assert.ok(finding.length < 120);
  assert.match(finding, /…> is niet gesloten$/);
});
