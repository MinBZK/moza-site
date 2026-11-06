#!/usr/bin/env node

/**
 * Toets of elk element dat focus krijgt ook zichtbaar verandert (WCAG 2.4.7).
 *
 * axe en HTML_CodeSniffer kijken niet naar de focusstijl, dus een `outline:
 * none` die ergens terugsluipt gaat door elke gate heen. Deze controle tabt
 * echt door de pagina: dat is de enige manier om te zien wat een
 * toetsenbordgebruiker krijgt, want `:focus-visible` matcht niet betrouwbaar
 * bij focus vanuit een script.
 *
 * Wat zichtbaar telt: een verandering in de omlijning, de schaduw, de kleuren,
 * de rand, de onderstreping of een pseudo-element, op het element zelf of op
 * zijn ouder. Dat laatste omdat een wrapper de ring kan dragen.
 *
 * Presentaties vallen af: die hebben hun eigen toets in presentaties.js.
 *
 * Gebruik:
 *   node scripts/a11y/focus.js [outputmap]
 */

import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import puppeteer from "puppeteer";
import { collectRoutes } from "./routes.js";
import { presentatieSoort } from "./regels.js";
import { startServer } from "../lib/static-server.js";
import { PUPPETEER_ARGS } from "../lib/puppeteer-args.js";

const OUTPUT_DIR = resolve(process.cwd(), process.argv[2] || join("tmp", "public"));

/** Genoeg voor de langste pagina; daarboven is de taborde zelf de bevinding. */
const MAX_TABS = 150;

/** Hoeveel elementen we per pagina noemen; de rest zegt niets nieuws. */
const MAX_VOORBEELDEN = 5;

function paginaRoutes(root) {
  return collectRoutes(root).filter((route) => {
    if (!route.endsWith("/")) return true;
    const file = join(root, route, "index.html");
    return existsSync(file) ? !presentatieSoort(readFileSync(file, "utf-8")) : true;
  });
}

/**
 * Leg de rusttoestand van elk focusbaar element vast. Draait in de pagina, dus
 * zonder import en met alleen DOM-API's.
 */
function legRustVast() {
  // Een overgang maakt de meting afhankelijk van het moment van kijken.
  const stijl = document.createElement("style");
  stijl.textContent = "*, *::before, *::after { transition: none !important; animation: none !important }";
  document.head.append(stijl);

  // Alleen wat een gebruiker ziet. Een eigenschap die niets toont telt niet
  // mee: `outline-offset` zonder omlijning verschuift niets, en de kleur van
  // een rand van 0px is onzichtbaar.
  const lees = (el, pseudo) => {
    const s = getComputedStyle(el, pseudo);
    const breed = (...maten) => maten.some((m) => parseFloat(m) > 0);
    const omlijning = s.outlineStyle !== "none" && breed(s.outlineWidth)
      ? `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor} ${s.outlineOffset}`
      : "geen";
    const rand = breed(s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth)
      ? `${s.borderWidth} ${s.borderColor} ${s.borderStyle}`
      : "geen";
    const streep = s.textDecorationLine !== "none"
      ? `${s.textDecorationLine} ${s.textDecorationColor} ${s.textDecorationThickness}`
      : "geen";
    const pseudoVlak = pseudo && s.content !== "none" ? `${s.width} ${s.height}` : "";
    return [omlijning, rand, streep, s.boxShadow, s.backgroundColor, s.color,
      s.filter, s.opacity, s.content, pseudoVlak].join("|");
  };

  const afdruk = (el) => [
    lees(el, null),
    lees(el, "::before"),
    lees(el, "::after"),
    // Een wrapper kan de ring dragen, zoals bij een invoerveld met rand.
    el.parentElement ? lees(el.parentElement, null) : "",
  ].join("#");

  const zichtbaar = (el) => {
    const vak = el.getBoundingClientRect();
    if (vak.width === 0 || vak.height === 0) return false;
    const s = getComputedStyle(el);
    return s.visibility !== "hidden" && s.display !== "none";
  };

  const elementen = [...document.querySelectorAll("a[href], button, input, select, textarea, summary, [tabindex]")]
    .filter((el) => !el.disabled && el.tabIndex >= 0 && zichtbaar(el));
  elementen.forEach((el, i) => el.setAttribute("data-focustoets", String(i)));

  window.__focus = { afdruk, rust: elementen.map(afdruk) };
  return elementen.length;
}

/** Lees het element dat nu focus heeft en vergelijk het met zijn rusttoestand. */
function meetActief() {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return { buiten: true };
  const nummer = el.getAttribute("data-focustoets");
  const naam = el.tagName.toLowerCase() +
    (el.id ? `#${el.id}` : "") +
    (typeof el.className === "string" && el.className.trim()
      ? `.${el.className.trim().split(/\s+/)[0]}`
      : "");
  // Een element dat tijdens het tabben verschijnt (een skiplink, een menu)
  // heeft geen rusttoestand om tegen af te zetten.
  if (nummer === null) return { naam, onbekend: true };
  const nu = window.__focus.afdruk(el);
  return { naam, nummer: Number(nummer), zichtbaar: nu !== window.__focus.rust[Number(nummer)] };
}

/**
 * Tab door een geladen pagina en geef de elementen terug die bij focus niet
 * zichtbaar veranderen.
 */
async function toetsPagina(page, maxTabs = MAX_TABS) {
  const aantal = await page.evaluate(legRustVast);
  if (aantal === 0) return { aantal: 0, stil: [], rondgelopen: true };

  const stil = [];
  const gezien = new Set();
  let rondgelopen = false;

  for (let i = 0; i < maxTabs; i++) {
    await page.keyboard.press("Tab");
    const uitslag = await page.evaluate(meetActief);
    if (uitslag.buiten || uitslag.onbekend) continue;
    if (gezien.has(uitslag.nummer)) {
      rondgelopen = true;
      break;
    }
    gezien.add(uitslag.nummer);
    if (!uitslag.zichtbaar && !stil.includes(uitslag.naam)) stil.push(uitslag.naam);
  }

  return { aantal, stil, rondgelopen };
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
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    for (const route of routes) {
      try {
        await page.goto(baseUrl + route, { waitUntil: "load" });
        await page.evaluate(() => document.fonts.ready);
        const { stil } = await toetsPagina(page);
        if (stil.length > 0) {
          bevindingen.set(route, stil.slice(0, MAX_VOORBEELDEN));
        }
      } catch (err) {
        // Een pagina die niet te meten is, mag niet als goedgekeurd gelden.
        bevindingen.set(route, [`niet te meten: ${err.message.split("\n")[0]}`]);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  let total = 0;
  for (const [route, regels] of [...bevindingen].sort()) {
    console.error(`\n${route}`);
    for (const regel of regels) console.error(`  ✗ geen zichtbare focus: ${regel}`);
    total += regels.length;
  }

  if (total > 0) {
    console.error(`\n${total} element(en) zonder zichtbare focus op ${routes.length} pagina('s).`);
    process.exit(1);
  }

  console.log(`Elk element met focus is zichtbaar op ${routes.length} pagina('s).`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("Fout bij toetsen van de focus:", err.message);
    process.exit(1);
  });
}

export { toetsPagina, legRustVast, meetActief, MAX_TABS };
