#!/usr/bin/env node

/**
 * Controleer de gebouwde site op constructies die de CSP blokkeert.
 *
 * Draait NA de Hugo-build op de outputmap (standaard `tmp/public`). Leest de
 * policy uit de nginx-configuratie in container/, zodat deze controle meebeweegt
 * als die policy verandert.
 *
 * Gebruik:
 *   node scripts/csp/check.js [outputmap]
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, relative, sep } from "node:path";
import { parseCsp, blockedSources, findViolations } from "./checks.js";

const OUTPUT_DIR = resolve(process.cwd(), process.argv[2] || join("tmp", "public"));
const CONF_DIR = resolve(import.meta.dirname, "..", "..", "container");

/** Alle nginx-configuratie samen; in welk bestand de policy staat maakt niet uit. */
function nginxConfig() {
  return readdirSync(CONF_DIR)
    .filter((name) => name.endsWith(".conf"))
    .map((name) => readFileSync(join(CONF_DIR, name), "utf-8"))
    .join("\n");
}

function htmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function main() {
  if (!existsSync(OUTPUT_DIR)) {
    console.error(`Outputmap ${OUTPUT_DIR} bestaat niet. Bouw de site eerst.`);
    process.exit(1);
  }

  const directives = parseCsp(nginxConfig());
  if (!directives) {
    console.error(`Geen Content-Security-Policy gevonden in ${CONF_DIR}.`);
    process.exit(1);
  }

  const kinds = blockedSources(directives);
  const files = htmlFiles(OUTPUT_DIR);

  if (kinds.length === 0) {
    console.log("De policy staat inline content toe; niets te controleren.");
    return;
  }

  let total = 0;
  for (const file of files) {
    const findings = findViolations(readFileSync(file, "utf-8"), kinds);
    if (findings.length === 0) continue;

    console.error(`\n/${relative(OUTPUT_DIR, file).split(sep).join("/")}`);
    for (const { label, fragment } of findings) {
      console.error(`  ✗ ${label}: ${fragment}`);
    }
    total += findings.length;
  }

  if (total > 0) {
    console.error(
      `\n${total} constructie(s) die de browser negeert onder de policy in ` +
        `container/default.conf.`
    );
    process.exit(1);
  }

  console.log(`Geen door de CSP geblokkeerde constructies in ${files.length} pagina('s).`);
}

main();
