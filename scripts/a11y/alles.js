#!/usr/bin/env node

/**
 * Draai alle toegankelijkheidstoetsen op de gebouwde site, in twee rijen naast
 * elkaar. Binnen een rij draaien de toetsen na elkaar.
 *
 * pa11y (run.js) toetst zelf al vier pagina's tegelijk en heeft een eigen rij.
 * Alles tegelijk is op een runner met vier cores niet sneller: de browsers
 * zitten elkaar dan in de weg.
 *
 * Elke toets start zijn eigen server en browser. De uitvoer van een toets
 * verschijnt pas als hij klaar is, zodat regels van verschillende toetsen niet
 * door elkaar lopen. Faalt er één, dan faalt het geheel; de rij gaat wel door.
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
