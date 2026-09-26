#!/usr/bin/env node

/**
 * Toets de bedienbaarheid van presentaties: Reveal.js en de layout nldd-deck.
 *
 * pa11y bereikt hier alleen de zichtbare slide en axe kan het contrast niet
 * berekenen, maar het gedrag is wél te meten: navigeren met het toetsenbord,
 * de aankondiging van een slidewissel, en of de focus de presentatie weer
 * verlaat. Wat overblijft voor handwerk is of dat ook prettig klinkt.
 *
 * Bij nldd-deck draait axe daarnaast op elke dia, omdat pa11y alleen de
 * eerste ziet.
 *
 * Gebruik:
 *   node scripts/a11y/presentaties.js [outputmap]
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { collectRoutes } from "./routes.js";
import { presentatieSoort } from "./regels.js";
import { startServer } from "../lib/static-server.js";
import { PUPPETEER_ARGS } from "../lib/puppeteer-args.js";

const OUTPUT_DIR = resolve(process.cwd(), process.argv[2] || join("tmp", "public"));
const MAX_TABS = 20;
const AXE = join(dirname(fileURLToPath(import.meta.resolve("axe-core"))), "axe.min.js");
const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

function presentatieRoutes(root) {
  return collectRoutes(root).flatMap((route) => {
    if (!route.endsWith("/")) return [];
    const file = join(root, route, "index.html");
    const soort = existsSync(file) ? presentatieSoort(readFileSync(file, "utf-8")) : null;
    return soort ? [{ route, soort }] : [];
  });
}

async function toetsReveal(page, baseUrl, route) {
  const findings = [];
  await page.goto(baseUrl + route, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => window.Reveal?.isReady?.(), { timeout: 15000 });

  const knop = await page.$(".close-button");
  if (!knop) {
    findings.push("geen sluitknop gevonden");
  } else {
    const tabIndex = await knop.evaluate((b) => b.tabIndex);
    // De naam uit de toegankelijkheidsboom, niet uit het attribuut: zo telt
    // ook de terugval op tekstinhoud mee zoals de browser die berekent.
    const naam = (await page.accessibility.snapshot({ root: knop }))?.name ?? "";
    if (tabIndex < 0) findings.push("sluitknop is niet met het toetsenbord bereikbaar");
    // Een icoon als ✕ levert wel een naam op, maar geen die iets zegt.
    else if (!/\p{L}/u.test(naam)) {
      findings.push(`sluitknop heeft geen tekstuele naam (nu: "${naam}")`);
    }
  }

  const lees = () =>
    page.evaluate(() => document.querySelector("[aria-live]")?.textContent.trim() ?? null);
  const voor = await lees();
  if (voor === null) findings.push("geen live region; een slidewissel wordt niet aangekondigd");

  const slideVoor = await page.evaluate(() => window.Reveal.getState());
  await page.keyboard.press("ArrowRight");
  await page.waitForFunction(
    (s) => JSON.stringify(window.Reveal.getState()) !== JSON.stringify(s),
    { timeout: 5000 },
    slideVoor
  ).catch(() => findings.push("pijltje rechts wisselt niet van slide"));

  // Reveal werkt de live region net ná de state-wissel bij, dus erop wachten.
  if (voor !== null) {
    await page
      .waitForFunction(
        (t) => document.querySelector("[aria-live]")?.textContent.trim() !== t,
        { timeout: 5000 },
        voor
      )
      .catch(() => findings.push("live region verandert niet bij een slidewissel"));
  }

  // Blijft de focus in de presentatie hangen?
  const gezien = [];
  for (let i = 0; i < MAX_TABS; i++) {
    await page.keyboard.press("Tab");
    gezien.push(await page.evaluate(() => document.activeElement?.tagName ?? "geen"));
  }
  if (!gezien.includes("BODY")) {
    findings.push(`focus verlaat de presentatie niet binnen ${MAX_TABS} tabs`);
  }

  return findings;
}

async function toetsNlddDeck(page, baseUrl, route) {
  const findings = [];
  // Zonder overgangen meet axe het contrast niet halverwege een fade
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(baseUrl + route, { waitUntil: "networkidle0" });
  await page.waitForFunction(
    () => customElements.get("nldd-icon-button") && document.querySelector(".slide:not([hidden])"),
    { timeout: 15000 }
  );

  // De naam uit de toegankelijkheidsboom: de knop zelf zit in de shadow DOM
  const knoppen = [];
  (function verzamel(node) {
    if (!node) return;
    if (node.role === "button") knoppen.push(node.name ?? "");
    (node.children ?? []).forEach(verzamel);
  })(await page.accessibility.snapshot());
  if (!knoppen.some((naam) => /sluit/i.test(naam))) {
    findings.push(`geen sluitknop met een tekstuele naam (knoppen: ${knoppen.join(", ") || "geen"})`);
  }

  const lees = () =>
    page.evaluate(() => document.querySelector("[aria-live]")?.textContent.trim() ?? null);
  const zichtbareDia = () =>
    page.evaluate(() => [...document.querySelectorAll(".slide")].findIndex((s) => !s.hidden));

  const voor = await lees();
  if (voor === null) findings.push("geen live region; een diawissel wordt niet aangekondigd");

  const diaVoor = await zichtbareDia();
  await page.keyboard.press("ArrowRight");
  await page
    .waitForFunction(
      (i) => [...document.querySelectorAll(".slide")].findIndex((s) => !s.hidden) !== i,
      { timeout: 5000 },
      diaVoor
    )
    .catch(() => findings.push("pijltje rechts wisselt niet van dia"));
  if (voor !== null) {
    await page
      .waitForFunction(
        (t) => document.querySelector("[aria-live]")?.textContent.trim() !== t,
        { timeout: 5000 },
        voor
      )
      .catch(() => findings.push("live region verandert niet bij een diawissel"));
  }

  // Is de sluitknop met Tab te bereiken, en verlaat de focus de presentatie?
  const gezien = [];
  for (let i = 0; i < MAX_TABS; i++) {
    await page.keyboard.press("Tab");
    gezien.push(
      await page.evaluate(() => {
        const el = document.activeElement;
        return el?.closest?.("[data-close]") ? "SLUITKNOP" : (el?.tagName ?? "geen");
      })
    );
  }
  if (!gezien.includes("SLUITKNOP")) findings.push("sluitknop is niet met het toetsenbord bereikbaar");
  if (!gezien.includes("BODY")) {
    findings.push(`focus verlaat de presentatie niet binnen ${MAX_TABS} tabs`);
  }

  // axe op elke dia, in leesmodus zodat alle onderdelen zichtbaar zijn
  await page.addScriptTag({ path: AXE });
  const aantal = await page.evaluate(() => document.querySelectorAll(".slide").length);
  for (let n = 0; n < aantal; n++) {
    await page.evaluate((i) => { location.hash = `#/${i}`; }, n);
    await page.waitForFunction((i) => !document.querySelectorAll(".slide")[i].hidden, { timeout: 5000 }, n);
    const overtredingen = await page.evaluate(
      async (i, tags) => {
        const uitslag = await window.axe.run(document.querySelectorAll(".slide")[i], {
          runOnly: { type: "tag", values: tags },
        });
        return uitslag.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length}×)`);
      },
      n,
      WCAG
    );
    for (const o of overtredingen) findings.push(`dia ${n + 1}: ${o}`);
  }

  // Reflow (WCAG 1.4.10): op 320px breed geen horizontaal scrollen
  const viewport = page.viewport();
  await page.setViewport({ width: 320, height: 640 });
  await page.goto(baseUrl + route, { waitUntil: "networkidle0" });
  const breed = await page.evaluate(() => {
    const w = document.documentElement.clientWidth;
    return [...document.querySelectorAll(".slide *")]
      .filter((el) => el.getBoundingClientRect().right > w + 1)
      .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join(".")}`);
  });
  if (breed.length > 0) {
    findings.push(`op 320px breed vallen ${breed.length} element(en) buiten beeld, bijvoorbeeld ${breed[0]}`);
  }
  await page.setViewport(viewport);

  return findings;
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    console.error(`Outputmap ${OUTPUT_DIR} bestaat niet. Bouw de site eerst.`);
    process.exit(1);
  }

  const routes = presentatieRoutes(OUTPUT_DIR);
  if (routes.length === 0) {
    console.log("Geen presentaties gevonden.");
    return;
  }

  const server = await startServer(OUTPUT_DIR);
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({ args: PUPPETEER_ARGS });
  let total = 0;

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 900 });

    for (const { route, soort } of routes) {
      const findings = soort === "reveal"
        ? await toetsReveal(page, baseUrl, route)
        : await toetsNlddDeck(page, baseUrl, route);
      if (findings.length === 0) continue;
      console.error(`\n${route}`);
      for (const f of findings) console.error(`  ✗ ${f}`);
      total += findings.length;
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (total > 0) {
    console.error(`\n${total} bevinding(en) in ${routes.length} presentatie(s).`);
    process.exit(1);
  }

  console.log(`Bedienbaarheid in orde in ${routes.length} presentatie(s).`);
}

main().catch((err) => {
  console.error("Fout bij toetsen van presentaties:", err.message);
  process.exit(1);
});
