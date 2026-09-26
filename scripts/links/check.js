#!/usr/bin/env node

/**
 * Controleer de gebouwde site op te lange URL's.
 *
 * Draait NA de Hugo-build op de outputmap (standaard `tmp/public`).
 *
 * Gebruik:
 *   node scripts/links/check.js [outputmap]
 */

import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { collectRoutes } from "../a11y/routes.js";
import { checkUrlLengte, MAX_URL } from "./checks.js";

const OUTPUT_DIR = resolve(process.cwd(), process.argv[2] || join("tmp", "public"));

function pageFile(route) {
  return route.endsWith("/") ? join(OUTPUT_DIR, route, "index.html") : join(OUTPUT_DIR, route);
}

function main() {
  if (!existsSync(OUTPUT_DIR)) {
    console.error(`Outputmap ${OUTPUT_DIR} bestaat niet. Bouw de site eerst.`);
    process.exit(1);
  }

  const routes = collectRoutes(OUTPUT_DIR);
  let total = 0;

  for (const route of routes) {
    const findings = [...new Set(checkUrlLengte(readFileSync(pageFile(route), "utf-8")))];
    if (findings.length === 0) continue;
    console.error(`\n${route}`);
    for (const finding of findings) console.error(`  ✗ ${finding}`);
    total += findings.length;
  }

  if (total > 0) {
    console.error(
      `\n${total} te lange URL('s). Word kapt een link af op ${MAX_URL} tekens en meldt het document dan als beschadigd.`
    );
    console.error("Kort de link in, of zet het domein in scripts/links/checks.js op de lijst met uitzonderingen.");
    process.exit(1);
  }

  console.log(`Geen URL's langer dan ${MAX_URL} tekens op ${routes.length} pagina('s).`);
}

main();
