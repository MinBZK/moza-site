---
title: "Wat: visie en principes"
page_title: "Ontwerpprincipes - Wat: visie en principes"
weight: 1
description: "Het “Wat” beschrijft de overtuigingen en uitgangspunten die aan het ontwerp ten grondslag liggen."
image: "/images/tegel-ontwerp.svg"
image_alt: "Icoon van een ontwerp"
---

## Ontwerp met de eindgebruiker centraal

Goed ontwerp begint bij luisteren. Daarom betrekken wij eindgebruikers vanaf het allereerste moment bij ons ontwerpproces. We starten met het in kaart brengen van hun dagelijkse praktijk: waar lopen zij tegenaan, wat kost onnodig tijd of frustratie, en waar liggen juist kansen?

Door zowel pijnpunten als wensen te inventariseren, creëren we een scherp en gedeeld beeld van wat er echt toe doet.

### Van idee tot initiatief

Het ministerie van Binnenlandse Zaken en Koninkrijksrelaties heeft in 2024 MKB’ers en ZZP’ers uitgenodigd om samen over oplossingen na te denken. Zij kwamen met het voorstel voor een centrale Mijn-omgeving, iets dat in de basis lijkt op MijnOverheid. Daar hebben ze zelf ontwerpen voor bedacht. Met die plannen werken we nu verder.

### Van inzicht naar eindproduct

In interactieve sessies, interviews en gebruikersonderzoeken leggen we onze inzichten en ideeën voor aan eindgebruikers. Zo toetsen we aannames en krijgen we waardevolle feedback op functionaliteit, gebruiksgemak en flows. Deze inzichten vormen de basis voor onze ontwerprichtingen.

Voor gebruikersonderzoeken maken we gebruik van interactieve prototypes. Deze gebruiken we als hulpmiddel om samen te verkennen, keuzes te onderbouwen en verbeteringen door te voeren. De feedback die we ophalen verwerken we direct in het ontwerp, waarna we opnieuw testen en itereren.

Door deze continue iteratie-cyclus van onderzoeken, ontwerpen, testen en verfijnen zorgen we ervoor dat wat we ontwikkelen aansluit op de behoeften en verwachtingen van eindgebruikers. Waar directe inzichten nog ontbreken, werken we op basis van aannames. Deze maken we toetsbaar door ze te vertalen naar concrete ontwerpen die we voorleggen aan gebruikers.

## Ontwerpen in code

Het ontwerpproces vindt niet plaats in grafische design tooling zoals Figma of Sketch, maar direct in front-end code: HTML, CSS en waar nodig JavaScript. Design tooling voegt een vertaalstap toe tussen ontwerp en eindresultaat – een vertaalstap die tijd kost, informatie verliest en afwijkingen introduceert. Door direct in het daadwerkelijke medium te werken vervalt die vertaling. Wat ontworpen wordt, is direct wat de gebruiker te zien krijgt.

Dit biedt een aantal concrete voordelen:

- **Direct resultaat** – een wijziging in de code is onmiddellijk zichtbaar in de browser. Er is geen export, overdracht of herinterpretatie nodig.
- **Echte interactie** – hover-staten, toetsenbordnavigatie, focusgedrag en animaties zijn direct te ervaren en te testen.
- **Responsief vanaf het begin** – door in de browser te ontwerpen wordt het gedrag op diverse schermformaten direct zichtbaar en testbaar, van mobiel tot groot scherm. Er hoeven geen aparte ontwerpen gemaakt te worden per breekpunt.
- **Toegankelijk vanaf het begin** – toegankelijkheid is onderdeel van het ontwerpproces. Het ontwerp kan direct getest worden met diverse invoermethoden (muis, toetsenbord, spraaknavigatie) en uitvoermethoden (scherm, screenreader, braillelezer, print).
- **Eén bron van waarheid** – de code is het ontwerp. Er ontstaat geen discrepantie tussen wat in een ontwerptool staat en wat daadwerkelijk gebouwd is.
- **Lagere drempel voor wijzigingen** – aanpassingen naar aanleiding van gebruikersonderzoek of feedback worden direct in de code doorgevoerd, zonder tussenliggende stappen of afhankelijkheden van specifieke tooling.

