/**
 * Verzamel de te toetsen routes uit een Hugo-outputmap: elke map met een
 * `index.html`, plus losse HTML-bestanden in de root (zoals `404.html`).
 * Aliassen vallen af.
 */

import { readdirSync, existsSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

/** Hugo-aliassen zijn doorverwijzingen zonder inhoud; die toetsen we niet. */
function isAlias(file) {
  return readFileSync(file, "utf-8").includes('http-equiv="refresh"');
}

/** Geeft gesorteerde routes ("/", "/handboek/", "/404.html") uit `root`. */
function collectRoutes(root) {
  const routes = [];

  function walk(dir) {
    const index = join(dir, "index.html");
    if (existsSync(index) && !isAlias(index)) {
      const rel = relative(root, dir).split(sep).join("/");
      routes.push(rel ? `/${rel}/` : "/");
    }
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(join(dir, entry.name));
    }
  }

  walk(root);

  // Losse HTML-bestanden in de root; index.html is al gedekt als route "/".
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (
      entry.isFile() &&
      entry.name.endsWith(".html") &&
      entry.name !== "index.html" &&
      !isAlias(join(root, entry.name))
    ) {
      routes.push(`/${entry.name}`);
    }
  }

  return routes.sort();
}

export { collectRoutes };
