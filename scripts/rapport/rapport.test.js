import { test } from "node:test";
import assert from "node:assert/strict";
import { checkVersiebump } from "./regels.js";

const RAPPORT = "content/documenten/toegankelijkheid/onderzoek-2026.md";

test("versiebump: een gewijzigd rapport zonder nieuw versienummer wordt gemeld", () => {
  const findings = checkVersiebump({ [RAPPORT]: "+Een nieuwe zin.\n-Een oude zin." });
  assert.equal(findings.length, 1);
  assert.match(findings[0], /versienummer/);
});

test("versiebump: een gewijzigde versieregel is genoeg", () => {
  const diff = "+Een nieuwe zin.\n+| Versie van dit rapport | 1.1, 1 oktober 2026 |\n-| Versie van dit rapport | 1.0, 27 september 2026 |";
  assert.deepEqual(checkVersiebump({ [RAPPORT]: diff }), []);
});

test("versiebump: een verwijderde versieregel telt niet als bump", () => {
  const diff = "-| Versie van dit rapport | 1.0, 27 september 2026 |";
  assert.equal(checkVersiebump({ [RAPPORT]: diff }).length, 1);
});

test("versiebump: een rapport van een ander jaar valt onder dezelfde regel", () => {
  const pad = "content/documenten/toegankelijkheid/onderzoek-2029.md";
  assert.equal(checkVersiebump({ [pad]: "+tekst" }).length, 1);
});

test("versiebump: andere content blijft buiten schot", () => {
  assert.deepEqual(checkVersiebump({ "content/weekly/2026/2026-09-23.md": "+tekst" }), []);
  assert.deepEqual(checkVersiebump({ "content/toegankelijkheid.md": "+tekst" }), []);
});
