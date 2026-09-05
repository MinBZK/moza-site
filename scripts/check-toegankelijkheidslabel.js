#!/usr/bin/env node

// Bewaakt of het toegankelijkheidslabel bij de bron is gewijzigd. Het label
// zelf staat in de repo, zodat de build geen netwerk nodig heeft.
//
// Bron onbereikbaar of stuk (5xx) -> geen oordeel, exit 0.
// Bron weg (404/410)              -> exit 1; de verklaring is vermoedelijk vervangen.
// Ongewijzigd                     -> exit 0.
// Gewijzigd                       -> exit 1; bijwerken met `npm run check-label -- --update`.

import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const BRON =
  'https://www.toegankelijkheidsverklaring.nl/files/verklaring/label/9c3b703121c7d4ad1aeff1c0ef843267.29880.svg';
const DOEL = fileURLToPath(new URL('../assets/images/toegankelijkheidslabel.svg', import.meta.url));
const TIMEOUT_MS = 15000;

const hash = (data) => createHash('sha256').update(data).digest('hex');

const lokaal = await readFile(DOEL).catch(() => null);
if (lokaal === null) {
  console.error(`Label ontbreekt: ${DOEL}`);
  console.error('Haal het op met: npm run check-label -- --update');
  process.exit(1);
}

let bron;
try {
  const antwoord = await fetch(BRON, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (antwoord.status === 404 || antwoord.status === 410) {
    console.error(`Bron geeft HTTP ${antwoord.status}: ${BRON}`);
    console.error('De verklaring is vermoedelijk vervangen. Zoek de nieuwe label-URL op');
    console.error('https://www.toegankelijkheidsverklaring.nl/register/28557 en pas BRON aan.');
    process.exit(1);
  }
  if (!antwoord.ok) {
    console.warn(`Bron gaf HTTP ${antwoord.status}, controle overgeslagen.`);
    process.exit(0);
  }
  bron = Buffer.from(await antwoord.arrayBuffer());
} catch (fout) {
  console.warn(`Bron niet bereikbaar (${fout.message}), controle overgeslagen.`);
  process.exit(0);
}

if (hash(bron) === hash(lokaal)) {
  console.log('Toegankelijkheidslabel is ongewijzigd.');
  process.exit(0);
}

if (process.argv.includes('--update')) {
  await writeFile(DOEL, bron);
  console.log(`Toegankelijkheidslabel bijgewerkt (${bron.length} bytes). Controleer en commit het bestand.`);
  process.exit(0);
}

console.error('Het toegankelijkheidslabel is bij de bron gewijzigd.');
console.error(`  bron:   ${BRON}`);
console.error(`  lokaal: ${DOEL}`);
console.error('Bekijk het verschil en werk bij met: npm run check-label -- --update');
process.exit(1);
