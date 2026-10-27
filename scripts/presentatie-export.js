#!/usr/bin/env node

/**
 * Exporteer een gebouwde nldd-deck-presentatie als één HTML-bestand:
 * stylesheets, fonts, script en afbeeldingen zitten erin. Bedoeld om los te
 * publiceren, bijvoorbeeld op Plak, of om offline te presenteren.
 *
 * Draait NA de Hugo-build. Een losse pagina heeft geen site om naar terug te
 * gaan, dus de sluitknop en links naar de site (canonical, favicon) vallen weg.
 *
 * Gebruik:
 *   node scripts/presentatie-export.js <outputmap> <slug> <uitvoerbestand>
 */

import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from "node:fs";
import { join, dirname, extname } from "node:path";

const [publicDir, slug, out] = process.argv.slice(2);
if (!publicDir || !slug || !out) {
  console.error("Gebruik: node scripts/presentatie-export.js <outputmap> <slug> <uitvoerbestand>");
  process.exit(2);
}

const pageDir = join(publicDir, "documenten", "presentaties", slug);
const pageFile = join(pageDir, "index.html");
if (!existsSync(pageFile)) {
  console.error(`Geen presentatie gevonden op ${pageFile}. Is de build met drafts (-D) gedaan?`);
  process.exit(1);
}

const mime = {
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

const resolveRef = (ref, baseDir) => (ref.startsWith("/") ? join(publicDir, ref) : join(baseDir, ref));
const unquote = (value) => value.replace(/^["']|["']$/g, "");
const isInline = (ref) => /^(data:|https?:|#)/.test(ref);

function dataUri(file) {
  if (!existsSync(file)) throw new Error(`Bestand niet gevonden: ${file}`);
  return `data:${mime[extname(file).toLowerCase()] || "application/octet-stream"};base64,${readFileSync(file).toString("base64")}`;
}

let html = readFileSync(pageFile, "utf8");

// Dia's met data-lokaal (zoals een video uit gebruikersonderzoek) gaan nooit mee naar buiten.
// Staat er een reservedia bij (shortcode lokaal), dan komt die ervoor in de plaats.
html = html.replace(/<section\b[^>]*\bdata-lokaal\b[^>]*>[\s\S]*?<\/section>\s*(?:<template\b[^>]*\bdata-lokaal-reserve\b[^>]*>([\s\S]*?)<\/template>)?/g,
  (_, reserve) => reserve ?? "");

// Stylesheets inline, met fonts en afbeeldingen als data-URI
html = html.replace(/<link\b[^>]*\brel=["']?stylesheet["']?[^>]*>/g, (tag) => {
  const href = unquote(tag.match(/\bhref=("[^"]*"|'[^']*'|[^\s>]+)/)[1]);
  const file = resolveRef(href, pageDir);
  const css = readFileSync(file, "utf8").replace(/url\((['"]?)([^'")]+)\1\)/g, (match, _quote, ref) => {
    if (isInline(ref)) return match;
    const target = resolveRef(ref.split(/[?#]/)[0], dirname(file));
    return existsSync(target) ? `url(${dataUri(target)})` : match;
  });
  return `<style>${css}</style>`;
});

// Scripts inline
html = html.replace(/<script\b([^>]*?)\bsrc=("[^"]*"|'[^']*'|[^\s>]+)([^>]*)><\/script>/g, (_, before, src, after) =>
  `<script${`${before}${after}`.trimEnd()}>${readFileSync(resolveRef(unquote(src), pageDir), "utf8")}</script>`);

// Afbeeldingen inline; src staat niet altijd als eerste attribuut
html = html.replace(/(<img\b[^>]*?\s)src=("[^"]*"|'[^']*'|[^\s>]+)/g, (match, before, src) => {
  const ref = unquote(src);
  return isInline(ref) ? match : `${before}src="${dataUri(resolveRef(ref, pageDir))}"`;
});

// Links die zonder de site niets doen
html = html.replace(/<link\b[^>]*\brel=["']?(canonical|alternate|icon|apple-touch-icon|manifest)["']?[^>]*>/g, "");

// Los van de site werken deze knoppen niet: Sluiten gaat naar "/" en de PDF staat alleen op de site
html = html.replace(/<nldd-icon-button\b[^>]*\bdata-(?:close|pdf)\b[^>]*>[\s\S]*?<\/nldd-icon-button>/g, "");

if (/data-lokaal|lokaal\//.test(html)) {
  console.error("Er staat nog een verwijzing naar lokale bestanden in de pagina; die mag niet naar buiten.");
  process.exit(1);
}

const leftovers = [...html.matchAll(/<(?:img|script|link)\b[^>]*\b(?:src|href)=["']?(\/[^"'\s>]*)/g)].map((m) => m[1]);
if (leftovers.length) {
  console.error(`Nog niet ingepakt: ${[...new Set(leftovers)].join(", ")}`);
  process.exit(1);
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log(`${out}: ${(statSync(out).size / 1024).toFixed(0)} kB`);
