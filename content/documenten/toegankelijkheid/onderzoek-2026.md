---
title: "Toegankelijkheidsonderzoek MijnOverheid Zakelijk 2026"
card_title: "Onderzoek 2026"
description: "Onderzoek naar de toegankelijkheid van MijnOverheid Zakelijk volgens WCAG-EM, getoetst aan WCAG 2.2 niveau A en AA."
date: 2026-09-05
download: true
toc_tot_en_met: 3
outputs:
  - HTML
  - markdown
  - pandoc
---

## Managementsamenvatting

**De uitkomst.** Alle 56 succescriteria van WCAG 2.2 niveau A en AA zijn
onderzocht. Van de 40 die op deze site van toepassing zijn, voldoen er 40. De
overige 16 gaan over zaken die hier niet voorkomen, zoals audio, video,
formulieren en inloggen. Er zijn negenenveertig bevindingen gedaan; die zijn alle
opgelost en nagemeten.

**Welke status daarbij hoort.** Het register kent vijf statussen, van A tot en
met E. Deze uitkomst onderbouwt **status A, voldoet volledig**: de site is
aantoonbaar volledig onderzocht en er staan geen fouten meer open.

**Wat er nu in het register staat.** De verklaring die daar nu staat, is nog de
oude, met status C. Die status zegt dat er eerste maatregelen zijn genomen maar
dat er nog geen volledig beeld was. Dat beeld is er met dit onderzoek wel. Zodra
de nieuwe verklaring is ingediend en goedgekeurd, verandert de status mee.

**Wat de status in stand houdt.** Twee dingen verlopen vanzelf. Een onderzoek
mag maximaal drie jaar oud zijn, dus dit onderzoek loopt tot september 2029. En
een verklaring met status A of B valt terug naar D als hij niet minstens
jaarlijks wordt bijgewerkt. Een site die niet verandert, houdt zijn status dus
niet vanzelf.

**Hoe het zo blijft.** Bij elke wijziging draait een geautomatiseerde toets over
alle pagina's, met twee onafhankelijke engines en eigen controles op
koppenvolgorde, tekstalternatieven en de bedienbaarheid van presentaties. Een
diagram zonder tekstalternatief laat de build falen. De pdf-downloads worden
gevalideerd tegen PDF/UA. Dat vangt niet alles: bij ongeveer een derde van de
succescriteria kan een tool fouten aanwijzen, en ook daar betekent geen melding
niet dat het criterium gehaald is. De rest blijft mensenwerk.

