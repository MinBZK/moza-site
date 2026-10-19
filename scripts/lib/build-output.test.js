import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { zoekInBuild } from "./build-output.js";

let root;

before(() => {
  root = mkdtempSync(join(tmpdir(), "build-output-"));
  mkdirSync(join(root, "images"), { recursive: true });
  writeFileSync(join(root, "images", "logo.svg"), "<svg/>");
  mkdirSync(join(root, "sub", "site", "pagina"), { recursive: true });
  mkdirSync(join(root, "sub", "site", "images"), { recursive: true });
  writeFileSync(join(root, "sub", "site", "images", "eigen.svg"), "<svg/>");
});

describe("zoekInBuild", () => {
  it("vindt een bestand in de uitvoermap", () => {
    assert.equal(zoekInBuild(root, "images/logo.svg"), join(root, "images", "logo.svg"));
  });

  it("zoekt vanaf een pagina omhoog naar de siteroot", () => {
    const vanaf = join(root, "sub", "site", "pagina");
    assert.equal(zoekInBuild(root, "images/eigen.svg", vanaf), join(root, "sub", "site", "images", "eigen.svg"));
  });

  it("gaat niet boven de uitvoermap uit", () => {
    const vanaf = join(root, "sub", "site", "pagina");
    assert.throws(() => zoekInBuild(join(root, "sub"), "images/logo.svg", vanaf), /staat niet in de gebouwde site/);
  });

  it("noemt het bestand en de uitvoermap als het ontbreekt", () => {
    assert.throws(() => zoekInBuild(root, "images/weg.svg"), (err) => {
      assert.ok(err.message.includes("images/weg.svg"));
      assert.ok(err.message.includes(root));
      assert.match(err.message, /Hugo-build/);
      return true;
    });
  });
});
