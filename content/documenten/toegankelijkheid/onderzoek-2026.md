---
title: "Toegankelijkheidsonderzoek MijnOverheid Zakelijk 2026"
card_title: "Onderzoek 2026"
description: "Onderzoek naar de toegankelijkheid van MijnOverheid Zakelijk volgens WCAG-EM, getoetst aan WCAG 2.2 niveau A en AA."
date: 2026-09-05
download: true
---

## Over dit onderzoek

{{< table-without-header >}}
| Website | <https://mijnoverheidzakelijk.nl/> |
| Organisatie | Ministerie van Binnenlandse Zaken en Koninkrijksrelaties |
| Uitgevoerd door | Team MijnOverheid Zakelijk |
| Datum onderzoek | September 2026 |
| Onderzoeksmethode | [WCAG-EM 1.0](https://www.w3.org/TR/WCAG-EM/), de evaluatiemethode van het W3C |
| Conformiteitsdoel | WCAG 2.2 niveau A en AA |
| Basisniveau toegankelijkheid | Zie de tabel hieronder |
{{< /table-without-header >}}

### Over het conformiteitsdoel

De wettelijke norm is op dit moment WCAG 2.1 niveau AA, via EN 301 549 en het
Tijdelijk besluit digitale toegankelijkheid overheid. Wij toetsen tegen WCAG
2.2, dat daar zes succescriteria bovenop legt. Naar verwachting wordt 2.2 eind
2026 de geldende standaard.

Eén verschil is de moeite waard om te noemen: 4.1.1 Parsen is in 2.2 vervallen,
maar maakt nog wel deel uit van de norm waaraan wij wettelijk moeten voldoen.
Dat criterium is daarom meegetoetst.

### Basisniveau toegankelijkheid

Hiertegen wordt conformiteit vastgesteld. Neem alleen op wat je ook echt
toetst: meer verklaren dan je onderzoekt maakt de verklaring zwakker, niet
sterker.

| Besturingssysteem | Browser | Hulptechnologie | Waarvoor |
| --- | --- | --- | --- |
| Windows 11 | Edge | NVDA | Ronde 3, schermlezer |
| macOS | Safari | VoiceOver | Ronde 3, schermlezer |
| macOS | Chrome | geen | Ronde 1 op de steekproef, alleen het toetsenbord |
| macOS | Chrome | geen | Ronde 2 en 5, en de automatische controles |
| iOS | Safari | VoiceOver | Ronde 3, schermlezer op mobiel |

NVDA is een gratis schermlezer voor Windows en daar de meest gebruikte.
VoiceOver zit ingebouwd in macOS en iOS. Beide lezen de pagina voor en laten je
er met het toetsenbord doorheen navigeren.

De lijst noemt alleen combinaties die wij daadwerkelijk gebruiken. Meer
verklaren dan je onderzoekt maakt de verklaring zwakker, niet sterker.

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

Elke stap moet werken, ook de alternatieve routes.

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

Vinden deze pagina's problemen die de gestructureerde steekproef miste, dan was
die selectie niet representatief en moet hij worden uitgebreid.

## Werkwijze

**Geautomatiseerd, bij elke wijziging.** De site draait `just a11y` in de
CI-straat: pa11y-ci met twee onafhankelijke engines, HTML_CodeSniffer en
axe-core, tegen elke pagina uit de build. De routelijst komt uit de build zelf,
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
  taalcontrole die op begrijpelijkheid en taalniveau let. Leesniveau is in WCAG
  een AAA-criterium en telt dus niet mee voor AA; dit is beleid bovenop de norm.
- Elk diagram moet een tekstalternatief hebben. Ontbreekt dat, dan faalt de
  build.
- De toets draait bij elke wijziging, niet alleen bij oplevering.

### Hoe de handmatige toetsing verloopt

Niet criterium voor criterium, maar in rondes over de hele steekproef. Dat is
efficiënter, want één ronde dekt meerdere criteria tegelijk. Leg per ronde per
pagina vast wat je ziet.

| Ronde | Wat je doet | Dekt onder meer |
| --- | --- | --- |
| 1. Toetsenbord | Doorloop elke pagina met alleen Tab, Shift-Tab, Enter, spatie en pijltjes. Kun je overal komen, kom je overal weer weg, is de focus altijd zichtbaar, en volgt de volgorde de visuele volgorde? | 2.1.1, 2.1.2, 2.1.4, 2.4.3, 2.4.7, 2.4.11, 3.2.1 |
| 2. Vergroten | Zet de tekst op 200%, versmal het venster tot 320 CSS-pixels, en vergroot de tekstafstand. Valt er tekst weg, ontstaat er horizontaal scrollen, overlappen dingen? | 1.4.4, 1.4.10, 1.4.12, 1.3.4 |
| 3. Schermlezer | Doorloop de steekproef met elke hulptechnologie uit het basisniveau. Klopt wat je hoort met wat er staat, worden statuswijzigingen aangekondigd, hebben knoppen een bruikbare naam? | 1.3.1, 1.3.2, 2.4.6, 4.1.2, 4.1.3 |
| 4. Inhoud | Lees de pagina's zonder hulpmiddel. Zijn koppen en linkteksten op zichzelf begrijpelijk, beschrijven de alt-teksten wat het beeld zegt, dragen anderstalige termen een taalaanduiding? | 1.1.1, 2.4.4, 2.4.6, 3.1.2 |
| 5. Kleur en contrast | Meet met de hand wat de tool niet kon bepalen: half-doorzichtige achtergronden, focusranden, iconen, en de presentaties. Controleer of informatie ook zonder kleur overkomt. | 1.4.1, 1.4.3, 1.4.11 |
| 6. Documenten | Open de .odt- en .pdf-downloads. Kloppen leesvolgorde, koppen, taal en titel? Valideer de PDF's tegen PDF/UA. De Markdown-uitvoer is dezelfde inhoud zonder opmaaklaag en wordt niet apart getoetst. | 1.3.1, 1.3.2, 2.4.2, 3.1.1 |
| 7. Processen | Doorloop de vier complete processen van begin tot eind, met toetsenbord én schermlezer. | 2.4.5, 3.2.3, 3.2.4, 3.2.6 |

## Resultaten

Oordeel per succescriterium. "Voldoet" betekent dat het is vastgesteld op de
pagina's uit de steekproef.

### 1 Waarneembaar

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| 1.1.1 | A | Niet-tekstuele content | Voldoet | Aanwezigheid van tekstalternatieven wordt automatisch bewaakt, de kwaliteit ervan met de hand. Ronde 4: alle 39 afbeeldingen nagelopen, zie [bevinding 9](#9-tekst-als-afbeelding-in-een-presentatie) |
| 1.2.1 | A | Louter-geluid en louter-videobeeld | Niet van toepassing | De site bevat geen audio of video |
| 1.2.2 | A | Ondertitels voor doven en slechthorenden | Niet van toepassing | De site bevat geen audio of video |
| 1.2.3 | A | Audiodescriptie of media-alternatief | Niet van toepassing | De site bevat geen audio of video |
| 1.2.4 | AA | Ondertitels voor doven en slechthorenden (live) | Niet van toepassing | De site bevat geen audio of video |
| 1.2.5 | AA | Audiodescriptie | Niet van toepassing | De site bevat geen audio of video |
| 1.3.1 | A | Info en relaties | Voldoet | Koppenvolgorde wordt automatisch bewaakt. In de ODF- en PDF-downloads kloppen koppen, lijsten en tabelkoppen; de PDF's zijn PDF/UA-conform, zie [bevinding 4](#4-de-pdf-downloads-haalden-pdfua-niet) |
| 1.3.2 | A | Betekenisvolle volgorde | Voldoet | Ronde 6: de leesvolgorde in HTML, ODF en PDF volgt de bron. Alle content in de PDF's is gemarkeerd als artefact of als echte inhoud, zie [bevinding 4](#4-de-pdf-downloads-haalden-pdfua-niet) |
| 1.3.3 | A | Zintuiglijke eigenschappen | Voldoet | Ronde 4: de content doorzocht op instructies die alleen op vorm, kleur of plek leunen. Eén geval gevonden en opgelost, zie [bevinding 6](#6-een-instructie-leunde-alleen-op-vorm-en-plek) |
| 1.3.4 | AA | Weergavestand | Voldoet | De stylesheets bevatten geen enkele `orientation`-mediaquery, dus niets legt de weergavestand vast |
| 1.3.5 | AA | Identificeer het doel van de input | Voldoet | Het zoekveld is het enige invoerveld en verzamelt geen persoonsgegevens; er is geen invoerdoel dat een `autocomplete`-waarde vraagt |
| 1.4.1 | A | Gebruik van kleur | Voldoet | Automatisch gedekt; links in lopende tekst zijn onderstreept en niet alleen aan kleur te herkennen |
| 1.4.2 | A | Geluidsbediening | Niet van toepassing | De site bevat geen audio |
| 1.4.3 | AA | Contrast (minimum) | Voldoet | Ronde 5: de 27 meldingen die de tool niet kon beoordelen zelf nagerekend door de half-doorzichtige lagen samen te stellen. Alle 27 halen de eis, laagste 8,25:1 tegen een eis van 4,5:1 |
| 1.4.4 | AA | Herschalen van tekst | Voldoet | Ronde 2: geen overloop bij 200% tekst op de steekproef |
| 1.4.5 | AA | Afbeeldingen van tekst | Voldoet | Ronde 4: twee slides bestonden volledig uit een afbeelding van lopende tekst; opgelost, zie [bevinding 9](#9-tekst-als-afbeelding-in-een-presentatie). De overige afbeeldingen zijn diagrammen, foto's of iconen |
| 1.4.10 | AA | Reflow | Voldoet | Ronde 2: geen horizontale overloop bij 320 CSS-pixels. Zes bevindingen zijn opgelost, zie [bevinding 1](#1-content-steekt-buiten-het-scherm-op-smalle-vensters) |
| 1.4.11 | AA | Contrast van niet-tekstuele content | Voldoet | Ronde 5: elke focusrand op vijf pagina's gemeten, in beide kleurschema's. Eén bevinding, opgelost, zie [bevinding 2](#2-focusrand-onzichtbaar-in-de-voettekst). Laagste 4,97:1 tegen een eis van 3:1 |
| 1.4.12 | AA | Tekstafstand | Voldoet | Ronde 2: geen verlies van content bij de voorgeschreven waarden |
| 1.4.13 | AA | Content bij hover of focus | Voldoet | Ronde 5: er verschijnt nergens content bij hover of focus. De downloadknop bij een diagram staat altijd zichtbaar en wordt alleen minder doorzichtig. De gebouwde site bevat geen enkele `title`-tooltip |

### 2 Bedienbaar

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| 2.1.1 | A | Toetsenbord | Voldoet | Ronde 1: alle bedienbare onderdelen zijn met Tab bereikbaar en met Enter of spatie te bedienen, inclusief de presentaties. Bedienbaarheid van de presentaties wordt daarnaast automatisch bewaakt |
| 2.1.2 | A | Geen toetsenbordval | Voldoet | Ronde 1: geen val aangetroffen, ook niet in het zoekvenster of de presentatie. Automatisch bewaakt in de presentaties |
| 2.1.4 | A | Enkel teken sneltoetsen | Voldoet | Ronde 1: de sneltoets `/` voor zoeken greep nooit in tijdens het typen. Reveal.js reageert op losse toetsen, binnen de presentatie |
| 2.2.1 | A | Timing aanpasbaar | Niet van toepassing | De site kent geen tijdslimieten |
| 2.2.2 | A | Pauzeren, stoppen, verbergen | Niet van toepassing | Geen bewegende of automatisch bijwerkende content |
| 2.3.1 | A | Drie flitsen of beneden drempelwaarde | Niet van toepassing | Geen flitsende content |
| 2.4.1 | A | Blokken omzeilen | Voldoet | De skiplink is de eerste tab-stop. Verplaatste de focus aanvankelijk niet; opgelost, zie [bevinding 3](#3-de-skiplink-verplaatste-de-focus-niet) |
| 2.4.2 | A | Paginatitel | Voldoet | Alle 80 pagina's hebben een unieke, niet-lege titel. Ronde 6: de ODF- en PDF-downloads dragen dezelfde titel als documenteigenschap |
| 2.4.3 | A | Focus volgorde | Voldoet | Ronde 1: de focusvolgorde loopt gelijk aan de visuele volgorde, ook in het kaartenraster. Geen onverwachte sprongen |
| 2.4.4 | A | Linkdoel (in context) | Voldoet | Ronde 3: de linkenlijst uit de rotor doorgenomen. De knoppen "Lees meer" op de lijstpagina noemen de bijbehorende weekly, dus ze zijn uit elkaar te houden |
| 2.4.5 | AA | Meerdere manieren | Voldoet | Drie manieren om een pagina te bereiken: het hoofdmenu en het zoeken staan op alle 77 sitepagina's, en 66 pagina's dragen daarnaast een kruimelpad |
| 2.4.6 | AA | Koppen en labels | Voldoet | Ronde 3: de koppenlijst uit de rotor vormt op zichzelf een bruikbare inhoudsopgave. Beschrijvendheid is niet automatisch vast te stellen. Na de aanpassingen herhaald met VoiceOver op iOS, zonder nieuwe bevindingen |
| 2.4.7 | AA | Focus zichtbaar | Voldoet | Ronde 5: elke focusrand gemeten. Ronde 1: de twee elementen die focus met een kleurwissel tonen in plaats van met een rand zijn met het oog beoordeeld en voldoen. Eén bevinding, opgelost, zie [bevinding 2](#2-focusrand-onzichtbaar-in-de-voettekst) |
| 2.4.11 | AA | Focus niet bedekt (minimum) | Voldoet | Ronde 1: de focusrand raakte nergens achter de koptekst of het zoekvenster. Nieuw in WCAG 2.2 |
| 2.5.1 | A | Aanwijzergebaren | Voldoet | De site gebruikt geen gebaren met een pad of met meerdere aanwijspunten; in de JavaScript komt geen `touchmove`, `pointermove` of sleepafhandeling voor |
| 2.5.2 | A | Aanwijzerannulering | Voldoet | Geen enkele handeling wordt op `mousedown`, `pointerdown` of `touchstart` uitgevoerd; alles gebeurt pas bij loslaten |
| 2.5.3 | A | Label in naam | Voldoet | 2827 bedieningselementen nagelopen. Twee patronen weken af en zijn beoordeeld: de zoekknop toont "Zoeken... /", waarin het beletselteken en de sneltoetshint geen label zijn, en de sluitknop van een presentatie toont het teken ✕, dat geen uitspreekbaar label is |
| 2.5.4 | A | Bewegingsactivering | Niet van toepassing | Geen bediening via beweging |
| 2.5.7 | AA | Sleepbewegingen | Niet van toepassing | De site kent geen sleepbediening. Nieuw in WCAG 2.2 |
| 2.5.8 | AA | Grootte van het aanwijsgebied (minimum) | Voldoet | Alle aanwijsgebieden halen 24 bij 24 CSS-pixels, op links in lopende tekst na, waarvoor het criterium een uitzondering maakt. Eén link leek te klein maar omsluit een afbeelding van 692 bij 324 pixels, en dat is het werkelijke aanwijsgebied. Nieuw in WCAG 2.2 |

### 3 Begrijpelijk

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| 3.1.1 | A | Taal van de pagina | Voldoet | Alle 80 pagina's dragen een taalattribuut op `html`. Ronde 6: de ODF-downloads stonden op Engels; opgelost, zie [bevinding 5](#5-de-odf-downloads-stonden-op-engels) |
| 3.1.2 | AA | Taal van onderdelen | Voldoet | Ronde 4: alle 80 pagina's doorzocht op anderstalige passages. Eén Engelse uitdrukking gemarkeerd; eigennamen en ingeburgerde vaktermen vallen onder de uitzondering. Ronde 7: de Engelse namen van de presentatiebediening zijn vertaald, zie [bevinding 8](#8-de-presentatiebediening-had-engelse-namen) |
| 3.2.1 | A | Bij focus | Voldoet | Ronde 1: focus krijgen verandert nergens de context; menu's en panelen openen alleen op een handeling |
| 3.2.2 | A | Bij input | Voldoet | De site heeft één invoerveld, het zoekveld, en nergens een luisteraar op `change`. Het wijzigen van een besturingselement verandert geen context |
| 3.2.3 | AA | Consistente navigatie | Voldoet | Het hoofdmenu staat op elke pagina in dezelfde volgorde: Home, Over MOZa, Actueel, Onderwerpen, Contact. Handboekpagina's voegen daar een submenu aan toe zonder die volgorde te wijzigen |
| 3.2.4 | AA | Consistente identificatie | Voldoet | Terugkerende bediening draagt overal dezelfde naam. Gemeten over alle pagina's; alleen de zoekfilters en de submenuknoppen verschillen, en die benoemen per stuk iets anders |
| 3.2.6 | A | Consistente hulp | Voldoet | De contactpagina is vanaf elke pagina bereikbaar, zowel in het hoofdmenu als in de voettekst, steeds op dezelfde plek. Nieuw in WCAG 2.2 |
| 3.3.1 | A | Foutidentificatie | Niet van toepassing | De site bevat geen formulieren |
| 3.3.2 | A | Labels of instructies | Voldoet | De site heeft één invoerveld, het zoekveld, en dat draagt een label. Geen enkel invoerveld op de site is zonder label |
| 3.3.3 | AA | Foutsuggestie | Niet van toepassing | Geen formulieren |
| 3.3.4 | AA | Foutpreventie (wettelijk, financieel, gegevens) | Niet van toepassing | Geen transacties |
| 3.3.7 | A | Overbodige invoer | Niet van toepassing | Geen formulieren. Nieuw in WCAG 2.2 |
| 3.3.8 | AA | Toegankelijke authenticatie (minimum) | Niet van toepassing | De site kent geen inlog. Nieuw in WCAG 2.2 |

### 4 Robuust

| Criterium | Niveau | Naam | Oordeel | Toelichting |
| --- | --- | --- | --- | --- |
| 4.1.1 | A | Parsen | Voldoet | Automatisch gedekt. Vervallen in WCAG 2.2, maar nog onderdeel van de wettelijke norm 2.1 |
| 4.1.2 | A | Naam, rol, waarde | Voldoet | Geen enkel bedieningselement zonder toegankelijke naam. Toestanden worden doorgegeven: 308 keer `aria-pressed`, 126 keer `aria-expanded`, 121 keer `aria-current`. Ronde 3: de themawissel en het openklapmenu kondigen hun nieuwe toestand hoorbaar aan. Na de aanpassingen herhaald met VoiceOver op iOS, zonder nieuwe bevindingen |
| 4.1.3 | AA | Statusberichten | Voldoet | Ronde 3: de slidewissel in een presentatie wordt aangekondigd. Het zoeken kondigde geen status aan maar de volledige resultaten; opgelost, zie [bevinding 7](#7-zoeken-kondigde-de-resultaten-voor-in-plaats-van-de-status). Na de aanpassingen herhaald met VoiceOver op iOS, zonder nieuwe bevindingen |

## Bevindingen

Per bevinding: wat er aan de hand is, welk succescriterium het raakt, waar het
voorkomt, wat het gevolg is voor gebruikers, welke maatregel wordt genomen en
wanneer die klaar is.

### 1. Content steekt buiten het scherm op smalle vensters

**Criterium**<br>
1.4.10 Reflow, en op twee plekken ook 1.4.4 Herschalen van tekst.

**Waar**<br>
Zes gevallen op vijf pagina's uit de steekproef, gevonden bij 320
CSS-pixels breed en bij 200% tekstgrootte:

| Pagina | Wat | Overloop |
| --- | --- | --- |
| [/toegankelijkheid/](/toegankelijkheid/) | Het toegankelijkheidslabel, 692 pixels breed | 388px |
| [/documenten/rapportages/statusrapport-moza-fase-3/](/documenten/rapportages/statusrapport-moza-fase-3/) | De hele kaartopmaak | 184px |
| [/contact/](/contact/) | Een URL in een codefragment | 88px |
| [/onderwerpen/profielservice/](/onderwerpen/profielservice/) | Een lang samengesteld woord | 32px |
| [/onderwerpen/actualiteitenservice/](/onderwerpen/actualiteitenservice/) | Een linktekst bij 200% | 7px |

**Gevolg**<br>
Wie een smal scherm gebruikt of de tekst vergroot, moet horizontaal
scrollen om de tekst te kunnen lezen. Bij het label verdween een deel van de
afbeelding buiten beeld.

**Oorzaak**<br>
Drie verschillende. Er was geen algemene maximumbreedte voor
afbeeldingen, waardoor een afbeelding met vaste afmetingen het venster oprekte.
Lange woorden en URL's braken niet af. En de rapportage-opmaak heeft een eigen
stylesheet die de sitebrede regels niet laadt en pas bij 900 pixels iets
aanpast.

**Maatregel**<br>
Opgelost tijdens het onderzoek. Afbeeldingen krijgen een
maximumbreedte, lange woorden en URL's breken af, en de rapportage-opmaak heeft
een extra breekpunt gekregen waarin de koptekst onder elkaar valt en de
kaartinhoud mag krimpen.

**Status**<br>
Afgerond. Nagemeten: geen overloop meer op de veertien pagina's uit
de steekproef, in alle drie de metingen.

### 2. Focusrand onzichtbaar in de voettekst

**Criterium**<br>
1.4.11 Contrast van niet-tekstuele content.

**Waar**<br>
Elke link in de voettekst, op alle pagina's, in het lichte kleurschema.

**Gevolg**<br>
Wie met het toetsenbord navigeert, ziet in de voettekst niet meer
waar de focus staat. De rand was donkerblauw op de donkerblauwe achtergrond en
haalde 1,68:1, waar 3:1 de eis is.

**Oorzaak**<br>
De voettekst had geen eigen focusregel en erfde daardoor de
sitebrede rand, die de linkkleur van het lichte schema gebruikt. De koptekst
heeft dezelfde donkerblauwe achtergrond en had die regel wel.

**Maatregel**<br>
Opgelost tijdens het onderzoek. Links in de voettekst krijgen nu
een witte focusrand, net als in de koptekst.

**Status**<br>
Afgerond. Nagemeten: 10,2:1.

### 3. De skiplink verplaatste de focus niet

**Criterium**<br>
2.4.1 Blokken omzeilen.

**Waar**<br>
Alle pagina's.

**Gevolg**<br>
De link "Ga naar de inhoud" scrolde de pagina wel naar de inhoud,
maar de focus bleef op de link staan. Een schermlezer las daardoor niet de
inhoud voor, maar herhaalde dat je op een link stond. Wie verder tabde, kwam
weer in de koptekst terecht. Daarmee deed de enige voorziening om het menu over
te slaan niet wat hij belooft.

**Oorzaak**<br>
Een sprong naar een fragment verplaatst de focus alleen als het doel
focusbaar is. `<main>` is dat van zichzelf niet.

**Maatregel**<br>
Opgelost tijdens het onderzoek. `<main>` heeft `tabindex="-1"`
gekregen, waardoor de focus wel meeverhuist. De link kwam daarnaast tegen de
vensterrand te staan, waardoor zijn focusrand buiten beeld viel; die staat nu
een halve regel naar binnen.

**Status**<br>
Afgerond. Nagemeten: de focus staat na activeren op
`main#main-content`.

### 4. De PDF-downloads haalden PDF/UA niet

**Criterium**<br>
1.3.1 Info en relaties, en 1.3.2 Betekenisvolle volgorde.

**Waar**<br>
Alle 37 gegenereerde PDF-bestanden.

**Gevolg**<br>
Een schermlezer kon de structuur van deze documenten niet betrouwbaar volgen.
Waar de markering ontbreekt, kan hij niet bepalen of iets inhoud is of
decoratie, en valt hij terug op de volgorde waarin de tekst toevallig in het
bestand staat. Lijstitems droegen hun inhoud niet in een `LBody`, waardoor een
opsomming niet als opsomming overkwam.

**Oorzaak**<br>
De PDF's worden afgedrukt door Chromium. Dat schrijft wel een tagstructuur en
een taal mee, maar laat vier dingen liggen: het markeert de paginavulling en het
briefhoofd niet als artefact, het schrijft nooit een `LBody` in een lijstitem,
het gebruikt structuurtypen die de PDF-standaard niet kent, en het geeft
linkannotaties geen beschrijving. Daarnaast leverde het externe-linkicoon, een
CSS-masker, een transparantiegroep op die tweemaal wordt aangeroepen.

**Maatregel**<br>
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

**Status**<br>
Afgerond. Nagemeten: veraPDF verklaart 37 van de 37 bestanden conform aan
PDF/UA deel 1. `just pdfua` bewaakt dat en eist nul fouten.

### 5. De ODF-downloads stonden op Engels

**Criterium**<br>
3.1.1 Taal van de pagina.

**Waar**<br>
Alle 36 gegenereerde ODF-bestanden.

**Gevolg**<br>
Elk Nederlands document bood zichzelf aan als Engelstalig. Een schermlezer die
dat volgt, leest Nederlandse tekst met een Engelse stem voor, wat vrijwel
onverstaanbaar is.

**Oorzaak**<br>
De opmaaksjabloon `reference.odt` is afgeleid van de standaard van pandoc, en
die staat op Engels. Zonder expliciete taal erfde elk document dat.

**Maatregel**<br>
Opgelost tijdens het onderzoek. De pandoc-aanroep geeft nu `lang=nl` mee.

**Status**<br>
Afgerond. Nagemeten: `nl` in zowel `meta.xml` als `styles.xml`.

### 6. Een instructie leunde alleen op vorm en plek

**Criterium**<br>
1.3.3 Zintuiglijke eigenschappen.

**Waar**<br>
De pagina [/handboek/bijdragen/aan-handboek/](/handboek/bijdragen/aan-handboek/),
in de stappen om een pagina te bewerken.

**Gevolg**<br>
De stap luidde "Klik op het potlood. Rechtsboven zie je een potlood-icoon om te
editen". Wie het icoon niet ziet, heeft niets om op te zoeken: er stond geen
naam bij, alleen een vorm en een plek op het scherm.

**Oorzaak**<br>
De knop op GitHub heeft wel een naam, maar die stond niet in de instructie.

**Maatregel**<br>
Opgelost tijdens het onderzoek. De stap noemt nu de knopnaam, met de vorm en de
plek als aanvulling in plaats van als enige aanwijzing.

**Status**<br>
Afgerond.

### 7. Zoeken kondigde de resultaten voor in plaats van de status

**Criterium**<br>
4.1.3 Statusberichten.

**Waar**<br>
Het zoekvenster, op alle pagina's.

**Gevolg**<br>
Bij elke toetsaanslag las de schermlezer de volledige inhoud van alle treffers
achter elkaar voor, als één doorlopende tekst. Hoeveel resultaten er waren, werd
niet gemeld. Wie zoekt, krijgt zo bij elke letter een lap tekst te horen en weet
nog steeds niet of er iets gevonden is.

**Oorzaak**<br>
`aria-live="polite"` stond op de lijst met resultaten zelf. Die lijst wordt bij
elke toetsaanslag volledig vervangen, dus kondigde de browser de hele nieuwe
inhoud aan. Een live-regio wordt bovendien als platte tekst voorgelezen, waardoor
ook de lijststructuur wegviel.

**Maatregel**<br>
Opgelost tijdens het onderzoek. De resultatenlijst is geen live-regio meer, zodat
hij zijn lijststructuur houdt en gewoon te doorlopen is. Daarnaast is er een
apart, visueel verborgen statusgebied met `role="status"` dat alleen het aantal
meldt: "4 zoekresultaten", of "Geen resultaten gevonden voor ..." als er niets is.

**Status**<br>
Afgerond. Nagemeten: bij het zoeken op "handboek" meldt het statusgebied
"4 zoekresultaten" en draagt de lijst geen `aria-live` meer.

### 8. De presentatiebediening had Engelse namen

**Criterium**<br>
3.1.2 Taal van onderdelen.

**Waar**<br>
De navigatieknoppen in beide Reveal.js-presentaties.

**Gevolg**<br>
Een schermlezer las "previous slide", "next slide", "above slide", "below slide"
en "Resume presentation" voor. Op een pagina die zichzelf als Nederlands
aanbiedt, spreekt een Nederlandse stem die woorden fonetisch uit, wat
onverstaanbaar wordt. Een taalaanduiding is hier geen oplossing, want een
`aria-label` kan er geen dragen.

**Oorzaak**<br>
De namen staan hardgecodeerd in de meegeleverde Reveal.js-bundel, die geen
instelling voor taal kent.

**Maatregel**<br>
Opgelost tijdens het onderzoek. De namen worden na het initialiseren
overschreven met Nederlandse. Dat gebeurt in onze eigen code en niet in de
bundel, zodat een toekomstige update van Reveal.js mogelijk blijft.

**Status**<br>
Afgerond. Nagemeten: "Vorige slide", "Volgende slide", "Slide hierboven",
"Slide hieronder" en "Presentatie hervatten".

### 9. Tekst als afbeelding in een presentatie

**Criterium**<br>
1.1.1 Niet-tekstuele content, en 1.4.5 Afbeeldingen van tekst.

**Waar**<br>
Twee slides in
[/documenten/presentaties/moza-pulse-7-oktober/](/documenten/presentaties/moza-pulse-7-oktober/),
met de conclusies uit het gebruikersonderzoek van fase 1.

**Gevolg**<br>
Beide slides bestonden uit niets anders dan een schermafdruk van een slide:
twee kolommen lopende tekst, met kopjes en aanbevelingen, als pixels. De
alt-tekst luidde "Conclusie 1 uit gebruikersonderzoek fase 1" en gaf de inhoud
dus niet weer. Wie de afbeelding niet ziet, miste de hele conclusie. Wie
inzoomt of het lettertype aanpast, hield een wazig beeld.

**Oorzaak**<br>
De slides kwamen uit een presentatie die in een ander programma was gemaakt en
zijn als afbeelding overgenomen.

**Maatregel**<br>
Opgelost tijdens het onderzoek. De inhoud staat nu als echte tekst op vier
slides, met dezelfde kopjes en aanbeveling. Voor toekomstige presentaties geldt
dat tekst als tekst wordt opgenomen; dat staat in de reviewinstructies.

**Status**<br>
Afgerond. Nagemeten: de presentatie bevat geen afbeeldingen van tekst meer.

## Wat buiten dit onderzoek viel

Twee soorten inhoud vallen buiten dit onderzoek. Ten eerste wat het Besluit zelf
buiten de werkingssfeer plaatst: content van derden, live uitzendingen, en
kantoorbestanden die voor 23 september 2018 zijn gepubliceerd. Ten tweede wat
wij bewust niet hebben getoetst.

- Documenten van derden waarnaar de site verwijst, en de externe diensten die
  vanaf de site bereikbaar zijn. Die vallen buiten ons beheer.
- Firefox. Wij toetsen met Edge, Chrome en Safari.
