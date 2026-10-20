import { test } from "node:test";
import assert from "node:assert/strict";
import { checkTerugdraai } from "./regels.js";

const PAD = "assets/css/components/actueel.css";

/** Bouwt de invoer zoals controleer.js die uit git haalt. */
function bestand(klaar, huidig, versies) {
  return {
    [PAD]: {
      klaar,
      huidig,
      geschiedenis: versies.map(([kort, blob]) => ({
        sha: `${kort}0000`,
        kort,
        datum: "2026-10-17",
        onderwerp: `Commit ${kort}`,
        blob,
      })),
    },
  };
}

test("terugdraai: inhoud gelijk aan een oudere versie wordt gemeld", () => {
  const findings = checkTerugdraai(bestand("oud", "nieuw", [["60c7412", "nieuw"], ["98f55b3", "oud"]]));
  assert.equal(findings.length, 1);
  assert.match(findings[0], /98f55b3/);
});

test("terugdraai: nieuwe inhoud levert geen melding", () => {
  const findings = checkTerugdraai(bestand("verser", "nieuw", [["60c7412", "nieuw"], ["98f55b3", "oud"]]));
  assert.deepEqual(findings, []);
});

test("terugdraai: ongewijzigde inhoud levert geen melding", () => {
  const findings = checkTerugdraai(bestand("nieuw", "nieuw", [["60c7412", "nieuw"]]));
  assert.deepEqual(findings, []);
});

test("terugdraai: de meest recente oudere versie wordt genoemd", () => {
  const findings = checkTerugdraai(
    bestand("oud", "nieuw", [
      ["60c7412", "nieuw"],
      ["927dfcf", "oud"],
      ["98f55b3", "oud"],
    ])
  );
  assert.match(findings[0], /927dfcf/);
});

test("terugdraai: elk bestand krijgt zijn eigen melding", () => {
  const perBestand = {
    ...bestand("oud", "nieuw", [["60c7412", "nieuw"], ["98f55b3", "oud"]]),
    "assets/css/rapportages.css": {
      klaar: "oud2",
      huidig: "nieuw2",
      geschiedenis: [{ sha: "ab55c600", kort: "ab55c60", datum: "2026-09-25", onderwerp: "Eerder", blob: "oud2" }],
    },
  };
  assert.equal(checkTerugdraai(perBestand).length, 2);
});
