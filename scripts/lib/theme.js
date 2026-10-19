// Zoekt een bestand zoals Hugo dat doet: eerst in het project, dan in de
// modules (het theme). Scripts die vóór Hugo draaien kunnen een
// theme-bestand zo vinden zonder te weten waar de module-cache ligt.
//
// MOZA_THEME_DIR wijst naar een lokale kloon van het theme en gaat voor de
// modules uit `hugo config mounts`. Zonder modules, en dus ook zonder Hugo,
// blijft het project over.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const PROJECT_ROOT = resolve(import.meta.dirname, "..", "..");

// `hugo config mounts` schrijft een stroom van JSON-objecten, geen array.
export function parseMountsOutput(text) {
  const objects = [];
  let depth = 0;
  let start = -1;
  let inString = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (ch === "\\") i++;
      else if (ch === '"') inString = false;
    } else if (ch === '"') {
      inString = true;
    } else if (ch === "{") {
      if (depth++ === 0) start = i;
    } else if (ch === "}" && --depth === 0) {
      objects.push(JSON.parse(text.slice(start, i + 1)));
    }
  }
  return objects;
}

// Alle modules behalve het project zelf, in de volgorde van Hugo. Het project
// herken je aan het lege `owner`; `path` is bij een lokale vervanging het pad
// van de map en dus onbruikbaar.
export function moduleEntries(mounts) {
  return mounts.filter((m) => m.owner).map((m) => ({ dir: m.dir, mounts: m.mounts ?? [] }));
}

function hugoMounts(cwd) {
  try {
    return execFileSync("hugo", ["config", "mounts"], { cwd, encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] });
  } catch (err) {
    throw new Error(`'hugo config mounts' faalt (${err.code ?? err.status ?? err.message}); is Hugo geïnstalleerd en zijn de modules opgehaald?`);
  }
}

// Het pad van `rel` binnen een module, volgens de mounts van die module.
// Een module zonder mounts (MOZA_THEME_DIR) levert het pad één op één.
function inModule(entry, rel) {
  if (!entry.mounts.length) return [join(entry.dir, rel)];
  const kandidaten = [];
  for (const { source, target } of entry.mounts) {
    if (rel === target || rel.startsWith(`${target}/`)) {
      kandidaten.push(join(entry.dir, source, rel.slice(target.length)));
    }
  }
  return kandidaten;
}

export function createResolver({ root = PROJECT_ROOT, env = process.env, mountsText = () => hugoMounts(root) } = {}) {
  let entries;

  function modules() {
    if (!entries) {
      entries = env.MOZA_THEME_DIR
        ? [{ dir: resolve(env.MOZA_THEME_DIR), mounts: [] }]
        : moduleEntries(parseMountsOutput(mountsText()));
    }
    return entries;
  }

  // Het absolute pad van `rel` (relatief aan de projectroot, met `/`), of een
  // fout die zegt waar is gezocht. Hugo wordt pas gestart als het project het
  // bestand niet heeft.
  return function resolveThemeFile(rel) {
    const inProject = join(root, rel);
    if (existsSync(inProject)) return inProject;
    const gezocht = [inProject];
    for (const entry of modules()) {
      for (const pad of inModule(entry, rel)) {
        if (existsSync(pad)) return pad;
        gezocht.push(pad);
      }
    }
    throw new Error(
      `${rel} niet gevonden in het project of in een Hugo-module. Gezocht in:\n  ${gezocht.join("\n  ")}\n` +
        "Haal de modules op met 'hugo mod get' of zet MOZA_THEME_DIR.",
    );
  };
}

export const resolveThemeFile = createResolver();
