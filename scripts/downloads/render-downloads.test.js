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

// Integratietest: bouwt een minimale "gebouwde" pagina + manifest en controleert
// dat render-downloads er zowel een .odt (pandoc) als .pdf (Chromium) van maakt.
test(
  "render-downloads genereert .odt en .pdf uit het manifest",
  { skip: hasPandoc() ? false : "pandoc niet beschikbaar" },
  () => {
    const root = mkdtempSync(join(tmpdir(), "moza-downloads-"));
    try {
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
        "---\nurl: https://mijnoverheidzakelijk.nl/documenten/test/\n---\n\n" +
          "# Testdocument\n\nHallo wereld.\n"
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
