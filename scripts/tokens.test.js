import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { parseTokens, resolveToken } from "./render-mermaid.js";
import { resolveThemeFile } from "./lib/theme.js";

const ROOT = join(import.meta.dirname, "..");

// Tokenbestanden die naar NLDD-primitives verwijzen. Een hernoemde primitive
// (bijvoorbeeld na een upgrade van @nldd/design-system) valt anders stil terug
// op niets: de browser negeert de declaratie en de kleur verdwijnt.
const TOKEN_FILES = [
  resolveThemeFile("assets/css/tokens.css"),
  join(ROOT, "assets/css/pagina/rapportages.css"),
  join(ROOT, "assets/css/pagina/rapportage-nav.css"),
];
const PRIMITIVES_FILE = resolveThemeFile("assets/css/nldd-primitives.css");

function definedNames(css) {
  return new Set([...css.matchAll(/(--[\w-]+):/g)].map((m) => m[1]));
}

function referencedNames(css) {
  return [...css.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]);
}

const primitives = definedNames(readFileSync(PRIMITIVES_FILE, "utf-8"));

describe("tokens verwijzen naar bestaande primitives", () => {
  for (const file of TOKEN_FILES) {
    it(relative(ROOT, file), () => {
      const css = readFileSync(file, "utf-8");
      const local = definedNames(css);
      const missing = referencedNames(css).filter((name) => name.startsWith("--primitives-") && !primitives.has(name) && !local.has(name));
      assert.deepEqual([...new Set(missing)], [], `onbekende primitives in ${file}`);
    });
  }
});

// Een token dat nergens bestaat maakt de declaratie ongeldig, zodat de
// eigenschap stil terugvalt op zijn beginwaarde (bijvoorbeeld een doorzichtige
// achtergrond).
describe("kleurtokens die de CSS gebruikt bestaan", () => {
  it("elke var(--color-*) heeft een definitie", () => {
    const cssDir = join(ROOT, "assets", "css");
    const bestanden = readdirSync(cssDir, { recursive: true })
      .filter((f) => f.endsWith(".css"))
      .map((f) => join(cssDir, f));
    bestanden.push(resolveThemeFile("assets/css/tokens.css"));
    const defined = new Set();
    const used = new Map();
    for (const file of bestanden) {
      const css = readFileSync(file, "utf-8");
      for (const name of definedNames(css)) defined.add(name);
      for (const name of referencedNames(css)) if (name.startsWith("--color-")) used.set(name, relative(ROOT, file));
    }
    const missing = [...used].filter(([name]) => !defined.has(name)).map(([name, file]) => `${name} (${file})`);
    assert.deepEqual(missing, []);
  });
});

describe("kleurtokens van de site resolven naar een kleur", () => {
  const vars = parseTokens();
  const colorTokens = Object.keys(vars).filter((name) => name.startsWith("--color-"));

  it("er zijn kleurtokens", () => {
    assert.ok(colorTokens.length > 5, "verwacht kleurtokens in tokens.css");
  });

  for (const name of colorTokens) {
    it(name, () => {
      for (const variant of ["light", "dark"]) {
        const value = resolveToken(vars, name, variant);
        assert.doesNotMatch(value, /var\(/, `${name} (${variant}) bevat nog een var(): ${value}`);
        assert.ok(value.length > 0, `${name} (${variant}) is leeg`);
      }
    });
  }
});
