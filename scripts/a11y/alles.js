#!/usr/bin/env node

/**
 * Draai alle toegankelijkheidstoetsen op de gebouwde site.
 *
 * pa11y (run.js) toetst zelf al vier pagina's tegelijk; meer toetsen naast
 * pa11y maakt het op een runner met vier cores niet sneller.
 *
 * Gebruik:
 *   node scripts/a11y/alles.js [outputmap]
 */

import { spawn } from "node:child_process";
import { join } from "node:path";

const RIJEN = [["run"], ["controleer", "svg", "reflow", "focus", "presentaties"]];

function draai(naam) {
  return new Promise((done) => {
    const uitvoer = [];
    const kind = spawn(process.execPath, [join(import.meta.dirname, `${naam}.js`), ...process.argv.slice(2)], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    kind.stdout.on("data", (d) => uitvoer.push(d));
    kind.stderr.on("data", (d) => uitvoer.push(d));
    kind.on("close", (code) => {
      process.stdout.write(`── ${naam}.js ${"─".repeat(40)}\n`);
      process.stdout.write(Buffer.concat(uitvoer));
      done(code === 0);
    });
  });
}

const gefaald = [];
await Promise.all(
  RIJEN.map(async (rij) => {
    for (const naam of rij) if (!(await draai(naam))) gefaald.push(naam);
  })
);
if (gefaald.length > 0) {
  console.error(`\nGefaald: ${gefaald.map((n) => `${n}.js`).join(", ")}`);
  process.exit(1);
}
