#!/usr/bin/env node

/**
 * Genereer downloadbestanden (.odt en .pdf) voor pagina's met `downloads: true`.
 *
 * Draait NA de Hugo-build op de outputmap (standaard `public`). Leest het
 * manifest `downloads.json` (door Hugo gegenereerd) en maakt per pagina:
 *   - <naam>.odt  via pandoc, uit de door Hugo gegenereerde index.md
 *   - <naam>.pdf  via Puppeteer, door de gebouwde HTML-pagina af te drukken
 *
 * De PDF gebruikt de echte sitestijl: een tijdelijke webserver serveert de
 * outputmap, zodat de root-relatieve CSS/JS/fonts laden. De afdrukstijl
 * (@media print in components/print.css) verbergt de site-omgeving.
 *
 * Gebruik:
 *   node scripts/render-downloads.js [outputmap]   # standaard: public
 */

import { readFileSync, existsSync } from "node:fs";
import { join, resolve, extname, normalize } from "node:path";
import { createServer } from "node:http";
import { execFileSync } from "node:child_process";
import puppeteer from "puppeteer";

const OUTPUT_DIR = resolve(process.cwd(), process.argv[2] || "public");
const MANIFEST = join(OUTPUT_DIR, "download.json");
// Pandoc-stijlsjabloon: Verdana 10pt, passende koppen, opgemaakte note. Zie
// README.md in deze map voor hoe dit bestand is afgeleid van pandocs default.
const REFERENCE_ODT = join(import.meta.dirname, "reference.odt");

// In CI of als root (container) heeft Chromium deze vlaggen nodig.
const PUPPETEER_ARGS =
  process.env.CI || process.getuid?.() === 0
    ? ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
    : [];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

// ── Statische webserver over de outputmap ────────────────────────────────────

function startServer(root) {
  const server = createServer((req, res) => {
    try {
      let urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      if (urlPath.endsWith("/")) urlPath += "index.html";
      // Voorkom path-traversal buiten de root.
      const filePath = normalize(join(root, urlPath));
      if (!filePath.startsWith(root) || !existsSync(filePath)) {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }
      const body = readFileSync(filePath);
      res.setHeader("Content-Type", MIME[extname(filePath)] || "application/octet-stream");
      res.end(body);
    } catch (err) {
      res.statusCode = 500;
      res.end(String(err));
    }
  });
  return new Promise((res) => {
    server.listen(0, "127.0.0.1", () => res(server));
  });
}

// ── Generatie ────────────────────────────────────────────────────────────────

function checkPandoc() {
  try {
    execFileSync("pandoc", ["--version"], { stdio: "ignore" });
  } catch {
    throw new Error(
      "pandoc is niet gevonden. Installeer pandoc (bv. `brew install pandoc` of `apk add pandoc`)."
    );
  }
}

function renderOdt(mdFile, odtOut, pageDir) {
  const args = [mdFile, "--resource-path", pageDir];
  if (existsSync(REFERENCE_ODT)) args.push("--reference-doc", REFERENCE_ODT);
  args.push("-o", odtOut);
  execFileSync("pandoc", args, { stdio: "pipe" });
}

async function renderPdf(page, baseUrl, relPermalink, pdfOut) {
  await page.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: "light" },
  ]);
  await page.goto(baseUrl + relPermalink, { waitUntil: "networkidle0" });
  await page.pdf({
    path: pdfOut,
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", bottom: "20mm", left: "18mm", right: "18mm" },
  });
}

async function main() {
  if (!existsSync(MANIFEST)) {
    console.log(`Geen ${MANIFEST} gevonden — niets te genereren.`);
    return;
  }

  const entries = JSON.parse(readFileSync(MANIFEST, "utf-8"));
  if (!Array.isArray(entries) || entries.length === 0) {
    console.log("Geen pagina's met downloads — niets te genereren.");
    return;
  }

  checkPandoc();

  const server = await startServer(OUTPUT_DIR);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  const browser = await puppeteer.launch({ args: PUPPETEER_ARGS });

  try {
    const page = await browser.newPage();
    for (const { relPermalink, name } of entries) {
      const pageDir = join(OUTPUT_DIR, relPermalink);
      const mdFile = join(pageDir, "index.md");
      if (!existsSync(mdFile)) {
        console.warn(`  ⚠ ${relPermalink}: index.md ontbreekt, overgeslagen`);
        continue;
      }
      const odtOut = join(pageDir, `${name}.odt`);
      const pdfOut = join(pageDir, `${name}.pdf`);

      renderOdt(mdFile, odtOut, pageDir);
      console.log(`  ✓ ${relPermalink}${name}.odt`);

      await renderPdf(page, baseUrl, relPermalink, pdfOut);
      console.log(`  ✓ ${relPermalink}${name}.pdf`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`Downloads gegenereerd voor ${entries.length} pagina('s).`);
}

main().catch((err) => {
  console.error("Fout bij genereren downloads:", err.message);
  process.exit(1);
});
