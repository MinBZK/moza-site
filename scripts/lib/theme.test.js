import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createResolver, moduleEntries, parseMountsOutput, resolveThemeFile } from "./theme.js";

let tmp;
let project;
let theme;

function schrijf(dir, rel, inhoud = "x") {
  const pad = join(dir, rel);
  mkdirSync(join(pad, ".."), { recursive: true });
  writeFileSync(pad, inhoud);
  return pad;
}

function uitvoer(...modules) {
  const projectObj = { path: "project", version: "", owner: "", dir: project, mounts: [{ source: "assets", target: "assets" }] };
  return [projectObj, ...modules].map((m) => JSON.stringify(m, null, 3)).join("\n");
}

before(() => {
  tmp = mkdtempSync(join(tmpdir(), "theme-test-"));
  project = join(tmp, "project");
  theme = join(tmp, "theme");
  mkdirSync(project);
  mkdirSync(theme);
});

describe("parseMountsOutput", () => {
  it("leest een stroom van objecten", () => {
    const objs = parseMountsOutput('{"a": 1}\n{"b": {"c": 2}}\n');
    assert.deepEqual(objs, [{ a: 1 }, { b: { c: 2 } }]);
  });

  it("laat accolades en aanhalingstekens in tekst met rust", () => {
    const objs = parseMountsOutput('{"dir": "/pad/met } {/en \\" quote"}\n{"x": 1}');
    assert.equal(objs[0].dir, '/pad/met } {/en " quote');
    assert.equal(objs.length, 2);
  });

  it("geeft niets terug zonder uitvoer", () => {
    assert.deepEqual(parseMountsOutput(""), []);
  });
});

describe("moduleEntries", () => {
  it("houdt alleen modules over, geen project", () => {
    const mounts = parseMountsOutput(uitvoer({ path: "x/theme", owner: "project", dir: theme, mounts: [] }));
    assert.deepEqual(moduleEntries(mounts), [{ dir: theme, mounts: [] }]);
  });

  it("herkent een lokale vervanging aan owner, niet aan path", () => {
    const mounts = [{ path: theme, owner: "project", dir: theme }];
    assert.equal(moduleEntries(mounts).length, 1);
  });

  it("geeft niets zonder modules", () => {
    assert.deepEqual(moduleEntries(parseMountsOutput(uitvoer())), []);
  });
});

describe("createResolver", () => {
  it("geeft het projectbestand voor het module-bestand", () => {
    const pad = schrijf(project, "assets/css/a.css");
    schrijf(theme, "assets/css/a.css");
    const resolve = createResolver({ root: project, env: {}, mountsText: () => uitvoer({ path: "m", owner: "project", dir: theme, mounts: [] }) });
    assert.equal(resolve("assets/css/a.css"), pad);
  });

  it("start Hugo niet als het project het bestand heeft", () => {
    schrijf(project, "assets/css/b.css");
    const resolve = createResolver({
      root: project,
      env: {},
      mountsText: () => {
        throw new Error("Hugo mag niet draaien");
      },
    });
    assert.ok(resolve("assets/css/b.css"));
  });

  it("valt terug op de module", () => {
    const pad = schrijf(theme, "static/fonts/f.woff2");
    const resolve = createResolver({ root: project, env: {}, mountsText: () => uitvoer({ path: "m", owner: "project", dir: `${theme}/`, mounts: [{ source: "static", target: "static" }] }) });
    assert.equal(resolve("static/fonts/f.woff2"), pad);
  });

  it("volgt de mounts van de module", () => {
    const pad = schrijf(theme, "dist/css/c.css");
    const resolve = createResolver({ root: project, env: {}, mountsText: () => uitvoer({ path: "m", owner: "project", dir: theme, mounts: [{ source: "dist", target: "assets" }] }) });
    assert.equal(resolve("assets/css/c.css"), pad);
  });

  it("neemt de eerste module met het bestand", () => {
    const tweede = join(tmp, "tweede");
    const eerste = schrijf(theme, "assets/css/d.css");
    schrijf(tweede, "assets/css/d.css");
    const resolve = createResolver({
      root: project,
      env: {},
      mountsText: () =>
        uitvoer(
          { path: "m1", owner: "project", dir: theme, mounts: [{ source: "assets", target: "assets" }] },
          { path: "m2", owner: "project", dir: tweede, mounts: [{ source: "assets", target: "assets" }] },
        ),
    });
    assert.equal(resolve("assets/css/d.css"), eerste);
  });

  it("laat MOZA_THEME_DIR voor de modules van Hugo gaan", () => {
    const override = join(tmp, "override");
    const pad = schrijf(override, "assets/css/e.css");
    schrijf(theme, "assets/css/e.css");
    const resolve = createResolver({
      root: project,
      env: { MOZA_THEME_DIR: override },
      mountsText: () => {
        throw new Error("Hugo mag niet draaien");
      },
    });
    assert.equal(resolve("assets/css/e.css"), pad);
  });

  it("zonder modules en zonder bestand: een fout met de zoekpaden", () => {
    const resolve = createResolver({ root: project, env: {}, mountsText: () => uitvoer() });
    assert.throws(() => resolve("assets/css/bestaat-niet.css"), (err) => {
      assert.match(err.message, /assets\/css\/bestaat-niet\.css niet gevonden/);
      assert.match(err.message, /MOZA_THEME_DIR/);
      assert.ok(err.message.includes(project));
      return true;
    });
  });

  it("meldt dat Hugo faalt als het bestand nergens staat", () => {
    const resolve = createResolver({
      root: project,
      env: {},
      mountsText: () => {
        throw new Error("'hugo config mounts' faalt");
      },
    });
    assert.throws(() => resolve("assets/css/f.css"), /hugo config mounts/);
  });

  it("vraagt de mounts maar één keer", () => {
    let aantal = 0;
    const resolve = createResolver({
      root: project,
      env: {},
      mountsText: () => {
        aantal++;
        return uitvoer();
      },
    });
    for (const rel of ["x.css", "y.css"]) assert.throws(() => resolve(rel));
    assert.equal(aantal, 1);
  });
});

describe("resolveThemeFile voor dit project", () => {
  it("vindt tokens.css zonder modules", () => {
    assert.match(resolveThemeFile("assets/css/tokens.css"), /assets\/css\/tokens\.css$/);
  });
});
