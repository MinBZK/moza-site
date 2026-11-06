import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import puppeteer from "puppeteer";
import { toetsPagina } from "./focus.js";
import { PUPPETEER_ARGS } from "../lib/puppeteer-args.js";

let browser;
let page;

before(async () => {
  browser = await puppeteer.launch({ args: PUPPETEER_ARGS });
  page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 600 });
});

after(async () => {
  await browser?.close();
});

/** Toets een los stukje HTML zoals de controle dat op een pagina doet. */
async function toets(body, stijl = "") {
  await page.setContent(
    `<!doctype html><html lang="nl"><head><meta charset="utf-8"><style>${stijl}</style></head>` +
      `<body>${body}</body></html>`,
    { waitUntil: "load" }
  );
  return toetsPagina(page, 20);
}

test("een knop met de standaardomlijning is in orde", async () => {
  const { stil } = await toets('<button>Verstuur</button>');
  assert.deepEqual(stil, []);
});

test("een knop zonder zichtbare focus is een bevinding", async () => {
  const { stil } = await toets(
    '<button id="stil">Verstuur</button>',
    "button:focus { outline: none }"
  );
  assert.deepEqual(stil, ["button#stil"]);
});

test("een eigen focusstijl zonder omlijning telt mee", async () => {
  const { stil } = await toets(
    '<button>Verstuur</button>',
    "button:focus { outline: none; background: #154273; color: #fff }"
  );
  assert.deepEqual(stil, []);
});

test("een ring op de ouder telt mee", async () => {
  const { stil } = await toets(
    '<span class="veld"><input aria-label="Zoeken"></span>',
    ".veld:focus-within { outline: 2px solid #154273 } input:focus { outline: none }"
  );
  assert.deepEqual(stil, []);
});

test("een onderstreping die bij focus verschijnt telt mee", async () => {
  const { stil } = await toets(
    '<a href="#x">Lees verder</a>',
    "a { text-decoration: none } a:focus { outline: none; text-decoration: underline }"
  );
  assert.deepEqual(stil, []);
});

test("alleen de elementen zonder zichtbare focus worden genoemd", async () => {
  const { stil, aantal } = await toets(
    '<button id="een">Een</button><button id="twee">Twee</button>',
    "#twee:focus { outline: none }"
  );
  assert.equal(aantal, 2);
  assert.deepEqual(stil, ["button#twee"]);
});
