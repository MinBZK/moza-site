/**
 * Regels voor de controle op ongebruikt beeld (scripts/beeld/controleer.js).
 */

export const BEELD = /\.(png|jpe?g|webp|svg|gif|avif)$/i;

// Mappen die een script vult of beheert, en die op naam gebruikt worden.
export const OVERSLAAN = [
  // just nldd; de partial icon.html kiest het bestand op naam
  "static/images/icons/",
];

/**
 * Beeld dat bewust blijft staan, ook al verwijst er niets naar. Elke regel
 * heeft een reden. Een regel voor een bestand dat weer gebruikt wordt of niet
 * meer bestaat, laat de controle ook falen, zodat de lijst klopt.
 */
export const NEGEREN = [];

const BEELDBANK = "assets/images/beeldbank/";

/** De teksten waaraan je een verwijzing naar dit bestand herkent. */
export function kenmerken(pad) {
  if (pad.startsWith("content/")) return [pad.slice(pad.lastIndexOf("/") + 1)];
  const kenmerk = [];
  for (const map of ["assets/", "static/"]) {
    if (pad.startsWith(map)) kenmerk.push(pad.slice(map.length));
  }
  if (pad.startsWith(BEELDBANK)) kenmerk.push(pad.slice(BEELDBANK.length));
  return kenmerk;
}

/**
 * @param {string[]} beelden   paden van beeldbestanden
 * @param {string[]} teksten   inhoud van alle bestanden waarin verwezen kan worden
 * @param {{pad: string, reden: string}[]} negeren
 * @returns {{ongebruikt: string[], overbodig: string[]}}
 */
export function controleer(beelden, teksten, negeren = NEGEREN) {
  const alles = teksten.join("\n");
  const gebruikt = (pad) => kenmerken(pad).some((k) => alles.includes(k));
  const genegeerd = new Set(negeren.map((n) => n.pad));
  const kandidaten = beelden.filter((pad) => !OVERSLAAN.some((map) => pad.startsWith(map)));

  const ongebruikt = kandidaten.filter((pad) => !genegeerd.has(pad) && !gebruikt(pad));
  const overbodig = negeren
    .filter((n) => !n.reden?.trim() || !kandidaten.includes(n.pad) || gebruikt(n.pad))
    .map((n) => n.pad);
  return { ongebruikt, overbodig };
}
