import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import puppeteer from "puppeteer";
import { deflateSync, inflateSync } from "node:zlib";
import {
  setPdfMetadata,
  buildIncrementalUpdate,
  buildLijstParts,
  buildFiguurObjecten,
  buildPaginaParts,
  objectDictionaries,
  readPdfMetadata,
  readXmp,
  buildXmp,
  pdfString,
} from "./pdf-metadata.js";
import { PUPPETEER_ARGS } from "../lib/puppeteer-args.js";

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

test("buildXmp claimt PDF/UA deel 1", () => {
  assert.match(buildXmp({ title: "T" }), /<pdfuaid:part>1<\/pdfuaid:part>/);
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
        "<body><h1>Kop</h1>" +
        '<p>Tekst met <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">' +
        '<circle cx="8" cy="8" r="7" fill="red"/></svg> pictogram.</p>' +
        "<ul><li>Eerste <b>punt</b></li></ul></body></html>"
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
    assert.match(xmp, /<pdfuaid:part>1<\/pdfuaid:part>/);

    // Wat Chromium laat liggen en de naschrijfstap aanvult.
    const tekst = after.toString("latin1");
    assert.ok(tekst.includes("/RoleMap"), "RoleMap ontbreekt");
    assert.ok(tekst.includes("/S /LBody"), "lijstitem kreeg geen LBody");
    // Wat de artefactstap van deze Chromium-uitvoer maakt. Toetsen op het
    // eindbestand kan niet: de herschreven stream is ingepakt en de oude versie
    // blijft er als incrementele update bij staan.
    const ruw = before.toString("latin1");
    const paginas = buildPaginaParts(ruw, objectDictionaries(ruw));
    assert.equal(paginas.length, 1, "de pagina is niet herschreven");
    const stroom = uitStreamPart(paginas[0]);
    // Het pictogram met aria-hidden staat midden in de pagina, buiten elke tag.
    assert.match(stroom, /EMC\n\/Artifact BMC\n[\s\S]*?\bf\nEMC\n\/NonStruct/);
    // En het staat er nog: de cirkel wordt nog steeds gevuld.
    assert.match(stroom, /15 8 m\n/);
  } finally {
    await browser.close();
    rmSync(dir, { recursive: true, force: true });
  }
});

test("een lijstitem krijgt een LBody om alles na het opsommingsteken", () => {
  const text =
    "\n10 0 obj\n<< /Type /StructElem /S /LI /P 9 0 R /K [11 0 R 12 0 R 13 0 R] >>\nendobj\n" +
    "\n11 0 obj\n<< /Type /StructElem /S /Lbl /P 10 0 R >>\nendobj\n" +
    "\n12 0 obj\n<< /Type /StructElem /S /Span /P 10 0 R >>\nendobj\n" +
    "\n13 0 obj\n<< /Type /StructElem /S /Link /P 10 0 R >>\nendobj\n";

  const { parts, volgendNummer } = buildLijstParts(text, objectDictionaries(text), 20);
  const perNummer = new Map(parts.map((p) => [p.number, p.bytes.toString("latin1")]));

  assert.equal(volgendNummer, 21);
  // De LBody draagt de kinderen na het label en wijst terug naar het lijstitem.
  assert.match(perNummer.get(20), /\/S \/LBody \/P 10 0 R \/K \[12 0 R 13 0 R\]/);
  // Het lijstitem houdt alleen het label en de nieuwe LBody over.
  assert.match(perNummer.get(10), /\/K \[11 0 R 20 0 R\]/);
  // De verplaatste kinderen wijzen naar de LBody, niet meer naar het lijstitem.
  assert.match(perNummer.get(12), /\/P 20 0 R/);
  assert.match(perNummer.get(13), /\/P 20 0 R/);
  // Het label blijft ongemoeid.
  assert.equal(perNummer.has(11), false);
});

test("een lijstitem zonder opsommingsteken krijgt een LBody om alles", () => {
  const text =
    "\n10 0 obj\n<< /Type /StructElem /S /LI /P 9 0 R /K [12 0 R 13 0 R] >>\nendobj\n" +
    "\n12 0 obj\n<< /Type /StructElem /S /NonStruct /P 10 0 R >>\nendobj\n" +
    "\n13 0 obj\n<< /Type /StructElem /S /H3 /P 10 0 R >>\nendobj\n";

  const { parts } = buildLijstParts(text, objectDictionaries(text), 20);
  const perNummer = new Map(parts.map((p) => [p.number, p.bytes.toString("latin1")]));

  assert.match(perNummer.get(20), /\/S \/LBody \/P 10 0 R \/K \[12 0 R 13 0 R\]/);
  assert.match(perNummer.get(10), /\/K \[20 0 R\]/);
  assert.match(perNummer.get(12), /\/P 20 0 R/);
  assert.match(perNummer.get(13), /\/P 20 0 R/);
});

