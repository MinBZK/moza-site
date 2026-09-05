import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import puppeteer from "puppeteer";
import {
  setPdfMetadata,
  buildIncrementalUpdate,
  readPdfMetadata,
  readXmp,
  buildXmp,
  pdfString,
} from "./pdf-metadata.js";

const PUPPETEER_ARGS =
  process.env.CI || process.getuid?.() === 0
    ? ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
    : [];

test("pdfString codeert als UTF-16BE met byte order mark", () => {
  assert.equal(pdfString("A"), "<FEFF0041>");
  // é mag niet als losse byte in de PDF belanden.
  assert.equal(pdfString("é"), "<FEFF00E9>");
});

test("buildXmp zet de URL in dc:identifier, niet in dc:source", () => {
  const xmp = buildXmp({ title: "T", url: "https://example.org/a/" });
  assert.match(xmp, /<dc:identifier>https:\/\/example\.org\/a\/<\/dc:identifier>/);
  assert.doesNotMatch(xmp, /dc:source/);
});

test("buildXmp claimt geen PDF/UA-conformiteit", () => {
  assert.doesNotMatch(buildXmp({ title: "T" }), /pdfuaid/);
});

test("buildXmp escapet XML-tekens in de titel", () => {
  assert.match(buildXmp({ title: 'A & B "C"' }), /A &amp; B &quot;C&quot;/);
});

test("buildIncrementalUpdate weigert een PDF zonder klassieke xref-tabel", () => {
  const fake = Buffer.from("%PDF-1.5\nstartxref\n9\n%%EOF\n", "latin1");
  assert.throws(() => buildIncrementalUpdate(fake, { title: "x" }), /xref-tabel/);
});

test("buildIncrementalUpdate weigert een bestand zonder startxref", () => {
  assert.throws(
    () => buildIncrementalUpdate(Buffer.from("%PDF-1.4\n"), { title: "x" }),
    /startxref/
  );
});

test("buildIncrementalUpdate levert niets op zonder in te vullen velden", () => {
  assert.equal(buildIncrementalUpdate(minimalPdf(), { title: "", url: null }), null);
});

test("de update verwijst met /Prev naar de vorige xref en verhoogt /Size", () => {
  const pdf = minimalPdf();
  const vorige = pdf.toString("latin1").match(/startxref\n(\d+)/)[1];
  const update = buildIncrementalUpdate(pdf, { title: "Titel" }).toString("latin1");
  assert.match(update, new RegExp(`/Prev ${vorige}\\b`));
  // Info krijgt nummer 4, de XMP-stroom 5, dus /Size wordt 6.
  assert.match(update, /\/Size 6\b/);
  assert.match(update, /\/Root 1 0 R/);
  // Catalogus (1) en het nieuwe paar (4 en 5) staan in aparte subsecties.
  assert.match(update, /xref\n1 1\n\d{10} 00000 n \n4 2\n/);
});

test("metadata is terug te lezen, inclusief accenten en aanhalingstekens", () => {
  const dir = mkdtempSync(join(tmpdir(), "moza-pdfmeta-"));
  try {
    const file = join(dir, "test.pdf");
    writeFileSync(file, minimalPdf());
    setPdfMetadata(file, {
      title: "Eén Overheid",
      description: 'Het “Wat” en het “Hoe”',
      url: "https://mijnoverheidzakelijk.nl/documenten/test/",
      creator: "MijnOverheid Zakelijk",
    });

    const meta = readPdfMetadata(readFileSync(file));
    assert.equal(meta.Title, "Eén Overheid");
    assert.equal(meta.Subject, 'Het “Wat” en het “Hoe”');
    assert.equal(meta.Creator, "MijnOverheid Zakelijk");
    // De URL zit in de XMP, niet meer bij de trefwoorden.
    assert.equal(meta.Keywords, undefined);

    const xmp = readXmp(readFileSync(file));
    assert.match(xmp, /<dc:identifier>https:\/\/mijnoverheidzakelijk\.nl\/documenten\/test\/</);
    assert.match(xmp, /Eén Overheid/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("de oorspronkelijke bytes blijven ongewijzigd voor de update staan", () => {
  const dir = mkdtempSync(join(tmpdir(), "moza-pdfmeta-"));
  try {
    const file = join(dir, "test.pdf");
    const original = minimalPdf();
    writeFileSync(file, original);
    setPdfMetadata(file, { title: "Titel" });

    const after = readFileSync(file);
    assert.ok(after.length > original.length);
    assert.deepEqual(after.subarray(0, original.length), original);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("een objectnummer wordt niet verward met de staart van een groter nummer", () => {
  // Object 23 staat vóór object 3; zoeken op "3 0 obj" mag niet in 23 blijven hangen.
  const head =
    "%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n" +
    "23 0 obj\n<< /Title (fout) >>\nendobj\n3 0 obj\n<< /Title (goed) >>\nendobj\n";
  const xref = "xref\n0 1\n0000000000 65535 f \n";
  const trailer =
    "trailer\n<< /Size 24 /Root 1 0 R /Info 3 0 R >>\nstartxref\n" +
    String(head.length) +
    "\n%%EOF\n";

  assert.equal(readPdfMetadata(Buffer.from(head + xref + trailer, "latin1")).Title, "goed");
});

test("een echte Chrome-PDF houdt zijn tagstructuur en krijgt een XMP-stroom", async () => {
  const dir = mkdtempSync(join(tmpdir(), "moza-pdfmeta-"));
  const browser = await puppeteer.launch({ args: PUPPETEER_ARGS });
  try {
    const file = join(dir, "echt.pdf");
    const page = await browser.newPage();
    await page.setContent(
      '<!doctype html><html lang="nl"><head><meta charset="utf-8"><title>Bron</title></head>' +
        "<body><h1>Kop</h1><p>Tekst.</p></body></html>"
    );
    await page.pdf({ path: file, format: "A4" });

    const before = readFileSync(file);
    assert.ok(before.includes("/StructTreeRoot"), "Chrome levert geen getagde PDF");

    setPdfMetadata(file, {
      title: "Eén document",
      url: "https://mijnoverheidzakelijk.nl/test/",
      creator: "MijnOverheid Zakelijk",
    });

    const after = readFileSync(file);
    for (const marker of ["/StructTreeRoot", "/MarkInfo", "/Lang", "DisplayDocTitle"]) {
      assert.ok(after.includes(marker), `${marker} is verdwenen na het schrijven`);
    }

    const meta = readPdfMetadata(after);
    assert.equal(meta.Title, "Eén document");
    assert.equal(meta.Creator, "MijnOverheid Zakelijk");
    // Velden die we niet zelf schrijven blijven staan.
    assert.match(meta.Producer, /Skia/);
    assert.match(meta.CreationDate, /^D:\d{14}/);

    const xmp = readXmp(after);
    assert.match(xmp, /<dc:title>/);
    assert.match(xmp, /<dc:identifier>https:\/\/mijnoverheidzakelijk\.nl\/test\/</);
  } finally {
    await browser.close();
    rmSync(dir, { recursive: true, force: true });
  }
});

/** Kleinste PDF met een catalogus en een klassieke xref-tabel. */
function minimalPdf() {
  const head = "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  const xref =
    "xref\n0 4\n" +
    "0000000000 65535 f \n0000000000 00000 n \n0000000000 00000 n \n0000000000 00000 n \n";
  const trailer =
    `trailer\n<< /Size 4 /Root 1 0 R /ID [<AA> <BB>] >>\nstartxref\n${head.length}\n%%EOF\n`;
  return Buffer.from(head + xref + trailer, "latin1");
}
