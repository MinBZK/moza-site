---
title: "Toegankelijkheid"
---

## Toegankelijkheidsverklaring

Iedereen moet MijnOverheid Zakelijk kunnen gebruiken. Ook als je een schermlezer gebruikt, alleen met een toetsenbord werkt, of de tekst flink vergroot.

{{< toegankelijkheidslabel >}}

Het label komt uit [het landelijke register](https://www.toegankelijkheidsverklaring.nl/register/28557). Status C betekent: we hebben de eerste maatregelen genomen. Het label hoort bij de verklaring die nu in het register staat. We werken aan een nieuwe verklaring op basis van het onderzoek hieronder; zodra die is ingediend en goedgekeurd, verandert het label mee.

Deze verklaring gaat over de website mijnoverheidzakelijk.nl. De wettelijke norm is [WCAG](https://www.digitoegankelijk.nl/toegankelijkheid/en-301-549-en-wcag) 2.1 niveau AA, via de Europese norm EN 301 549 en het Tijdelijk besluit digitale toegankelijkheid overheid. Wij toetsen tegen [WCAG 2.2](https://www.w3.org/Translations/WCAG22-nl/), dat daar zes criteria bovenop legt.

In september en oktober 2026 hebben we de site onderzocht volgens WCAG-EM, de evaluatiemethode van het W3C. Alle 55 succescriteria van WCAG 2.2 niveau A en AA zijn beoordeeld, plus 4.1.1 Parsen uit WCAG 2.1 dat nog in de wettelijke norm staat: 56 in totaal. Daarvan voldoen er 40. De overige 16 gaan over zaken die op deze site niet voorkomen, zoals audio, video, formulieren en inloggen. Daarna heeft een tweede beoordelaar de tekstalternatieven nog eens getoetst, met JAWS en NVDA op Windows en met VoiceOver op macOS. Daarna is de steekproef nog eens automatisch getoetst met een tweede engine, die de overerving van ARIA-rollen uitleest. In oktober 2026 is de hele steekproef opnieuw doorgelopen met loep, een toetsinstrument in ontwikkeling bij [de Digitale Dienst](https://digitaledienst.overheid.nl/), en is elke melding met de hand nagelopen. Daarna is ons eigen onderzoek melding voor melding naast dat van loep gelegd, en zijn de presentaties volledig opnieuw op contrast gemeten: dia voor dia, ook de dia's die niet in beeld staan.

Er kwamen negenenveertig bevindingen uit, en die zijn alle opgelost. Wat er per bevinding aan de hand was, wie er last van had en wat we eraan gedaan hebben, staat in het [toegankelijkheidsonderzoek 2026](/documenten/toegankelijkheid/onderzoek-2026/).

## Hoe we het houden zoals het is

- Bij elke wijziging draait een geautomatiseerde toets over alle pagina's, met twee onafhankelijke engines, plus eigen controles op koppenvolgorde, tekstalternatieven bij diagrammen en de bedienbaarheid van presentaties.
- De pdf-downloads worden bij elke build gevalideerd tegen PDF/UA. Nul fouten is de eis, niet een streven. Zo'n validator kan niet alles zien: of een Engelse woordgroep ook als Engels gemarkeerd is, blijft mensenwerk.
- Een diagram zonder tekstalternatief laat de build falen.
- Nieuwe content gaat langs een redactionele review die let op begrijpelijkheid en taalniveau.
- We nemen toegankelijkheid mee tijdens het ontwerpen, niet als controle achteraf.

## Wat buiten het onderzoek viel

- Documenten van derden waarnaar we verwijzen, en de externe diensten die vanaf deze site bereikbaar zijn. Die financieren en ontwikkelen we niet, en ze vallen niet onder onze verantwoordelijkheid. Het Tijdelijk besluit digitale toegankelijkheid overheid zondert zulke content uit.
- Firefox, op één ronde na. We hebben getoetst met Edge, Chrome en Safari, en met NVDA op Windows en VoiceOver op macOS en iOS. In de ronde van de tweede beoordelaar is Firefox wel gebruikt, voor de tekstalternatieven.
- Twee oudere presentaties hebben JavaScript nodig om de dia's te tonen. De tekst staat wel in de pagina, maar je ziet hem niet als JavaScript uit staat. De nieuwere presentaties tonen dan alle dia's onder elkaar.

## Loop je ergens tegenaan?

[Neem dan contact met ons op](contact). Vertel kort waar je vastliep en welke hulpmiddelen je gebruikt. Dat helpt ons het probleem terug te vinden.

Kom je er met ons niet uit, dan kun je het melden bij [het meldpunt van DigiToegankelijk](https://www.digitoegankelijk.nl/meldpunt).

## De officiële verklaring

De volledige toegankelijkheidsverklaring staat in [het landelijke register](https://www.toegankelijkheidsverklaring.nl/register/28557).