test("een figure-omhulsel zonder Alt wordt een Div, de afbeelding erin niet", () => {
  const text =
    "\n10 0 obj\n<< /Type /StructElem /S /Figure /P 9 0 R /K [11 0 R] >>\nendobj\n" +
    "\n11 0 obj\n<< /Type /StructElem /S /Figure /P 10 0 R /Alt (Foto) /K [3] >>\nendobj\n" +
    "\n12 0 obj\n<< /Type /StructElem /S /Figure /P 9 0 R /K [4] >>\nendobj\n";

  const objecten = objectDictionaries(text);
  const perNummer = new Map(buildFiguurObjecten(objecten).map((o) => [o.nummer, o.dict]));

  assert.match(perNummer.get(10), /\/S \/Div /);
  assert.match(perNummer.get(11), /\/S \/Figure /);
  // Een Figure met eigen inhoud en zonder Alt is een echte fout; die blijft zichtbaar.
  assert.match(perNummer.get(12), /\/S \/Figure /);
});

test("een lijstitem zonder inhoud naast het label blijft ongemoeid", () => {
  const text =
    "\n10 0 obj\n<< /Type /StructElem /S /LI /P 9 0 R /K [11 0 R] >>\nendobj\n" +
    "\n11 0 obj\n<< /Type /StructElem /S /Lbl /P 10 0 R >>\nendobj\n";

  const { parts } = buildLijstParts(text, objectDictionaries(text), 20);
  assert.deepEqual(parts, []);
});

test("de kop en de staart van een pagina worden als artefact gemarkeerd", () => {
  const stroom = "1 0 0 1 0 0 cm\n0 0 100 100 re f\n/P << /MCID 0 >> BDC\n(tekst) Tj\nEMC\n(voetnummer) Tj\n";
  const text = paginaMetStroom(stroom);

  const parts = buildPaginaParts(text, objectDictionaries(text));
  assert.equal(parts.length, 1);
  const nieuw = uitStreamPart(parts[0]);

  // De paginatransformatie blijft buiten het artefact staan.
  assert.match(nieuw, /^1 0 0 1 0 0 cm\n\/Artifact BMC\n0 0 100 100 re f\nEMC\n/);
  // De getagde inhoud staat er byte voor byte nog.
  assert.match(nieuw, /\/P << \/MCID 0 >> BDC\n\(tekst\) Tj\nEMC/);
  // Alles na de laatste tag zit in een paginering-artefact.
  assert.match(nieuw, /\/Artifact << \/Type \/Pagination >> BDC\n\(voetnummer\) Tj\n\nEMC\n$/);
});

test("inhoud tussen twee tags wordt als artefact gemarkeerd", () => {
  // Een pictogram met aria-hidden belandt hier: Chromium tagt het niet en
  // markeert het ook niet als artefact.
  const stroom =
    "1 0 0 1 0 0 cm\n/P << /MCID 0 >> BDC\n(tekst) Tj\nEMC\n" +
    "q\n5 5 10 10 re\nf\nQ\n/P << /MCID 1 >> BDC\n(meer tekst) Tj\nEMC\n";
  const text = paginaMetStroom(stroom);

  const parts = buildPaginaParts(text, objectDictionaries(text));
  assert.equal(parts.length, 1);
  const nieuw = uitStreamPart(parts[0]);

  assert.match(nieuw, /EMC\n\/Artifact BMC\nq\n5 5 10 10 re\nf\nQ\nEMC\n\/P << \/MCID 1 >> BDC/);
  // De kop bevat geen inkt, dus daar valt niets te markeren.
  assert.doesNotMatch(nieuw, /^1 0 0 1 0 0 cm\n\/Artifact/);
});

test("een ligatuur in ongetagde tekst blijft in het artefact", () => {
  // Zo schrijft Chromium "fi" in een voettekst met aria-hidden.
  const stroom =
    "1 0 0 1 0 0 cm\n/P << /MCID 0 >> BDC\n(tekst) Tj\nEMC\n" +
    "BT\n(noti) Tj\n/Span<</ActualText (fi) >> BDC\n(x) Tj\nEMC\n(catie) Tj\nET\n";
  const text = paginaMetStroom(stroom);

  const nieuw = uitStreamPart(buildPaginaParts(text, objectDictionaries(text))[0]);
  assert.match(
    nieuw,
    /EMC\n\/Artifact << \/Type \/Pagination >> BDC\nBT\n\(noti\) Tj\n\/Span<<\/ActualText \(fi\) >> BDC\n\(x\) Tj\nEMC\n\(catie\) Tj\nET\n\nEMC\n$/
  );
});

