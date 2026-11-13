#!/usr/bin/env node

/**
 * Draai alle toegankelijkheidstoetsen tegelijk op de gebouwde site. In CI
 * verdeelt test.yml ze over drie runners.
 *
 * Gebruik:
 *   node scripts/a11y/alles.js [outputmap]
 */

import { spawn } from "node:child_process";
import { join } from "node:path";

const TOETSEN = ["controleer", "svg", "reflow", "focus", "presentaties", "run"];

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

const geslaagd = await Promise.all(TOETSEN.map(draai));
const gefaald = TOETSEN.filter((_, i) => !geslaagd[i]);
if (gefaald.length > 0) {
  console.error(`\nGefaald: ${gefaald.map((n) => `${n}.js`).join(", ")}`);
  process.exit(1);
}
