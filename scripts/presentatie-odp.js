#!/usr/bin/env node

/**
 * Zet een geëxporteerde nldd-deck-presentatie (zie presentatie-export.js) om
 * naar een OpenDocument-presentatie. Elke opbouwstap wordt een eigen dia, als
 * beeld, met de sprekersnotities erbij. De tekst is in het .odp-bestand dus
 * niet te bewerken.
 *
 * Gebruik:
 *   node scripts/presentatie-odp.js <geëxporteerde index.html> [map of bestand]
 *
 * Zonder map of bestand komt <slug>.odp in de huidige map.
 */

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";
import { PUPPETEER_ARGS } from "./lib/puppeteer-args.js";
import { bouwOdp, uitvoerPad } from "./odp/odp.js";

const [invoer, doel] = process.argv.slice(2);
if (!invoer) {
  console.error("Gebruik: node scripts/presentatie-odp.js <geëxporteerde index.html> [map of bestand]");
  process.exit(2);
}
const uitvoer = uitvoerPad(doel, basename(dirname(resolve(invoer))));
if (!existsSync(invoer)) {
  console.error(`Geen export gevonden op ${invoer}. Draai eerst just presentatie-export.`);
  process.exit(1);
}

// Een vol scherm; deviceScaleFactor 2 houdt de tekst scherp op een 4K-beamer
const VIEWPORT = { width: 1920, height: 1080, deviceScaleFactor: 2 };

const browser = await puppeteer.launch({ args: PUPPETEER_ARGS });
try {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  await page.goto(`${pathToFileURL(resolve(invoer)).href}?presentatie#/1`, { waitUntil: "networkidle0" });
  // Bediening weg, de footertekst blijft
  await page.addStyleTag({ content: ".deck-footer > :not(.footer-text), .progress, .deck-melding { display: none !important; }" });
  await page.evaluate(() => document.fonts.ready);

  const rust = () =>
    page.evaluate(async () => {
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {})));
    });

  const titel = await page.title();
  const stappen = [];
  let vorige = "";
  for (;;) {
    await rust();
    const stand = await page.evaluate(() => {
      const index = Number(location.hash.match(/^#\/(\d+)/)?.[1] ?? 1);
      const slide = document.querySelectorAll(".slide")[index - 1];
      const getoond = slide.querySelectorAll("[data-step].is-shown").length;
      // De alt-tekst: wat in deze stap te zien is, met de alt- en aria-teksten
      const kopie = slide.cloneNode(true);
      kopie
        .querySelectorAll(".notes, .print-footer, [aria-hidden=true], .step-reveal[data-step]:not(.is-shown)")
        .forEach((el) => el.remove());
      kopie.querySelectorAll("[role=img][aria-label]").forEach((el) => { el.textContent = el.getAttribute("aria-label"); });
      kopie.querySelectorAll("img").forEach((el) => el.replaceWith(el.alt));
      kopie.querySelectorAll("*").forEach((el) => el.append(" "));
      return {
        index,
        sleutel: `${index}:${getoond}`,
        label: slide.getAttribute("aria-label") || `Dia ${index}`,
        beschrijving: kopie.textContent.replace(/\s+/g, " ").trim(),
        notities: [...slide.querySelectorAll(".notes p")].map((p) => p.textContent.replace(/\s+/g, " ").trim()),
      };
    });
    if (stand.sleutel === vorige) break;
    vorige = stand.sleutel;
    stappen.push({ ...stand, png: Buffer.from(await page.screenshot({ type: "png" })) });
    await page.keyboard.press("ArrowRight");
  }

  const dias = stappen.map((s, i) => {
    const vanDezeDia = stappen.filter((t) => t.index === s.index);
    const stap = vanDezeDia.indexOf(s) + 1;
    return {
      naam: `${s.index}. ${s.label}${vanDezeDia.length > 1 ? ` (stap ${stap} van ${vanDezeDia.length})` : ""}`,
      titel: s.label,
      beschrijving: s.beschrijving,
      notities: s.notities,
      png: s.png,
      overgang: stap > 1,
    };
  });

  mkdirSync(dirname(uitvoer), { recursive: true });
  writeFileSync(uitvoer, bouwOdp(dias, titel));
  const aantal = new Set(stappen.map((s) => s.index)).size;
  console.log(`${uitvoer}: ${aantal} dia's in ${dias.length} opbouwstappen`);
} finally {
  await browser.close();
}
