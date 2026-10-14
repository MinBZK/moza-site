#!/usr/bin/env node

/**
 * Controleer of elk beeldbestand ergens gebruikt wordt: in de beeldbank, in
 * assets/ en static/, en in de page bundles onder content/.
 *
 * Kijkt naar de bron, niet naar de gebouwde site: presentaties zijn vaak een
 * draft, en Hugo publiceert beeld uit een bundle ook als niets ernaar verwijst.
 * Alleen bestanden in git tellen mee, zodat de uitkomst lokaal en in de CI
 * gelijk is.
 *
 * Gebruik:
 *   node scripts/beeld/controleer.js
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { BEELD, controleer } from "./regels.js";

const BRONMAPPEN = ["content/", "layouts/", "assets/", "data/", "archetypes/", "static/", "i18n/"];
const TEKST = /\.(md|html|css|js|json|ya?ml|toml|txt|xml)$/i;

const bestanden = execFileSync("git", ["ls-files", "-z"], { encoding: "utf-8" }).split("\0").filter(Boolean);
const beelden = bestanden.filter((pad) => BEELD.test(pad) && BRONMAPPEN.some((map) => pad.startsWith(map)));
const teksten = bestanden
  .filter((pad) => pad === "hugo.yaml" || (TEKST.test(pad) && BRONMAPPEN.some((map) => pad.startsWith(map))))
  .map((pad) => readFileSync(pad, "utf-8"));

const { ongebruikt, overbodig } = controleer(beelden, teksten);

for (const pad of ongebruikt) console.error(`  ✗ ongebruikt: ${pad}`);
for (const pad of overbodig) console.error(`  ✗ negeerlijst: ${pad}`);

if (ongebruikt.length || overbodig.length) {
  if (ongebruikt.length) {
    console.error(`\n${ongebruikt.length} beeldbestand(en) waar niets naar verwijst.`);
    console.error("Verwijder het bestand, of zet het met een reden op NEGEREN in scripts/beeld/regels.js.");
  }
  if (overbodig.length) {
    console.error(`\n${overbodig.length} regel(s) op de negeerlijst zonder reden, voor een bestand dat weer gebruikt wordt, of dat niet meer bestaat.`);
    console.error("Werk NEGEREN in scripts/beeld/regels.js bij.");
  }
  process.exit(1);
}

console.log(`Alle ${beelden.length} beeldbestanden worden gebruikt.`);
