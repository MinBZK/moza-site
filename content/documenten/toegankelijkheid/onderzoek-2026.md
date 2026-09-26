---
title: "Toegankelijkheidsonderzoek MijnOverheid Zakelijk 2026"
card_title: "Onderzoek 2026"
description: "Onderzoek naar de toegankelijkheid van MijnOverheid Zakelijk volgens WCAG-EM, getoetst aan WCAG 2.2 niveau A en AA."
date: 2026-09-05
download: true
outputs:
  - HTML
  - markdown
  - pandoc
---

## Over dit onderzoek

{{< table-without-header >}}
| Website | <https://mijnoverheidzakelijk.nl/> |
| Organisatie | Ministerie van Binnenlandse Zaken en Koninkrijksrelaties |
| Uitgevoerd door | Team MijnOverheid Zakelijk |
| Datum onderzoek | September 2026 |
| Onderzoeksmethode | [WCAG-EM 1.0](https://www.w3.org/TR/WCAG-EM/), de evaluatiemethode van het W3C |
| Conformiteitsdoel | WCAG 2.2 niveau A en AA |
| Basisniveau toegankelijkheid | Windows met NVDA, macOS en iOS met VoiceOver, en bediening met alleen het toetsenbord |
{{< /table-without-header >}}

### Over het conformiteitsdoel

De wettelijke norm is op dit moment WCAG 2.1 niveau AA, via
[EN 301 549](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/) en het
[Tijdelijk besluit digitale toegankelijkheid overheid](https://wetten.overheid.nl/BWBR0040936). Wij toetsen tegen WCAG
2.2, dat daar zes succescriteria bovenop legt.

Eén verschil is de moeite waard om te noemen: 4.1.1 Parsen is in 2.2 vervallen,
maar maakt nog wel deel uit van de norm waaraan wij wettelijk moeten voldoen.
Dat criterium is daarom meegetoetst.

### Waarmee is getoetst

Dit is het basisniveau: de combinaties van besturingssysteem, browser en
hulptechnologie waartegen de conformiteit hieronder is vastgesteld.

| Besturingssysteem | Browser | Hulptechnologie | Waarvoor |
| --- | --- | --- | --- |
| Windows 11 | Edge | NVDA | Ronde 3, schermlezer |
| macOS | Safari | VoiceOver | Ronde 3, schermlezer |
| macOS | Chrome | geen | Ronde 1 op de steekproef, alleen het toetsenbord |
| macOS | Chrome | geen | Ronde 2 en 5, en de automatische controles |
| iOS | Safari | VoiceOver | Ronde 3, schermlezer op mobiel |
| Windows 11 | Edge 153 | JAWS 2026 | Ronde 8, tweede beoordelaar |
| Windows 11 | Firefox 156 | NVDA 2026 | Ronde 8, tweede beoordelaar |
| macOS | Safari 26 | VoiceOver | Ronde 8, tweede beoordelaar |

NVDA is een gratis schermlezer voor Windows; VoiceOver zit ingebouwd in macOS
en iOS. Beide lezen de pagina voor en laten je er met het toetsenbord doorheen
navigeren. JAWS is de meestgebruikte betaalde schermlezer op Windows.

Elke combinatie in deze lijst is ook echt doorlopen. De drie onderste
combinaties zijn alleen in ronde 8 gebruikt, en daar is richtlijn 1.1
Tekstalternatieven mee getoetst, niet de hele norm.

## Wat is onderzocht

Alle content op het hoofddomein, inclusief de Reveal.js-presentaties en de
gegenereerde downloads in .odt en .pdf. De site telt op het moment van
onderzoek 80 pagina's, verdeeld over zes secties.

Buiten de scope vallen de externe diensten waarnaar de site verwijst en de
inhoud van documenten van derden.

## Steekproef

WCAG-EM vraagt drie onderdelen: een gestructureerde selectie, de complete
processen, en een willekeurige aanvulling die controleert of de gestructureerde
selectie representatief was.

### Gestructureerde steekproef

Dertien pagina's, gekozen op dekking van paginatypen, contenttypen en gebruikte
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

### Willekeurige steekproef

Twee pagina's, tien procent van de gestructureerde steekproef, getrokken uit de
67 pagina's die daar niet in zitten. De trekking is met een vaste startwaarde
gedaan en daarmee navolgbaar.

| Pagina |
| --- |
| [/weekly/moza-weekly-27-mei-2026/](/weekly/moza-weekly-27-mei-2026/) |
| [/privacy/](/privacy/) |

Op deze twee pagina's kwamen geen problemen naar voren die de gestructureerde
steekproef niet al liet zien. Die selectie was dus representatief.

## Werkwijze

**Geautomatiseerd, bij elke wijziging.** Elke wijziging aan de site wordt in de
CI-straat getoetst met [pa11y-ci](https://github.com/pa11y/pa11y-ci), dat twee
onafhankelijke engines inzet:
[HTML_CodeSniffer](https://squizlabs.github.io/HTML_CodeSniffer/) en
[axe-core](https://github.com/dequelabs/axe-core), tegen elke pagina uit de
build. De routelijst komt uit de build zelf,
zodat een nieuwe pagina automatisch meedoet. Daarnaast draaien eigen controles
op koppenvolgorde, op het tekstalternatief van diagrammen en op de
bedienbaarheid van de presentaties.

Een geautomatiseerde toets dekt ongeveer een derde van de succescriteria. De
overige criteria zijn met de hand beoordeeld op de pagina's uit de steekproef.

**Wat een tool hier niet kan.** Op vier pagina's meldt axe contrast dat het niet
kan berekenen, doordat de tekst op een half-doorzichtige achtergrond staat. Die
verhoudingen zijn met de hand nagerekend. In de presentaties kan geen enkele
scanner het contrast bepalen, omdat Reveal.js met transformaties en gelaagde
achtergronden werkt.

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

De toetsing liep niet criterium voor criterium, maar in acht rondes over de
hele steekproef. Eén ronde dekt meerdere criteria tegelijk, en per ronde is per
pagina vastgelegd wat opviel.

| Ronde | Wat er is gedaan | Dekt onder meer |
| --- | --- | --- |
| 1. Toetsenbord | Elke pagina doorlopen met alleen Tab, Shift-Tab, Enter, spatie en pijltjes: is alles bereikbaar, is elk element ook weer te verlaten, is de focus altijd zichtbaar, en volgt de volgorde de visuele volgorde | [2.1.1](https://www.w3.org/WAI/WCAG22/Understanding/keyboard), [2.1.2](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap), [2.1.4](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts), [2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order), [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible), [2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum), [3.2.1](https://www.w3.org/WAI/WCAG22/Understanding/on-focus) |
| 2. Vergroten | De tekst op 200% gezet, het venster versmald tot 320 CSS-pixels en de tekstafstand vergroot: valt er tekst weg, ontstaat er horizontaal scrollen, overlappen elementen | [1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text), [1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow), [1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing), [1.3.4](https://www.w3.org/WAI/WCAG22/Understanding/orientation) |
| 3. Schermlezer | De steekproef doorlopen met elke hulptechnologie uit het basisniveau: komt overeen wat er klinkt met wat er staat, worden statuswijzigingen aangekondigd, hebben knoppen een bruikbare naam | [1.3.1](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.3.2](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), [2.4.6](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels), [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value), [4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) |
| 4. Inhoud | De pagina's zonder hulpmiddel gelezen: zijn koppen en linkteksten op zichzelf begrijpelijk, beschrijven de alt-teksten wat het beeld zegt, dragen anderstalige passages een taalaanduiding | [1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), [2.4.4](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context), [2.4.6](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels), [3.1.2](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts) |
| 5. Kleur en contrast | Met de hand nagerekend wat de tool niet kon bepalen: half-doorzichtige achtergronden, focusranden, iconen en de presentaties. Ook gecontroleerd of informatie zonder kleur overkomt | [1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color), [1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) |
| 6. Documenten | De .odt- en .pdf-downloads geopend en gecontroleerd op leesvolgorde, koppen, taal en titel, en de PDF's gevalideerd tegen PDF/UA. De Markdown-uitvoer is dezelfde inhoud zonder opmaaklaag en is niet apart getoetst | [1.3.1](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.3.2](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), [2.4.2](https://www.w3.org/WAI/WCAG22/Understanding/page-titled), [3.1.1](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page) |
| 7. Processen | De vier complete processen van begin tot eind doorlopen, met toetsenbord én schermlezer | [2.4.5](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways), [3.2.3](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation), [3.2.4](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification), [3.2.6](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help) |
| 8. Tweede beoordelaar | Een tweede beoordelaar heeft richtlijn 1.1 Tekstalternatieven opnieuw getoetst op de aangepaste site, met JAWS en NVDA op Windows en met VoiceOver op macOS. Onderweg viel ook een aantal zaken op die bij andere criteria horen | [1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), [1.3.2](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), [2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order), [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) |

## Resultaten

Oordeel per succescriterium. "Voldoet" betekent dat het is vastgesteld op de
pagina's uit de steekproef.

### 1 Waarneembaar

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| [1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | A | Niet-tekstuele content | Voldoet | Aanwezigheid van tekstalternatieven wordt automatisch bewaakt, de kwaliteit ervan met de hand. Ronde 4: alle 39 afbeeldingen nagelopen, zie [bevinding 9](#9-tekst-als-afbeelding-in-een-presentatie). Ronde 8: de tekstalternatieven opnieuw beoordeeld met JAWS, NVDA en VoiceOver; drie bevindingen, alle opgelost, zie [bevinding 10](#10-decoratieve-afbeeldingen-droegen-een-tekstalternatief), [11](#11-de-beschrijving-van-een-diagram-zat-in-de-naam) en [12](#12-de-downloadknop-bij-een-diagram-had-twee-namen-en-stond-te-vroeg) |
| [1.2.1](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded) | A | Louter-geluid en louter-videobeeld | Niet van toepassing | De site bevat geen audio of video |
| [1.2.2](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded) | A | Ondertitels voor doven en slechthorenden | Niet van toepassing | De site bevat geen audio of video |
| [1.2.3](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded) | A | Audiodescriptie of media-alternatief | Niet van toepassing | De site bevat geen audio of video |
| [1.2.4](https://www.w3.org/WAI/WCAG22/Understanding/captions-live) | AA | Ondertitels voor doven en slechthorenden (live) | Niet van toepassing | De site bevat geen audio of video |
| [1.2.5](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded) | AA | Audiodescriptie | Niet van toepassing | De site bevat geen audio of video |
| [1.3.1](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships) | A | Info en relaties | Voldoet | Koppenvolgorde wordt automatisch bewaakt. In de ODF- en PDF-downloads kloppen koppen, lijsten en tabelkoppen; de PDF's zijn PDF/UA-conform, zie [bevinding 4](#4-de-pdf-downloads-haalden-pdfua-niet) |
| [1.3.2](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence) | A | Betekenisvolle volgorde | Voldoet | Ronde 6: de leesvolgorde in HTML, ODF en PDF volgt de bron. Alle content in de PDF's is gemarkeerd als artefact of als echte inhoud, zie [bevinding 4](#4-de-pdf-downloads-haalden-pdfua-niet). Ronde 8: de rechterkolom en de downloadknop bij een diagram stonden in de broncode op een andere plek dan in beeld; opgelost, zie [bevinding 12](#12-de-downloadknop-bij-een-diagram-had-twee-namen-en-stond-te-vroeg) en [13](#13-de-rechterkolom-kwam-pas-na-de-hele-tekst) |
| [1.3.3](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics) | A | Zintuiglijke eigenschappen | Voldoet | Ronde 4: de content doorzocht op instructies die alleen op vorm, kleur of plek leunen. Eén geval gevonden en opgelost, zie [bevinding 6](#6-een-instructie-leunde-alleen-op-vorm-en-plek) |
| [1.3.4](https://www.w3.org/WAI/WCAG22/Understanding/orientation) | AA | Weergavestand | Voldoet | De stylesheets bevatten geen enkele `orientation`-mediaquery, dus niets legt de weergavestand vast |
| [1.3.5](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose) | AA | Identificeer het doel van de input | Voldoet | Het zoekveld is het enige invoerveld en verzamelt geen persoonsgegevens; er is geen invoerdoel dat een `autocomplete`-waarde vraagt |
| [1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) | A | Gebruik van kleur | Voldoet | Automatisch gedekt; links in lopende tekst zijn onderstreept en niet alleen aan kleur te herkennen |
| [1.4.2](https://www.w3.org/WAI/WCAG22/Understanding/audio-control) | A | Geluidsbediening | Niet van toepassing | De site bevat geen audio |
| [1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | AA | Contrast (minimum) | Voldoet | Ronde 5: de 27 meldingen die de tool niet kon beoordelen zelf nagerekend door de half-doorzichtige lagen samen te stellen; alle 27 halen de eis, laagste 8,25:1 tegen een eis van 4,5:1. In de presentaties, waar geen scanner bij kan, zijn 148 tekstelementen over 35 slides nagerekend; laagste 4,44:1 tegen een eis van 3:1 |
| [1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text) | AA | Herschalen van tekst | Voldoet | Ronde 2: geen overloop bij 200% tekst op de steekproef |
| [1.4.5](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text) | AA | Afbeeldingen van tekst | Voldoet | Ronde 4: twee slides bestonden volledig uit een afbeelding van lopende tekst; opgelost, zie [bevinding 9](#9-tekst-als-afbeelding-in-een-presentatie). De overige afbeeldingen zijn diagrammen, foto's of iconen |
| [1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow) | AA | Reflow | Voldoet | Ronde 2: geen horizontale overloop bij 320 CSS-pixels. Zes bevindingen zijn opgelost, zie [bevinding 1](#1-content-steekt-buiten-het-scherm-op-smalle-vensters) |
| [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | AA | Contrast van niet-tekstuele content | Voldoet | Ronde 5: elke focusrand op vijf pagina's gemeten, in beide kleurschema's. Eén bevinding, opgelost, zie [bevinding 2](#2-focusrand-onzichtbaar-in-de-voettekst). Laagste 4,97:1 tegen een eis van 3:1 |
| [1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing) | AA | Tekstafstand | Voldoet | Ronde 2: geen verlies van content bij de voorgeschreven waarden |
| [1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus) | AA | Content bij hover of focus | Voldoet | Ronde 5: de site toont zelf nergens content bij hover of focus. De downloadknop bij een diagram staat altijd zichtbaar en wordt alleen minder doorzichtig. Die knop had een `title`-tooltip; zo'n tooltip toont de browser zelf, en dat valt buiten dit criterium. Hij is inmiddels vervangen door verborgen tekst |

### 2 Bedienbaar

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| [2.1.1](https://www.w3.org/WAI/WCAG22/Understanding/keyboard) | A | Toetsenbord | Voldoet | Ronde 1: alle bedienbare onderdelen zijn met Tab bereikbaar en met Enter of spatie te bedienen, inclusief de presentaties. Bedienbaarheid van de presentaties wordt daarnaast automatisch bewaakt |
| [2.1.2](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap) | A | Geen toetsenbordval | Voldoet | Ronde 1: geen val aangetroffen, ook niet in het zoekvenster of de presentatie. Automatisch bewaakt in de presentaties |
| [2.1.4](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts) | A | Enkel teken sneltoetsen | Voldoet | Ronde 1: de sneltoets `/` voor zoeken greep nooit in tijdens het typen. Reveal.js reageert op losse toetsen, binnen de presentatie |
| [2.2.1](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable) | A | Timing aanpasbaar | Niet van toepassing | De site kent geen tijdslimieten |
| [2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) | A | Pauzeren, stoppen, verbergen | Niet van toepassing | Geen bewegende of automatisch bijwerkende content |
| [2.3.1](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold) | A | Drie flitsen of beneden drempelwaarde | Niet van toepassing | Geen flitsende content |
| [2.4.1](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks) | A | Blokken omzeilen | Voldoet | De skiplink is de eerste tab-stop. Verplaatste de focus aanvankelijk niet; opgelost, zie [bevinding 3](#3-de-skiplink-verplaatste-de-focus-niet) |
| [2.4.2](https://www.w3.org/WAI/WCAG22/Understanding/page-titled) | A | Paginatitel | Voldoet | Alle 80 pagina's hebben een unieke, niet-lege titel. Ronde 6: de ODF- en PDF-downloads dragen dezelfde titel als documenteigenschap |
| [2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order) | A | Focus volgorde | Voldoet | Ronde 1: de focusvolgorde loopt gelijk aan de visuele volgorde, ook in het kaartenraster. Geen onverwachte sprongen. Ronde 8: de rechterkolom vormde hierop een uitzondering, want die werd pas na de hele tekst bereikt; opgelost, zie [bevinding 13](#13-de-rechterkolom-kwam-pas-na-de-hele-tekst) |
| [2.4.4](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context) | A | Linkdoel (in context) | Voldoet | Ronde 3: de linkenlijst uit de rotor doorgenomen. De knoppen "Lees meer" op de lijstpagina noemen de bijbehorende weekly, dus ze zijn uit elkaar te houden |
| [2.4.5](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways) | AA | Meerdere manieren | Voldoet | Drie manieren om een pagina te bereiken: het hoofdmenu en het zoeken staan op alle 77 sitepagina's, en 66 pagina's dragen daarnaast een kruimelpad |
| [2.4.6](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels) | AA | Koppen en labels | Voldoet | Ronde 3: de koppenlijst uit de rotor vormt op zichzelf een bruikbare inhoudsopgave. Beschrijvendheid is niet automatisch vast te stellen. Na de aanpassingen herhaald met VoiceOver op iOS en met NVDA op Windows 11, zonder nieuwe bevindingen |
| [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | AA | Focus zichtbaar | Voldoet | Ronde 5: elke focusrand gemeten. Ronde 1: de twee elementen die focus met een kleurwissel tonen in plaats van met een rand zijn met het oog beoordeeld en voldoen. Eén bevinding, opgelost, zie [bevinding 2](#2-focusrand-onzichtbaar-in-de-voettekst) |
| [2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum) | AA | Focus niet bedekt (minimum) | Voldoet | Ronde 1: de focusrand raakte nergens achter de koptekst of het zoekvenster. Nieuw in WCAG 2.2 |
| [2.5.1](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures) | A | Aanwijzergebaren | Voldoet | De site gebruikt geen gebaren met een pad of met meerdere aanwijspunten; in de JavaScript komt geen `touchmove`, `pointermove` of sleepafhandeling voor |
| [2.5.2](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation) | A | Aanwijzerannulering | Voldoet | Geen enkele handeling wordt op `mousedown`, `pointerdown` of `touchstart` uitgevoerd; alles gebeurt pas bij loslaten |
| [2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name) | A | Label in naam | Voldoet | 2827 bedieningselementen nagelopen. Twee patronen weken af en zijn beoordeeld: de zoekknop toont "Zoeken... /", waarin het beletselteken en de sneltoetshint geen label zijn, en de sluitknop van een presentatie toont het teken ✕, dat geen uitspreekbaar label is |
| [2.5.4](https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation) | A | Bewegingsactivering | Niet van toepassing | Geen bediening via beweging |
| [2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) | AA | Sleepbewegingen | Niet van toepassing | De site kent geen sleepbediening. Nieuw in WCAG 2.2 |
| [2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) | AA | Grootte van het aanwijsgebied (minimum) | Voldoet | Alle aanwijsgebieden halen 24 bij 24 CSS-pixels, op links in lopende tekst na, waarvoor het criterium een uitzondering maakt. Eén link leek te klein maar omsluit een afbeelding van 692 bij 324 pixels, en dat is het werkelijke aanwijsgebied. Nieuw in WCAG 2.2 |

### 3 Begrijpelijk

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| [3.1.1](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page) | A | Taal van de pagina | Voldoet | Alle 80 pagina's dragen een taalattribuut op `html`. Ronde 6: de ODF-downloads stonden op Engels; opgelost, zie [bevinding 5](#5-de-odf-downloads-stonden-op-engels) |
| [3.1.2](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts) | AA | Taal van onderdelen | Voldoet | Ronde 4: alle 80 pagina's doorzocht op anderstalige passages. Eén Engelse uitdrukking gemarkeerd; eigennamen en ingeburgerde vaktermen vallen onder de uitzondering. Ronde 7: de Engelse namen van de presentatiebediening zijn vertaald, zie [bevinding 8](#8-de-presentatiebediening-had-engelse-namen) |
| [3.2.1](https://www.w3.org/WAI/WCAG22/Understanding/on-focus) | A | Bij focus | Voldoet | Ronde 1: focus krijgen verandert nergens de context; menu's en panelen openen alleen op een handeling |
| [3.2.2](https://www.w3.org/WAI/WCAG22/Understanding/on-input) | A | Bij input | Voldoet | De site heeft één invoerveld, het zoekveld, en nergens een luisteraar op `change`. Het wijzigen van een besturingselement verandert geen context |
| [3.2.3](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation) | AA | Consistente navigatie | Voldoet | Het hoofdmenu staat op elke pagina in dezelfde volgorde: Home, Over MOZa, Actueel, Onderwerpen, Contact. Handboekpagina's voegen daar een submenu aan toe zonder die volgorde te wijzigen. Ronde 8: op de startpagina ontbrak de sitetitel als eerste stop; opgelost, zie [bevinding 14](#14-de-sitetitel-was-op-de-startpagina-geen-link) |
| [3.2.4](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification) | AA | Consistente identificatie | Voldoet | Terugkerende bediening draagt overal dezelfde naam. Gemeten over alle pagina's; alleen de zoekfilters en de submenuknoppen verschillen, en die benoemen per stuk iets anders |
| [3.2.6](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help) | A | Consistente hulp | Voldoet | De contactpagina is vanaf elke pagina bereikbaar, zowel in het hoofdmenu als in de voettekst, steeds op dezelfde plek. Nieuw in WCAG 2.2 |
| [3.3.1](https://www.w3.org/WAI/WCAG22/Understanding/error-identification) | A | Foutidentificatie | Niet van toepassing | De site bevat geen formulieren |
| [3.3.2](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions) | A | Labels of instructies | Voldoet | De site heeft één invoerveld, het zoekveld, en dat draagt een label. Geen enkel invoerveld op de site is zonder label |
| [3.3.3](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion) | AA | Foutsuggestie | Niet van toepassing | Geen formulieren |
| [3.3.4](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data) | AA | Foutpreventie (wettelijk, financieel, gegevens) | Niet van toepassing | Geen transacties |
| [3.3.7](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry) | A | Overbodige invoer | Niet van toepassing | Geen formulieren. Nieuw in WCAG 2.2 |
| [3.3.8](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum) | AA | Toegankelijke authenticatie (minimum) | Niet van toepassing | De site kent geen inlog. Nieuw in WCAG 2.2 |

### 4 Robuust

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| [4.1.1](https://www.w3.org/WAI/WCAG22/Understanding/parsing) | A | Parsen | Voldoet | Automatisch gedekt. Vervallen in WCAG 2.2, maar nog onderdeel van de wettelijke norm 2.1 |
| [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | A | Naam, rol, waarde | Voldoet | Geen enkel bedieningselement zonder toegankelijke naam. Toestanden worden doorgegeven: 308 keer `aria-pressed`, 126 keer `aria-expanded`, 121 keer `aria-current`. Ronde 3: de themawissel en het openklapmenu kondigen hun nieuwe toestand hoorbaar aan. Ronde 8: de downloadknop bij een diagram droeg twee namen tegelijk; opgelost, zie [bevinding 12](#12-de-downloadknop-bij-een-diagram-had-twee-namen-en-stond-te-vroeg). Na de aanpassingen herhaald met VoiceOver op iOS en met NVDA op Windows 11, zonder nieuwe bevindingen |
| [4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) | AA | Statusberichten | Voldoet | Ronde 3: de slidewissel in een presentatie wordt aangekondigd. Het zoeken kondigde geen status aan maar de volledige resultaten; opgelost, zie [bevinding 7](#7-zoeken-kondigde-de-resultaten-voor-in-plaats-van-de-status). Na de aanpassingen herhaald met VoiceOver op iOS en met NVDA op Windows 11, zonder nieuwe bevindingen |

## Bevindingen

Per bevinding: wat er aan de hand is, welk succescriterium het raakt, waar het
voorkomt, wat het gevolg is voor gebruikers, welke maatregel wordt genomen en
wanneer die klaar is.

### 1. Content steekt buiten het scherm op smalle vensters

**Criterium**

1.4.10 Reflow, en op twee plekken ook 1.4.4 Herschalen van tekst.

**Waar**

Zes gevallen op vijf pagina's uit de steekproef, gevonden bij 320
CSS-pixels breed en bij 200% tekstgrootte:

| Pagina | Wat | Overloop |
| --- | --- | --- |
| [/toegankelijkheid/](/toegankelijkheid/) | Het toegankelijkheidslabel, 692 pixels breed | 388px |
| [/documenten/rapportages/statusrapport-moza-fase-3/](/documenten/rapportages/statusrapport-moza-fase-3/) | De hele kaartopmaak | 184px |
| [/contact/](/contact/) | Een URL in een codefragment | 88px |
| [/onderwerpen/profielservice/](/onderwerpen/profielservice/) | Een lang samengesteld woord | 32px |
| [/onderwerpen/actualiteitenservice/](/onderwerpen/actualiteitenservice/) | Een linktekst bij 200% | 7px |

**Gevolg**

Wie een smal scherm gebruikt of de tekst vergroot, moet horizontaal
scrollen om de tekst te kunnen lezen. Bij het label verdween een deel van de
afbeelding buiten beeld.

**Oorzaak**

Drie verschillende. Er was geen algemene maximumbreedte voor
afbeeldingen, waardoor een afbeelding met vaste afmetingen het venster oprekte.
Lange woorden en URL's braken niet af. En de rapportage-opmaak heeft een eigen
stylesheet die de sitebrede regels niet laadt en pas bij 900 pixels iets
aanpast.

**Maatregel**

Opgelost tijdens het onderzoek. Afbeeldingen krijgen een
maximumbreedte, lange woorden en URL's breken af, en de rapportage-opmaak heeft
een extra breekpunt gekregen waarin de koptekst onder elkaar valt en de
kaartinhoud mag krimpen.

**Status**

Afgerond. Nagemeten: geen overloop meer op de veertien pagina's uit
de steekproef, in alle drie de metingen.

### 2. Focusrand onzichtbaar in de voettekst

**Criterium**

1.4.11 Contrast van niet-tekstuele content.

**Waar**

Elke link in de voettekst, op alle pagina's, in het lichte kleurschema.

**Gevolg**

Wie met het toetsenbord navigeert, ziet in de voettekst niet meer
waar de focus staat. De rand was donkerblauw op de donkerblauwe achtergrond en
haalde 1,68:1, waar 3:1 de eis is.

**Oorzaak**

De voettekst had geen eigen focusregel en erfde daardoor de
sitebrede rand, die de linkkleur van het lichte schema gebruikt. De koptekst
heeft dezelfde donkerblauwe achtergrond en had die regel wel.

**Maatregel**

Opgelost tijdens het onderzoek. Links in de voettekst krijgen nu
een witte focusrand, net als in de koptekst.

**Status**

Afgerond. Nagemeten: 10,2:1.

### 3. De skiplink verplaatste de focus niet

**Criterium**

2.4.1 Blokken omzeilen.

**Waar**

Alle pagina's.

**Gevolg**

De link "Ga naar de inhoud" scrolde de pagina wel naar de inhoud,
maar de focus bleef op de link staan. Een schermlezer las daardoor niet de
inhoud voor, maar herhaalde dat de focus op een link stond. Wie verder tabde, kwam
weer in de koptekst terecht. Daarmee deed de enige voorziening om het menu over
te slaan niet wat hij belooft.

**Oorzaak**

Een sprong naar een fragment verplaatst de focus alleen als het doel
focusbaar is. `<main>` is dat van zichzelf niet.

**Maatregel**

Opgelost tijdens het onderzoek. `<main>` heeft `tabindex="-1"`
gekregen, waardoor de focus wel meeverhuist. De link kwam daarnaast tegen de
vensterrand te staan, waardoor zijn focusrand buiten beeld viel; die staat nu
een halve regel naar binnen.

**Status**

Afgerond. Nagemeten: de focus staat na activeren op
`main#main-content`.

### 4. De PDF-downloads haalden PDF/UA niet

**Criterium**

1.3.1 Info en relaties, en 1.3.2 Betekenisvolle volgorde.

**Waar**

Alle 37 gegenereerde PDF-bestanden.

**Gevolg**

Een schermlezer kon de structuur van deze documenten niet betrouwbaar volgen.
Waar de markering ontbreekt, kan hij niet bepalen of iets inhoud is of
decoratie, en valt hij terug op de volgorde waarin de tekst toevallig in het
bestand staat. Lijstitems droegen hun inhoud niet in een `LBody`, waardoor een
opsomming niet als opsomming overkwam.

**Oorzaak**

De PDF's worden afgedrukt door Chromium. Dat schrijft wel een tagstructuur en
een taal mee, maar laat vier dingen liggen: het markeert de paginavulling en het
briefhoofd niet als artefact, het schrijft nooit een `LBody` in een lijstitem,
het gebruikt structuurtypen die de PDF-standaard niet kent, en het geeft
linkannotaties geen beschrijving. Daarnaast leverde het externe-linkicoon, een
CSS-masker, een transparantiegroep op die tweemaal wordt aangeroepen.

**Maatregel**

Opgelost tijdens het onderzoek. Het icoon wordt niet meer meegeprint: in een
afdruk is elke link extern, dus het voegt niets toe. De naschrijfstap in
`scripts/downloads/pdf-metadata.js` vult de rest aan. Gemeten met veraPDF tegen
ISO 14289-1, over alle 37 documenten:

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

**Status**

Afgerond. Nagemeten: veraPDF verklaart 37 van de 37 bestanden conform aan
PDF/UA deel 1. `just pdfua` bewaakt dat en eist nul fouten.

### 5. De ODF-downloads stonden op Engels

**Criterium**

3.1.1 Taal van de pagina.

**Waar**

Alle 36 gegenereerde ODF-bestanden.

**Gevolg**

Elk Nederlands document bood zichzelf aan als Engelstalig. Een schermlezer die
dat volgt, leest Nederlandse tekst met een Engelse stem voor, wat vrijwel
onverstaanbaar is.

**Oorzaak**

De opmaaksjabloon `reference.odt` is afgeleid van de standaard van pandoc, en
die staat op Engels. Zonder expliciete taal erfde elk document dat.

**Maatregel**

Opgelost tijdens het onderzoek. De pandoc-aanroep geeft nu `lang=nl` mee.

**Status**

Afgerond. Nagemeten: `nl` in zowel `meta.xml` als `styles.xml`.

### 6. Een instructie leunde alleen op vorm en plek

**Criterium**

1.3.3 Zintuiglijke eigenschappen.

**Waar**

De pagina [/handboek/bijdragen/aan-handboek/](/handboek/bijdragen/aan-handboek/),
in de stappen om een pagina te bewerken.

**Gevolg**

De stap luidde "Klik op het potlood. Rechtsboven zie je een potlood-icoon om te
editen". Wie het icoon niet ziet, heeft niets om op te zoeken: er stond geen
naam bij, alleen een vorm en een plek op het scherm.

**Oorzaak**

De knop op GitHub heeft wel een naam, maar die stond niet in de instructie.

**Maatregel**

Opgelost tijdens het onderzoek. De stap noemt nu de knopnaam, met de vorm en de
plek als aanvulling in plaats van als enige aanwijzing.

**Status**

Afgerond.

### 7. Zoeken kondigde de resultaten voor in plaats van de status

**Criterium**

4.1.3 Statusberichten.

**Waar**

Het zoekvenster, op alle pagina's.

**Gevolg**

Bij elke toetsaanslag las de schermlezer de volledige inhoud van alle treffers
achter elkaar voor, als één doorlopende tekst. Hoeveel resultaten er waren, werd
niet gemeld. Wie zoekt, krijgt zo bij elke letter een lap tekst te horen en weet
nog steeds niet of er iets gevonden is.

**Oorzaak**

`aria-live="polite"` stond op de lijst met resultaten zelf. Die lijst wordt bij
elke toetsaanslag volledig vervangen, dus kondigde de browser de hele nieuwe
inhoud aan. Een live-regio wordt bovendien als platte tekst voorgelezen, waardoor
ook de lijststructuur wegviel.

**Maatregel**

Opgelost tijdens het onderzoek. De resultatenlijst is geen live-regio meer, zodat
hij zijn lijststructuur houdt en gewoon te doorlopen is. Daarnaast is er een
apart, visueel verborgen statusgebied met `role="status"` dat alleen het aantal
meldt: "4 zoekresultaten", of "Geen resultaten gevonden voor ..." als er niets is.

**Status**

Afgerond. Nagemeten: bij het zoeken op "handboek" meldt het statusgebied
"4 zoekresultaten" en draagt de lijst geen `aria-live` meer.

### 8. De presentatiebediening had Engelse namen

**Criterium**

3.1.2 Taal van onderdelen.

**Waar**

De navigatieknoppen in beide Reveal.js-presentaties.

**Gevolg**

Een schermlezer las "previous slide", "next slide", "above slide", "below slide"
en "Resume presentation" voor. Op een pagina die zichzelf als Nederlands
aanbiedt, spreekt een Nederlandse stem die woorden fonetisch uit, wat
onverstaanbaar wordt. Een taalaanduiding is hier geen oplossing, want een
`aria-label` kan er geen dragen.

**Oorzaak**

De namen staan hardgecodeerd in de meegeleverde Reveal.js-bundel, die geen
instelling voor taal kent.

**Maatregel**

Opgelost tijdens het onderzoek. De namen worden na het initialiseren
overschreven met Nederlandse. Dat gebeurt in onze eigen code en niet in de
bundel, zodat een toekomstige update van Reveal.js mogelijk blijft.

**Status**

Afgerond. Nagemeten: "Vorige slide", "Volgende slide", "Slide hierboven",
"Slide hieronder" en "Presentatie hervatten".

### 9. Tekst als afbeelding in een presentatie

**Criterium**

1.1.1 Niet-tekstuele content, en 1.4.5 Afbeeldingen van tekst.

**Waar**

Twee slides in
[/documenten/presentaties/moza-pulse-7-oktober/](/documenten/presentaties/moza-pulse-7-oktober/),
met de conclusies uit het gebruikersonderzoek van fase 1.

**Gevolg**

Beide slides bestonden uit niets anders dan een schermafdruk van een slide:
twee kolommen lopende tekst, met kopjes en aanbevelingen, als pixels. De
alt-tekst luidde "Conclusie 1 uit gebruikersonderzoek fase 1" en gaf de inhoud
dus niet weer. Wie de afbeelding niet ziet, miste de hele conclusie. Wie
inzoomt of het lettertype aanpast, hield een wazig beeld.

**Oorzaak**

De slides kwamen uit een presentatie die in een ander programma was gemaakt en
zijn als afbeelding overgenomen.

**Maatregel**

Opgelost tijdens het onderzoek. De inhoud staat nu als echte tekst op vier
slides, met dezelfde kopjes en aanbeveling. Voor toekomstige presentaties geldt
dat tekst als tekst wordt opgenomen; dat staat in de reviewinstructies.

**Status**

Afgerond. Nagemeten: de presentatie bevat geen afbeeldingen van tekst meer.

### 10. Decoratieve afbeeldingen droegen een tekstalternatief

**Criterium**

1.1.1 Niet-tekstuele content.

**Waar**

Het Rijksoverheid-logo in de kop, en de sfeerfoto bovenaan de
startpagina.

**Gevolg**

NVDA las bovenaan de startpagina "banner oriëntatiepunt, Logo
Rijksoverheid, afbeelding" voor, gevolgd door een beschrijving van een
sfeerfoto. Beide zeggen niets wat er niet al als tekst staat: de sitenaam
staat ernaast en de titel staat over de foto heen. Het is ruis vóór de
eigenlijke inhoud.

**Oorzaak**

Beide afbeeldingen hadden een alt-tekst terwijl ze decoratief zijn.
De alt van de foto klopte bovendien niet: er stond "telefoon", terwijl het om
een tablet gaat.

**Maatregel**

Opgelost. Beide krijgen een lege alt, waarmee hulptechnologie ze
overslaat. Op de overige pagina's stond het logo al buiten de
toegankelijkheidsboom.

**Status**

Afgerond. Nagemeten: geen van beide komt nog in de
toegankelijkheidsboom voor.

### 11. De beschrijving van een diagram zat in de naam

**Criterium**

1.1.1 Niet-tekstuele content.

**Waar**

De vier onderwerpenpagina's met Mermaid-diagrammen, en de getekende
plaat bij de notificatiedienst.

**Gevolg**

De alt-tekst was de volledige beschrijving, tot ruim 350 tekens als
één zin. Een schermlezer leest dat in één keer voor, zonder dat je kunt
terugbladeren zoals bij gewone tekst. In de afbeeldingenlijst van een
schermlezer kreeg je die hele tekst te zien in plaats van een naam.

**Oorzaak**

De render hook zette `accDescr` in de alt. Bij de plaat van de
notificatiedienst wees `aria-labelledby` naar de titel én de beschrijving, die
daardoor samen de naam vormden.

**Maatregel**

Opgelost. `accTitle` is nu de naam, `accDescr` volgt als
verborgen tekst direct na het diagram, en is daarmee gewone tekst die je regel
voor regel kunt teruglezen. Bij de notificatiedienst is de beschrijving
losgetrokken met `aria-describedby`. In de PDF-download komt de beschrijving
achter de naam in het tekstalternatief van de figuur, omdat verborgen tekst
niet in een PDF terechtkomt. Een controle in de build eist voortaan dat de
beschrijving er is.

**Status**

Afgerond. Nagemeten: de langste naam is 58 tekens, de beschrijving
volgt als tekst, en in de PDF draagt de figuur naam en beschrijving samen.

### 12. De downloadknop bij een diagram had twee namen en stond te vroeg

**Criterium**

4.1.2 Naam, rol, waarde, en 1.3.2 Betekenisvolle volgorde.

**Waar**

De downloadknop bij elk diagram.

**Gevolg**

De knop droeg zowel `title` als `aria-label` met dezelfde tekst.
Dat is niet fout, maar wel dubbel onderhoud, en de `title` leverde een
muis-tooltip op die verder niets toevoegde. Daarnaast kwam de knop vóór het
diagram in de leesvolgorde, dus wie met het toetsenbord werkt kreeg eerst de
download aangeboden en pas daarna de tekening.

**Oorzaak**

De knop was met ARIA benoemd in plaats van met tekst, en stond in
de broncode boven de afbeelding omdat hij rechtsboven wordt getoond.

**Maatregel**

Opgelost. De naam komt nu uit verborgen tekst in de knop zelf,
`title` en `aria-label` zijn weg, en de knop staat na het diagram. De weergave
verandert niet, want de knop is absoluut gepositioneerd.

**Status**

Afgerond. Nagemeten: één toegankelijke naam, geen tooltip meer, en
de focus bereikt de knop pas na het diagram.

### 13. De rechterkolom kwam pas na de hele tekst

**Criterium**

1.3.2 Betekenisvolle volgorde en 2.4.3 Focus volgorde.

**Waar**

Alle tekstpagina's met een inhoudsopgave, downloads of relevante
links.

**Gevolg**

Op een breed scherm staat die kolom rechtsboven, maar toetsenbord
en schermlezer bereikten hem pas na de hele tekst. Op een smal scherm was de
inhoudsopgave helemaal verborgen en stonden de downloads onderaan de pagina.

**Oorzaak**

De kolom stond in de broncode na het artikel, en werd met CSS naar
rechtsboven gehaald.

**Maatregel**

Opgelost. De kolom staat nu in de broncode direct na de titel, dus
de leesvolgorde volgt het beeld. Op een smal scherm klapt elk blok in achter
een knop in zijn eigen kop, zodat de inhoudsopgave daar ook beschikbaar is
zonder de pagina lang te maken.

**Status**

Afgerond. Nagemeten: op breed scherm staat alles op dezelfde plek
als voorheen, en de focus loopt nu inhoudsopgave, downloads, tekst, voettekst.

### 14. De sitetitel was op de startpagina geen link

**Criterium**

3.2.3 Consistente navigatie.

**Waar**

De koptekst, op de startpagina.

**Gevolg**

Op elke andere pagina is de sitetitel de eerste stop na de
skiplink; op de startpagina ontbrak die stop, waardoor de tab-volgorde daar
anders begon dan overal elders.

**Oorzaak**

De link werd weggelaten op de pagina waar hij naartoe wijst.

**Maatregel**

Opgelost. De sitetitel is overal een link; op de startpagina
draagt hij `aria-current="page"`, zodat hulptechnologie meldt dat je er al
bent.

**Status**

Afgerond. Nagemeten: de tab-volgorde begint op elke pagina en op
elke schermbreedte gelijk.

### 15. Kleine punten uit de tweede toets

**Criterium**

Geen succescriterium; dit zijn hygiënepunten die de tweede
beoordelaar onderweg noteerde.

**Waar**

Het zoekveld en emoji in lopende tekst.

**Gevolg**

De placeholder was "Zoeken..." met drie losse punten. Bij een hoge
interpunctie-instelling kan een schermlezer die als "punt punt punt"
voorlezen. Emoji in lopende tekst worden voorgelezen met hun eigen naam, wat
soms precies goed is en soms niet, bijvoorbeeld bij een gloeilamp die alleen
een tip markeert.

**Maatregel**

De placeholder is "Waar zoek je naar?" geworden. Voor emoji is
een shortcode toegevoegd waarmee je per geval kunt kiezen: een eigen label
voor hulptechnologie, of helemaal overslaan. Een kale emoji blijft de
standaard, en de bestaande content is niet gewijzigd.

**Status**

Afgerond voor het zoekveld. De keuze per emoji maken we bij
redactie van nieuwe content.

## Wat buiten dit onderzoek viel

Twee soorten inhoud vallen buiten dit onderzoek. Ten eerste wat het Besluit zelf
buiten de werkingssfeer plaatst: content van derden, live uitzendingen, en
kantoorbestanden die voor 23 september 2018 zijn gepubliceerd. Ten tweede wat
wij bewust niet hebben getoetst.

- Documenten van derden waarnaar de site verwijst, en de externe diensten die
  vanaf de site bereikbaar zijn. Die vallen buiten ons beheer.
- Firefox, behalve in ronde 8. Daar is met Firefox en NVDA richtlijn 1.1
  getoetst; de overige criteria zijn met Edge, Chrome en Safari beoordeeld.

Twee beperkingen kwamen tijdens ronde 8 aan het licht. Ze raken de conformiteit
nu niet, omdat de betreffende combinatie op geen enkele pagina voorkomt, maar we
noemen ze omdat ze dat wel zouden doen zodra die combinatie ontstaat:

- Een diagram komt in de ODF-download terecht als de broncode van dat diagram,
  niet als afbeelding met tekstalternatief. Geen pagina met een diagram biedt op
  dit moment downloads aan.
- Het pictogram in een uitgelicht tekstblok komt ongetagd in een PDF-download.
  Ook die combinatie komt nu nergens voor; de PDF's die we wel genereren voldoen
  alle aan PDF/UA.

Beide worden apart opgepakt.
