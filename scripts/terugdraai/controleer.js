#!/usr/bin/env node

/**
 * Controleert of een bestand dat klaarstaat om te committen terug op een
 * oudere versie uit de historie staat. Draait als pre-commit hook (lefthook).
 *
 * Zo verdwenen in #261 vier gemergede fixes: de inhoud kwam uit een werkmap
 * van een dag eerder, dus git zag een nette wijziging en niemand een revert.
 *
 * Overslaan: LEFTHOOK_EXCLUDE=stille-terugdraai git commit
 */

import { execFileSync } from "node:child_process";
import { checkTerugdraai } from "./regels.js";

/** Hoeveel versies per bestand we terugkijken. */
const DIEPTE = 200;

function git(args, input) {
  return execFileSync("git", args, { encoding: "utf8", input, maxBuffer: 64 * 1024 * 1024 });
}

/** Geeft per `<commit>:<pad>` de blob-id, in dezelfde volgorde. */
function blobIds(verwijzingen) {
  if (verwijzingen.length === 0) return [];
  const uitvoer = git(["cat-file", "--batch-check"], verwijzingen.join("\n") + "\n");
  return uitvoer
    .split("\n")
    .filter(Boolean)
    .map((regel) => {
      // "<blob-id> blob <grootte>", of "<verwijzing> missing" als die versie
      // van het bestand niet bestaat.
      const [id, soort] = regel.split(" ");
      return soort === "blob" ? id : null;
    });
}

// Alleen gewijzigde bestanden: bij een toevoeging of hernoeming zegt de
// historie van dat pad niets over wat er nu klaarstaat.
const bestanden = git(["diff", "--cached", "--name-only", "--diff-filter=M"])
  .split("\n")
  .filter(Boolean);

if (bestanden.length === 0) process.exit(0);

const perBestand = {};

for (const pad of bestanden) {
  const commits = git([
    "log",
    `--max-count=${DIEPTE}`,
    "--format=%H%x09%h%x09%ad%x09%s",
    "--date=short",
    "--",
    pad,
  ])
    .split("\n")
    .filter(Boolean)
    .map((regel) => {
      const [sha, kort, datum, onderwerp] = regel.split("\t");
      return { sha, kort, datum, onderwerp };
    });

  const ids = blobIds([`:${pad}`, `HEAD:${pad}`, ...commits.map((c) => `${c.sha}:${pad}`)]);
  const [klaar, huidig, ...historie] = ids;
  if (!klaar || !huidig) continue;

  perBestand[pad] = {
    klaar,
    huidig,
    geschiedenis: commits
      .map((commit, i) => ({ ...commit, blob: historie[i] }))
      .filter((versie) => versie.blob),
  };
}

const findings = checkTerugdraai(perBestand);

if (findings.length > 0) {
  console.error("Inhoud staat terug op een oudere versie:\n");
  for (const finding of findings) console.error(`  ${finding}`);
  console.error(
    "\nCommit je uit een verouderde werkmap? Haal de wijzigingen van daarna erbij.\n" +
      "Is het een bedoelde terugdraai: LEFTHOOK_EXCLUDE=stille-terugdraai git commit"
  );
  process.exit(1);
}

console.log(`Geen teruggedraaide inhoud (${bestanden.length} gewijzigd bestand(en)).`);
