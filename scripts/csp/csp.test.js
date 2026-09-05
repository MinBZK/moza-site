import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseCsp, blockedSources, findViolations } from "./checks.js";

const CONF = join(import.meta.dirname, "..", "..", "container", "security-headers.conf");

test("parseCsp leest de directives uit een nginx-configuratie", () => {
  const conf = 'add_header Content-Security-Policy "default-src \'self\'; script-src \'self\' \'unsafe-inline\';" always;';
  assert.deepEqual(parseCsp(conf), {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'"],
  });
});

test("parseCsp geeft null als er geen policy in staat", () => {
  assert.equal(parseCsp("server { listen 8080; }"), null);
});

test("parseCsp leest de echte configuratie van dit project", () => {
  const directives = parseCsp(readFileSync(CONF, "utf-8"));
  assert.ok(directives, "geen policy gevonden in container/security-headers.conf");
  assert.ok(directives["style-src"], "style-src ontbreekt");
});

test("blockedSources meldt style en script als unsafe-inline ontbreekt", () => {
  const directives = { "style-src": ["'self'"], "script-src": ["'self'"] };
  assert.deepEqual(blockedSources(directives).sort(), ["script", "style"]);
});

test("blockedSources laat een directive met unsafe-inline met rust", () => {
  const directives = { "style-src": ["'self'", "'unsafe-inline'"], "script-src": ["'self'"] };
  assert.deepEqual(blockedSources(directives), ["script"]);
});

test("blockedSources valt terug op default-src", () => {
  assert.deepEqual(blockedSources({ "default-src": ["'self'"] }).sort(), ["script", "style"]);
});

test("findViolations vindt een inline style-attribuut, ook zonder aanhalingstekens", () => {
  const findings = findViolations('<pre style=color:#fff>x</pre>', ["style"]);
  assert.equal(findings.length, 1);
  assert.match(findings[0].label, /style-attribuut/);
});

test("findViolations vindt een style-element", () => {
  const findings = findViolations("<style>p{color:red}</style>", ["style"]);
  assert.match(findings[0].label, /style-element/);
});

test("findViolations vindt een inline script maar niet een met src", () => {
  assert.equal(findViolations('<script src="/a.js"></script>', ["script"]).length, 0);
  assert.equal(findViolations("<script>alert(1)</script>", ["script"]).length, 1);
});

test("findViolations vindt event handlers en javascript:-URLs", () => {
  const findings = findViolations('<a href="javascript:void(0)" onclick="go()">x</a>', ["script"]);
  assert.equal(findings.length, 2);
});

test("findViolations meldt niets over gewone attributen die op on lijken", () => {
  const html = '<meta name="description" content="Een versie"><img srcset="a.png">';
  assert.deepEqual(findViolations(html, ["script", "style"]), []);
});

test("findViolations kijkt alleen naar de opgegeven soorten", () => {
  assert.deepEqual(findViolations('<p style="color:red">x</p>', ["script"]), []);
});