test("een gat zonder inkt blijft ongemarkeerd", () => {
  const stroom =
    "1 0 0 1 0 0 cm\n/P << /MCID 0 >> BDC\n(tekst) Tj\nEMC\n" +
    "q\n5 5 10 10 re\nW* n\nQ\n/P << /MCID 1 >> BDC\n(meer) Tj\nEMC\n";
  const text = paginaMetStroom(stroom);
  assert.deepEqual(buildPaginaParts(text, objectDictionaries(text)), []);
});

test("een tagnaam in een tekststring telt niet als tag", () => {
  const stroom = "1 0 0 1 0 0 cm\n/P << /MCID 0 >> BDC\n(EMC en BDC) Tj\nEMC\n(voetnummer) Tj\n";
  const text = paginaMetStroom(stroom);

  const nieuw = uitStreamPart(buildPaginaParts(text, objectDictionaries(text))[0]);
  assert.match(nieuw, /\(EMC en BDC\) Tj\nEMC\n\/Artifact << \/Type \/Pagination >> BDC/);
});

test("een XObject buiten de tags laat de artefactstap hard falen", () => {
  // Zo'n XObject hoort bij de structuurboom; in een artefact zou het regel
  // 7.1-2 breken, dus liever een gefaalde build dan een stille fout.
  const stroom = "1 0 0 1 0 0 cm\n/P << /MCID 0 >> BDC\n(tekst) Tj\nEMC\n/X0 Do\n";
  const text = paginaMetStroom(stroom);

  assert.throws(
    () => buildPaginaParts(text, objectDictionaries(text)),
    /XObject buiten de getagde inhoud/
  );
});

test("een XObject zonder tags buiten de tags wordt een artefact", () => {
  // Zo tekent Chromium een <img alt=""> of een svg met aria-hidden.
  const stroom = "1 0 0 1 0 0 cm\n/P << /MCID 0 >> BDC\n(tekst) Tj\nEMC\nq\n/X9 Do\nQ\n/P << /MCID 1 >> BDC\n(meer) Tj\nEMC\n";
  const metXObject = (subtype, inhoud = "") =>
    paginaMetStroom(stroom).replace("/Contents 5 0 R", "/Contents 5 0 R /Resources << /XObject << /X9 9 0 R >> >>") +
    `\n9 0 obj\n<< /Type /XObject /Subtype /${subtype} /Length ${inhoud.length} >>\nstream\n${inhoud}\nendstream\nendobj\n`;

  for (const pdf of [metXObject("Image"), metXObject("Form", "0 0 10 10 re f")]) {
    const nieuw = uitStreamPart(buildPaginaParts(pdf, objectDictionaries(pdf))[0]);
    assert.match(nieuw, /EMC\n\/Artifact BMC\nq\n\/X9 Do\nQ\nEMC\n\/P << \/MCID 1 >> BDC/);
  }

  const getagd = metXObject("Form", "/P << /MCID 2 >> BDC (x) Tj EMC");
  assert.throws(() => buildPaginaParts(getagd, objectDictionaries(getagd)), /XObject buiten de getagde inhoud/);
});

test("een pagina zonder tags wordt met rust gelaten", () => {
  const text = paginaMetStroom("1 0 0 1 0 0 cm\n0 0 100 100 re f\n");
  assert.deepEqual(buildPaginaParts(text, objectDictionaries(text)), []);
});

test("de streamgrens komt uit /Length, niet uit een zoekactie naar endstream", () => {
  // Deze bytes kunnen toevallig in een ingepakte stream staan; wie erop zoekt,
  // knipt het object op de verkeerde plek af en slaat de pagina stil over.
  const inhoud =
    "1 0 0 1 0 0 cm\n0 0 1 rg\n(endstream endobj) Tj\n" +
    "/P << /MCID 0 >> BDC\n(tekst) Tj\nEMC\n(1) Tj\n";
  const text =
    "\n4 0 obj\n<< /Type /Page /Parent 2 0 R /Contents 5 0 R >>\nendobj\n" +
    `\n5 0 obj\n<< /Length ${inhoud.length} >>\nstream\n${inhoud}\nendstream\nendobj\n`;

  const parts = buildPaginaParts(text, objectDictionaries(text));
  assert.equal(parts.length, 1, "de pagina is overgeslagen");
  assert.match(uitStreamPart(parts[0]), /\/Artifact BMC\n0 0 1 rg\n\(endstream endobj\) Tj\nEMC\n/);
});

/** Minimale pagina met een ingepakte contentstream in object 5. */
function paginaMetStroom(inhoud) {
  const ingepakt = deflateSync(Buffer.from(inhoud, "latin1"));
  return (
    "\n4 0 obj\n<< /Type /Page /Parent 2 0 R /Contents 5 0 R >>\nendobj\n" +
    `\n5 0 obj\n<< /Filter /FlateDecode /Length ${ingepakt.length} >>\nstream\n` +
    ingepakt.toString("latin1") +
    "\nendstream\nendobj\n"
  );
}