## Ontwerpprincipes

### 1. Toegankelijkheid als fundament

Toegankelijkheid is geen toevoeging achteraf maar een uitgangspunt van het ontwerp. Alles wordt vanaf het begin ontworpen en gebouwd met toegankelijkheid in gedachten.

- **Semantische HTML eerst** – het ontwerp maakt gebruik van [de juiste HTML-elementen voor de juiste functie](https://developer.mozilla.org/en-US/curriculum/core/semantic-html/). Een knop is een `<button>`, navigatie een `<ul>` binnen een `<nav>`, koptekst een `<h1>`–`<h6>`.
- **[ARIA](https://www.w3.org/TR/wai-aria/#introroles) waar nodig, niet als vervanging** – ARIA-attributen zoals `aria-current="page"`, `aria-disabled` en `aria-invalid` geven staten en relaties aan die niet met HTML alleen uitgedrukt kunnen worden. `aria-disabled` heeft bijvoorbeeld de voorkeur boven het `disabled`-attribuut, omdat het element hiermee bereikbaar blijft voor hulptechnologie.
- **Toetsenbord- en spraakbediening** – alle interactieve elementen zijn bereikbaar en bedienbaar met toetsenbord en spraak. Focusindicatoren worden getoond via `:focus-visible`, zodat ze zichtbaar zijn bij toetsenbordnavigatie maar niet bij muisinteractie.

### 2. Rijkshuisstijl als visuele basis

Het ontwerp volgt [de Rijkshuisstijl](https://www.rijkshuisstijl.nl/): de visuele identiteit van de Rijksoverheid. Dit zorgt voor herkenbaarheid en vertrouwen.

- **Rijkslettertype** – alle tekst wordt weergegeven in het lettertype Rijks Sans. We gebruiken hiervoor het [variabele font](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/Variable_fonts) zodat we diverse tekstgewichten en -stijlen uit een enkele bron halen.
- **Kleurenpalet** – alle kleuren komen uit het Rijkshuisstijl-palet en toepassingen worden bewust gekozen. Kleurcontrast voldoet aan [de WCAG-richtlijnen](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- **Herkenbare patronen** – de componenten sluiten aan bij wat gebruikers verwachten van een overheidswebsite: duidelijke navigatie, voorspelbare interactie en een professionele uitstraling.

### 3. Design tokens als gedeelde taal

[Design tokens](https://www.w3.org/community/design-tokens/) vormen de brug tussen ontwerp en ontwikkeling. Ontwerp-waarden zoals kleuren, typografie en maatvoering zijn opgeslagen in een centraal JSON-bestand (`tokens.json`) dat zowel vanuit Figma (via [Tokens Studio](https://tokens.studio/)) als vanuit de code bewerkt kan worden.

- **Twee lagen** – de [tokens zijn opgedeeld](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421) in _opties_ (de beschikbare waarden uit de Rijkshuisstijl) en _toepassingen_ (semantische verwijzingen die bepalen hoe de opties worden ingezet). In de code worden altijd toepassingsvariabelen gebruikt, nooit opties rechtstreeks.
- **Eén bron van waarheid** – alle ontwerp-waarden leven in `tokens.json`. [Style Dictionary](https://styledictionary.com/) vertaalt deze naar CSS custom properties. De gegenereerde CSS-bestanden worden niet handmatig aangepast.
- **Tweerichtingsverkeer** – ontwerpers en ontwikkelaars werken op hetzelfde tokenbestand. Wijzigingen in Figma worden teruggeschreven naar Git en andersom.

### 4. Component-gedreven ontwerp

Het ontwerp is opgebouwd uit herbruikbare componenten die afzonderlijk ontwikkeld, getest en gedocumenteerd worden.

- **Storybook als componentenbibliotheek** – elk component heeft een story met varianten, beschrijvingen en configureerbare opties. Dit maakt het mogelijk om componenten te bekijken en te testen los van de pagina's waarin ze uiteindelijk worden gebruikt.
- **Van component naar pagina** – pagina's zijn samengesteld uit bestaande componenten. Dit zorgt voor consistentie en vermindert duplicatie.
- **Documentatie bij de code** – elke story bevat een beschrijving die uitlegt wanneer en hoe het component ingezet wordt. De componentenbibliotheek dient daarmee zowel als visuele referentie als gebruikershandleiding.

### 5. De eenvoudigst mogelijke oplossing

Elk ontwerpvraagstuk wordt beantwoord met de eenvoudigst mogelijke technische oplossing. Complexiteit wordt pas toegevoegd wanneer eenvoud aantoonbaar tekortschiet.

- **HTML en CSS waar het kan, JavaScript waar het moet** – standaard browsergedrag en semantische HTML lossen veel interactieproblemen op zonder aanvullende code. JavaScript wordt alleen toegevoegd wanneer de gewenste functionaliteit niet met HTML en CSS te realiseren is.
- **Webplatform boven framework** – het ontwerp leunt op wat de browser al biedt. Frameworks en bibliotheken worden alleen ingezet als het webplatform aantoonbaar niet volstaat.
- **Minder is beter te onderhouden** – elke extra laag technologie is een extra laag die begrepen, onderhouden en getest moet worden. Door de oplossing zo dicht mogelijk bij de basis te houden, blijft het prototype toegankelijk voor een breed team en is het eenvoudiger over te dragen voor uiteindelijke realisatie.

### 6. Prototypen als communicatiemiddel

Het prototype is geen afgewerkt product maar een communicatiemiddel. Het wordt ingezet om ontwerpbeslissingen te toetsen in gebruikersonderzoek en om gesprekken met stakeholders concreet te maken.

- **Echte HTML en CSS** – het prototype is gebouwd met dezelfde technologie als het uiteindelijke product. Dit geeft een realistischer beeld dan statische ontwerpen en maakt het mogelijk om interactie, toegankelijkheid en responsiviteit vroegtijdig te toetsen.
- **Iteratief proces** – het ontwerp wordt stapsgewijs verbeterd op basis van inzichten uit gebruikersonderzoek. Componenten en pagina's worden aangepast, niet vanaf nul opnieuw gemaakt.

### 7. Iteratief ontwerpen tussen vandaag en morgen

Het ontwerpproces beweegt zich continu tussen twee perspectieven: wat we nu kunnen bouwen en valideren, en waar we uiteindelijk naartoe willen. De stip op de horizon geeft richting, ook als die op dit moment technisch, juridisch of organisatorisch nog niet bereikbaar is.

- **Ontwerpen op aannames, valideren met gebruikers** – niet elk ontwerpbesluit kan vooraf onderbouwd worden met onderzoek. Waar directe inzichten ontbreken, formuleren we expliciete aannames die we zo snel mogelijk met gebruikers toetsen. Onderzoek en ontwerp wisselen elkaar voortdurend af.
- **De stip op de horizon als kompas** – sommige oplossingen zijn nu nog niet realiseerbaar: wetgeving staat het niet toe, systemen zijn er nog niet klaar voor, of de organisatie moet eerst anders ingericht worden. Toch ontwerpen we alvast voor die toekomst, zodat we daar klaar voor zijn wanneer de randvoorwaarden veranderen.
- **Kleine stappen in de goede richting** – elk increment levert iets op dat getest en gebruikt kan worden, maar brengt het ontwerp ook dichter bij het grotere doel. We kiezen bewust voor oplossingen die zowel op korte termijn waarde leveren als op lange termijn passen in het toekomstbeeld.
