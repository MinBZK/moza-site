#!/usr/bin/env node

/**
 * Controleert of een gewijzigd onderzoeksrapport ook een nieuw versienummer
 * krijgt. Draait als pre-commit hook (lefthook) op wat er klaarstaat om te
 * committen.
 */

import { execFileSync } from "node:child_process";
import { checkVersiebump, RAPPORT } from "./regels.js";

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" });
}

const bestanden = git("diff", "--cached", "--name-only", "--diff-filter=ACM")
  .split("\n")
  .filter((pad) => RAPPORT.test(pad));

if (bestanden.length === 0) process.exit(0);

const diffPerBestand = {};
for (const pad of bestanden) {
  diffPerBestand[pad] = git("diff", "--cached", "--unified=0", "--", pad);
}

const findings = checkVersiebump(diffPerBestand);

if (findings.length > 0) {
  console.error("Onderzoeksrapport gewijzigd zonder versiebump:\n");
  for (const finding of findings) console.error(`  ${finding}`);
  console.error("\nZie .claude/rules/toegankelijkheidsrapport.md");
  process.exit(1);
}

console.log(`Versienummer van het rapport bijgewerkt (${bestanden.join(", ")}).`);