/** De uitgepakte contentstream uit een door buildPaginaParts geschreven object. */
function uitStreamPart(part) {
  const tekst = part.bytes.toString("latin1");
  const begin = tekst.indexOf("stream\n") + 7;
  const eind = tekst.lastIndexOf("\nendstream");
  return inflateSync(Buffer.from(tekst.slice(begin, eind), "latin1")).toString("latin1");
}

/** Kleinste PDF met een catalogus en een klassieke xref-tabel. */
async function chromePdf(body) {
  const dir = mkdtempSync(join(tmpdir(), "moza-pdftaal-"));
  const browser = await puppeteer.launch({ args: PUPPETEER_ARGS });
  try {
    const file = join(dir, "taal.pdf");
    const page = await browser.newPage();
    await page.setContent(
      '<!doctype html><html lang="nl"><head><meta charset="utf-8"><title>Bron</title></head>' +
        `<body>${body}</body></html>`
    );
    await page.pdf({ path: file, format: "A4" });
    return readFileSync(file);
  } finally {
    await browser.close();
    rmSync(dir, { recursive: true, force: true });
  }
}

/** Objectnummers waarvan de laatste definitie /Lang (taal) bevat. */
function metTaal(buffer, taal) {
  const laatste = new Map();
  for (const m of buffer.toString("latin1").matchAll(/(?:^|\n)(\d+) 0 obj\n(<<(?:(?!endobj)[\s\S])*?>>)\nendobj/g)) {
    laatste.set(m[1], m[2]);
  }
  return [...laatste].filter(([, dict]) => dict.includes(`/Lang (${taal})`)).map(([n]) => n);
}

test("een taalfragment krijgt /Lang op een eigen element, ook binnen een link en lijstitem", async () => {
  const bron = await chromePdf(
    '<p>Een <span lang="en">trusted party</span> in een zin.</p>' +
      '<p><a href="https://example.org/"><span lang="en">Europe goes Once-Only: the Netherlands</span></a></p>' +
      '<ul><li>Punt met <span lang="en">Kick-off meeting</span></li></ul>'
  );
  const update = buildIncrementalUpdate(bron, {
    title: "T",
    taalFragmenten: [
      { lang: "en", text: "trusted party" },
      { lang: "en", text: "Europe goes Once-Only: the Netherlands" },
      { lang: "en", text: "Kick-off meeting" },
    ],
  });
  const eind = Buffer.concat([bron, update]);
  assert.equal(metTaal(eind, "en").length, 3);
  assert.ok(eind.subarray(0, bron.length).equals(bron), "de oorspronkelijke bytes zijn gewijzigd");

  const tekst = eind.toString("latin1");
  for (const nummer of metTaal(eind, "en")) {
    const dict = tekst.match(new RegExp(`(?:^|\\n)${nummer} 0 obj\\n(<<[\\s\\S]*?>>)\\nendobj`, "g")).at(-1);
    assert.match(dict, /\/S \/NonStruct/, "de taal staat niet op de binnenste run");
  }
});

test("een taalfragment dat over twee regels breekt krijgt toch /Lang", async () => {
  // Op een regelovergang schrijft Chromium geen spatie tussen de twee woorden.
  const bron = await chromePdf(
    '<p style="width:4em">Tekst <span lang="en">trusted party</span> verder.</p>'
  );
  const update = buildIncrementalUpdate(bron, {
    title: "T",
    taalFragmenten: [{ lang: "en", text: "trusted party" }],
  });
  assert.equal(metTaal(Buffer.concat([bron, update]), "en").length, 1);
});

test("een taalfragment zonder eigen element laat de build falen", async () => {
  const bron = await chromePdf('<p>Een <span lang="en">foo <em>bar</em></span> in een zin.</p>');
  assert.throws(
    () =>
      buildIncrementalUpdate(bron, {
        title: "T",
        taalFragmenten: [{ lang: "en", text: "foo bar" }],
      }),
    /foo bar/
  );
});

test("een taalfragment dat in de PDF ontbreekt laat de build falen", async () => {
  const bron = await chromePdf("<p>Alleen Nederlands.</p>");
  assert.throws(
    () =>
      buildIncrementalUpdate(bron, {
        title: "T",
        taalFragmenten: [{ lang: "en", text: "niet aanwezig" }],
      }),
    /niet aanwezig/
  );
});

function minimalPdf() {
  const head = "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  const xref =
    "xref\n0 4\n" +
    "0000000000 65535 f \n0000000000 00000 n \n0000000000 00000 n \n0000000000 00000 n \n";
  const trailer =
    `trailer\n<< /Size 4 /Root 1 0 R /ID [<AA> <BB>] >>\nstartxref\n${head.length}\n%%EOF\n`;
  return Buffer.from(head + xref + trailer, "latin1");
}
