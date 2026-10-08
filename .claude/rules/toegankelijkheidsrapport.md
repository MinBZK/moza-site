# Toegankelijkheidsonderzoek

`content/documenten/toegankelijkheid/onderzoek-2026.md` is geen gewone
contentpagina. Het is de onderbouwing onder de toegankelijkheidsverklaring in
[het landelijke register](https://www.toegankelijkheidsverklaring.nl/register/28557)
en heeft daarmee een juridische functie. Hetzelfde geldt voor
`content/toegankelijkheid.md`, de verklaring zelf.

Voor een hele herziening is er de skill `/herzie-onderzoek`, die de stappen
hieronder in volgorde langsloopt.

## Bij elke inhoudelijke wijziging

- **Verhoog het versienummer** in de tabel bovenin, en zet de datum van die
  versie erbij. Het gepubliceerde rapport begon op 1.0; een herziening is 1.1,
  een nieuw onderzoek 2.0. Concepten die de PR niet verlaten krijgen geen eigen
  nummer. De pre-commit hook `rapport-versie` blokkeert een commit die het
  rapport wijzigt zonder dit te doen; is de wijziging niet inhoudelijk, dan sla
  je hem over met `LEFTHOOK_EXCLUDE=rapport-versie`.
- **Houd de aantallen kloppend.** De samenvatting telt de succescriteria en de
  bevindingen; `content/toegankelijkheid.md` herhaalt die aantallen in woorden.
  Wijzigt er één, wijzig dan alle.
- **Verwijs vanuit de oordeelstabel** naar elke nieuwe bevinding, en andersom.

## De checklist van DigiToegankelijk

Het rapport moet aan vijftien punten voldoen, anders wordt de verklaring
afgekeurd. Deze punten verlopen of verouderen vanzelf:

- **Versienummers van browsers en hulptechnologie** moeten echte releases zijn,
  geen jaartallen en niet "de laatste versie". De browser van de automatische
  controles verandert bij elke bump van Puppeteer; het nummer staat in
  `node_modules/puppeteer-core/lib/puppeteer/revisions.js`.
- **Gebruikte technologieën** moeten blijven kloppen. Het rapport stelt dat
  JavaScript niet nodig is om de content te gebruiken. Voegt een wijziging een
  functie toe die zonder JavaScript wegvalt, werk dat hoofdstuk dan bij.
- **Het onderzoek mag maximaal drie jaar oud zijn**, en status A of B vervalt
  naar D als de verklaring niet minstens jaarlijks wordt bijgewerkt.

## Wat niet in het rapport hoort

Geen namen van personen. De onderzoeker staat als team vermeld; de naam van een
persoon regelen we bij het indienen, niet op de site.
