import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { collectRoutes } from "./routes.js";
import { checkHeadingOrder, checkDiagramAlt, checkContentImageAlt, presentatieSoort } from "./checks.js";

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
