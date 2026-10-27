import { test } from "node:test";
import assert from "node:assert/strict";
import { inflateRawSync } from "node:zlib";
import { mkdtempSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { odpBestanden, uitvoerPad, zip } from "./odp.js";

const dia = (extra = {}) => ({
  naam: "1. Titel",
  titel: "Titel",
  beschrijving: "Tekst",
  notities: ["Eerste notitie"],
  png: Buffer.from("png"),
  overgang: false,
  ...extra,
});

const bestand = (dias, naam) =>
  odpBestanden(dias, "Test").find((b) => b.naam === naam).data.toString();

// Leest de lokale headers terug; genoeg om de eigen zip te controleren
function unzip(buf) {
  const uit = new Map();
  let p = 0;
  while (buf.readUInt32LE(p) === 0x04034b50) {
    const methode = buf.readUInt16LE(p + 8);
    const grootte = buf.readUInt32LE(p + 18);
    const naamLengte = buf.readUInt16LE(p + 26);
    const naam = buf.subarray(p + 30, p + 30 + naamLengte).toString();
    const data = buf.subarray(p + 30 + naamLengte, p + 30 + naamLengte + grootte);
    uit.set(naam, methode === 8 ? inflateRawSync(data) : data);
    p += 30 + naamLengte + grootte;
  }
  return uit;
}

test("mimetype staat als eerste bestand, ongecomprimeerd", () => {
  const buf = zip(odpBestanden([dia()], "Test"));
  assert.equal(buf.subarray(30, 38).toString(), "mimetype");
  assert.equal(buf.readUInt16LE(8), 0);
  const mimetype = "application/vnd.oasis.opendocument.presentation";
  assert.equal(buf.subarray(38, 38 + mimetype.length).toString(), mimetype);
});

test("de zip bevat alle bestanden met de juiste inhoud", () => {
  const bestanden = odpBestanden([dia(), dia({ naam: "2. Tweede" })], "Test");
  const uit = unzip(zip(bestanden));
  assert.deepEqual([...uit.keys()], bestanden.map((b) => b.naam));
  for (const b of bestanden) assert.deepEqual(uit.get(b.naam), b.data);
});

test("het notitiekader blijft een notitieveld voor de sprekersweergave", () => {
  const content = bestand([dia()], "content.xml");
  assert.match(content, /<draw:frame[^>]*presentation:style-name="pr1"[^>]*presentation:class="notes"/);
  assert.match(content, /<style:style style:name="pr1" style:family="presentation">/);
  assert.match(content, /<text:p>Eerste notitie<\/text:p>/);
});

test("alleen een opbouwstap vloeit over uit de vorige dia", () => {
  const content = bestand([dia(), dia({ naam: "1. Titel (stap 2 van 2)", overgang: true })], "content.xml");
  const paginas = content.split("<draw:page ").slice(1);
  assert.doesNotMatch(paginas[0], /crossfade/);
  assert.match(paginas[1], /draw:style-name="dp2"/);
  assert.match(paginas[1], /smil:subtype="crossfade"/);
});

test("tekst met speciale tekens wordt geëscaped", () => {
  const content = bestand([dia({ naam: 'A & "B"', beschrijving: "<x>", notities: ["1 < 2"] })], "content.xml");
  assert.match(content, /draw:name="A &amp; &quot;B&quot;"/);
  assert.match(content, /<svg:desc>&lt;x&gt;<\/svg:desc>/);
  assert.match(content, /<text:p>1 &lt; 2<\/text:p>/);
});

test("zonder uitvoer komt <slug>.odp in de huidige map", () => {
  assert.equal(uitvoerPad("", "deck"), resolve("deck.odp"));
  assert.equal(uitvoerPad(undefined, "deck"), resolve("deck.odp"));
});

test("een map krijgt <slug>.odp, ook zonder slash of met spaties", () => {
  const map = join(mkdtempSync(join(tmpdir(), "odp-")), "Mijn presentaties");
  mkdirSync(map);
  assert.equal(uitvoerPad(map, "deck"), join(map, "deck.odp"));
  assert.equal(uitvoerPad(`${map}/`, "deck"), join(map, "deck.odp"));
  assert.equal(uitvoerPad(`${join(map, "nieuw")}/`, "deck"), join(map, "nieuw", "deck.odp"));
});

test("een bestandsnaam blijft staan en krijgt zo nodig .odp", () => {
  assert.equal(uitvoerPad("/x/dg.odp", "deck"), "/x/dg.odp");
  assert.equal(uitvoerPad("/x/DG.ODP", "deck"), "/x/DG.ODP");
  assert.equal(uitvoerPad("/x/dg", "deck"), "/x/dg.odp");
  assert.equal(uitvoerPad("dg presentatie", "deck"), resolve("dg presentatie.odp"));
});
