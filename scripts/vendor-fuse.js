#!/usr/bin/env node

/**
 * Haalt Fuse.js op van npm en schrijft de ESM-bundel naar
 * assets/vendor/fuse/fuse.min.mjs.
 *
 * Fuse levert sinds versie 7.1 geen browserbundel meer, alleen ESM en
 * CommonJS. De site laadt alles als één klassiek script, dus esbuild maakt er
 * via js.Build een gewoon script van; zie assets/js/fuse-global.js en
 * layouts/_partials/scripts.html.
 *
 * Gebruik: just fuse            (nieuwste versie)
 *          just fuse 7.5.0      (een specifieke versie)
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, copyFileSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DOEL = join(ROOT, "assets", "vendor", "fuse", "fuse.min.mjs");
const versie = process.argv[2] || "latest";

// Wegwerpmap van dit script zelf: hier is rm op zijn plaats, trash zou de
// prullenbak vullen met een uitgepakt npm-pakket.
const tijdelijk = mkdtempSync(join(tmpdir(), "vendor-fuse-"));

try {
  const pakket = execFileSync("npm", ["pack", `fuse.js@${versie}`, "--silent"], {
    cwd: tijdelijk,
    encoding: "utf-8",
  }).trim();

  execFileSync("tar", ["-xzf", pakket], { cwd: tijdelijk });

  const uitgepakt = join(tijdelijk, "package");
  const bundel = join(uitgepakt, "dist", "fuse.min.mjs");
  copyFileSync(bundel, DOEL);

  const { version } = JSON.parse(readFileSync(join(uitgepakt, "package.json"), "utf-8"));
  console.log(`Geschreven: ${DOEL} (Fuse.js ${version})`);
} finally {
  rmSync(tijdelijk, { recursive: true, force: true });
}
