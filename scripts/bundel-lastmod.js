#!/usr/bin/env node

// Hugo kent alleen de git-datum van het inhoudsbestand van een pagina. Dit script
// legt de datum van yaml-bestanden in page bundles vast, zodat de voettekst een
// wijziging in bijvoorbeeld roadmap.yaml meetelt. Draait via prerender-mermaid.

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const DOEL = fileURLToPath(new URL('../data/bundel_lastmod.json', import.meta.url));

// Sleutel is de map zoals Hugo die in .File.Dir geeft: relatief aan content/, met slash aan het eind.
export function nieuwstePerBundel(bestanden) {
  const perBundel = {};
  for (const { pad, datum } of bestanden) {
    if (!datum) continue;
    const bundel = `${posix.relative('content', posix.dirname(pad))}/`;
    const huidig = perBundel[bundel];
    if (!huidig || new Date(datum) > new Date(huidig)) perBundel[bundel] = datum;
  }
  return perBundel;
}

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const paden = git('ls-files', '--', 'content/*.yaml').split('\n').filter(Boolean);
  const bestanden = paden.map((pad) => ({
    pad,
    datum: git('log', '-1', '--format=%aI', '--', pad),
  }));
  mkdirSync(dirname(DOEL), { recursive: true });
  writeFileSync(DOEL, `${JSON.stringify(nieuwstePerBundel(bestanden), null, 2)}\n`);
}
