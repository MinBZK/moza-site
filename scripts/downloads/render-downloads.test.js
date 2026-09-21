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
