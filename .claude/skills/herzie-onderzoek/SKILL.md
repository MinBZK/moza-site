---
name: herzie-onderzoek
description: Gebruik bij het bijwerken van het toegankelijkheidsonderzoek en de verklaring, bijvoorbeeld na een nieuwe toetsronde of bij de jaarlijkse actualisering.
---

# Toegankelijkheidsonderzoek herzien

Het rapport in `content/documenten/toegankelijkheid/onderzoek-2026.md` onderbouwt
de verklaring in [het register](https://www.toegankelijkheidsverklaring.nl/register/28557).
Een fout erin kost de status van de verklaring, dus werk stap voor stap en
verzin niets: elk getal en elk versienummer komt uit een bron die je hebt
opgehaald.

Lees eerst `.claude/rules/toegankelijkheidsrapport.md`.

## 1. Bepaal waarom je herziet

Vraag de gebruiker welke van de drie het is, want dat bepaalt de rest:

- **Nieuwe bevindingen** uit een toets of een melding. Dan komt er een ronde en
  komen er bevindingen bij.
- **Jaarlijkse actualisering.** Status A en B vervallen naar D als de verklaring
  een jaar niet is bijgewerkt. Vaak zijn er dan geen nieuwe bevindingen, maar
  wel verouderde versienummers.
- **Nieuw volledig onderzoek.** Dan wordt het een nieuw bestand
  `onderzoek-<jaar>.md` en een nieuwe hoofdversie.

## 2. Draai de tweede engine

Onze eigen controles draaien op axe-core. Een tweede engine vindt dingen die
axe niet ziet, zoals de overerving van ARIA-rollen; zo kwam bevinding 16 boven
water. Gebruik de
[wcag-reporter](https://gitlab.com/digilab.overheid.nl/research/wcag-reporter)
van Digilab, die axe-core en Siteimprove Alfa naast elkaar zet en een
WCAG-EM-rapport oplevert.

Praktische zaken, uit de ronde van september 2026:

- Het project gebruikt Bun. Zonder Bun werkt `npm install --legacy-peer-deps`
  ook; zonder die vlag botst `eslint-plugin-import` op eslint 10.
- Zonder LLM-sleutel werkt de pijplijn gewoon: de paginaselectie valt terug op
  een heuristiek. Alleen de LLM-oordelen en de Nederlandse verhalende teksten
  blijven leeg. Die heb je niet nodig; de bevindingen komen uit de engines.
- De SSRF-beveiliging blokkeert `127.0.0.1`, dus je kunt niet tegen een lokale
  build toetsen. Toets de live site, en controleer eerst of de wijzigingen die je
  wilt meten daar al op staan.
- `POST /api/check` toetst één URL zonder de hele wizard. Handig om een eigen
  steekproef samen te stellen.
- Noteer welke Chrome de tool gebruikt: die zit in zijn eigen `node_modules`
  en is een andere dan die van onze build.

**Verwacht een valse melding.** Alfa kent `light-dark()` niet, de CSS-functie
waarin onze kleurtokens zijn geschreven. Hij kan de achtergrondkleur dan niet
bepalen, neemt de pagina-achtergrond en meldt te weinig contrast waar het
contrast in orde is. Reken na in de browser voordat je iets aanpast. Dit is
gemeld bij Siteimprove; controleer of het inmiddels is opgelost.

## 3. Werk de inhoud bij

Bij nieuwe bevindingen:

1. Voeg een ronde toe aan de tabel in "De handmatige toetsing", en pas de zin
   erboven aan die het aantal rondes noemt.
2. Voeg de bevindingen toe in dezelfde vorm als de bestaande: criterium, waar,
   gevolg, maatregel, status. Nummer door.
3. Verwijs vanuit de oordeelstabel naar elke nieuwe bevinding.
4. Los de bevinding ook echt op, in een eigen PR. Een rapport dat een oplossing
   beschrijft die nog niet gemerged is, is onwaar op het moment dat het
   gepubliceerd wordt.

## 4. Loop de checklist van DigiToegankelijk langs

Deze punten verouderen vanzelf. Controleer ze alle vier, ook als er geen nieuwe
bevindingen zijn:

- **Versienummers van browsers en hulptechnologie.** Geen jaartallen, geen "de
  laatste versie". Zoek de werkelijke releases op bij de leverancier; voor de
  browser van de automatische controles staat het nummer in
  `node_modules/puppeteer-core/lib/puppeteer/revisions.js` en voor de tweede
  engine in de `node_modules` van de gebruikte tool.
- **Gebruikte technologieën.** Het rapport stelt dat JavaScript niet nodig is om
  de content te gebruiken. Controleer dat met een build en een browser waarin
  JavaScript uit staat voordat je die zin laat staan.
- **Versies van de controletools**: pa11y, HTML_CodeSniffer, axe-core, en Alfa
  uit de wcag-reporter. Haal ze uit `package.json` en `node_modules`, niet uit
  je geheugen.
- **Aantallen.** De samenvatting telt de succescriteria per oordeel en het aantal
  bevindingen. `content/toegankelijkheid.md` herhaalt die aantallen in woorden.
  Tel na, op beide plekken.

## 5. Verhoog het versienummer

In de tabel bovenin, met de datum van die versie erbij. Een herziening is een
tiende erbij, een nieuw volledig onderzoek een hele. De pre-commit hook
`rapport-versie` blokkeert een commit die het rapport wijzigt zonder dit te doen.

De datum is de publicatiedatum, niet de dag waarop je begon. Schuift het mergen
op, schuif dan de datum mee.

## 6. Controleer en publiceer

```bash
just checks
```

Daarna, samen met de gebruiker:

- Werk de verklaring in het register bij, en het label-SVG als de status wijzigt.
  `npm run check-label` vergelijkt het label met de verklaring.
- Registreer de **directe link** naar het rapport, niet naar
  `/toegankelijkheid/`. Een algemene toegankelijkheidspagina of een
  overzichtspagina wordt afgekeurd.
- Zet een herinnering voor over een jaar.

## Wat er niet in hoort

Geen namen van personen. De onderzoeker staat als team vermeld; een persoonsnaam
hoort hooguit in de indiening, niet op de site.
