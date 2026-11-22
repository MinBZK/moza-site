import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { generate as generateTokens } from "./nldd-tokens.js";
import { generate as generateIconen, generateRaster, FAVICON_ICO } from "./nldd-iconen.js";

const ROOT = resolve(import.meta.dirname, "..");
const kort = (path) => relative(ROOT, path);
// Een DataView, geen Buffer-methodes: Puppeteer geeft onder Node 26 een
// Uint8Array terug in plaats van een Buffer.
const view = (buf) => new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
// Breedte en hoogte staan in de IHDR-chunk van een PNG, op vaste posities
const pngMaat = (buf) => [view(buf).getUint32(16), view(buf).getUint32(20)];
// De maten in een ICO staan als losse bytes in de index, 0 voor 256
const icoMaten = (buf) => Array.from({ length: view(buf).getUint16(4, true) }, (_, i) => buf[6 + i * 16] || 256);

const tekstbestanden = { ...generateTokens(), ...(await generateIconen()) };
const rasterbestanden = await generateRaster();

// Bewaakt dat de gegenereerde bestanden in git gelijk zijn aan wat het
// geïnstalleerde @nldd/design-system oplevert. Faalt dus ook na een upgrade
// van het pakket waarbij de generatoren niet opnieuw zijn gedraaid.
describe("gegenereerde NLDD-bestanden zijn bijgewerkt", () => {
  for (const [path, verwacht] of Object.entries(tekstbestanden)) {
    it(kort(path), () => {
      assert.equal(readFileSync(path, "utf-8"), verwacht, `${kort(path)} is verouderd, draai \`just nldd\``);
    });
  }

  // De rasterbytes kunnen per Chromium-versie verschillen, dus alleen de maten
  for (const [path, verwacht] of Object.entries(rasterbestanden)) {
    const ico = path.endsWith(".ico");
    const maten = (buf) => (ico ? icoMaten(buf) : pngMaat(buf));
    it(kort(path), () => {
      const verwachteMaten = ico ? [...FAVICON_ICO].sort((a, b) => a - b) : pngMaat(verwacht);
      assert.deepEqual(maten(readFileSync(path)), verwachteMaten, `${kort(path)} ontbreekt of heeft de verkeerde maat, draai \`just nldd\``);
      assert.deepEqual(maten(verwacht), verwachteMaten);
    });
  }
});
