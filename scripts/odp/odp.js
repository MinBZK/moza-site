/**
 * Bouw een OpenDocument-presentatie (.odp) waarin elke dia één afbeelding is,
 * met sprekersnotities en alt-tekst.
 *
 * Een dia is { naam, titel, beschrijving, notities: string[], png: Buffer,
 * overgang: boolean }. Met overgang vloeit de dia over uit de vorige, voor een
 * opbouwstap.
 */

import { crc32, deflateRawSync } from "node:zlib";
import { existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const BREEDTE = "33.867cm";
const HOOGTE = "19.05cm";
const MIMETYPE = "application/vnd.oasis.opendocument.presentation";

const NS = `xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
 xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
 xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
 xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
 xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 xmlns:dc="http://purl.org/dc/elements/1.1/"
 xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"
 xmlns:presentation="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0"
 xmlns:smil="urn:oasis:names:tc:opendocument:xmlns:smil-compatible:1.0"
 xmlns:anim="urn:oasis:names:tc:opendocument:xmlns:animation:1.0"
 office:version="1.3"`;

const xml = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const NOTITIES_KADER = 'svg:x="1.5cm" svg:y="13cm" svg:width="18cm" svg:height="14.5cm"';
const MINIATUUR = 'svg:x="1.5cm" svg:y="2cm" svg:width="18cm" svg:height="10.125cm"';

function dia(d, n) {
  const notities = d.notities.map((p) => `<text:p>${xml(p)}</text:p>`).join("") || "<text:p/>";
  const overgang = d.overgang
    ? '<anim:par presentation:node-type="timing-root"><anim:seq presentation:node-type="main-sequence"/>' +
      '<anim:transitionFilter smil:dur="0.4s" smil:type="fade" smil:subtype="crossfade"/></anim:par>'
    : "";
  // Zonder presentation:style-name maakt LibreOffice van het notitiekader een
  // gewoon tekstvak: de tekst blijft, maar de sprekersweergave toont hem niet.
  return `
<draw:page draw:name="${xml(d.naam)}" draw:style-name="${d.overgang ? "dp2" : "dp1"}" draw:master-page-name="Standaard">
 <draw:frame draw:style-name="gr1" draw:layer="layout" svg:x="0cm" svg:y="0cm" svg:width="${BREEDTE}" svg:height="${HOOGTE}">
  <draw:image xlink:href="Pictures/dia-${n}.png" xlink:type="simple" xlink:show="embed" xlink:actuate="onLoad" draw:mime-type="image/png"><text:p/></draw:image>
  <svg:title>${xml(d.titel)}</svg:title>
  <svg:desc>${xml(d.beschrijving)}</svg:desc>
 </draw:frame>${overgang}
 <presentation:notes draw:style-name="dp1">
  <draw:page-thumbnail draw:layer="layout" presentation:class="page" ${MINIATUUR} draw:page-number="${n}"/>
  <draw:frame draw:name="Notities" presentation:style-name="pr1" draw:layer="layout" presentation:class="notes" presentation:user-transformed="true" ${NOTITIES_KADER}>
   <draw:text-box>${notities}</draw:text-box>
  </draw:frame>
 </presentation:notes>
</draw:page>`;
}

function content(dias) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content ${NS}>
<office:automatic-styles>
 <style:style style:name="dp1" style:family="drawing-page"><style:drawing-page-properties presentation:background-visible="true" presentation:background-objects-visible="true"/></style:style>
 <style:style style:name="dp2" style:family="drawing-page"><style:drawing-page-properties presentation:background-visible="true" presentation:background-objects-visible="true" smil:type="fade" smil:subtype="crossfade" presentation:transition-speed="fast" presentation:duration="PT00H00M00.4S"/></style:style>
 <style:style style:name="gr1" style:family="graphic"><style:graphic-properties draw:stroke="none" draw:fill="none"/></style:style>
 <style:style style:name="pr1" style:family="presentation"><style:graphic-properties draw:stroke="none" draw:fill="none"/><style:paragraph-properties fo:margin-bottom="0.25cm"/><style:text-properties fo:font-size="12pt" fo:language="nl" fo:country="NL"/></style:style>
</office:automatic-styles>
<office:body><office:presentation>${dias.map((d, i) => dia(d, i + 1)).join("")}
</office:presentation></office:body>
</office:document-content>`;
}

const styles = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-styles ${NS}>
<office:styles>
 <style:default-style style:family="graphic"><style:text-properties fo:language="nl" fo:country="NL"/></style:default-style>
</office:styles>
<office:automatic-styles>
 <style:page-layout style:name="PM1"><style:page-layout-properties fo:margin-top="0cm" fo:margin-bottom="0cm" fo:margin-left="0cm" fo:margin-right="0cm" fo:page-width="${BREEDTE}" fo:page-height="${HOOGTE}" style:print-orientation="landscape"/></style:page-layout>
 <style:page-layout style:name="PM2"><style:page-layout-properties fo:margin-top="0cm" fo:margin-bottom="0cm" fo:margin-left="0cm" fo:margin-right="0cm" fo:page-width="21cm" fo:page-height="29.7cm" style:print-orientation="portrait"/></style:page-layout>
</office:automatic-styles>
<office:master-styles>
 <style:master-page style:name="Standaard" style:page-layout-name="PM1">
  <presentation:notes style:page-layout-name="PM2">
   <draw:page-thumbnail draw:layer="layout" presentation:class="page" ${MINIATUUR}/>
   <draw:frame draw:layer="layout" presentation:class="notes" presentation:placeholder="true" ${NOTITIES_KADER}><draw:text-box/></draw:frame>
  </presentation:notes>
 </style:master-page>
</office:master-styles>
</office:document-styles>`;

const meta = (titel) => `<?xml version="1.0" encoding="UTF-8"?>
<office:document-meta ${NS}>
<office:meta><dc:title>${xml(titel)}</dc:title><dc:language>nl-NL</dc:language></office:meta>
</office:document-meta>`;

const manifest = (dias) => `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.3">
 <manifest:file-entry manifest:full-path="/" manifest:media-type="${MIMETYPE}" manifest:version="1.3"/>
 <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
 <manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/>
 <manifest:file-entry manifest:full-path="meta.xml" manifest:media-type="text/xml"/>
${dias.map((_, i) => ` <manifest:file-entry manifest:full-path="Pictures/dia-${i + 1}.png" manifest:media-type="image/png"/>`).join("\n")}
</manifest:manifest>`;

/** De bestanden van het pakket, in volgorde. */
export function odpBestanden(dias, titel) {
  return [
    // ODF eist mimetype als eerste bestand, ongecomprimeerd
    { naam: "mimetype", data: Buffer.from(MIMETYPE), comprimeer: false },
    { naam: "content.xml", data: Buffer.from(content(dias)), comprimeer: true },
    { naam: "styles.xml", data: Buffer.from(styles), comprimeer: true },
    { naam: "meta.xml", data: Buffer.from(meta(titel)), comprimeer: true },
    { naam: "META-INF/manifest.xml", data: Buffer.from(manifest(dias)), comprimeer: true },
    ...dias.map((d, i) => ({ naam: `Pictures/dia-${i + 1}.png`, data: d.png, comprimeer: false })),
  ];
}

/** Een zip zonder extra velden en zonder zip64: genoeg voor een ODF-pakket onder 4 GB. */
export function zip(bestanden) {
  const lokaal = [];
  const centraal = [];
  let offset = 0;
  for (const { naam, data, comprimeer } of bestanden) {
    const naamBuf = Buffer.from(naam);
    const opgeslagen = comprimeer ? deflateRawSync(data) : data;
    const kop = Buffer.alloc(30);
    kop.writeUInt32LE(0x04034b50, 0);
    kop.writeUInt16LE(20, 4);
    kop.writeUInt16LE(0x0800, 6); // namen in UTF-8
    kop.writeUInt16LE(comprimeer ? 8 : 0, 8);
    kop.writeUInt16LE(0x21, 12); // 1 januari 1980: datum 0 is ongeldig in DOS-tijd
    kop.writeUInt32LE(crc32(data), 14);
    kop.writeUInt32LE(opgeslagen.length, 18);
    kop.writeUInt32LE(data.length, 22);
    kop.writeUInt16LE(naamBuf.length, 26);
    lokaal.push(kop, naamBuf, opgeslagen);

    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50, 0);
    c.writeUInt16LE(20, 4);
    c.writeUInt16LE(20, 6);
    kop.copy(c, 8, 6, 30);
    c.writeUInt32LE(offset, 42);
    centraal.push(c, naamBuf);
    offset += kop.length + naamBuf.length + opgeslagen.length;
  }
  const centraalBuf = Buffer.concat(centraal);
  const eind = Buffer.alloc(22);
  eind.writeUInt32LE(0x06054b50, 0);
  eind.writeUInt16LE(bestanden.length, 8);
  eind.writeUInt16LE(bestanden.length, 10);
  eind.writeUInt32LE(centraalBuf.length, 12);
  eind.writeUInt32LE(offset, 16);
  return Buffer.concat([...lokaal, centraalBuf, eind]);
}

export const bouwOdp = (dias, titel) => zip(odpBestanden(dias, titel));

/**
 * Waar het .odp-bestand komt. Een bestaande map, of een pad dat op een
 * scheidingsteken eindigt, krijgt <slug>.odp; anders is het de bestandsnaam,
 * aangevuld met .odp.
 */
export function uitvoerPad(uitvoer, slug) {
  const pad = resolve(uitvoer || ".");
  if (!uitvoer || /[/\\]$/.test(uitvoer) || (existsSync(pad) && statSync(pad).isDirectory())) {
    return join(pad, `${slug}.odp`);
  }
  return pad.toLowerCase().endsWith(".odp") ? pad : `${pad}.odp`;
}
