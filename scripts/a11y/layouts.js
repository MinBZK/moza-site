/**
 * Controleert dat layouts de paginainhoud door de partial inhoud.html sturen.
 *
 * Die partial repareert opmaak waar Goldmark geen render hook voor biedt, zoals
 * de rol op het voetnotenblok. Een layout die `.Content` rechtstreeks uitvoert,
 * slaat die reparatie over. De controle op de gebouwde site merkt dat pas als er
 * ook echt een pagina met voetnoten door die layout gaat; deze controle ziet het
 * meteen.
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

// Plekken waar `.Content` bewust niet door de partial gaat, met de reden.
const UITZONDERINGEN = {
  "rss.xml": "feed, geen toegankelijkheidsboom",
  "index.json": "zoekindex, geen HTML-uitvoer",
  "_partials/meta.html": "leest tekst voor de description",
  "documenten/rapportages/page.html": "HTML-content, geen Markdown met voetnoten",
  "documenten/presentaties/nldd-deck.html": "HTML page bundle",
  "documenten/presentaties/page.html": "HTML page bundle",
};

const PAGINA_INHOUD = /(?<!"inhoud\.html" )\.Content\b/;

// `.Content` in een voorwaarde of een toewijzing wordt gelezen, niet uitgevoerd.
const GELEZEN = /\bif\b|\bwith\b|:?=[^=]/;

// In shortcodes en render hooks is `.Content` de inhoud van een resource of een
// fragment, niet die van de pagina.
const GEEN_PAGINATEMPLATE = /^_(shortcodes|markup)\//;

function bestanden(map) {
  const gevonden = [];
  for (const item of readdirSync(map, { withFileTypes: true })) {
    const pad = join(map, item.name);
    if (item.isDirectory()) gevonden.push(...bestanden(pad));
    else if (/\.(html|xml|json)$/.test(item.name)) gevonden.push(pad);
  }
  return gevonden;
}

function checkLayouts(layoutsDir) {
  const findings = [];

  for (const pad of bestanden(layoutsDir)) {
    const naam = relative(layoutsDir, pad);
    if (naam in UITZONDERINGEN) continue;
    if (GEEN_PAGINATEMPLATE.test(naam)) continue;

    const regels = readFileSync(pad, "utf8").split("\n");
    regels.forEach((regel, i) => {
      if (!PAGINA_INHOUD.test(regel)) return;
      if (GELEZEN.test(regel)) return;
      findings.push(
        `${naam}:${i + 1} voert .Content rechtstreeks uit; stuur hem door de partial inhoud.html`,
      );
    });
  }

  return findings;
}

export { checkLayouts, UITZONDERINGEN };
