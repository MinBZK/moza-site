import { test } from "node:test";
import assert from "node:assert/strict";
import { checkUrlLengte, MAX_URL } from "./regels.js";

const lang = (lengte) => "https://voorbeeld.nl/" + "a".repeat(lengte);

test("een gewone link levert geen bevindingen", () => {
  assert.deepEqual(checkUrlLengte('<a href="https://voorbeeld.nl/pagina">Tekst</a>'), []);
});

test("een link op de grens levert geen bevindingen", () => {
  const url = lang(MAX_URL - "https://voorbeeld.nl/".length);
  assert.equal(url.length, MAX_URL);
  assert.deepEqual(checkUrlLengte(`<a href="${url}">Tekst</a>`), []);
});

test("een link boven de grens wordt gemeld, ook zonder aanhalingstekens", () => {
  const url = lang(MAX_URL);
  assert.equal(checkUrlLengte(`<a href="${url}">Tekst</a>`).length, 1);
  assert.equal(checkUrlLengte(`<a href=${url}>Tekst</a>`).length, 1);
  assert.match(checkUrlLengte(`<a href="${url}">Tekst</a>`)[0], /tekens/);
});

test("een domein op de lijst mag lange links hebben", () => {
  const url = "https://sequencediagram.org/index.html#initialData=" + "b".repeat(MAX_URL);
  assert.deepEqual(checkUrlLengte(`<a href="${url}">Tekening</a>`), []);
});

test("een ander domein met dezelfde naam erin mag dat niet", () => {
  const url = "https://sequencediagram.org.example.com/" + "b".repeat(MAX_URL);
  assert.equal(checkUrlLengte(`<a href="${url}">Tekening</a>`).length, 1);
});
