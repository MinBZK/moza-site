import { test } from "node:test";
import assert from "node:assert/strict";
import { controleer, kenmerken } from "./regels.js";

test("beeld in een bundle herken je aan de bestandsnaam", () => {
  assert.deepEqual(kenmerken("content/actueel/bericht/foto.jpg"), ["foto.jpg"]);
});

test("beeld in assets of static herken je aan het pad, in de beeldbank ook aan het pad daarbinnen", () => {
  assert.deepEqual(kenmerken("static/images/logo.svg"), ["images/logo.svg"]);
  assert.deepEqual(kenmerken("assets/images/beeldbank/logos/kvk.png"), ["images/beeldbank/logos/kvk.png", "logos/kvk.png"]);
});

test("gebruikt beeld levert niets op, ongebruikt beeld wel", () => {
  const beelden = ["content/a/foto.jpg", "assets/images/beeldbank/logos/kvk.png", "static/images/oud.svg"];
  const teksten = ['<img src="foto.jpg">', '<img src="{{< beeld "logos/kvk.png" >}}">'];
  assert.deepEqual(controleer(beelden, teksten, []), { ongebruikt: ["static/images/oud.svg"], overbodig: [] });
});

test("een verwijzing via afbeelding-url telt ook", () => {
  const teksten = ['{{< afbeelding-url pagina="/actueel/bericht" bestand="foto.jpg" >}}'];
  assert.deepEqual(controleer(["content/actueel/bericht/foto.jpg"], teksten, []).ongebruikt, []);
});

test("door een script beheerde iconen tellen niet mee", () => {
  assert.deepEqual(controleer(["static/images/icons/menu.svg"], [], []).ongebruikt, []);
});

test("de negeerlijst houdt ongebruikt beeld buiten de uitkomst", () => {
  const negeren = [{ pad: "static/images/oud.svg", reden: "Bewaard voor de nieuwe huisstijl" }];
  assert.deepEqual(controleer(["static/images/oud.svg"], [], negeren), { ongebruikt: [], overbodig: [] });
});

test("een regel zonder reden, voor gebruikt beeld of voor een verdwenen bestand is overbodig", () => {
  const negeren = [
    { pad: "static/images/a.svg", reden: "" },
    { pad: "static/images/b.svg", reden: "Toch weer in gebruik" },
    { pad: "static/images/weg.svg", reden: "Bestaat niet meer" },
  ];
  const { overbodig } = controleer(["static/images/a.svg", "static/images/b.svg"], ["images/b.svg"], negeren);
  assert.deepEqual(overbodig, ["static/images/a.svg", "static/images/b.svg", "static/images/weg.svg"]);
});
