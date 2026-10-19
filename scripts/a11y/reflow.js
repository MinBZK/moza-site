#!/usr/bin/env node

/**
 * Toets de gebouwde site op reflow (WCAG 1.4.10) en herschalen van tekst
 * (WCAG 1.4.4): loopt er content horizontaal buiten het venster?
 *
 * axe en HTML_CodeSniffer meten dit niet, dus pa11y ziet een overloop nooit.
 * Zonder deze controle kan een fix hiervoor stil verdwijnen zonder dat een
 * gate afgaat.
 *
 * Gemeten op twee breedtes en twee basislettergroottes. 320 pixels is de
 * ondergrens uit het criterium; 1024 staat erbij omdat de balk, de
 * subnavigatie en de inhoudsopgave alleen op desktop bestaan en juist bij
 * grote tekst omvallen.
 *
 * Presentaties vallen af: die hebben hun eigen toets in presentaties.js, met
 * een eigen opvatting over wat een dia mag doen.
 *
 * Gebruik:
 *   node scripts/a11y/reflow.js [outputmap]
 */

import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import puppeteer from "puppeteer";
import { collectRoutes } from "./routes.js";
import { presentatieSoort } from "./regels.js";
import { startServer } from "../lib/static-server.js";
import { PUPPETEER_ARGS } from "../lib/puppeteer-args.js";

const OUTPUT_DIR = resolve(process.cwd(), process.argv[2] || join("tmp", "public"));

const COMBINATIES = [
  { breedte: 320, wortel: 16 },
  { breedte: 320, wortel: 32 },
  { breedte: 1024, wortel: 16 },
  { breedte: 1024, wortel: 32 },
];

/** Subpixelafrondingen in de layout mogen geen bevinding opleveren. */
const MARGE = 1;

/** Hoeveel elementen we per combinatie noemen; de rest zegt niets nieuws. */
const MAX_VOORBEELDEN = 3;

function paginaRoutes(root) {
  return collectRoutes(root).filter((route) => {
    if (!route.endsWith("/")) return true;
    const file = join(root, route, "index.html");
    return existsSync(file) ? !presentatieSoort(readFileSync(file, "utf-8")) : true;
  });
}

/**
 * Meet de overloop en noem de elementen die eraan schuldig zijn. Draait in de
 * pagina, dus zonder import en met alleen DOM-API's.
 */
function meetInPagina(marge, maxVoorbeelden) {
  const wortel = document.documentElement;
  const venster = wortel.clientWidth;
  const overloop = wortel.scrollWidth - venster;
  if (overloop <= marge) return { overloop: 0, voorbeelden: [] };

  const inSchuifvlak = (el) => {
    for (let ouder = el.parentElement; ouder; ouder = ouder.parentElement) {
      const stijl = getComputedStyle(ouder);
      if (stijl.overflowX === "auto" || stijl.overflowX === "scroll") return true;
    }
    return false;
  };

  const voorbeelden = [];
  for (const el of document.querySelectorAll("body *")) {
    const vak = el.getBoundingClientRect();
    if (vak.width === 0 || vak.right <= venster + marge) continue;
    // De inhoud van een schuifvlak mag breder zijn dan het venster: dat is de
    // bedoelde oplossing voor een brede tabel. Het schuifvlak zelf niet.
    if (inSchuifvlak(el)) continue;
    const naam = el.tagName.toLowerCase() + (el.id ? `#${el.id}` : "") +
      (typeof el.className === "string" && el.className.trim()
        ? `.${el.className.trim().split(/\s+/).join(".")}`
        : "");
    if (!voorbeelden.includes(naam)) voorbeelden.push(naam);
    if (voorbeelden.length === maxVoorbeelden) break;
  }

  return { overloop, voorbeelden };
}

function meld(bevindingen, route, regel) {
  if (!bevindingen.has(route)) bevindingen.set(route, []);
  bevindingen.get(route).push(regel);
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    console.error(`Outputmap ${OUTPUT_DIR} bestaat niet. Bouw de site eerst.`);
    process.exit(1);
  }

  const routes = paginaRoutes(OUTPUT_DIR);
  if (routes.length === 0) {
    console.error(`Geen routes gevonden in ${OUTPUT_DIR}.`);
    process.exit(1);
  }

  const server = await startServer(OUTPUT_DIR);
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({ args: PUPPETEER_ARGS });
  const bevindingen = new Map();

  try {
    for (const { breedte, wortel } of COMBINATIES) {
      const page = await browser.newPage();
      const cdp = await page.createCDPSession();
      // De echte lettergrootte-instelling van de browser, niet
      // `html { font-size }`: een mediaquery in rem of em rekent tegen de
      // instelling en zou anders niet meeschalen.
      await cdp.send("Page.setFontSizes", { fontSizes: { standard: wortel, fixed: wortel } });
      await page.setViewport({ width: breedte, height: 900 });

      for (const route of routes) {
        let uitslag;
        try {
          await page.goto(baseUrl + route, { waitUntil: "load" });
          // Zonder de webfonts meet je de breedte van een vervangend lettertype.
          await page.evaluate(() => document.fonts.ready);
          uitslag = await page.evaluate(meetInPagina, MARGE, MAX_VOORBEELDEN);
        } catch (err) {
          // Een pagina die niet te meten is, mag niet als goedgekeurd gelden.
          meld(bevindingen, route, `niet te meten bij ${breedte}px/${wortel}px: ${err.message.split("\n")[0]}`);
          continue;
        }
        if (uitslag.overloop === 0) continue;
        meld(
          bevindingen,
          route,
          `${breedte}px breed bij ${wortel}px basistekst: ${uitslag.overloop}px overloop` +
            (uitslag.voorbeelden.length ? ` (${uitslag.voorbeelden.join(", ")})` : "")
        );
      }

      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  let total = 0;
  for (const [route, regels] of [...bevindingen].sort()) {
    console.error(`\n${route}`);
    for (const regel of regels) console.error(`  ✗ ${regel}`);
    total += regels.length;
  }

  if (total > 0) {
    console.error(
      `\n${total} bevinding(en) op ${routes.length} pagina('s), ` +
        `${COMBINATIES.length} combinaties per pagina.`
    );
    process.exit(1);
  }

  console.log(
    `Geen horizontale overloop op ${routes.length} pagina('s), ` +
      `${COMBINATIES.length} combinaties per pagina.`
  );
}

export { meetInPagina, COMBINATIES, MARGE, MAX_VOORBEELDEN };

/* Alleen draaien als script, niet bij import vanuit de test. */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main().catch((err) => {
    console.error("Fout bij reflowtoets:", err.message);
    process.exit(1);
  });
}
