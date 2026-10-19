// Zoekt een bestand in de gebouwde site. Statische bestanden van het project en
// van het theme staan daar naast elkaar, dus de post-build scripts hoeven niet
// te weten uit welke van de twee ze komen.

import { existsSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

// `vanaf` is een map binnen `outputDir`. Bij een site die onder een pad staat
// (outputDir/moza/website/...) ligt de siteroot boven die map, dus het zoeken
// loopt van `vanaf` omhoog tot `outputDir`.
export function zoekInBuild(outputDir, rel, vanaf = outputDir) {
  const top = resolve(outputDir);
  let dir = resolve(vanaf);
  while (!relative(top, dir).startsWith("..")) {
    const pad = join(dir, rel);
    if (existsSync(pad)) return pad;
    if (dir === top) break;
    dir = dirname(dir);
  }
  throw new Error(`${rel} staat niet in de gebouwde site (${top}). Draai eerst de Hugo-build.`);
}
