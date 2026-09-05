#!/usr/bin/env node

/**
 * Draai de controles uit checks.js over de gebouwde site.
 *
 * Gebruik:
 *   node scripts/a11y/check.js [outputmap]
 */

import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { collectRoutes } from "./routes.js";
import { checkHeadingOrder, checkDiagramAlt } from "./checks.js";

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
    const html = readFileSync(pageFile(route), "utf-8");
    // Licht- en donkervariant delen dezelfde alt-tekst.
    const findings = [...new Set([...checkHeadingOrder(html), ...checkDiagramAlt(html)])];

    if (findings.length > 0) {
      console.error(`\n${route}`);
      for (const finding of findings) console.error(`  ✗ ${finding}`);
      total += findings.length;
    }
  }

  if (total > 0) {
    console.error(`\n${total} bevinding(en) op ${routes.length} pagina('s).`);
    process.exit(1);
  }

  console.log(`Koppenstructuur en diagram-alt in orde op ${routes.length} pagina('s).`);
}

main();
