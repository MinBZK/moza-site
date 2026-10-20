#!/usr/bin/env node

/**
 * Controleer de inline SVG's in de gebouwde site op vormelementen die open
 * zijn gebleven, zie checkSvgGesloten in regels.js.
 *
 * Gebruik:
 *   node scripts/a11y/svg.js [outputmap]
 */

import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { collectRoutes } from "./routes.js";
import { checkSvgGesloten } from "./regels.js";

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
    const findings = checkSvgGesloten(readFileSync(pageFile(route), "utf-8"));

    if (findings.length > 0) {
      console.error(`\n${route}`);
      for (const finding of findings) console.error(`  ✗ ${finding}`);
      total += findings.length;
    }
  }

  if (total > 0) {
    console.error(
      `\n${total} niet-gesloten SVG-element(en) op ${routes.length} pagina('s). ` +
        "Meestal zit er een geneste <svg> in de tekening; teken die als " +
        '<g transform="translate(..) scale(..)">.'
    );
    process.exit(1);
  }

  console.log(`Geen niet-gesloten SVG-elementen op ${routes.length} pagina('s).`);
}

main();