De onderbouwing per criterium staat in [Resultaten](#resultaten), wat er per
bevinding aan de hand was in [Bevindingen](#bevindingen).

## Over dit onderzoek

{{< table-without-header print-bijeen="ja" >}}
| Website | <https://mijnoverheidzakelijk.nl/> |
| Organisatie | Ministerie van Binnenlandse Zaken en Koninkrijksrelaties |
| Uitgevoerd door | Team MijnOverheid Zakelijk |
| Datum onderzoek | 5 september tot en met 19 oktober 2026 |
| Onderzoeksmethode | [WCAG-EM 1.0](https://www.w3.org/TR/WCAG-EM/), de evaluatiemethode van het W3C |
| Conformiteitsdoel | WCAG 2.2 niveau A en AA |
| Basisniveau toegankelijkheid | Windows met Edge en NVDA, macOS met Safari en VoiceOver, iOS met Safari en VoiceOver, Chrome op macOS, en bediening met alleen het toetsenbord. De versies staan in het hoofdstuk [Waarmee is getoetst](/documenten/toegankelijkheid/onderzoek-2026/#waarmee-is-getoetst). |
| Soort onderzoek | Volledig onderzoek |
| Geldig tot | 5 september 2029, drie jaar na de oudste meting |
| Versie van dit rapport | 1.1, 19 oktober 2026 |
{{< /table-without-header >}}

### Over het conformiteitsdoel

De wettelijke norm is op dit moment WCAG 2.1 niveau AA, via
[EN 301 549](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/) en het
[Tijdelijk besluit digitale toegankelijkheid overheid](https://wetten.overheid.nl/BWBR0040936). Wij toetsen tegen WCAG
2.2, dat daar zes succescriteria bovenop legt.

Eén verschil is de moeite waard om te noemen: 4.1.1 Parsen is in 2.2 vervallen,
maar maakt nog wel deel uit van de norm waaraan wij wettelijk moeten voldoen.
Dat criterium is daarom meegetoetst.

### Gebruikte technologieën

De site is gebouwd met HTML, CSS, SVG, WAI-ARIA en JavaScript. Diagrammen staan
als SVG in de pagina, niet als bitmap. De downloads gebruiken PDF, ODF en
Markdown; dat laatste is platte tekst, zonder opmaaklaag. Elke pagina is
daarnaast als Markdown op te vragen op haar eigen adres. Aan JavaScript gebruikt
de site Fuse.js voor het zoeken, Reveal.js in de twee oudere presentaties, en de
webcomponenten van het NLDD-ontwerpsysteem in de nieuwere presentaties. Die
webcomponenten zijn eigen HTML-elementen die hun inhoud pas in de browser
opbouwen.

Van deze technologieën zijn HTML, CSS, SVG en WAI-ARIA nodig om de content te
kunnen gebruiken. **Voor de gewone pagina's is JavaScript dat niet.** Alle
content staat in de HTML, de navigatie bestaat uit gewone links, en de
diagrammen zijn vooraf gerenderd. JavaScript voegt daar het zoeken, de
themawissel, het inklappen van de rechterkolom op smal scherm en de tooltip bij
de downloadknop aan toe. Valt het weg, dan blijven alle content en alle
navigatie bereikbaar; zoeken vervalt, en daarvoor zijn de menustructuur en de
kruisverwijzingen het alternatief.

**Voor de presentaties is JavaScript wel nodig om te kunnen bladeren.** Een
presentatie toont één dia tegelijk, en dat doet het script. Valt het weg, dan
tonen de vier nieuwere presentaties al hun dia's onder elkaar, als een gewone
pagina om doorheen te scrollen. Nagemeten op een venster van 1440 pixels: alle
dia's zichtbaar en de volledige tekst leesbaar. De twee oudere presentaties, die
op Reveal.js draaien, doen dat niet; daarover meer bij
[de beperkingen](#wat-buiten-dit-onderzoek-viel).

Omdat JavaScript nodig is om een presentatie als presentatie te gebruiken,
noemen we het hier als technologie waarop de site steunt. De norm staat dat toe,
zolang die technologie door hulpsoftware wordt ondersteund en je de conformiteit
beoordeelt met die technologie aan. Dat is hoe dit onderzoek is uitgevoerd. De
vier criteria die altijd voor de hele pagina gelden, ongeacht welke technologie
je nodig hebt, zijn apart nagelopen: 1.4.2 Geluidsbediening, 2.1.2 Geen
toetsenbordval, 2.2.2 Pauzeren, stoppen, verbergen en 2.3.1 Drie flitsen.

### Waarmee is getoetst

Dit is het basisniveau: de combinaties van besturingssysteem, browser en
hulptechnologie waartegen de conformiteit hieronder is vastgesteld.

| Besturingssysteem | Browser | Hulptechnologie | Waarvoor |
| --- | --- | --- | --- |
| Windows 11 | Edge 152.0.4191.66 | NVDA 2026.2 | Ronde 3, schermlezer |
| macOS Tahoe 26.6.2 | Safari 26.6 | VoiceOver | Ronde 3, schermlezer |
| macOS Tahoe 26.6.2 | Chrome 152.0.7977.83 | geen | Ronde 1, alleen het toetsenbord |
| macOS Tahoe 26.6.2 | Chrome 152.0.7977.83 | geen | Ronde 2 en 5 |
| iOS 26.6.1 | Safari 26.6 | VoiceOver | Ronde 3, schermlezer op mobiel |
| macOS Tahoe 26.6.2 | Chrome for Testing 154.0.8037.57, headless | geen | De automatische controles bij elke wijziging |
| macOS Tahoe 26.6.2 | Chrome for Testing 148.0.7778.97, headless | geen | Ronde 9, tweede automatische engine |
| macOS Tahoe 26.6.2 | Chromium (Chrome for Testing) 153.0.8010.12 | geen | Ronde 10, het doorlopen met loep |
| macOS Tahoe 26.6.2 | Chrome for Testing 154.0.8037.57, headless | geen | Ronde 11, het nameten |
{print-bijeen="ja"}

De versienummers van de rondes 1 tot en met 5 zijn die van 5 september 2026, de
peildatum van dat deel van het onderzoek. De rondes 9 tot en met 11 zijn in
oktober 2026 gedaan en hebben hun eigen versie in de tabel.
VoiceOver heeft geen eigen versienummer: het hoort bij de versie van macOS of
iOS die ernaast staat.

NVDA is een gratis schermlezer voor Windows; VoiceOver zit ingebouwd in macOS
en iOS. Beide lezen de pagina voor en laten je er met het toetsenbord doorheen
navigeren. JAWS is de meestgebruikte betaalde schermlezer op Windows.

Elke combinatie in deze lijst is ook echt doorlopen.

Ronde 8 staat bewust niet in deze tabel. Een tweede beoordelaar heeft daarin
richtlijn 1.1 Tekstalternatieven nagelopen met JAWS en NVDA op Windows en met
VoiceOver op macOS, maar de precieze versienummers van die software zijn niet
vastgelegd. Een basisniveau moet exact zijn, dus telt die ronde als een extra
lezing en niet als grondslag: elk oordeel in dit rapport is vastgesteld op een
combinatie uit de tabel hierboven. Ronde 8 bevestigde de uitkomsten en leverde
daarnaast de bevindingen 10 tot en met 15 op.

## Wat is onderzocht

Alle content op het hoofddomein, inclusief de Reveal.js-presentaties en de
gegenereerde downloads in .odt en .pdf. De site telt op het moment van
onderzoek 90 pagina's, verdeeld over zes secties.

Buiten de scope vallen de externe diensten waarnaar de site verwijst en de
inhoud van documenten van derden. Het Tijdelijk besluit digitale
toegankelijkheid overheid zondert die uit in artikel 2, lid 2, onderdeel e: van
derden afkomstige content die niet door de betrokken overheidsinstantie wordt
gefinancierd of ontwikkeld en evenmin onder haar verantwoordelijkheid valt.

## Steekproef

WCAG-EM vraagt drie onderdelen: een gestructureerde selectie, de complete
processen, en een willekeurige aanvulling die controleert of de gestructureerde
selectie representatief was.

### Gestructureerde steekproef

Veertien pagina's, gekozen op dekking van paginatypen, contenttypen en gebruikte
technieken.

| Pagina | Waarom in de steekproef |
| --- | --- |
| [/](/) | Hero met half-doorzichtige achtergrond, kaartenraster, zoeken, hoofdmenu, voettekst |
| [/handboek/](/handboek/) | Sectiepagina met kaartenraster |
| [/handboek/bijdragen/aan-handboek/](/handboek/bijdragen/aan-handboek/) | Enige pagina met een codeblok (syntaxkleuring) |
| [/onderwerpen/actualiteitenservice/](/onderwerpen/actualiteitenservice/) | Enige pagina met zowel een tabel als een diagram |
| [/onderwerpen/profielservice/](/onderwerpen/profielservice/) | Diagram en voetnoten |
| [/weekly/](/weekly/) | Lijstpagina met 36 samenvattingen |
| [/weekly/moza-weekly-20-mei-2026/](/weekly/moza-weekly-20-mei-2026/) | Langste artikel, met downloadknoppen |
| [/documenten/rapportages/statusrapport-moza-fase-3/](/documenten/rapportages/statusrapport-moza-fase-3/) | Eigen stylesheet, afwijkend van de rest van de site |
| [/documenten/presentaties/moza-pulse-2-december/](/documenten/presentaties/moza-pulse-2-december/) | Reveal.js-presentatie |
| [/documenten/presentaties/moza-introductie-kvk/](/documenten/presentaties/moza-introductie-kvk/) | Presentatie met de nieuwere opmaak: eigen layout en webcomponenten van het NLDD-ontwerpsysteem |
| [/documenten/intentieverklaring/](/documenten/intentieverklaring/) | Document met .odt- en .pdf-download |
| [/contact/](/contact/) | De meldroute uit de toegankelijkheidsverklaring |
| [/toegankelijkheid/](/toegankelijkheid/) | De toegankelijkheidsverklaring zelf |
| [/404.html](/404.html) | Foutpagina |

### Complete processen

Elk proces is van begin tot eind doorlopen, inclusief de alternatieve routes.

| Proces | Stappen |
| --- | --- |
| Zoeken | Paneel openen, zoekterm typen, resultaten doorlopen, resultaat openen, paneel sluiten |
| Document downloaden | Pagina openen, downloadknop bedienen, bestand openen in .odt en in .pdf |
| Presentatie bekijken | Openen, door de slides navigeren, presentatie sluiten |
| Thema wisselen | Wisselen tussen licht en donker, en terug |
{print-bijeen="ja"}

### Willekeurige steekproef

Twee pagina's: tien procent van de gestructureerde steekproef, naar boven
afgerond. Die telde bij deze trekking dertien pagina's; de presentatie met de
nieuwere opmaak is er in ronde 11 aan toegevoegd, omdat die toen voor het eerst
volledig is doorgemeten. Ze zijn willekeurig getrokken uit de zevenenzestig
pagina's die op dat moment nog niet in die steekproef zaten; de site telde toen
tachtig pagina's en inmiddels negentig.

| Pagina |
| --- |
| [/weekly/moza-weekly-27-mei-2026/](/weekly/moza-weekly-27-mei-2026/) |
| [/privacy/](/privacy/) |
{print-bijeen="ja"}

Op deze twee pagina's kwamen geen problemen naar voren die de gestructureerde
steekproef niet al liet zien. Die selectie was dus representatief.

## Werkwijze

**Geautomatiseerd, bij elke wijziging.** Elke wijziging aan de site wordt in de
CI-straat getoetst met [pa11y-ci](https://github.com/pa11y/pa11y-ci) 5.0.0 (pa11y
10.0.0), dat twee onafhankelijke engines inzet:
[HTML_CodeSniffer](https://squizlabs.github.io/HTML_CodeSniffer/) 2.6.0 en
[axe-core](https://github.com/dequelabs/axe-core) 4.13.0, tegen elke pagina uit
de build. axe-core staat bij het W3C op de lijst van
[implementaties van het ACT Rules Format](https://www.w3.org/WAI/standards-guidelines/act/implementations/),
net als Siteimprove Alfa 0.114.3 uit ronde 9. HTML_CodeSniffer staat daar niet op en
draait mee als tweede mening, niet als onderbouwing. De routelijst komt uit de build zelf,
zodat een nieuwe pagina automatisch meedoet. Daarnaast draaien eigen controles
op koppenvolgorde, op het tekstalternatief van diagrammen en op de
bedienbaarheid van de presentaties.

Een geautomatiseerde toets raakt ongeveer een derde van de succescriteria: daar
kan een tool fouten aanwijzen. Dat is iets anders dan vaststellen dat een
criterium gehaald is, want geen melding kan ook betekenen dat de tool het niet
kan zien. Elk oordeel in dit rapport is daarom met de hand beoordeeld op de
pagina's uit de steekproef, met de automatische toets als vangnet dat bij elke
wijziging meeloopt.

**Wat een tool hier niet kan.** Op vier pagina's meldt axe contrast dat het niet
kan berekenen, doordat de tekst op een half-doorzichtige achtergrond staat. Die
verhoudingen zijn met de hand nagerekend. In de presentaties kan geen enkele
scanner het contrast bepalen, omdat Reveal.js met transformaties en gelaagde
achtergronden werkt.

Een tool kan ook onterecht afkeuren. In ronde 9 meldde Alfa vijftien keer te
weinig contrast op de gekleurde labels in een rapportage. Onze kleurtokens zijn
geschreven als `light-dark(...)`, een CSS-functie die Alfa niet kent. Alfa kan de
achtergrondkleur dan niet bepalen, neemt de witte pagina-achtergrond en komt zo
op wit-op-wit uit. Nagerekend in de browser halen die labels 4,57 en 4,58, dus
boven de eis van 4,5. Dat is met een proef van drie identieke labels
vastgesteld: alleen de variant met `light-dark(...)` werd afgekeurd, dezelfde
kleur als losse waarde niet.

**Hoe we het borgen.** Naast het onderzoek zelf:

- Nieuwe content gaat langs een redactionele review, ondersteund door een
  taalcontrole die op begrijpelijkheid en taalniveau let. Dat gaat verder dan de
  norm vraagt: WCAG kent drie niveaus, A, AA en AAA, en
  [3.1.5 Leesniveau](https://www.w3.org/WAI/WCAG22/Understanding/reading-level)
  hoort bij AAA. Dit onderzoek toetst A en AA, dus dit is eigen beleid bovenop
  de eis.
- Elk diagram moet een tekstalternatief hebben. Ontbreekt dat, dan faalt de
  build.
- De toets draait bij elke wijziging, niet alleen bij oplevering.

### De handmatige toetsing

De toetsing liep niet criterium voor criterium, maar in elf rondes over de
hele steekproef. Eén ronde dekt meerdere criteria tegelijk, en per ronde is per
pagina vastgelegd wat opviel.

| Ronde | Wat er is gedaan | Dekt onder meer |
| --- | --- | --- |
| 1.&nbsp;Toetsenbord | Elke pagina doorlopen met alleen Tab, Shift-Tab, Enter, spatie en pijltjes: is alles bereikbaar, is elk element ook weer te verlaten, is de focus altijd zichtbaar, en volgt de volgorde de visuele volgorde | [2.1.1](https://www.w3.org/WAI/WCAG22/Understanding/keyboard), [2.1.2](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap), [2.1.4](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts), [2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order), [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible), [2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum), [3.2.1](https://www.w3.org/WAI/WCAG22/Understanding/on-focus) |
| 2.&nbsp;Vergroten | De tekst op 200% gezet, het venster versmald tot 320 CSS-pixels en de tekstafstand vergroot: valt er tekst weg, ontstaat er horizontaal scrollen, overlappen elementen | [1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text), [1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow), [1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing), [1.3.4](https://www.w3.org/WAI/WCAG22/Understanding/orientation) |
| 3.&nbsp;Schermlezer | De steekproef doorlopen met elke hulptechnologie uit het basisniveau: komt overeen wat er klinkt met wat er staat, worden statuswijzigingen aangekondigd, hebben knoppen een bruikbare naam | [1.3.1](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.3.2](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), [2.4.6](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels), [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value), [4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) |
| 4.&nbsp;Inhoud | De pagina's zonder hulpmiddel gelezen: zijn koppen en linkteksten op zichzelf begrijpelijk, beschrijven de alt-teksten wat het beeld zegt, dragen anderstalige passages een taalaanduiding | [1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), [2.4.4](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context), [2.4.6](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels), [3.1.2](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts) |
| 5.&nbsp;Kleur en contrast | Met de hand nagerekend wat de tool niet kon bepalen: half-doorzichtige achtergronden, focusranden, iconen en de presentaties. Ook gecontroleerd of informatie zonder kleur overkomt | [1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color), [1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) |
| 6.&nbsp;Documenten | De .odt- en .pdf-downloads geopend en gecontroleerd op leesvolgorde, koppen, taal en titel, en de PDF's gevalideerd tegen PDF/UA. De Markdown-uitvoer is dezelfde inhoud zonder opmaaklaag en is niet apart getoetst | [1.3.1](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.3.2](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), [2.4.2](https://www.w3.org/WAI/WCAG22/Understanding/page-titled), [3.1.1](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page) |
| 7.&nbsp;Processen | De vier complete processen van begin tot eind doorlopen, met toetsenbord én schermlezer | [2.4.5](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways), [3.2.3](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation), [3.2.4](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification), [3.2.6](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help) |
| 8.&nbsp;Tweede beoordelaar | Een tweede beoordelaar heeft richtlijn 1.1 Tekstalternatieven opnieuw getoetst op de aangepaste site, met JAWS en NVDA op Windows en met VoiceOver op macOS. Onderweg viel ook een aantal zaken op die bij andere criteria horen | [1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), [1.3.2](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), [2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order), [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) |
| 9.&nbsp;Tweede engine | De steekproef opnieuw automatisch getoetst met [wcag-reporter](https://gitlab.com/digilab.overheid.nl/research/wcag-reporter), dat axe-core en [Siteimprove Alfa](https://alfa.siteimprove.com/) naast elkaar zet. Alfa leest de overervingsboom van ARIA-rollen uit, waar axe dat voor DPUB-rollen niet doet | [1.3.1](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships) |
| 10.&nbsp;loep | De steekproef doorgelopen met [loep](https://github.com/NederlandseDigitaleDienst/loep), een toetsinstrument in ontwikkeling bij de [Digitale Dienst](https://digitaledienst.overheid.nl/), en elke melding met de hand nagelopen op de gebouwde site | [1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), [1.3.1](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color), [1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), [1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow), [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast), [2.1.4](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts), [2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order), [2.4.5](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways), [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible), [2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), [3.1.1](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page), [3.1.2](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts), [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) |
| 11.&nbsp;Nameten | Elke melding uit het loep-rapport die ronde 10 niet zelf had nagemeten alsnog op de gebouwde site gemeten: contrast in beide kleurschema's, reflow op 320 CSS-pixels, de tooltips, de toegankelijke namen van alle links naast hun bestemming, de rollen die een naam vereisen, de afhandeling van aanwijzers, en de taal in de downloads, en daarna dit rapport melding voor melding naast dat van loep gelegd; de presentaties zijn volledig opnieuw op contrast gemeten, ook de dia's die niet in beeld staan, en elk oordeel "niet van toepassing" is met een telling onderbouwd | [1.3.1](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), [1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text), [1.4.5](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text), [1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow), [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast), [1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus), [2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide), [2.4.2](https://www.w3.org/WAI/WCAG22/Understanding/page-titled), [2.4.4](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context), [2.4.6](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels), [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible), [2.5.2](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation), [2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name), [3.1.2](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts), [3.2.4](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification), [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) |

## Samenvatting

Van de 56 onderzochte succescriteria van niveau A en AA voldoet de site aan
alle 40 die van toepassing zijn. De overige 16 gaan over zaken die op deze site
niet voorkomen, zoals audio, video, formulieren en inloggen.

| | Aantal |
| --- | --- |
| Onderzochte succescriteria (A en AA) | 56 |
| Voldoet | 40 |
| Voldoet niet | 0 |
| Niet van toepassing | 16 |
| Niet onderzocht | 0 |
{print-bijeen="ja"}

Het onderzoek leverde negenenveertig bevindingen op. Die zijn alle opgelost en
nagemeten; wat er per bevinding aan de hand was staat verderop.

De eerste zestien komen uit de rondes 1 tot en met 9. De vijftien daarna komen
uit ronde 10, waarin de hele steekproef nog eens langs loep is gegaan. Die ronde
bracht ook een oordeel aan het licht dat in versie 1.0 niet klopte: 2.1.4 stond
op voldoet terwijl zoeken en de presentaties naar losse tekens luisterden. De
onderbouwing daar beschreef precies de redenering die het criterium afwijst.

De laatste achttien komen uit ronde 11. Daarin is elke melding van loep die nog
niet met eigen ogen was nagemeten alsnog op de gebouwde site gemeten. Twee
oordelen uit versie 1.0 bleken daarbij te stellig: 2.5.2 stond op voldoet op
grond van onze eigen code, terwijl de presentatiesoftware haar eigen pijlen wel
bij het neerzetten liet bladeren, en 1.4.13 stond op voldoet terwijl de tooltip
in presentatiemodus vanzelf verdween.

Van die achttien kwamen er vier uit een vergelijking van dit rapport met het
rapport van loep, melding voor melding. Daaruit bleek dat wij over een aantal
meldingen niets hadden opgeschreven, ook waar ze terecht waren. Eén kwam uit een
hermeting van het contrast in de presentaties, nadat bleek dat de eerdere meting
maar een deel van de tekst had kunnen zien. En één stond in versie 1.0 als
beperking opgeschreven in plaats van als bevinding: een pictogram dat in een PDF
noch als inhoud noch als versiering kwam te staan. Dat is nu opgelost en telt
daarom als bevinding. Vier meldingen
hebben we na onderzoek bewust laten staan; die staan in [Meldingen die we niet
hebben overgenomen](#meldingen-die-we-niet-hebben-overgenomen), zodat een lezer
kan zien dat ze bekeken zijn en waarom de uitkomst anders is.

Elk oordeel "niet van toepassing" is in deze versie onderbouwd met een telling
op de gebouwde site in plaats van met een bewering, zodat een lezer het kan
narekenen. Voor 2.2.2 betekende dat ook een andere telling: de vorige versie
telde video-, audio- en marquee-elementen, terwijl het criterium over alles gaat
wat beweegt of zich verversht. Nu is ook elke animatie, elke overgang en elke
tijdgebonden functie in de site geïnventariseerd.

## Resultaten

Oordeel per succescriterium. "Voldoet" betekent dat het is vastgesteld op de
pagina's uit de steekproef.

### 1 Waarneembaar

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| [1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | A | Niet-tekstuele content | Voldoet | Aanwezigheid van tekstalternatieven wordt automatisch bewaakt, de kwaliteit ervan met de hand. Ronde 4: alle 39 afbeeldingen nagelopen, zie [bevinding 9](#9-tekst-als-afbeelding-in-een-presentatie). Ronde 8: de tekstalternatieven opnieuw beoordeeld met JAWS, NVDA en VoiceOver; drie bevindingen, alle opgelost, zie [bevinding 10](#10-decoratieve-afbeeldingen-droegen-een-tekstalternatief), [11](#11-de-beschrijving-van-een-diagram-zat-in-de-naam) en [12](#12-de-downloadknop-bij-een-diagram-had-twee-namen-en-stond-te-vroeg). Ronde 10: vier diagrammen in de Pulse-presentaties en de beschrijving van de componentenplaat zeiden niet wat het beeld toont; opgelost, zie [bevinding 22](#22-het-tekstalternatief-beschreef-het-beeld-niet). Ronde 11: het toegankelijkheidslabel vertelde maar een deel van wat erin staat; opgelost, zie [bevinding 32](#32-het-toegankelijkheidslabel-vertelde-maar-een-deel-van-wat-er-staat) |
| [1.2.1](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded) | A | Louter-geluid en louter-videobeeld | Niet van toepassing | Geteld op de build van 17 oktober 2026 over 90 pagina's: nul `audio`- en `video`-elementen, en nul ingesloten vensters (`iframe`, `object`, `embed`) |
| [1.2.2](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded) | A | Ondertitels voor doven en slechthorenden | Niet van toepassing | Geteld op de build van 17 oktober 2026 over 90 pagina's: nul `audio`- en `video`-elementen, en nul ingesloten vensters (`iframe`, `object`, `embed`) |
| [1.2.3](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded) | A | Audiodescriptie of media-alternatief | Niet van toepassing | Geteld op de build van 17 oktober 2026 over 90 pagina's: nul `audio`- en `video`-elementen, en nul ingesloten vensters (`iframe`, `object`, `embed`) |
| [1.2.4](https://www.w3.org/WAI/WCAG22/Understanding/captions-live) | AA | Ondertitels voor doven en slechthorenden (live) | Niet van toepassing | Geteld op de build van 17 oktober 2026 over 90 pagina's: nul `audio`- en `video`-elementen, en nul ingesloten vensters (`iframe`, `object`, `embed`) |
| [1.2.5](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded) | AA | Audiodescriptie | Niet van toepassing | Geteld op de build van 17 oktober 2026 over 90 pagina's: nul `audio`- en `video`-elementen, en nul ingesloten vensters (`iframe`, `object`, `embed`) |
| [1.3.1](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships) | A | Info en relaties | Voldoet | Koppenvolgorde wordt automatisch bewaakt. In de ODF- en PDF-downloads kloppen koppen, lijsten en tabelkoppen; de PDF's zijn PDF/UA-conform, zie [bevinding 4](#4-de-pdf-downloads-haalden-pdfua-niet). Ronde 9: het voetnotenblok droeg een rol die niet bij zijn inhoud paste; opgelost, zie [bevinding 16](#16-het-voetnotenblok-droeg-een-rol-die-niet-bij-de-inhoud-paste). Ronde 10: een infoblok, de agendalabels en de genummerde reeksen droegen hun betekenis alleen in de opmaak; opgelost, zie [bevinding 18](#18-opmaak-droeg-betekenis-die-niet-in-de-structuur-stond). Ronde 11: het kaartenraster was geen lijst en de koppen van de weekly stonden een niveau te hoog; opgelost, zie [bevinding 35](#35-het-kaartenraster-was-geen-lijst). Ronde 11: tien kaarttitels stonden op hetzelfde niveau als de kop waar ze onder hangen, een tussenkop in een dia was een alinea, en het uitklapmenu op smalle schermen toonde een boom die in de code een platte lijst was; opgelost, zie [bevinding 46](#46-kaarttitels-stonden-naast-hun-kop-in-plaats-van-eronder) en [bevinding 47](#47-het-uitklapmenu-toonde-op-smalle-schermen-niet-de-structuur-die-het-liet-zien). Ronde 11: in een PDF kwam het pictogram van een uitgelicht blok noch als inhoud noch als versiering te staan, wat PDF/UA niet toelaat; opgelost, zie [bevinding 49](#49-het-pictogram-in-een-uitgelicht-tekstblok-kwam-ongetagd-in-de-pdf) |
| [1.3.2](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence) | A | Betekenisvolle volgorde | Voldoet | Ronde 6: de leesvolgorde in HTML, ODF en PDF volgt de bron. Alle content in de PDF's is gemarkeerd als artefact of als echte inhoud, zie [bevinding 4](#4-de-pdf-downloads-haalden-pdfua-niet). Ronde 8: de rechterkolom en de downloadknop bij een diagram stonden in de broncode op een andere plek dan in beeld; opgelost, zie [bevinding 12](#12-de-downloadknop-bij-een-diagram-had-twee-namen-en-stond-te-vroeg) en [13](#13-de-rechterkolom-kwam-pas-na-de-hele-tekst) |
| [1.3.3](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics) | A | Zintuiglijke eigenschappen | Voldoet | Ronde 4: de content doorzocht op instructies die alleen op vorm, kleur of plek leunen. Eén geval gevonden en opgelost, zie [bevinding 6](#6-een-instructie-leunde-alleen-op-vorm-en-plek) |
| [1.3.4](https://www.w3.org/WAI/WCAG22/Understanding/orientation) | AA | Weergavestand | Voldoet | De stylesheets bevatten geen enkele `orientation`-mediaquery, dus niets legt de weergavestand vast |
| [1.3.5](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose) | AA | Identificeer het doel van de input | Voldoet | Het zoekveld is het enige invoerveld en verzamelt geen persoonsgegevens; er is geen invoerdoel dat een `autocomplete`-waarde vraagt |
| [1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) | A | Gebruik van kleur | Voldoet | Automatisch gedekt; links in lopende tekst zijn onderstreept en niet alleen aan kleur te herkennen. Ronde 10: de componentenplaat droeg de status alleen in de randkleur; opgelost, zie [bevinding 19](#19-informatie-werd-alleen-met-kleur-overgebracht) |
| [1.4.2](https://www.w3.org/WAI/WCAG22/Understanding/audio-control) | A | Geluidsbediening | Niet van toepassing | Geteld op de build van 17 oktober 2026 over 90 pagina's: nul `audio`-elementen, en niets dat uit zichzelf geluid start |
| [1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | AA | Contrast (minimum) | Voldoet | Ronde 5: de 27 meldingen die de tool niet kon beoordelen zelf nagerekend door de half-doorzichtige lagen samen te stellen; alle 27 halen de eis, laagste 8,25:1. Ronde 10 vond vier plekken onder de eis; opgelost, zie [bevinding 20](#20-te-weinig-contrast-op-vier-plekken). Ronde 11: rode tekst in het donkere schema haalde de eis niet; opgelost, zie [bevinding 40](#40-te-weinig-contrast-in-het-donkere-kleurschema). De presentaties zijn in ronde 11 volledig opnieuw gemeten, omdat de meting uit ronde 5 alleen de dia in beeld kon zien en daarmee 148 van de 461 tekstelementen: nu alle 65 dia's, element voor element, met de opgegeven letterkleur tegen de achtergrond zoals die onder elke letter werkelijk gemeten is. Twintig plekken haalden hun eis niet; opgelost, zie [bevinding 48](#48-secundaire-tekst-in-de-presentaties-haalde-het-contrast-niet). Omdat een dia met het venster meeschaalt, bepaalt de vensterbreedte of tekst als groot telt en dus welke eis geldt; daarom is op 1920 en op 1280 CSS-pixels gemeten en geldt hier de strengste uitkomst. Laagste 4,50:1 voor gewone tekst en 3,04:1 voor grote tekst. Licht en donker geven in de presentaties hetzelfde resultaat: een presentatiepagina laadt geen themawissel en staat vast op een licht kleurschema, wat voor alle 928 vergeleken paren is bevestigd. De witte letters in het toegankelijkheidslabel halen de eis niet, maar dat is het voorgeschreven beeldmerk van het register en valt daarmee onder de uitzondering die het criterium voor beeldmerken maakt. De lichte letters in de plaat over het Federatief Datastelsel halen 4,75:1 tot 5,37:1, zie [de meldingen die we niet hebben overgenomen](#meldingen-die-we-niet-hebben-overgenomen) |
| [1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text) | AA | Herschalen van tekst | Voldoet | Ronde 2: geen overloop bij 200% tekst op de steekproef. Ronde 10 vond alsnog twee gevallen die ronde 2 had gemist, waaronder de hero die vanaf 125% tekst wegsneed; opgelost, zie [bevinding 17](#17-content-liep-over-bij-vergrote-tekst). Ronde 11: in de presentaties hief de schaal van een dia de vergroting precies weer op, zodat geen enkele manier om tekst te vergroten werkte; opgelost, zie [bevinding 37](#37-de-presentaties-groeiden-niet-mee-met-de-ingestelde-tekstgrootte) |
| [1.4.5](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text) | AA | Afbeeldingen van tekst | Voldoet | Ronde 4: twee slides bestonden volledig uit een afbeelding van lopende tekst; opgelost, zie [bevinding 9](#9-tekst-als-afbeelding-in-een-presentatie). De overige afbeeldingen zijn diagrammen, foto's of iconen. Het toegankelijkheidslabel bevat tekst in beeld, maar is het voorgeschreven beeldmerk van het register en valt onder de uitzondering voor beeldmerken; de volledige tekst staat sinds ronde 11 ook als tekst naast het beeld, zie [bevinding 32](#32-het-toegankelijkheidslabel-vertelde-maar-een-deel-van-wat-er-staat) |
| [1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow) | AA | Reflow | Voldoet | Ronde 2: geen horizontale overloop bij 320 CSS-pixels. Zes bevindingen zijn opgelost, zie [bevinding 1](#1-content-steekt-buiten-het-scherm-op-smalle-vensters). Ronde 10 vond negen plekken waar content overliep bij vergrote tekst; opgelost, zie [bevinding 17](#17-content-liep-over-bij-vergrote-tekst). Ronde 11: opnieuw gemeten op 320 CSS-pixels, zonder horizontale overloop. De ondertitel van de site blijft onder de 600 pixels bewust weg; het is een slogan zonder functie, de sitetitel blijft wel staan, en er gaat dus geen inhoud of functie verloren. Ronde 11: op 320 pixels liet het uitklapmenu alleen de secties zien en niet de pagina's eronder, tien links tegen eenentwintig op een breed scherm; opgelost, zie [bevinding 47](#47-het-uitklapmenu-toonde-op-smalle-schermen-niet-de-structuur-die-het-liet-zien) |
| [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | AA | Contrast van niet-tekstuele content | Voldoet | Ronde 5: elke focusrand op vijf pagina's gemeten, in beide kleurschema's. Eén bevinding, opgelost, zie [bevinding 2](#2-focusrand-onzichtbaar-in-de-voettekst). Laagste 4,97:1 tegen een eis van 3:1. Ronde 10: de sluitknop in de presentaties werd bij aanwijzen juist vager; opgelost, zie [bevinding 21](#21-de-sluitknop-werd-vager-als-je-hem-aanwees). Ronde 11: in de componentenplaat vertelt de rand van een vak de status van dat onderdeel, en de rand van een vak zonder status haalde 1,25:1; opgelost, zie [bevinding 44](#44-de-rand-van-een-vak-zonder-status-had-te-weinig-contrast). De overige randen in die plaat dragen geen betekenis en vallen buiten het criterium |
| [1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing) | AA | Tekstafstand | Voldoet | Ronde 2: geen verlies van content bij de voorgeschreven waarden. Ronde 10: de sitenaam in de balk viel bij ruimere tekstafstand weg; opgelost, zie [bevinding 17](#17-content-liep-over-bij-vergrote-tekst) |
| [1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus) | AA | Content bij hover of focus | Voldoet | De downloadknop bij een diagram toont bij hover en bij focus een tooltip met zijn naam. Die is te sluiten met Escape, blijft staan als je er met de aanwijzer naartoe gaat, en verdwijnt niet vanzelf. Eerder deed een `title`-tooltip dit werk; die toont de browser zelf en valt daarmee buiten dit criterium, maar hij was ook niet met het toetsenbord of op een aanraakscherm te bereiken, zie [bevinding 12](#12-de-downloadknop-bij-een-diagram-had-twee-namen-en-stond-te-vroeg). Ronde 11: in presentatiemodus verdween de tooltip terwijl je hem aanwees; opgelost, zie [bevinding 41](#41-de-tooltip-verdween-terwijl-je-hem-aanwees) |
{print-kolombreedtes="15% - - - 45%"}

### 2 Bedienbaar

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| [2.1.1](https://www.w3.org/WAI/WCAG22/Understanding/keyboard) | A | Toetsenbord | Voldoet | Ronde 1: alle bedienbare onderdelen zijn met Tab bereikbaar en met Enter of spatie te bedienen, inclusief de presentaties. Bedienbaarheid van de presentaties wordt daarnaast automatisch bewaakt |
| [2.1.2](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap) | A | Geen toetsenbordval | Voldoet | Ronde 1: geen val aangetroffen, ook niet in het zoekvenster of de presentatie. Automatisch bewaakt in de presentaties |
| [2.1.4](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts) | A | Enkel teken sneltoetsen | Voldoet | Ronde 10: zoeken luisterde naar `/` en de presentaties naar losse letters. Versie 1.0 van dit rapport beoordeelde dat ten onrechte als voldoende; de onderbouwing daar beschreef precies de redenering die het criterium afwijst. Opgelost, zie [bevinding 23](#23-sneltoetsen-bestonden-uit-losse-tekens). Sneltoetsen dragen nu een modifier |
| [2.2.1](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable) | A | Timing aanpasbaar | Niet van toepassing | Geen enkele pagina kent een tijdslimiet, sessie of aftelling. De site is statisch en bewaart geen sessie |
| [2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) | A | Pauzeren, stoppen, verbergen | Niet van toepassing | Geteld op de build van 18 oktober 2026, 95 HTML-bestanden: 90 pagina's, vier omleidingen en een foutpagina. Nul `video`-, `audio`-, `marquee`- en `blink`-elementen, nul elementen met `autoplay`, nul bewegende beeldbestanden en nul SMIL-animaties. Het criterium gaat niet alleen over media, dus is ook alles geïnventariseerd dat beweegt of zich verversht. Alle negen eigen overgangen en alle animaties van de presentatiesoftware komen pas na een handeling van de bezoeker, en de langste duurt 1,05 seconde. De enige beweging die vanzelf begint is het opkomen van een dia bij het laden: 0,25 seconde. Automatisch doorschuiven staat in geen van de presentaties aan. Niets verversht zichzelf: geen periodieke verzoeken aan de server, geen klok of teller op een pagina, en de vier omleidingen wachten nul seconden. In vierentwintig gerenderde diagrammen staat ongebruikte animatiecode uit Mermaid; geen enkel onderdeel draagt die klasse, dus er beweegt niets. Twee dingen vallen onder een uitzondering van het criterium zelf. De klok en de tijdmeter in het sprekersvenster werken per seconde bij, maar dat venster opent de spreker zelf en een tijdmeter zonder lopende tijd heeft geen functie. En zodra een presentatie video gaat gebruiken, wordt dit criterium van toepassing; de presentatiesoftware pauzeert video dan met een klik en met de spatiebalk |
| [2.3.1](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold) | A | Drie flitsen of beneden drempelwaarde | Niet van toepassing | Geteld op de build van 17 oktober 2026 over 90 pagina's: nul `video`-, `canvas`- en `marquee`-elementen. De enige animaties zijn dia-overgangen van hooguit een seconde |
| [2.4.1](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks) | A | Blokken omzeilen | Voldoet | De skiplink is de eerste tab-stop. Verplaatste de focus aanvankelijk niet; opgelost, zie [bevinding 3](#3-de-skiplink-verplaatste-de-focus-niet) |
| [2.4.2](https://www.w3.org/WAI/WCAG22/Understanding/page-titled) | A | Paginatitel | Voldoet | Alle 90 pagina's hebben een unieke, niet-lege titel. Ronde 6: de ODF- en PDF-downloads dragen dezelfde titel als documenteigenschap. Ronde 11: de Markdown-weergave van een pagina opent in een tabblad als platte tekst, waarin alleen het adres bovenaan het tabblad staat. Dat laten we zo, zie [de meldingen die we niet hebben overgenomen](#meldingen-die-we-niet-hebben-overgenomen) |
| [2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order) | A | Focus volgorde | Voldoet | Ronde 1: de focusvolgorde loopt gelijk aan de visuele volgorde, ook in het kaartenraster. Geen onverwachte sprongen. Ronde 8: de rechterkolom vormde hierop een uitzondering, want die werd pas na de hele tekst bereikt; opgelost, zie [bevinding 13](#13-de-rechterkolom-kwam-pas-na-de-hele-tekst). Ronde 10: in de presentaties kon een link in een onzichtbare dia focus krijgen; opgelost, zie [bevinding 24](#24-de-focus-bleef-achter-bij-een-dia-die-niet-in-beeld-stond). Ronde 11: het submenupaneel stond in de broncode los van zijn knop; opgelost, zie [bevinding 36](#36-het-submenupaneel-stond-los-van-zijn-knop-in-de-broncode) |
| [2.4.4](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context) | A | Linkdoel (in context) | Voldoet | Ronde 3: de linkenlijst uit de rotor doorgenomen. De knoppen "Lees meer" op de lijstpagina noemen de bijbehorende weekly, dus ze zijn uit elkaar te houden. Ronde 11: alle toegankelijke namen op de hele site zijn uitgelezen en vergeleken met hun bestemming. De downloadlinks onder de diagrammen heetten allemaal hetzelfde en het toegankelijkheidslabel droeg een naam van vijftig woorden; beide opgelost, zie [bevinding 38](#38-de-downloadlinks-onder-de-diagrammen-heetten-allemaal-hetzelfde) en [bevinding 32](#32-het-toegankelijkheidslabel-vertelde-maar-een-deel-van-wat-er-staat). De overige gelijknamige links staan in verschillende landmarks, waardoor hun doel uit de context blijkt. Ronde 11: met het menu open op een smal scherm stonden twee links met de naam "Over MOZa" naar verschillende pagina's; opgelost, zie [bevinding 47](#47-het-uitklapmenu-toonde-op-smalle-schermen-niet-de-structuur-die-het-liet-zien) |
| [2.4.5](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways) | AA | Meerdere manieren | Voldoet | Drie manieren om een pagina te bereiken: het hoofdmenu en het zoeken staan op alle 81 sitepagina's, en 62 pagina's dragen daarnaast een kruimelpad. Ronde 10: de overzichtspagina's stonden niet in de zoekindex; opgelost, zie [bevinding 25](#25-overzichtspaginas-waren-niet-te-vinden-met-zoeken) |
| [2.4.6](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels) | AA | Koppen en labels | Voldoet | Ronde 3: de koppenlijst uit de rotor vormt op zichzelf een bruikbare inhoudsopgave. Beschrijvendheid is niet automatisch vast te stellen. Na de aanpassingen herhaald met VoiceOver op iOS en met NVDA op Windows 11, zonder nieuwe bevindingen. Ronde 11: de kop "Ja," op de intentieverklaring is als enige kop niet beschrijvend, en blijft staan, zie [de meldingen die we niet hebben overgenomen](#meldingen-die-we-niet-hebben-overgenomen) |
| [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | AA | Focus zichtbaar | Voldoet | Ronde 5: elke focusrand gemeten. Ronde 1: de twee elementen die focus met een kleurwissel tonen in plaats van met een rand zijn met het oog beoordeeld en voldoen. Eén bevinding, opgelost, zie [bevinding 2](#2-focusrand-onzichtbaar-in-de-voettekst). Ronde 10 vond vier plekken zonder zichtbare focus; opgelost, zie [bevinding 26](#26-de-focus-was-op-vier-plekken-niet-te-zien). Ronde 11: in de inhoudsopgave van een lang document schoof een gefocuste link uit beeld; opgelost, zie [bevinding 34](#34-de-inhoudsopgave-schoof-de-gefocuste-link-uit-beeld) |
| [2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum) | AA | Focus niet bedekt (minimum) | Voldoet | Ronde 1: de focusrand raakte nergens achter de koptekst of het zoekvenster. Nieuw in WCAG 2.2 |
| [2.5.1](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures) | A | Aanwijzergebaren | Voldoet | De site gebruikt geen gebaren met een pad of met meerdere aanwijspunten; in de JavaScript komt geen `touchmove`, `pointermove` of sleepafhandeling voor |
| [2.5.2](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation) | A | Aanwijzerannulering | Voldoet | In de eigen code wordt geen enkele handeling op `mousedown`, `pointerdown` of `touchstart` uitgevoerd; een veegbeweging legt bij het neerzetten alleen het beginpunt vast. Ronde 11: de presentatiesoftware bleek haar eigen navigatiepijlen wel bij het neerzetten te laten bladeren; opgelost, zie [bevinding 43](#43-de-presentatie-bladerde-al-bij-het-neerzetten-van-een-vinger) |
| [2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name) | A | Label in naam | Voldoet | 2827 bedieningselementen nagelopen. Twee patronen weken af en zijn beoordeeld: de zoekknop toonde "Zoeken... /", waarin het beletselteken en de sneltoetshint geen label waren; sinds ronde 10 toont hij alleen nog "Zoeken", met de toetscombinatie in de tooltip en in `aria-keyshortcuts`. De sluitknop van een presentatie toont het teken ✕, dat geen uitspreekbaar label is. Ronde 11: de naam van het zoekveld begon niet met de zichtbare tekst; opgelost, zie [bevinding 33](#33-de-naam-van-het-zoekveld-begon-niet-met-de-zichtbare-tekst) |
| [2.5.4](https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation) | A | Bewegingsactivering | Niet van toepassing | Geen enkele functie reageert op het kantelen of schudden van het apparaat; er zijn nul luisteraars voor `devicemotion` en `deviceorientation` |
| [2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) | AA | Sleepbewegingen | Niet van toepassing | Geen enkele functie vraagt een sleepbeweging; er zijn nul luisteraars voor `dragstart` en nul schuifregelaars. Vegen in een presentatie heeft een knop en een toets naast zich. Nieuw in WCAG 2.2 |
| [2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) | AA | Grootte van het aanwijsgebied (minimum) | Voldoet | Alle aanwijsgebieden halen 24 bij 24 CSS-pixels, op links in lopende tekst na, waarvoor het criterium een uitzondering maakt. Eén link leek te klein maar omsluit een afbeelding van 692 bij 324 pixels, en dat is het werkelijke aanwijsgebied. Nieuw in WCAG 2.2. Ronde 10: de links in de rechterkolom raakten elkaar; opgelost, zie [bevinding 27](#27-aanwijsgebieden-raakten-elkaar-in-de-rechterkolom) |
{print-kolombreedtes="15% - - - 45%"}

### 3 Begrijpelijk

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| [3.1.1](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page) | A | Taal van de pagina | Voldoet | Alle 90 pagina's dragen een taalattribuut op `html`. Ronde 6: de ODF-downloads stonden op Engels; opgelost, zie [bevinding 5](#5-de-odf-downloads-stonden-op-engels). Ronde 10: de Markdown-uitvoer gaf geen taal mee; opgelost, zie [bevinding 28](#28-de-markdown-uitvoer-gaf-geen-taal-mee) |
| [3.1.2](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts) | AA | Taal van onderdelen | Voldoet | Ronde 4: alle 80 pagina's doorzocht op anderstalige passages. Ronde 10: de 10 pagina's die sindsdien zijn bijgekomen ook. Eén Engelse uitdrukking gemarkeerd; eigennamen en ingeburgerde vaktermen vallen onder de uitzondering. Ronde 7: de Engelse namen van de presentatiebediening zijn vertaald, zie [bevinding 8](#8-de-presentatiebediening-had-engelse-namen). Ronde 10 vond meer Engelse woordgroepen zonder eigen taalaanduiding; opgelost, zie [bevinding 29](#29-engelse-woordgroepen-stonden-onder-een-nederlandse-taalaanduiding). Ronde 11: de PDF-downloads namen die taalaanduiding niet over; opgelost, zie [bevinding 42](#42-de-pdf-downloads-gaven-de-taal-van-een-fragment-niet-door) |
| [3.2.1](https://www.w3.org/WAI/WCAG22/Understanding/on-focus) | A | Bij focus | Voldoet | Ronde 1: focus krijgen verandert nergens de context; menu's en panelen openen alleen op een handeling |
| [3.2.2](https://www.w3.org/WAI/WCAG22/Understanding/on-input) | A | Bij input | Voldoet | De site heeft één invoerveld, het zoekveld, en nergens een luisteraar op `change`. Het wijzigen van een besturingselement verandert geen context |
| [3.2.3](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation) | AA | Consistente navigatie | Voldoet | Het hoofdmenu staat op elke pagina in dezelfde volgorde: Home, Over MOZa, Actueel, Onderwerpen, Contact. Handboekpagina's voegen daar een submenu aan toe zonder die volgorde te wijzigen. Ronde 8: op de startpagina ontbrak de sitetitel als eerste stop; opgelost, zie [bevinding 14](#14-de-sitetitel-was-op-de-startpagina-geen-link) |
| [3.2.4](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification) | AA | Consistente identificatie | Voldoet | Terugkerende bediening draagt overal dezelfde naam. Gemeten over alle pagina's; alleen de zoekfilters en de submenuknoppen verschillen, en die benoemen per stuk iets anders. Ronde 11: de knop rechtsboven heette in de presentaties "Sluit presentatie" en in de rapportages "Naar MOZa site"; opgelost, zie [bevinding 45](#45-de-sluitknop-heette-niet-overal-hetzelfde) |
| [3.2.6](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help) | A | Consistente hulp | Voldoet | De contactpagina is vanaf elke pagina bereikbaar, zowel in het hoofdmenu als in de voettekst, steeds op dezelfde plek. Nieuw in WCAG 2.2 |
| [3.3.1](https://www.w3.org/WAI/WCAG22/Understanding/error-identification) | A | Foutidentificatie | Niet van toepassing | Geteld op de build van 17 oktober 2026: nul `form`-elementen op 90 pagina's. Het zoekveld is het enige invoerveld; het keurt geen invoer af en levert dus geen foutmelding om te identificeren |
| [3.3.2](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions) | A | Labels of instructies | Voldoet | De site heeft één invoerveld, het zoekveld, en dat draagt een label. Geen enkel invoerveld op de site is zonder label |
| [3.3.3](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion) | AA | Foutsuggestie | Niet van toepassing | Geteld op de build van 17 oktober 2026 over 90 pagina's: nul `form`-elementen. Het zoekveld is het enige invoerveld en keurt geen invoer af, dus er valt geen correctie voor te stellen |
| [3.3.4](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data) | AA | Foutpreventie (wettelijk, financieel, gegevens) | Niet van toepassing | De site kent geen transactie, bestelling, aanvraag of wijziging van gegevens. Er wordt niets verstuurd en niets bewaard |
| [3.3.7](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry) | A | Overbodige invoer | Niet van toepassing | Geteld op de build van 17 oktober 2026 over 90 pagina's: nul `form`-elementen, dus wordt nergens twee keer om dezelfde gegevens gevraagd. Nieuw in WCAG 2.2 |
| [3.3.8](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum) | AA | Toegankelijke authenticatie (minimum) | Niet van toepassing | De site kent geen inlog, account of afgeschermd deel. Alles is zonder aanmelden te lezen. Nieuw in WCAG 2.2 |
{print-kolombreedtes="15% - - - 45%"}

### 4 Robuust

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| [4.1.1](https://www.w3.org/WAI/WCAG22/Understanding/parsing) | A | Parsen | Voldoet | Automatisch gedekt. Vervallen in WCAG 2.2, maar nog onderdeel van de wettelijke norm 2.1. Het criterium gaat over de HTML. De Markdown-uitvoer is een export van diezelfde inhoud, bedoeld om te lezen en te hergebruiken, en geen apart document met een eigen opmaaktaal die geparseerd moet worden |
| [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | A | Naam, rol, waarde | Voldoet | Geen enkel bedieningselement zonder toegankelijke naam. Toestanden worden doorgegeven: 308 keer `aria-pressed`, 126 keer `aria-expanded`, 121 keer `aria-current`. Ronde 3: de themawissel en het openklapmenu kondigen hun nieuwe toestand hoorbaar aan. Ronde 8: de downloadknop bij een diagram droeg twee namen tegelijk; opgelost, zie [bevinding 12](#12-de-downloadknop-bij-een-diagram-had-twee-namen-en-stond-te-vroeg). Na de aanpassingen herhaald met VoiceOver op iOS en met NVDA op Windows 11, zonder nieuwe bevindingen. Ronde 10 vond vijf plekken zonder naam of met een tegenstrijdige toestand; opgelost, zie [bevinding 30](#30-namen-en-rollen-ontbraken-of-spraken-elkaar-tegen). Ronde 11: de oudere presentaties droegen een applicatierol zonder naam; opgelost, zie [bevinding 39](#39-de-presentaties-droegen-een-rol-zonder-naam) |
| [4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) | AA | Statusberichten | Voldoet | Ronde 3: de slidewissel in een presentatie wordt aangekondigd. Het zoeken kondigde geen status aan maar de volledige resultaten; opgelost, zie [bevinding 7](#7-zoeken-kondigde-de-resultaten-voor-in-plaats-van-de-status). Na de aanpassingen herhaald met VoiceOver op iOS en met NVDA op Windows 11, zonder nieuwe bevindingen |
{print-kolombreedtes="15% - - - 45%"}

## Bevindingen

Per bevinding: wat er aan de hand is, welk succescriterium het raakt, waar het
voorkomt, wat het gevolg is voor gebruikers, welke maatregel wordt genomen en
wanneer die klaar is.

### 1. Content steekt buiten het scherm op smalle vensters

#### Criterium

1.4.10 Reflow, en op twee plekken ook 1.4.4 Herschalen van tekst.

#### Waar

Zes gevallen op vijf pagina's uit de steekproef, gevonden bij 320
CSS-pixels breed en bij 200% tekstgrootte:

| Pagina | Wat | Overloop |
| --- | --- | --- |
| [/toegankelijkheid/](/toegankelijkheid/) | Het toegankelijkheidslabel, 692 pixels breed | 388px |
| [/documenten/rapportages/statusrapport-moza-fase-3/](/documenten/rapportages/statusrapport-moza-fase-3/) | De hele kaartopmaak | 184px |
| [/contact/](/contact/) | Een URL in een codefragment | 88px |
| [/onderwerpen/profielservice/](/onderwerpen/profielservice/) | Een lang samengesteld woord | 32px |
| [/onderwerpen/actualiteitenservice/](/onderwerpen/actualiteitenservice/) | Een linktekst bij 200% | 7px |
{print-bijeen="ja"}

#### Gevolg

Wie een smal scherm gebruikt of de tekst vergroot, moet horizontaal
scrollen om de tekst te kunnen lezen. Bij het label verdween een deel van de
afbeelding buiten beeld.

#### Oorzaak

Drie verschillende. Er was geen algemene maximumbreedte voor
afbeeldingen, waardoor een afbeelding met vaste afmetingen het venster oprekte.
Lange woorden en URL's braken niet af. En de rapportage-opmaak heeft een eigen
stylesheet die de sitebrede regels niet laadt en pas bij 900 pixels iets
aanpast.

#### Maatregel

Opgelost tijdens het onderzoek. Afbeeldingen krijgen een
maximumbreedte, lange woorden en URL's breken af, en de rapportage-opmaak heeft
een extra breekpunt gekregen waarin de koptekst onder elkaar valt en de
kaartinhoud mag krimpen.

#### Status

Afgerond. Nagemeten: geen overloop meer op de veertien pagina's uit
de steekproef, in alle drie de metingen.

### 2. Focusrand onzichtbaar in de voettekst

#### Criterium

1.4.11 Contrast van niet-tekstuele content.

#### Waar

Elke link in de voettekst, op alle pagina's, in het lichte kleurschema.

#### Gevolg

Wie met het toetsenbord navigeert, ziet in de voettekst niet meer
waar de focus staat. De rand was donkerblauw op de donkerblauwe achtergrond en
haalde 1,68:1, waar 3:1 de eis is.

#### Oorzaak

De voettekst had geen eigen focusregel en erfde daardoor de
sitebrede rand, die de linkkleur van het lichte schema gebruikt. De koptekst
heeft dezelfde donkerblauwe achtergrond en had die regel wel.

#### Maatregel

Opgelost tijdens het onderzoek. Links in de voettekst krijgen nu
een witte focusrand, net als in de koptekst.

#### Status

Afgerond. Nagemeten: 10,2:1.

### 3. De skiplink verplaatste de focus niet

#### Criterium

2.4.1 Blokken omzeilen.

#### Waar

Alle pagina's.

#### Gevolg

De link "Ga naar de inhoud" scrolde de pagina wel naar de inhoud,
maar de focus bleef op de link staan. Een schermlezer las daardoor niet de
inhoud voor, maar herhaalde dat de focus op een link stond. Wie verder tabde, kwam
weer in de koptekst terecht. Daarmee deed de enige voorziening om het menu over
te slaan niet wat hij belooft.

#### Oorzaak

Een sprong naar een fragment verplaatst de focus alleen als het doel
focusbaar is. `<main>` is dat van zichzelf niet.

#### Maatregel

Opgelost tijdens het onderzoek. `<main>` heeft `tabindex="-1"`
gekregen, waardoor de focus wel meeverhuist. De link kwam daarnaast tegen de
vensterrand te staan, waardoor zijn focusrand buiten beeld viel; die staat nu
een halve regel naar binnen.

#### Status

Afgerond. Nagemeten: de focus staat na activeren op
`main#main-content`.

### 4. De PDF-downloads haalden PDF/UA niet

#### Criterium

1.3.1 Info en relaties, en 1.3.2 Betekenisvolle volgorde.

#### Waar

Alle 37 gegenereerde PDF-bestanden.

#### Gevolg

Een schermlezer kon de structuur van deze documenten niet betrouwbaar volgen.
Waar de markering ontbreekt, kan hij niet bepalen of iets inhoud is of
decoratie, en valt hij terug op de volgorde waarin de tekst toevallig in het
bestand staat. Lijstitems droegen hun inhoud niet in een `LBody`, waardoor een
opsomming niet als opsomming overkwam.

#### Oorzaak

De PDF's worden afgedrukt door Chromium. Dat schrijft wel een tagstructuur en
een taal mee, maar laat vier dingen liggen: het markeert de paginavulling en het
briefhoofd niet als artefact, het schrijft nooit een `LBody` in een lijstitem,
het gebruikt structuurtypen die de PDF-standaard niet kent, en het geeft
linkannotaties geen beschrijving. Daarnaast leverde het externe-linkicoon, een
CSS-masker, een transparantiegroep op die tweemaal wordt aangeroepen.

#### Maatregel

Opgelost tijdens het onderzoek. Het icoon wordt niet meer meegeprint: in een
afdruk is elke link extern, dus het voegt niets toe. De naschrijfstap in
`scripts/downloads/pdf-metadata.js` vult de rest aan. Gemeten met veraPDF tegen
ISO 14289-1, over alle 37 documenten die de site toen telde:

| Regel | Was | Is | Wat er ontbrak |
| --- | --- | --- | --- |
| 7.1-5 | 700 | 0 | Koppeling van `Strong` en `Em` aan een standaardtype |
| 7.18.1-2 | 831 | 0 | Beschrijving bij een linkannotatie |
| 7.18.5-2 | 831 | 0 | Idem, tweede regel over dezelfde annotaties |
| 7.2-20 | 776 | 0 | Een `LBody` in elk lijstitem |
| 7.1-3 | 693 | 0 | Paginavulling en briefhoofd als artefact |
| 7.20-2 | 357 | 0 | Het externe-linkicoon als transparantiegroep |
| 7.2-43 | 3 | 0 | Tabelrijen met een ongelijk aantal kolommen |
| 5-1 | 37 | 0 | De PDF/UA-identificatie in de metadata |
{print-bijeen="ja"}

#### Status

Afgerond. Nagemeten: veraPDF verklaart 37 van de 37 bestanden conform aan
PDF/UA deel 1. `just pdfua` bewaakt dat en eist nul fouten.

Die controle dekt niet alles. PDF/UA vraagt wel dat een taalwisseling wordt
aangegeven, maar de validator kan alleen vaststellen dát er een taal bepaalbaar
is, niet of die klopt. Met een taal op het document als geheel slaagt elke
tekstregel. Of een Engelse woordgroep ook als Engels gemarkeerd is, blijft
mensenwerk; ronde 11 vond daar een fout, zie
[bevinding 42](#42-de-pdf-downloads-gaven-de-taal-van-een-fragment-niet-door).

### 5. De ODF-downloads stonden op Engels

#### Criterium

3.1.1 Taal van de pagina.

#### Waar

Alle 36 gegenereerde ODF-bestanden.

#### Gevolg

Elk Nederlands document bood zichzelf aan als Engelstalig. Een schermlezer die
dat volgt, leest Nederlandse tekst met een Engelse stem voor, wat vrijwel
onverstaanbaar is.

#### Oorzaak

De opmaaksjabloon `reference.odt` is afgeleid van de standaard van pandoc, en
die staat op Engels. Zonder expliciete taal erfde elk document dat.

#### Maatregel

Opgelost tijdens het onderzoek. De pandoc-aanroep geeft nu `lang=nl` mee.

#### Status

Afgerond. Nagemeten: `nl` in zowel `meta.xml` als `styles.xml`.

### 6. Een instructie leunde alleen op vorm en plek

#### Criterium

1.3.3 Zintuiglijke eigenschappen.

#### Waar

De pagina [/handboek/bijdragen/aan-handboek/](/handboek/bijdragen/aan-handboek/),
in de stappen om een pagina te bewerken.

#### Gevolg

De stap luidde "Klik op het potlood. Rechtsboven zie je een potlood-icoon om te
editen". Wie het icoon niet ziet, heeft niets om op te zoeken: er stond geen
naam bij, alleen een vorm en een plek op het scherm.

#### Oorzaak

De knop op GitHub heeft wel een naam, maar die stond niet in de instructie.

#### Maatregel

Opgelost tijdens het onderzoek. De stap noemt nu de knopnaam, met de vorm en de
plek als aanvulling in plaats van als enige aanwijzing.

#### Status

Afgerond.

### 7. Zoeken kondigde de resultaten voor in plaats van de status

#### Criterium

4.1.3 Statusberichten.

#### Waar

Het zoekvenster, op alle pagina's.

#### Gevolg

Bij elke toetsaanslag las de schermlezer de volledige inhoud van alle treffers
achter elkaar voor, als één doorlopende tekst. Hoeveel resultaten er waren, werd
niet gemeld. Wie zoekt, krijgt zo bij elke letter een lap tekst te horen en weet
nog steeds niet of er iets gevonden is.

#### Oorzaak

`aria-live="polite"` stond op de lijst met resultaten zelf. Die lijst wordt bij
elke toetsaanslag volledig vervangen, dus kondigde de browser de hele nieuwe
inhoud aan. Een live-regio wordt bovendien als platte tekst voorgelezen, waardoor
ook de lijststructuur wegviel.

#### Maatregel

Opgelost tijdens het onderzoek. De resultatenlijst is geen live-regio meer, zodat
hij zijn lijststructuur houdt en gewoon te doorlopen is. Daarnaast is er een
apart, visueel verborgen statusgebied met `role="status"` dat alleen het aantal
meldt: "4 zoekresultaten", of "Geen resultaten gevonden voor ..." als er niets is.

#### Status

Afgerond. Nagemeten: bij het zoeken op "handboek" meldt het statusgebied
"4 zoekresultaten" en draagt de lijst geen `aria-live` meer.

### 8. De presentatiebediening had Engelse namen

#### Criterium

3.1.2 Taal van onderdelen.

#### Waar

De navigatieknoppen in beide Reveal.js-presentaties.

#### Gevolg

Een schermlezer las <span lang="en">"previous slide"</span>,
<span lang="en">"next slide"</span>, <span lang="en">"above slide"</span>,
<span lang="en">"below slide"</span> en
<span lang="en">"Resume presentation"</span> voor. Op een pagina die zichzelf als Nederlands
aanbiedt, spreekt een Nederlandse stem die woorden fonetisch uit, wat
onverstaanbaar wordt. Een taalaanduiding is hier geen oplossing, want een
`aria-label` kan er geen dragen.

#### Oorzaak

De namen staan hardgecodeerd in de meegeleverde Reveal.js-bundel, die geen
instelling voor taal kent.

#### Maatregel

Opgelost tijdens het onderzoek. De namen worden na het initialiseren
overschreven met Nederlandse. Dat gebeurt in onze eigen code en niet in de
bundel, zodat een toekomstige update van Reveal.js mogelijk blijft.

#### Status

Afgerond. Nagemeten: "Vorige slide", "Volgende slide", "Slide hierboven",
"Slide hieronder" en "Presentatie hervatten".

### 9. Tekst als afbeelding in een presentatie

#### Criterium

1.1.1 Niet-tekstuele content, en 1.4.5 Afbeeldingen van tekst.

#### Waar

Twee slides in
[/documenten/presentaties/moza-pulse-7-oktober/](/documenten/presentaties/moza-pulse-7-oktober/),
met de conclusies uit het gebruikersonderzoek van fase 1.

#### Gevolg

Beide slides bestonden uit niets anders dan een schermafdruk van een slide:
twee kolommen lopende tekst, met kopjes en aanbevelingen, als pixels. De
alt-tekst luidde "Conclusie 1 uit gebruikersonderzoek fase 1" en gaf de inhoud
dus niet weer. Wie de afbeelding niet ziet, miste de hele conclusie. Wie
inzoomt of het lettertype aanpast, hield een wazig beeld.

#### Oorzaak

De slides kwamen uit een presentatie die in een ander programma was gemaakt en
zijn als afbeelding overgenomen.

#### Maatregel

Opgelost tijdens het onderzoek. De inhoud staat nu als echte tekst op vier
slides, met dezelfde kopjes en aanbeveling. Voor toekomstige presentaties geldt
dat tekst als tekst wordt opgenomen; dat staat in de reviewinstructies.

#### Status

Afgerond. Nagemeten: de presentatie bevat geen afbeeldingen van tekst meer.

### 10. Decoratieve afbeeldingen droegen een tekstalternatief

#### Criterium

1.1.1 Niet-tekstuele content.

#### Waar

Het Rijksoverheid-logo in de kop, en de sfeerfoto bovenaan de
startpagina.

#### Gevolg

NVDA las bovenaan de startpagina "banner oriëntatiepunt, Logo
Rijksoverheid, afbeelding" voor, gevolgd door een beschrijving van een
sfeerfoto. Beide zeggen niets wat er niet al als tekst staat: de sitenaam
staat ernaast en de titel staat over de foto heen. Het is ruis vóór de
eigenlijke inhoud.

#### Oorzaak

Beide afbeeldingen hadden een alt-tekst terwijl ze decoratief zijn.
De alt van de foto klopte bovendien niet: er stond "telefoon", terwijl het om
een tablet gaat.

#### Maatregel

Opgelost. Beide krijgen een lege alt, waarmee hulptechnologie ze
overslaat. Op de overige pagina's stond het logo al buiten de
toegankelijkheidsboom.

#### Status

Afgerond. Nagemeten: geen van beide komt nog in de
toegankelijkheidsboom voor.

### 11. De beschrijving van een diagram zat in de naam

#### Criterium

1.1.1 Niet-tekstuele content.

#### Waar

De vier onderwerpenpagina's met Mermaid-diagrammen, en de getekende
plaat bij de notificatiedienst.

#### Gevolg

De alt-tekst was de volledige beschrijving, tot ruim 350 tekens als
één zin. Een schermlezer leest dat in één keer voor, zonder dat je kunt
terugbladeren zoals bij gewone tekst. In de afbeeldingenlijst van een
schermlezer kreeg je die hele tekst te zien in plaats van een naam.

#### Oorzaak

De render hook zette `accDescr` in de alt. Bij de plaat van de
notificatiedienst wees `aria-labelledby` naar de titel én de beschrijving, die
daardoor samen de naam vormden.

#### Maatregel

Opgelost. `accTitle` is nu de naam, `accDescr` volgt als
verborgen tekst direct na het diagram, en is daarmee gewone tekst die je regel
voor regel kunt teruglezen. Bij de notificatiedienst is de beschrijving
losgetrokken met `aria-describedby`. In de PDF-download komt de beschrijving
achter de naam in het tekstalternatief van de figuur, omdat verborgen tekst
niet in een PDF terechtkomt. Een controle in de build eist voortaan dat de
beschrijving er is.

#### Status

Afgerond. Nagemeten: de langste naam is 58 tekens, de beschrijving
volgt als tekst, en in de PDF draagt de figuur naam en beschrijving samen.

### 12. De downloadknop bij een diagram had twee namen en stond te vroeg

#### Criterium

4.1.2 Naam, rol, waarde, en 1.3.2 Betekenisvolle volgorde.

#### Waar

De downloadknop bij elk diagram.

#### Gevolg

De knop droeg zowel `title` als `aria-label` met dezelfde tekst.
Dat is niet fout, maar wel dubbel onderhoud, en de `title` leverde een
muis-tooltip op die verder niets toevoegde. Daarnaast kwam de knop vóór het
diagram in de leesvolgorde, dus wie met het toetsenbord werkt kreeg eerst de
download aangeboden en pas daarna de tekening.

#### Oorzaak

De knop was met ARIA benoemd in plaats van met tekst, en stond in
de broncode boven de afbeelding omdat hij rechtsboven wordt getoond.

#### Maatregel

Opgelost. De naam komt nu uit verborgen tekst in de knop zelf,
`title` en `aria-label` zijn weg, en de knop staat na het diagram. De weergave
verandert niet, want de knop is absoluut gepositioneerd.

Daarmee verdween ook de tooltip, en daarmee de enige aanwijzing voor wie ziet
maar het pictogram niet herkent. Er is nu een eigen tooltip die bij hover én bij
focus verschijnt, zodat hij ook met het toetsenbord en op een aanraakscherm
bereikbaar is. Hij is puur visueel en staat buiten de toegankelijkheidsboom, want
de naam komt al uit de verborgen tekst. Omdat we hem zelf tekenen, valt hij wel
onder
[1.4.13 Content bij hover of focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus):
hij gaat dicht met Escape, blijft staan als je er met de aanwijzer naartoe
beweegt, en kent geen tijdslimiet.

#### Status

Afgerond. Nagemeten: één toegankelijke naam, de focus bereikt de knop
pas na het diagram, en de tooltip voldoet aan alle drie de eisen van 1.4.13.

### 13. De rechterkolom kwam pas na de hele tekst

#### Criterium

1.3.2 Betekenisvolle volgorde en 2.4.3 Focus volgorde.

#### Waar

Alle tekstpagina's met een inhoudsopgave, downloads of relevante
links.

#### Gevolg

Op een breed scherm staat die kolom rechtsboven, maar toetsenbord
en schermlezer bereikten hem pas na de hele tekst. Op een smal scherm was de
inhoudsopgave helemaal verborgen en stonden de downloads onderaan de pagina.

#### Oorzaak

De kolom stond in de broncode na het artikel, en werd met CSS naar
rechtsboven gehaald.

#### Maatregel

Opgelost. De kolom staat nu in de broncode direct na de titel, dus
de leesvolgorde volgt het beeld. Op een smal scherm klapt elk blok in achter
een knop in zijn eigen kop, zodat de inhoudsopgave daar ook beschikbaar is
zonder de pagina lang te maken.

#### Status

Afgerond. Nagemeten: op breed scherm staat alles op dezelfde plek
als voorheen, en de focus loopt nu inhoudsopgave, downloads, tekst, voettekst.

### 14. De sitetitel was op de startpagina geen link

#### Criterium

3.2.3 Consistente navigatie.

#### Waar

De koptekst, op de startpagina.

#### Gevolg

Op elke andere pagina is de sitetitel de eerste stop na de
skiplink; op de startpagina ontbrak die stop, waardoor de tab-volgorde daar
anders begon dan overal elders.

#### Oorzaak

De link werd weggelaten op de pagina waar hij naartoe wijst.

#### Maatregel

Opgelost. De sitetitel is overal een link; op de startpagina
draagt hij `aria-current="page"`, zodat hulptechnologie meldt dat je er al
bent.

#### Status

Afgerond. Nagemeten: de tab-volgorde begint op elke pagina en op
elke schermbreedte gelijk.

### 15. Kleine punten uit de tweede toets

#### Criterium

Geen succescriterium; dit zijn hygiënepunten die de tweede
beoordelaar onderweg noteerde.

#### Waar

Het zoekveld en emoji in lopende tekst.

#### Gevolg

De placeholder was "Zoeken..." met drie losse punten. Bij een hoge
interpunctie-instelling kan een schermlezer die als "punt punt punt"
voorlezen. Emoji in lopende tekst worden voorgelezen met hun eigen naam, wat
soms precies goed is en soms niet, bijvoorbeeld bij een gloeilamp die alleen
een tip markeert.

#### Maatregel

De placeholder is "Waar zoek je naar?" geworden. Voor emoji is
een shortcode toegevoegd waarmee je per geval kunt kiezen: een eigen label
voor hulptechnologie, of helemaal overslaan. Een kale emoji blijft de
standaard, en de bestaande content is niet gewijzigd.

#### Status

Afgerond voor het zoekveld. De keuze per emoji maken we bij
redactie van nieuwe content.

### 16. Het voetnotenblok droeg een rol die niet bij de inhoud paste

#### Criterium

[1.3.1 Info en relaties](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
(niveau A).

#### Waar

[/onderwerpen/profielservice/](/onderwerpen/profielservice/), de enige pagina
met voetnoten.

#### Gevolg

Hugo zet het voetnotenblok in een `div` met `role="doc-endnotes"`. Die rol erft
van `list` en eist daarom items als directe inhoud, maar in het blok staan een
scheidingslijn en een genummerde lijst. Hulptechnologie die de rol volgt,
kondigt een lijst aan die geen items bevat.

#### Maatregel

Opgelost. De rol wordt uit het voetnotenblok gehaald voordat de pagina wordt
opgebouwd. De rol naar de lijst zelf verplaatsen is gemeten en werkt niet: dan
gelden de items niet langer als lijstitems en komen er twee fouten in plaats van
één. Zonder de rol blijft een genummerde lijst over, en die draagt de relatie
tussen de noten al.

Onderweg bleek dat het blok helemaal geen naam had. Wie de pagina beluistert
hoorde een scheidingslijn en dan een lijst, en moest uit de terugspringpijltjes
afleiden dat het om noten ging; de weggehaalde rol gaf die naam ook niet. Het
blok heeft daarom een kop "Voetnoten" gekregen, die ook in de inhoudsopgave in
de rechterkolom staat.

Twee controles in de build houden dit vast: één meldt een voetnotenblok dat de
rol nog draagt, en één meldt een layout die de paginainhoud niet langs de
correctie stuurt. Die tweede is nodig omdat de eerste pas aanslaat als er ook
echt een pagina met voetnoten door zo'n layout gaat.

#### Status

Afgerond. Nagemeten met Alfa op de gebouwde pagina: de bevinding is weg. De kop
staat in de toegankelijkheidsboom en in de inhoudsopgave.

### 17. Content liep over bij vergrote tekst

#### Criterium

[1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow) (niveau AA),
op twee plekken ook
[1.4.4 Herschalen van tekst](https://www.w3.org/WAI/WCAG22/Understanding/resize-text)
(niveau AA) en
[1.4.12 Afstand in tekst](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)
(niveau AA).

#### Waar

Negen plekken, verspreid over de hele site: de sitenaam in de balk, de hero op
de startpagina, de kop van een infoblok, de subnavigatie van het handboek, de
kaart in het kaartenraster, [/actueel/](/actueel/), de inhoudsopgave in de
rechterkolom, de roadmaptabel en de brede tabellen in de rapportages.

#### Gevolg

Bij 200 procent tekst, op een venster van 320 pixels of bij een vergrote
basislettergrootte liep content buiten het scherm. Soms viel tekst weg achter
een beletselteken, soms ging de hele pagina horizontaal schuiven, en bij de
roadmaptabel waren de rechterkolommen helemaal niet meer te bereiken omdat de
pagina niet meescrolde. Op de startpagina viel vanaf 125 procent 41 procent van
de kop weg en bij 150 procent de hele kop.

Negen keer dezelfde oorzaak. Een flexitem of een rasterspoor krimpt standaard
niet onder zijn min-content-breedte, doordat `min-width` op `auto` staat; bij
een raster betekent `1fr` namelijk `minmax(auto, 1fr)`. Groeit de tekst, dan
groeit die min-content mee en wordt het item breder dan het venster.

Twee dingen die onderweg bleken en niet vanzelf spreken. `overflow-wrap:
break-word` lost dit niet op: die eigenschap breekt wel de regel, maar verlaagt
de min-content-breedte niet. En een mediaquery in `em` helpt niet, want daar
gelden relatieve eenheden tegen de begingrootte van de browser en niet tegen de
ingestelde basislettergrootte.

#### Maatregel

Opgelost. Overal waar het kon staat `min-width: 0` of `minmax(0, 1fr)`, zodat
het item mag krimpen, met `overflow-wrap` om een lang woord af te breken. De
subnavigatie en het hoofdmenu wikkelen nu naar een tweede regel. De
inhoudsopgave schuift bij vergrote tekst boven het artikel in plaats van ernaast,
en de grens daarvoor staat in `rem` zodat hij de lettergrootte volgt. De
roadmaptabel gebruikt een containerquery, die wel met `rem` meeschaalt. Brede
tabellen staan in een schuifvlak dat met Tab bereikbaar is en een eigen naam
draagt; dat vervangt een eerdere oplossing die de tabel onder 40rem op `display:
block` zette en daarmee de tabelsemantiek brak.

#### Status

Afgerond. Nagemeten op 320, 360, 390, 480, 768 en 1024 pixels bij 16, 20, 24 en
32 pixels basislettergrootte: overal nul overloop. Bij 16 pixels zijn de
schermafdrukken gelijk aan die van voor de wijziging, dus het ontwerp is niet
veranderd.

### 18. Opmaak droeg betekenis die niet in de structuur stond

#### Criterium

[1.3.1 Info en relaties](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
(niveau A), waaronder
[faalcriterium F2](https://www.w3.org/WAI/WCAG22/Techniques/failures/F2).

#### Waar

De infoblokken met een titel, de agendalabels in 26 weeklies, en de genummerde
reeksen in de drie rapportages.

#### Gevolg

Drie keer stond betekenis alleen in de opmaak. Het infoblok was een
`blockquote`, een rol die zegt dat iemand anders aan het woord is, terwijl het
een mededeling van de site zelf is; de titel was een `span` en werd overgeslagen
door wie van kop naar kop springt. De labels onder Agenda stonden als
vetgedrukte alinea en vielen daarmee buiten de koppenstructuur. De 119 items in
de rapportages stonden als losse `div`-elementen met het nummer hard in de
tekst, zodat een schermlezer niet aankondigde hoeveel items er waren of het
hoeveelste je hoorde.

#### Maatregel

Opgelost. Het infoblok is een `div` met een echte kop geworden, op het juiste
niveau onder de omringende kop. De agendalabels zijn `h3` onder de `h2` Agenda,
op 52 plekken. De reeksen zijn 25 genummerde lijsten geworden, waarbij het
nummer uit de lijst zelf komt; losse cijfers naast een kaarttitel zijn voor
hulptechnologie verborgen.

#### Status

Afgerond. De koppencontrole in de build bevestigt de koppenvolgorde, en het
archetype en de redactieskill voor een nieuwe weekly schrijven de nieuwe vorm
voortaan voor.

### 19. Informatie werd alleen met kleur overgebracht

#### Criterium

[1.4.1 Gebruik van kleur](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)
(niveau A).

#### Waar

De componentenplaat in
[het plan voor fase 5](/documenten/rapportages/plan-moza-fase-5/), en links in
de presentaties.

#### Gevolg

De status van een onderdeel in de componentenplaat werd uitsluitend door de
randkleur gedragen. Met een deuteranopie-filter vallen Beschikbaar, Verkenning
en Aandachtspunt samen in vrijwel dezelfde olijftint: van de vier statussen
waren er dan nog twee te onderscheiden. In de presentaties waren links in
lopende tekst alleen aan hun kleur te herkennen.

#### Maatregel

Opgelost. De lijnstijl draagt de status nu mee, met een eigen betekenis: hoe
doorlopender de lijn, hoe verder het onderdeel is. Beschikbaar is doorgetrokken,
In aanbouw lang gestreept, Verkenning kort gestreept, en Aandachtspunt heeft een
eigen streep-punt-patroon. Alleen wat echt onaf is krijgt een onderbroken lijn,
zodat niets wat bestaat eruitziet als een concept. De links in de presentaties
zijn onderstreept.

#### Status

Afgerond. De vier statussen zijn ook met een kleurenblindheidsfilter uit elkaar
te houden, en de randkleuren halen 5,76 tot 5,79 in licht en 4,57 tot 4,60 in
donker.

### 20. Te weinig contrast op vier plekken

#### Criterium

[1.4.3 Contrast (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
(niveau AA).

#### Waar

De links Vorige en Volgende onder een reeks, de keuzes in het Weergave-menu, en
twee plekken in de presentaties.

#### Gevolg

Het label van de reekslinks haalde in het donkere schema 3,8:1, doordat er een
dekking van 0,7 overheen lag. De keuzes in het Weergave-menu kwamen in donker
niet verder dan 1,1:1. In de presentaties waren gedimde punten 2,3:1 en stond
het kruisje op zwart. De eis is 4,5:1 voor gewone tekst.

#### Maatregel

Opgelost. De dekking is weggehaald, waarmee de reekslinks op 7,25:1 komen, en de
kleuren in het Weergave-menu en in de presentaties zijn vervangen door tokens
die de eis halen.

#### Status

Afgerond. Nagemeten in de browser op de gebouwde site, in licht en in donker.

### 21. De sluitknop werd vager als je hem aanwees

#### Criterium

[1.4.11 Contrast van niet-tekstuele content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
(niveau AA).

#### Waar

Het kruisje rechtsboven in de presentaties.

#### Gevolg

Bij aanwijzen kreeg de knop een lagere dekking. Hij werd dus minder zichtbaar op
het moment dat je hem wilde gebruiken, precies omgekeerd aan wat aanwijzen
hoort te doen.

#### Maatregel

Opgelost. De knop wordt bij aanwijzen juist beter zichtbaar.

#### Status

Afgerond.

### 22. Het tekstalternatief beschreef het beeld niet

#### Criterium

[1.1.1 Niet-tekstuele content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
(niveau A).

#### Waar

De drie sequencediagrammen en de FSC-plaat in de Pulse-presentaties, de
stockfoto bij Demo, en de tekstbeschrijving van de componentenplaat in
[het plan voor fase 5](/documenten/rapportages/plan-moza-fase-5/).

#### Gevolg

De diagrammen in de presentaties droegen een alt die alleen de titel herhaalde.
Wie het beeld niet ziet, hoorde dus wel hoe het plaatje heet maar niet wat het
zegt. De stockfoto bij Demo is decoratief en werd toch voorgelezen. De
tekstbeschrijving van de componentenplaat noemde twee statussen verkeerd, liet
er vier weg, en noemde de zones en de teamlabels niet; dat is erger dan een
ontbrekende beschrijving, want de tekst sprak de plaat tegen.

#### Maatregel

Opgelost. De diagrammen beschrijven nu de actoren en de stappen. De stockfoto
heeft een lege alt gekregen. De beschrijving van de componentenplaat volgt de
plaat weer, inclusief de zones en de teamlabels.

#### Status

Afgerond. Een controle in de build laat de build falen als een diagram geen
tekstalternatief heeft.

### 23. Sneltoetsen bestonden uit losse tekens

#### Criterium

[2.1.4 Sneltoetsen voor één teken](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts)
(niveau A).

#### Waar

De schuine streep voor zoeken op de hele site, de letters f, p en s in de
NLDD-presentaties, en de reeks letters die Reveal.js zelf bindt in de
Pulse-presentaties.

#### Gevolg

Het criterium kent drie ontsnappingsroutes: de sneltoets uit kunnen zetten, hem
opnieuw kunnen toewijzen, of hem alleen laten werken als het onderdeel focus
heeft. Een controle op "staat de cursor in een invoerveld" is geen van de drie.
Wie spraakbediening gebruikt, stuurt losse tekens naar de pagina zonder dat er
een invoerveld in beeld is, en springt dan ongewild naar een andere dia of opent
het zoekvenster.

Dit stond in versie 1.0 van dit rapport als "voldoet". Die beoordeling was
onjuist: de onderbouwing beschreef precies de redenering die het criterium
afwijst.

#### Maatregel

Opgelost. Zoeken gaat nu met Ctrl plus K, of Cmd plus K op een Mac. De
presentatiefuncties luisteren naar Alt plus F, P en S, op macOS Option plus die
letters. Met een modifier valt een sneltoets buiten 2.1.4. Reveal.js krijgt per
toetscode een lege binding, waarmee alleen letters, cijfers en leestekens
vervallen; pijltoetsen, spatie, PageUp, PageDown, Home, End en Escape vallen
niet onder het criterium en blijven bladeren.

Omdat een sneltoets die je niet kunt zien net zo goed niet bestaat, hebben alle
functies ook een knop gekregen: drie in de balk van de NLDD-presentaties, twee
naast het kruisje in de Pulse-presentaties. De sneltoets staat in de naam van de
knop, die ook als tooltip verschijnt.

#### Status

Afgerond. Welke toetsen een binding hadden is vastgesteld door ze een voor een
in te drukken en de staat van de presentatie te meten.

### 24. De focus bleef achter bij een dia die niet in beeld stond

#### Criterium

[2.4.3 Focus volgorde](https://www.w3.org/WAI/WCAG22/Understanding/focus-order)
(niveau A).

#### Waar

Beide soorten presentaties.

#### Gevolg

In de gewone weergave kon een link in een onzichtbare dia focus krijgen. Je
tabde dan naar iets wat je niet zag. In de scrollweergave hielden elf dia's die
wel zichtbaar waren hun `aria-hidden`, zodat een schermlezer ze juist oversloeg.
De twee weergaven spraken elkaar dus tegen.

Daarnaast verdween de focus bij het kiezen van een thema. Gooit `localStorage`
een fout, bijvoorbeeld in een privévenster of met geblokkeerde site-data, dan
liep de afhandeling vast na het opslaan en bleven het sluiten van het menu en
het terugzetten van de focus achterwege.

#### Maatregel

Opgelost. Dia's die niet in beeld staan zijn `inert`, waarmee ze zowel uit de
tabvolgorde als uit de toegankelijkheidsboom verdwijnen. In de scrollweergave
wordt `aria-hidden` weggehaald. De themakeuze vangt de fout op en gaat verder,
zodat het menu sluit en de focus terugkeert, ook als er niets opgeslagen kan
worden.

#### Status

Afgerond. De bedienbaarheid van de presentaties wordt bij elke wijziging
automatisch getoetst, langs twee routes: de knop en de pijltoets.

### 25. Overzichtspagina's waren niet te vinden met zoeken

#### Criterium

[2.4.5 Meerdere manieren](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways)
(niveau AA).

#### Waar

De overzichtspagina's, zoals
[/documenten/presentaties/](/documenten/presentaties/).

#### Gevolg

Overzichtspagina's stonden niet in de zoekindex. Zoeken en navigeren zijn de
twee manieren waarop je deze site doorkomt; voor die pagina's bleef er dus maar
één over.

#### Maatregel

Opgelost. De overzichtspagina's staan nu in de index. De sectie met de
onderzoeken heet voortaan Toegankelijkheidsonderzoeken, zodat hij niet dezelfde
titel draagt als de verklaring zelf.

#### Status

Afgerond.

### 26. De focus was op vier plekken niet te zien

#### Criterium

[2.4.7 Focus zichtbaar](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)
(niveau AA).

#### Waar

Het zoekvenster, het Weergave-menu, en de knoppen in beide soorten
presentaties.

#### Gevolg

In het zoekvenster werd focus aangeduid met een andere achtergrondkleur. Dat
werkt niet, want het actieve zoekfilter heeft die kleur al: bij het aantabben
veranderde er niets zichtbaars. In het Weergave-menu en bij de knoppen in de
presentaties ontbrak een focusrand helemaal.

#### Maatregel

Opgelost. Alle vier de plekken hebben een echte focusrand gekregen, die ook in
het donkere schema voldoende contrast haalt.

#### Status

Afgerond. Nagemeten op de gebouwde site in licht en in donker.

### 27. Aanwijsgebieden raakten elkaar in de rechterkolom

#### Criterium

[2.5.8 Grootte van aanwijsgebied (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
(niveau AA).

#### Waar

De inhoudsopgave in de rechterkolom.

#### Gevolg

De ingesprongen links waren 19 pixels hoog met 3 pixels ertussen. Daarmee
raakten de aanwijsgebieden elkaar en was de eis van 24 pixels niet gehaald. Wie
minder precies kan aanwijzen, raakt dan makkelijk de verkeerde link.

#### Maatregel

Opgelost. De links zijn 26,4 pixels hoog geworden.

#### Status

Afgerond. Gemeten op de onderzoekspagina: 37 links, alle 26,4 pixels, op 1280 en
op 360 pixels breed.

### 28. De Markdown-uitvoer gaf geen taal mee

#### Criterium

[3.1.1 Taal van de pagina](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page)
(niveau A).

#### Waar

De Markdown-versie van elke pagina.

#### Gevolg

Platte tekst kent geen `lang`-attribuut, dus de taal moet uit de HTTP-kop komen.
Die ontbrak. Ook de tekensetregel werkte niet, doordat `text/markdown` niet in
de lijst stond waarop de server die regel toepast.

#### Maatregel

Opgelost. De server geeft taal en tekenset mee bij de Markdown-uitvoer.

#### Status

Afgerond. Getest tegen de echte server met de gebouwde site eronder, niet alleen
tegen de configuratie.

### 29. Engelse woordgroepen stonden onder een Nederlandse taalaanduiding

#### Criterium

[3.1.2 Taal van onderdelen](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts)
(niveau AA).

#### Waar

Engelse woordgroepen in Nederlandse lopende tekst, verspreid over de site.

#### Gevolg

Een Nederlandse schermlezerstem spreekt Engelse woorden fonetisch uit als er
geen andere taal is aangegeven. Het resultaat is vaak onverstaanbaar.

#### Maatregel

Opgelost. De fragmenten staan in een `span` met `lang="en"`, in de vorm die het
weekly-archief al gebruikte.

#### Status

Afgerond.

### 30. Namen en rollen ontbraken of spraken elkaar tegen

#### Criterium

[4.1.2 Naam, rol, waarde](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
(niveau A).

#### Waar

De voetnootlinks op
[/onderwerpen/profielservice/](/onderwerpen/profielservice/), het codeblok, de
sectienavigatie, het hoofdmenu, en de voortgangsbalk in de presentaties.

#### Gevolg

Voetnootverwijzingen heetten alleen een cijfer en de weg terug alleen een
pijltje. Het codeblok kan focus krijgen en schuift op een smal scherm, maar
droeg geen rol en geen naam. De sectie waar je in zit stond alleen in de opmaak.
Staat de site onder een sub-pad, zoals in een preview, dan kregen twee links in
het hoofdmenu `aria-current="page"` en noemde een schermlezer dus twee pagina's
de huidige. De voortgangsbalk in de presentaties sprong bij een klik naar een
andere dia, zonder rol, zonder naam en zonder toetsenbordbediening.

#### Maatregel

Opgelost. De voetnootlinks, het codeblok en de huidige sectie hebben een naam en
waar nodig een rol gekregen. Het hoofdmenu vergelijkt nu met de werkelijke URL
van de startpagina in plaats van met de letterlijke schuine streep. De
voortgangsbalk is een weergave geworden, zonder bediening.

#### Status

Afgerond. Naam en rol zijn nagemeten in de toegankelijkheidsboom.

### 31. Kleine punten uit deze ronde

#### Criterium

Geen succescriterium; dit zijn punten die onderweg opvielen.

#### Waar

Het zoekveld en de voettekst.

#### Gevolg

Zoeken werkte met een drempel die te ruim stond: het onzinwoord "plak" leverde
71 treffers op. Een resultatenlijst die altijd iets teruggeeft, helpt niemand
verder. En de voettekst noemde geen organisatie, terwijl de Rijkshuisstijl
vraagt dat een bezoeker ziet wie de site uitgeeft; het beeldmerk in de kop zegt
dat niet in woorden.

#### Maatregel

Opgelost. De zoekdrempel staat op 0,2, waarmee hetzelfde onzinwoord nul treffers
geeft terwijl echte termen en termen met een typefout blijven werken. De
afzender staat in de voettekst, uit één instelling, zodat een herindeling maar
op één plek hoeft te landen.

#### Status

Afgerond.

### 32. Het toegankelijkheidslabel vertelde maar een deel van wat er staat

#### Criterium

[1.1.1 Niet-tekstuele content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
(niveau A) en
[2.4.4 Linkdoel (in context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)
(niveau A).

#### Waar

Het toegankelijkheidslabel op [/toegankelijkheid/](/toegankelijkheid/).

#### Gevolg

In het beeld staat meer dan de alt vertelde: dat het ministerie wettelijk
verplicht is de site toegankelijk te maken, dat de status op een eigen
verklaring berust, en de datum waarop die voor het laatst is bijgewerkt. Die
tekst stond nergens anders op de pagina, dus wie het beeld niet ziet, miste hem.
Alles in de alt zetten kon niet: het beeld is het enige dat in de link staat,
dus de alt is ook de naam van die link, en een linknaam van vijftig woorden is
onbruikbaar in een lijst met links.

#### Maatregel

Opgelost. De alt is kort gebleven en dient als linknaam. De volledige tekst
staat als verborgen alinea naast het beeld, buiten de link, want daarbinnen zou
hij alsnog meetellen voor de naam. Dezelfde splitsing gebruikt de site al bij
diagrammen. De bijwerkdatum komt bij het bouwen uit het bestand zelf; ontbreekt
hij, dan faalt de build. Zo kan een nieuw label geen verouderde datum in de
beschrijving achterlaten.

#### Status

Afgerond. Nagemeten met de schermlezer.

### 33. De naam van het zoekveld begon niet met de zichtbare tekst

#### Criterium

[2.5.3 Label in naam](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name)
(niveau A).

#### Waar

Het zoekveld in het zoekvenster.

#### Gevolg

In beeld stond "Waar zoek je naar?", terwijl de naam voor hulptechnologie "Zoek
op de website" was. Wie met spraak bedient en zegt wat hij ziet staan, wordt dan
niet begrepen.

#### Maatregel

Opgelost. De naam is gelijkgetrokken met de zichtbare tekst.

#### Status

Afgerond.

### 34. De inhoudsopgave schoof de gefocuste link uit beeld

#### Criterium

[2.4.7 Focus zichtbaar](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)
(niveau AA).

#### Waar

De rechterkolom op lange documenten, zoals dit rapport.

#### Gevolg

De inhoudsopgave van een lang document is hoger dan het venster. Omdat de kolom
met de pagina meebewoog, viel een link die focus kreeg buiten beeld: in een
venster van 1280 bij 800 stonden dertien van de vijfendertig links na het
aantabben niet in zicht. Wie met het toetsenbord bedient, ziet dan niet waar hij
is.

#### Maatregel

Opgelost. De kolom blijft staan en heeft een eigen schuifvlak gekregen, met een
hoogte die meebeweegt met de ruimte die er werkelijk is. Alleen in CSS kon dat
niet: die kent de hoogte van de vastgeplakte stand, terwijl de kolom bovenaan de
pagina lager staat en dan onder de vouw zou doorlopen. De actieve link schuift
mee zodra die verandert, zodat de markering van de huidige sectie zichtbaar
blijft. Dat verzet alleen de schuifpositie van de kolom, nooit die van de
pagina. Van de vierenzestig pagina's met een rechterkolom houdt alleen dit
rapport een schuifvlak over; op de rest past de inhoudsopgave gewoon.

#### Status

Afgerond. Nagemeten bij verschillende venstergroottes en bij vergrote tekst.

### 35. Het kaartenraster was geen lijst

#### Criterium

[1.3.1 Info en relaties](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
(niveau A).

#### Waar

De kaartenrasters op onder meer de startpagina en de sectiepagina's, en de
koppen van de weeklies op [/actueel/](/actueel/).

#### Gevolg

De kaarten stonden als losse blokken naast elkaar. Een schermlezer kondigt dan
niet aan hoeveel er zijn en waar je in de reeks bent; in beeld is dat wel te
zien. Op Actueel stonden de koppen uit de weekly zelf op hetzelfde niveau als de
kaarttitels, waardoor de hiërarchie niet klopte met wat je ziet.

#### Maatregel

Opgelost. Het raster is een echte lijst geworden, met elke kaart als
lijstonderdeel. De koppen uit een weekly schuiven op Actueel twee niveaus op,
zodat ze onder hun eigen kaarttitel vallen.

#### Status

Afgerond.

### 36. Het submenupaneel stond los van zijn knop in de broncode

#### Criterium

[2.4.3 Focus volgorde](https://www.w3.org/WAI/WCAG22/Understanding/focus-order)
(niveau A).

#### Waar

Het uitklapbare submenu in de sectienavigatie.

#### Gevolg

Het paneel stond in beeld direct onder de knop die het opent, maar in de
broncode pas na de hele navigatie. Wie het paneel met het toetsenbord opende,
kwam met de volgende Tab niet in het paneel terecht maar verderop in het menu.

#### Maatregel

Opgelost. Het paneel staat nu in de broncode direct achter het onderdeel waar
het bij hoort, zodat de focusvolgorde de visuele volgorde volgt.

#### Status

Afgerond.

### 37. De presentaties groeiden niet mee met de ingestelde tekstgrootte

#### Criterium

[1.4.4 Herschalen van tekst](https://www.w3.org/WAI/WCAG22/Understanding/resize-text)
(niveau AA).

#### Waar

Alle presentaties onder
[/documenten/presentaties/](/documenten/presentaties/).

#### Gevolg

Een dia wordt passend in het venster geschaald. Die schaal hief een grotere
basislettergrootte precies weer op: zette je in je browser de letters twee keer
zo groot, dan bleef de tekst op de dia even groot. Gemeten op een venster van
1440 bij 900 bleef een kop van 86 pixels ook bij een instelling van 32 pixels
precies 86 pixels. Alleen de knoppen groeiden mee, want die rekenen in `rem`.
Zoom helpt hier niet: een dia die zich naar het venster voegt, wordt daar even
hard door verkleind als vergroot. Het criterium vraagt dat minstens één manier
om tekst te vergroten werkt, en geen van beide deed dat.

#### Maatregel

Opgelost, voor beide soorten presentaties afzonderlijk. De nieuwere dia's laten
het toneel meegroeien met de basislettergrootte, zodat de tekst meeschaalt en je
horizontaal langs een bredere dia kunt schuiven. De oudere dia's laten hun kader
los zodra de letters groter staan dan standaard: de dia loopt dan als gewone
tekst door de pagina. Dezelfde meting geeft nu 173 en 198 pixels, dus ruim het
dubbele.

#### Status

Afgerond. Nagemeten bij vier venstergroottes.

### 38. De downloadlinks onder de diagrammen heetten allemaal hetzelfde

#### Criterium

[2.4.4 Linkdoel (in context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)
(niveau A).

#### Waar

De pagina's met meerdere diagrammen, onder meer
[/onderwerpen/profielservice/](/onderwerpen/profielservice/) met vier stuks.

#### Gevolg

Elke downloadlink heette "Download als afbeelding". In een lijst met links
stonden daardoor vier identieke regels die naar een ander bestand wijzen, zonder
iets om ze uit elkaar te houden.

#### Maatregel

Opgelost. De naam noemt nu het diagram: "Download als afbeelding: Klantreis
burger of ondernemer". Die naam komt uit het verplichte tekstalternatief van het
diagram, dus hij kan niet vergeten worden. Het zichtbare ontwerp blijft gelijk.

#### Status

Afgerond. Nagemeten in de toegankelijkheidsboom van de browser.

### 39. De presentaties droegen een rol zonder naam

#### Criterium

[4.1.2 Naam, rol, waarde](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
(niveau A).

#### Waar

De twee oudere presentaties, die op Reveal.js draaien.

#### Gevolg

De presentatiesoftware zet zelf `role="application"` op de dia's, zonder naam.
Die rol zet een schermlezer in applicatiemodus: de gewone leesnavigatie gaat
uit en alle toetsen gaan naar de pagina. Een naamloos gebied waar dat gebeurt,
is voor wie een schermlezer gebruikt een gat zonder uitleg.

#### Maatregel

Opgelost. De rol is weggehaald in plaats van voorzien van een naam. Dia's zijn
leesbare tekst en de bediening gaat al met gewone knoppen en met de pijltoetsen,
dus applicatiemodus hoort hier niet. De documentatie van de norm waarschuwt
daar ook voor: verkeerd gebruik van deze rol neemt ongemerkt toegang tot
informatie weg. Het bestand van de presentatiesoftware zelf is niet aangepast.

#### Status

Afgerond. Nagemeten in de toegankelijkheidsboom, voor en na, op beide
presentaties.

### 40. Te weinig contrast in het donkere kleurschema

#### Criterium

[1.4.3 Contrast (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
(niveau AA).

#### Waar

De uitklapbare sectie met componenten in
[het plan voor fase 5](/documenten/rapportages/plan-moza-fase-5/).

#### Gevolg

De kop "Uitdagingen" en de lijst eronder stonden in rood. In het lichte schema
haalt dat 4,57:1, net boven de eis van 4,5:1. In het donkere schema bleef
diezelfde kleur staan op een donkerblauwe achtergrond, en dan is het 3,38:1.

#### Maatregel

Opgelost. De tekst gebruikt nu een kleurtoken dat zelf per schema wisselt. Dat
geeft 4,57:1 in het donker en 6,19:1 in het licht.

#### Status

Afgerond. Twee keer onafhankelijk nagemeten, met echte pixels en met een eigen
omrekening uit de kleurtokens.

### 41. De tooltip verdween terwijl je hem aanwees

#### Criterium

[1.4.13 Content bij hover of focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus)
(niveau AA).

#### Waar

De bedieningsknoppen in de nieuwere presentaties, in presentatiemodus.

#### Gevolg

In presentatiemodus verdwijnt de bedieningsbalk vanzelf zodra je de muis
stilhoudt. Bewoog je de muis van de knop naar de tooltip zelf, dan telde dat
niet als aanwijzen en verdween na ongeveer twee seconden zowel de balk als de
tooltip. Het criterium vraagt juist dat zulke tekst blijft staan tot je de
aanwijzer weghaalt of hem zelf wegneemt.

#### Maatregel

Opgelost. De balk blijft staan zolang er een tooltip open staat. Dat is niet met
een eenvoudige selector te zien, want de tooltip zit in een geneste schaduwboom
van het component; de controle loopt die boom door. Het automatisch verbergen
werkt verder zoals het was.

#### Status

Afgerond. Nagemeten op nul, drie en zes seconden met de muis op de tooltip.

### 42. De PDF-downloads gaven de taal van een fragment niet door

#### Criterium

[3.1.2 Taal van onderdelen](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts)
(niveau AA).

#### Waar

Veertien van de eenenveertig PDF-downloads.

#### Gevolg

In de pagina staan Engelse woordgroepen met een taalaanduiding, en in de
ODF-downloads komt die mee. In de PDF niet: daar stond alleen de taal van het
document als geheel. Een schermlezer leest "trusted party" dan met Nederlandse
uitspraak voor. Het gaat om zestien fragmenten.

#### Maatregel

Opgelost. Bij het maken van de PDF worden de gemarkeerde fragmenten
meegegeven, en de taal komt op het kleinste onderdeel dat precies die tekst
bevat. Op een groter onderdeel zou de taal overerven en zou een hele
Nederlandse zin als Engels worden voorgelezen. Een fragment dat niet
teruggevonden wordt, laat de build falen, zodat deze fout niet stilletjes kan
terugkomen.

#### Status

Afgerond. Nagemeten over alle eenenveertig PDF's die de site op dat moment
telde: zestien gemarkeerde fragmenten, evenveel als in de pagina's, en de tekst
is ongewijzigd.

### 43. De presentatie bladerde al bij het neerzetten van een vinger

#### Criterium

[2.5.2 Aanwijzerannulering](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation)
(niveau A).

#### Waar

De navigatiepijlen in de twee oudere presentaties.

#### Gevolg

De presentatiesoftware koppelt die pijlen aan het neerzetten van een vinger, op
Android zelfs uitsluitend daaraan. Zette je je vinger op een pijl en schoof je
weg voordat je losliet, dan was er al gebladerd. Het criterium vraagt dat een
handeling pas bij het loslaten gebeurt, of dat je hem kunt afbreken.

#### Maatregel

Opgelost. De eigen pijlen van de presentatiesoftware staan uit en zijn
vervangen door vier knoppen die alleen op loslaten reageren. Vier, omdat een
presentatie een raster is en geen rij: omlaag gaat een stapel dia's in, rechts
slaat die over. Met twee knoppen zou die tweede route verdwijnen. Welke knop
bruikbaar is volgt de beschikbare routes, en in een presentatie zonder stapels
blijven omhoog en omlaag weg.

#### Status

Afgerond. Nagemeten dat geen enkele handeling meer bij het neerzetten gebeurt,
en dat alle routes door een presentatie met stapels bereikbaar blijven.

### 44. De rand van een vak zonder status had te weinig contrast

#### Criterium

[1.4.11 Contrast van niet-tekstuele content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
(niveau AA).

#### Waar

De plaat "Componenten in samenhang", in de uitklapbare sectie met componenten in
[het plan voor fase 5](/documenten/rapportages/plan-moza-fase-5/).

#### Gevolg

In die plaat vertelt de rand van een vak wat de status van dat onderdeel is: een
doorlopende rand is beschikbaar, een onderbroken rand is in aanbouw, en zo
verder. Een vak zonder status kreeg de lichtste grijstint uit de set: 1,25:1 in
het lichte schema en 1,36:1 in het donkere, tegen een eis van 3:1. Wie die rand
niet ziet, ziet het vak zelf niet, en mist daarmee ook dat juist dit onderdeel
geen status heeft terwijl de andere die wel hebben. Het vakje in de legenda had
dezelfde kleur en daarmee hetzelfde probleem.

#### Maatregel

Opgelost. De rand van een vak zonder status gebruikt nu een middentint uit
dezelfde reeks: 4,57:1 in het lichte schema en 3,39:1 in het donkere. De randen
die wel een status aanduiden stonden al ruim boven de eis en zijn niet geraakt.

Dezelfde lichte tint komt op die pagina nog op vier andere plekken voor: de rand
van een kaart, de lijn waarop de roadmap zijn mijlpalen zet, het kader om een
team en een lege stip. Die blijven staan. Het criterium vraagt 3:1 voor wat je
moet kunnen zien om een onderdeel of een status te herkennen, en deze vier
dragen geen betekenis: de informatie staat er als tekst naast.

#### Status

Afgerond. In beide kleurschema's nagemeten, en de uitkomst is twee keer
onafhankelijk vastgesteld: met de kleur zoals de browser hem uiteindelijk
oplevert, en met een eigen omrekening uit de kleurtokens.

### 45. De sluitknop heette niet overal hetzelfde

#### Criterium

[3.2.4 Consistente identificatie](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification)
(niveau AA).

#### Waar

De knop rechtsboven in de presentaties en in de rapportages, op zes pagina's.

#### Gevolg

Dezelfde knop, op dezelfde plek, met dezelfde functie, heette in de
presentaties "Sluit presentatie" en in de rapportages "Naar MOZa site". De ene
naam zegt wat de knop doet, de andere noemt een bestemming. Wie de site met een
schermlezer of met spraakbesturing gebruikt, moet dan per pagina opnieuw
uitzoeken hoe de knop heet om hem te kunnen gebruiken.

#### Maatregel

Opgelost. De knop heet overal "Sluiten". Ook het gedrag is gelijkgetrokken: kwam
je van deze site, dan gaat de knop een stap terug; kwam je rechtstreeks binnen,
dan gaat hij naar de startpagina. Daarvoor stond in de rapportages nog "Terug"
in de broncode, voor het geval JavaScript uitvalt; die naam is meeveranderd,
zodat de knop ook zonder JavaScript hetzelfde heet als met.

#### Status

Afgerond. De naam gemeten zoals een schermlezer hem krijgt, op alle drie de
soorten pagina's, en nagegaan dat de knop in de broncode dezelfde naam draagt.

### 46. Kaarttitels stonden naast hun kop in plaats van eronder

#### Criterium

[1.3.1 Info en relaties](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
(niveau A).

#### Waar

De overzichtspagina's van [het handboek](/handboek/), en de dia "Bouwblokken" in
de presentatie over de beproeving van het federatief berichtenstelsel.

#### Gevolg

Op de overzichtspagina's stonden tien kaarttitels op niveau 2, net als de kop
waar ze onder hangen. Op [/handboek/](/handboek/) staan vier kaarten onder "Wat
vind je hier", maar in de structuur stonden ze ernaast. Wie de koppenlijst als
inhoudsopgave gebruikt, ziet dan vier losse onderwerpen in plaats van vier
onderdelen van wat daarboven staat.

In de dia had "Berichtenmagazijnen" dezelfde opmaak als de koppen van de blokken
ernaast, vet en op bijna negentien pixels, maar het was een gewone alinea. De
drie organisaties eronder stonden niet in een lijst. Beide keren stond de
samenhang alleen in de opmaak en niet in de structuur.

#### Maatregel

Opgelost. Het kopniveau van een kaart volgt nu de laatste kop in de tekst boven
het raster, plus één. Staat er geen kop boven, zoals bij het raster op de
startpagina, dan blijft het niveau 2. Zo kan er geen niveau worden overgeslagen
als de redactie een kop toevoegt of weghaalt. In de dia is de tussenkop een kop
van niveau 3 geworden en staan de drie magazijnen in een lijst.

De opmaak hing aan het element en niet aan een klasse, dus die is meeverhuisd:
titelgrootte en het aanwijsgebied van de hele kaart gelden nu voor elk
kopniveau. Het beeld verandert daardoor niet.

#### Status

Afgerond. Nagemeten op de gebouwde site: op de vijf handboekpagina's staan de
kaarttitels een niveau lager, en de rasters zonder kop erboven, zoals op de
startpagina en de overzichten, staan onveranderd op niveau 2. Dat laatste is de
andere kant van hetzelfde criterium: een niveau overslaan is net zo onjuist als
een niveau te hoog.

### 47. Het uitklapmenu toonde op smalle schermen niet de structuur die het liet zien

#### Criterium

[1.3.1 Info en relaties](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
(niveau A),
[2.4.4 Linkdoel (in context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)
(niveau A) en
[1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)
(niveau AA).

#### Waar

Het uitklapmenu op smalle schermen, op de negen pagina's van het handboek.

#### Gevolg

Drie dingen gingen daar mis. De sectienavigatie stond in beeld als een boom, met
de secties ingesprongen onder het handboek, maar in de code was het één platte
lijst van acht items met een klasse voor die inspringing. Een schermlezer leest
dan acht gelijkwaardige links voor en kondigt geen niveaus aan.

Daarnaast stonden er met het menu open twee links met de naam "Over MOZa", die
naar verschillende pagina's gingen. Uit de naam alleen was niet op te maken
welke van de twee je koos.

En op 320 pixels liet het menu alleen de secties zien, niet de pagina's
daaronder. Tien links tegen de eenentwintig die op een breed scherm bereikbaar
zijn. Reflow vraagt dat een smal venster inhoud of functie niet laat verdwijnen,
en hier verdween een deel van de navigatie.

#### Maatregel

Opgelost. Het menu is nu een geneste lijst van drie niveaus: het handboek,
daaronder de secties, daaronder hun pagina's. De pagina's van elke sectie staan
er altijd in, niet alleen die van de sectie waar je in zit, zodat op 320 pixels
elke link bereikbaar is die op een breed scherm bereikbaar is. Waar een naam
ook in het hoofdmenu voorkomt, staat er verborgen tekst met de naam van het
handboek achter, zodat "Over MOZa" niet twee keer dezelfde naam naar een andere
bestemming is. De pagina waar je bent is op elk niveau als zodanig gemarkeerd.

Het brede menu is niet aangeraakt.

#### Status

Afgerond. Nagemeten op 320 pixels: eenentwintig links waar er tien stonden, de
niveaus 1, 2 en 3 komen alle drie in de toegankelijkheidsboom terug, en er zijn
geen twee links meer met dezelfde naam naar een ander doel. Het brede menu is in
alle 95 gebouwde HTML-bestanden regel voor regel vergeleken en ongewijzigd.

### 48. Secundaire tekst in de presentaties haalde het contrast niet

#### Criterium

[1.4.3 Contrast (minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
(niveau AA).

#### Waar

De NLDD-presentaties: opschriften boven een stap, de kolom- en rijlabels bij het
klaverblad, de voettekst, de tijdmeter in het sprekersvenster, de notities bij
een demo, en het label in het midden van de ringen.

#### Gevolg

Tekst die een tweede rang heeft, zoals een opschrift boven een stap, stond wit
op 55 procent dekking. Op het donkerste deel van een dia haalt dat 4,91:1, maar
op een lichter kaartvlak zakt het naar 3,82:1, onder de eis van 4,5:1. Achttien
plekken zakten zo door de eis. Daarnaast stond het label "MOZa team" in het
midden van de ringen in accentgeel op het enige ringvlak dat lichter was dan de
andere; dat gaf 2,98:1 waar 3:1 nodig is.

Dit was niet eerder opgevallen omdat de vorige meting maar een deel van de tekst
zag: in een presentatie staat alleen de dia die je bekijkt in beeld, en de
andere zijn voor een meetinstrument onzichtbaar. Daardoor kwam versie 1.0 uit op
148 gemeten tekstelementen, terwijl het er 461 zijn.

#### Maatregel

Opgelost. Er is een apart token voor secundaire tekst, op 65 procent. Daarmee
haalt de slechtste plek 4,64:1. De oude waarde van 55 procent blijft in gebruik
voor lijnen, randen en vlakken, want die vallen onder een ander criterium met
een eis van 3:1. Het ringvlak in het midden heeft geen doorzichtige vulling meer
maar de donkere kleur van de dia zelf, waarmee het accentgeel op 7,16:1 komt
zonder dat de huisstijlkleur verandert.

#### Status

Afgerond. Alle 461 tekstelementen zijn opnieuw gemeten, en ze halen nu alle hun
eis. De laagste uitkomst is 4,50:1 voor gewone tekst en 3,04:1 voor grote tekst.

### 49. Het pictogram in een uitgelicht tekstblok kwam ongetagd in de PDF

#### Criterium

[1.3.1 Info en relaties](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
(niveau A), via PDF/UA.

#### Waar

De PDF-download van een pagina met een uitgelicht tekstblok.

#### Gevolg

Zo'n blok begint met een pictogram. In de pagina is dat voor hulpsoftware
verborgen, want het herhaalt alleen wat het blok zelf al zegt. De PDF wordt
gemaakt door de pagina af te drukken, en daarbij schrijft de browser zo'n
tekening weg zonder markering: niet als inhoud en niet als versiering. PDF/UA
staat maar twee mogelijkheden toe, en dit was geen van beide. Een leeshulp komt
dan iets tegen waarvan niet vaststaat of het overgeslagen mag worden.

Dit raakte tot nu toe geen enkele gepubliceerde download, omdat de combinatie
van zo'n blok met een pagina die ook als PDF verschijnt nergens voorkwam. Het
rapport noemde het daarom eerst als beperking in plaats van als bevinding.

#### Maatregel

Opgelost. Het pictogram blijft in de PDF staan en wordt daar gemarkeerd als
versiering. Dat kan niet vanuit de opmaak van de pagina: de browser bepaalt zelf
wat hij wel en niet tagt. Het gebeurt daarom in het script dat de PDF na het
afdrukken bijwerkt. Dat script markeerde al de kop en de staart van elke
paginastroom als versiering; die aanpak is nu algemeen gemaakt. Alles wat inkt
op de pagina zet en buiten de getagde inhoud valt, wordt omsloten als
versiering. De getagde inhoud zelf verandert daarbij niet.

Een tekstalternatief was het alternatief geweest, maar dat zou een leeshulp een
woord laten voorlezen dat niets toevoegt: het pictogram herhaalt wat het blok al
zegt. Versiering is dus de juiste van de twee mogelijkheden die PDF/UA kent.

#### Status

Afgerond. Nagemeten op een pagina met zo'n blok, buiten de gepubliceerde site
om: de validator meldde eerst twee keer regel 7.1-3 ("inhoud is niet gemarkeerd
als versiering en niet getagd als echte inhoud") en daarna niets meer. De
eenenveertig PDF's die de site op dat moment telde voldoen alle aan PDF/UA deel
1. Elke nieuwe download loopt bij de build langs dezelfde validator. Automatische tests leggen dit vast, met een PDF die een echte
browser voor die test maakt; draai je het script terug, dan falen ze.

## Meldingen die we niet hebben overgenomen

Vier meldingen uit ronde 11 hebben we na onderzoek laten staan. Ze staan hier
omdat een lezer moet kunnen zien dat ze bekeken zijn en waarom de uitkomst
anders is dan de melding voorstelde.

**De kop "Ja," op de intentieverklaring.** Dat is als kop niet beschrijvend, en
dat is ook te zien. De tekst van de intentieverklaring is echter de
oorspronkelijke, ondertekende tekst, en die begint met dat woord. Een eigen kop
verzinnen zou de tekst van een ondertekend stuk veranderen. De kop blijft dus
staan, ook in de ODF- en PDF-download. Dit is de enige kop op de site die niet
op zichzelf vertelt wat eronder staat.

**Geen titel in de Markdown-weergave.** Elke pagina is ook als Markdown op te
vragen. Open je dat adres in een tabblad, dan staat daar alleen het adres en
niet de titel van de pagina. De melding stelde voor om die weergave als HTML met
een titelelement te leveren, of als download in plaats van als pagina. Wij zien
de Markdown-weergave niet als een eigen webpagina maar als een andere
voorstelling van dezelfde pagina: hetzelfde adres in het register van de site,
dezelfde inhoud, en de titel staat er als eerste kop in de tekst. Platte tekst
kan geen titelelement dragen. Een `title` in de kop van het bestand verandert
daar niets aan, want in platte tekst is dat gewoon tekst.

**Het brede menu zet een submenu naast zijn sectie en niet eronder.** In het
brede menu staan de pagina's van een sectie in een eigen balk onder de
menubalk, en in de code naast de sectie waar ze bij horen in plaats van erin.
Dat is een bewuste keuze uit een eerdere ronde: de balk hoort bij de hele
menubalk en niet bij één item, hij blijft staan als je naar een andere sectie
gaat, en hij volgt in de code direct op de knop die hem opent. Op smalle
schermen, waar het menu de boom wel echt als boom toont, is de structuur
inmiddels genest, zie bevinding 47.

**Het contrast in de plaat over het Federatief Datastelsel.** De melding was dat
de lichte letters in die plaat 3:1 tot 4,3:1 halen op het groen eromheen, bij
ongeveer dertien pixels. Wij meten de letters zelf op 4,75:1 tot 5,37:1, boven
de eis van 4,5:1. Het verschil zit in wat je meet: de kleur die de melding
noemt komt in onze aflezing alleen voor op de overgang tussen letter en
achtergrond, de pixels die het beeldscherm eromheen tekent, en niet in de letter
zelf. Wat wel klopt is dat die tekst klein uitkomt, ongeveer elf tot veertien
pixels op een breed scherm en zeven tot negen op een smal. De plaat is niet van
ons; wij kunnen de tekst erin niet groter maken. De inhoud staat daarom volledig
in het tekstalternatief, zodat niemand van die letters afhankelijk is.

## Wat buiten dit onderzoek viel

Twee soorten inhoud vallen buiten dit onderzoek. Ten eerste wat het Besluit zelf
buiten de werkingssfeer plaatst: content van derden, live uitzendingen, en
kantoorbestanden die voor 23 september 2018 zijn gepubliceerd. Ten tweede wat
wij bewust niet hebben getoetst.

- Documenten van derden waarnaar de site verwijst, en de externe diensten die
  vanaf de site bereikbaar zijn. Die financieren en ontwikkelen wij niet en ze
  vallen niet onder onze verantwoordelijkheid, en daarmee buiten de
  werkingssfeer van het Besluit.
- Firefox, behalve in ronde 8. Daar is met Firefox en NVDA richtlijn 1.1
  getoetst; de overige criteria zijn met Edge, Chrome en Safari beoordeeld.

Eén beperking is in ronde 11 vastgesteld en daarna voor het grootste deel
opgeheven. Zonder JavaScript toonde een presentatie op een breed venster alleen
de eerste dia. De vier presentaties met de nieuwere opmaak tonen nu op elke
breedte al hun dia's onder elkaar, net als bij afdrukken. De twee oudere
presentaties draaien op Reveal.js, dat elke dia verbergt tot het script hem
toont; daar blijft zonder JavaScript vrijwel niets in beeld. Hun tekst staat wel
volledig in de HTML, dus hij gaat niet verloren, maar hij is zonder JavaScript
niet te zien. Die twee presentaties werken we niet meer bij, en we passen de
software eronder niet aan.

Een beperking uit ronde 8 is inmiddels opgelost: het pictogram in een uitgelicht
tekstblok kwam ongetagd in een PDF-download, zie
[bevinding 49](#49-het-pictogram-in-een-uitgelicht-tekstblok-kwam-ongetagd-in-de-pdf).

Een tweede beperking uit ronde 8 is ook opgelost: een diagram kwam in de
ODF-download terecht als de broncode van dat diagram. Diagrammen gaan nu als
afbeelding mee, met de naam en de beschrijving als eigenschap van die
afbeelding.
