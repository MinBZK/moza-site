import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import puppeteer from "puppeteer";
import { meetInPagina, MARGE, MAX_VOORBEELDEN } from "./reflow.js";
import { PUPPETEER_ARGS } from "../lib/puppeteer-args.js";

const VENSTER = 320;

let browser;
let page;

before(async () => {
  browser = await puppeteer.launch({ args: PUPPETEER_ARGS });
  page = await browser.newPage();
  await page.setViewport({ width: VENSTER, height: 600 });
});

after(async () => {
  await browser?.close();
});

/** Meet een los stukje HTML zoals de controle dat op een pagina doet. */
async function meet(body) {
  await page.setContent(
    `<!doctype html><html lang="nl"><head><meta charset="utf-8">
     <style>* { margin: 0; padding: 0; }</style></head><body>${body}</body></html>`
  );
  return page.evaluate(meetInPagina, MARGE, MAX_VOORBEELDEN);
}

test("reflow: inhoud die past levert geen bevinding", async () => {
  const uitslag = await meet('<div style="width: 300px">Past</div>');
  assert.equal(uitslag.overloop, 0);
  assert.deepEqual(uitslag.voorbeelden, []);
});

test("reflow: een te breed element wordt gemeld, met naam", async () => {
  const uitslag = await meet('<div class="breed" style="width: 500px">Te breed</div>');
  assert.equal(uitslag.overloop, 500 - VENSTER);
  assert.deepEqual(uitslag.voorbeelden, ["div.breed"]);
});

test("reflow: inhoud in een schuifvlak mag breder zijn dan het venster", async () => {
  const uitslag = await meet(
    '<div style="overflow-x: auto; width: 100%"><table style="width: 900px"><tr><td>Breed</td></tr></table></div>'
  );
  assert.equal(uitslag.overloop, 0);
});

test("reflow: een schuifvlak dat zelf buiten het venster valt wordt gemeld", async () => {
  const uitslag = await meet('<div class="vlak" style="overflow-x: auto; width: 400px">Inhoud</div>');
  assert.equal(uitslag.overloop, 400 - VENSTER);
  assert.deepEqual(uitslag.voorbeelden, ["div.vlak"]);
});

test("reflow: een subpixelafronding blijft binnen de marge", async () => {
  const uitslag = await meet(`<div style="width: ${VENSTER + 0.5}px">Bijna</div>`);
  assert.equal(uitslag.overloop, 0);
});

test("reflow: er worden niet meer dan drie voorbeelden genoemd", async () => {
  const breed = Array.from(
    { length: 5 },
    (_, i) => `<div class="r${i}" style="width: 500px">Breed</div>`
  ).join("");
  const uitslag = await meet(breed);
  assert.equal(uitslag.voorbeelden.length, MAX_VOORBEELDEN);
});

test("reflow: een lang woord dat afbreekt levert geen bevinding", async () => {
  const uitslag = await meet(
    '<p style="overflow-wrap: anywhere">Toegankelijkheidsonderzoeken ' +
      'componentenoverzicht notificatiedienst</p>'
  );
  assert.equal(uitslag.overloop, 0);
});
