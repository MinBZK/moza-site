import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

function hasPandoc() {
  try {
    execFileSync("pandoc", ["--version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// Bouwt een minimale "gebouwde" pagina + manifest en draait render-downloads.
// `url` is wat Hugo in de front matter zet: absoluut, of root-relatief bij een
// build met `--baseURL /`.
function renderFixture(root, url) {
  const pageDir = join(root, "documenten", "test");
  mkdirSync(pageDir, { recursive: true });

  writeFileSync(
    join(pageDir, "index.html"),
    "<!doctype html><html lang=nl><head><meta charset=utf-8><title>Test</title></head>" +
      "<body><main><article><h1>Testdocument</h1><p>Hallo wereld.</p>" +
      '<p><a href="/onderwerpen/test/">Interne link</a></p></article></main></body></html>'
  );
  writeFileSync(
    join(pageDir, "index.pandoc.md"),
    `---\nurl: ${url}\n---\n\n# Testdocument\n\nHallo wereld.\n`
  );
  writeFileSync(
    join(root, "download.json"),
    JSON.stringify([
      { relPermalink: "/documenten/test/", name: "test", title: "Testdocument" },
    ])
  );

  execFileSync("node", [join(import.meta.dirname, "render-downloads.js"), root], {
    stdio: "pipe",
  });

  return pageDir;
}

// Integratietest: controleert dat render-downloads zowel een .odt (pandoc) als
// een .pdf (Chromium) maakt.
test(
  "render-downloads genereert .odt en .pdf uit het manifest",
  { skip: hasPandoc() ? false : "pandoc niet beschikbaar" },
  () => {
    const root = mkdtempSync(join(tmpdir(), "moza-downloads-"));
    try {
      const pageDir = renderFixture(root, "https://mijnoverheidzakelijk.nl/documenten/test/");

      assert.ok(existsSync(join(pageDir, "test.odt")), "test.odt moet bestaan");
      assert.ok(existsSync(join(pageDir, "test.pdf")), "test.pdf moet bestaan");

      // De PDF wordt van een tijdelijke printserver gedrukt; interne links
      // moeten naar de site wijzen, niet naar die server.
      const pdf = readFileSync(join(pageDir, "test.pdf")).toString("latin1");
      assert.ok(
        pdf.includes("https://mijnoverheidzakelijk.nl/onderwerpen/test/"),
        "interne link moet naar de site wijzen"
      );
      assert.ok(!pdf.includes("127.0.0.1"), "geen link naar de printserver");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }
);

// De controlebuild draait `hugo --baseURL /`, dus dan is er geen site-URL om
// links naar te herschrijven. Dat mag de generatie niet breken.
test(
  "render-downloads werkt ook zonder absolute site-URL",
  { skip: hasPandoc() ? false : "pandoc niet beschikbaar" },
  () => {
    const root = mkdtempSync(join(tmpdir(), "moza-downloads-"));
    try {
      const pageDir = renderFixture(root, "/documenten/test/");

      assert.ok(existsSync(join(pageDir, "test.odt")), "test.odt moet bestaan");
      assert.ok(existsSync(join(pageDir, "test.pdf")), "test.pdf moet bestaan");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }
);

// De beschrijving van een diagram staat op de site als verborgen tekst. Chrome
// neemt die niet op in de PDF, dus de export plakt hem achter de alt.
test(
  "render-downloads zet de diagrambeschrijving in de alt van de PDF",
  { skip: hasPandoc() ? false : "pandoc niet beschikbaar" },
  () => {
    const root = mkdtempSync(join(tmpdir(), "moza-downloads-"));
    try {
      const pageDir = join(root, "onderwerpen", "diagram");
      mkdirSync(pageDir, { recursive: true });

      writeFileSync(
        join(pageDir, "diagram.svg"),
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 10" width="40" height="10">' +
          '<rect width="40" height="10" fill="#123" /></svg>'
      );
      writeFileSync(
        join(pageDir, "index.html"),
        "<!doctype html><html lang=nl><head><meta charset=utf-8><title>Diagram</title></head>" +
          "<body><main><article><h1>Diagram</h1>" +
          '<div class="mermaid-diagram">' +
          '<img class="mermaid-img" src="diagram.svg" alt="Korte naam" width="40" height="10">' +
          '<p class="mermaid-beschrijving visually-hidden">Lange beschrijving van het diagram.</p>' +
          "</div></article></main></body></html>"
      );
      writeFileSync(
        join(pageDir, "index.pandoc.md"),
        "---\ntitle: Diagram\n---\n\n# Diagram\n"
      );
      writeFileSync(
        join(root, "download.json"),
        JSON.stringify([
          { relPermalink: "/onderwerpen/diagram/", name: "diagram", title: "Diagram" },
        ])
      );

      execFileSync("node", [join(import.meta.dirname, "render-downloads.js"), root], {
        stdio: "pipe",
      });

      const pdf = readFileSync(join(pageDir, "diagram.pdf")).toString("latin1");
      assert.match(pdf, /\/Alt \(Korte naam\. Lange beschrijving van het diagram\.\)/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }
);

// Een diagram staat in de Markdown als mermaid-broncode. In de ODT hoort de
// gerenderde plaat te staan, met naam en beschrijving in de ODF-metadata.
test(
  "render-downloads zet een diagram als afbeelding met naam en beschrijving in de .odt",
  { skip: hasPandoc() ? false : "pandoc niet beschikbaar" },
  () => {
    const root = mkdtempSync(join(tmpdir(), "moza-downloads-"));
    try {
      const pageDir = join(root, "onderwerpen", "diagram");
      mkdirSync(pageDir, { recursive: true });
      mkdirSync(join(root, "images", "render"), { recursive: true });

      writeFileSync(
        join(root, "images", "render", "proef-light.svg"),
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">' +
          '<rect width="400" height="100" fill="#eef" /></svg>'
      );
      writeFileSync(
        join(pageDir, "index.html"),
        "<!doctype html><html lang=nl><head><meta charset=utf-8><title>Diagram</title></head>" +
          "<body><main><article><h1>Diagram</h1>" +
          '<div class="mermaid-diagram">' +
          '<img class="mermaid-img mermaid-img--light" src="/images/render/proef-light.svg?v=1"' +
          ' alt="Korte naam" width="400" height="100">' +
          '<p class="mermaid-beschrijving visually-hidden">Lange beschrijving van het diagram.</p>' +
          "</div></article></main></body></html>"
      );
      writeFileSync(
        join(pageDir, "index.pandoc.md"),
        "---\ntitle: Diagram\n---\n\n# Diagram\n\n```mermaid\nflowchart LR\n  accTitle: Korte naam\n  A --> B\n```\n"
      );
      writeFileSync(
        join(root, "download.json"),
        JSON.stringify([
          { relPermalink: "/onderwerpen/diagram/", name: "diagram", title: "Diagram" },
        ])
      );

      execFileSync("node", [join(import.meta.dirname, "render-downloads.js"), root], {
        stdio: "pipe",
      });

      const odt = join(pageDir, "diagram.odt");
      const inhoud = execFileSync("unzip", ["-p", odt, "content.xml"]).toString("utf-8");
      const bestanden = execFileSync("unzip", ["-l", odt]).toString("utf-8");

      assert.match(inhoud, /<svg:title>Korte naam<\/svg:title>/);
      assert.match(inhoud, /<svg:desc>Lange beschrijving van het diagram\.<\/svg:desc>/);
      assert.doesNotMatch(inhoud, /flowchart LR/, "de mermaid-broncode hoort eruit te zijn");
      assert.match(bestanden, /Pictures\/0\.png/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }
);

// Een getekend diagram staat inline in de pagina; de shortcode laat in de
// pandoc-bron een verwijzing naar hetzelfde beeld als los bestand achter.
test(
  "render-downloads neemt ook een getekend diagram mee in de .odt",
  { skip: hasPandoc() ? false : "pandoc niet beschikbaar" },
  () => {
    const root = mkdtempSync(join(tmpdir(), "moza-downloads-"));
    try {
      const pageDir = join(root, "onderwerpen", "plaat");
      mkdirSync(pageDir, { recursive: true });
      mkdirSync(join(root, "images", "diagrammen"), { recursive: true });

      const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200" role="img">' +
        "<title>Naam van de plaat</title><desc>Wat er op de plaat staat.</desc>" +
        '<rect width="300" height="200" fill="#dde" /></svg>';
      writeFileSync(join(root, "images", "diagrammen", "proef.svg"), svg);
      writeFileSync(
        join(pageDir, "index.html"),
        "<!doctype html><html lang=nl><head><meta charset=utf-8><title>Plaat</title></head>" +
          "<body><main><article><h1>Plaat</h1>" +
          '<figure class="diagram"><div class="diagram-panel">' +
          svg +
          "</div>" +
          '<a class="diagram-download" href="/images/diagrammen/proef.svg" download="proef.svg">Download</a>' +
          "</figure></article></main></body></html>"
      );
      writeFileSync(
        join(pageDir, "index.pandoc.md"),
        "---\ntitle: Plaat\n---\n\n# Plaat\n\n![](/images/diagrammen/proef.svg)\n"
      );
      writeFileSync(
        join(root, "download.json"),
        JSON.stringify([{ relPermalink: "/onderwerpen/plaat/", name: "plaat", title: "Plaat" }])
      );

      execFileSync("node", [join(import.meta.dirname, "render-downloads.js"), root], {
        stdio: "pipe",
      });

      const inhoud = execFileSync("unzip", ["-p", join(pageDir, "plaat.odt"), "content.xml"]).toString(
        "utf-8"
      );
      assert.match(inhoud, /<svg:title>Naam van de plaat<\/svg:title>/);
      assert.match(inhoud, /<svg:desc>Wat er op de plaat staat\.<\/svg:desc>/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }
);
