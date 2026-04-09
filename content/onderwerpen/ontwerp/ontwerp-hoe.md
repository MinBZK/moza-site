---
title: "Ontwerpprincipes – Hoe: Werkwijze en techniek"
card_title: "Ontwerpprincipes – Hoe: Werkwijze en techniek"
description: "Het “Hoe” beschrijft de concrete technische keuzes en werkwijze waarmee de principes worden vertaald naar code."
image: "/images/tegel-ontwerp.svg"
image_alt: "Icoon van een ontwerp"
---

## CSS

Stylesheets maken gebruik van moderne CSS-functionaliteit die breed ondersteund wordt door de huidige generatie browsers. Dit maakt [preprocessors](https://developer.mozilla.org/en-US/docs/Glossary/CSS_preprocessor) en [polyfills](<https://en.wikipedia.org/wiki/Polyfill_(programming)>) overbodig en houdt de technische stack zo dicht mogelijk bij het webplatform.

### Logical properties

De CSS maken gebruik van logical properties (`inline-size`, `margin-block-start`, `padding-inline`) in plaats van physical properties (`width`, `margin-top`, `padding-left`). Dit maakt het ondermeer toekomstbestendig voor meertalige ondersteuning en verschillende schrijfrichtingen.

### CSS nesting en custom properties

De CSS maakt gebruik van [native nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting) voor bijvoorbeeld component-staten en varianten, en [custom properties (herbruikbare variabelen)](https://css-tricks.com/a-complete-guide-to-custom-properties/) voor ontwerp-waarden.

### Layout en spacing

Spacing tussen elementen wordt aangestuurd door één schaal van layout tokens (`--toepassing-space-layout-*`), ongeacht richting. Het juiste CSS-mechanisme wordt gekozen op basis van de context:

- **`> * + *` met margin** — voor content flow waar de parent geen specifiek layout-model nodig heeft. Voorbeelden: `body`, `header`, `.card`, `.accordion`, `footer nav`, `ul`/`ol`. Het voordeel is dat het het eerste element geen onnodige marge krijgt en dat spacing alleen ontstaat _tussen_ elementen.

- **`gap` met flexbox of grid** — voor layouts waarbij specifieke uitlijning, richting-wisseling (bijvoorbeeld voor verschil in scherm-breedte) of een strikt raster van rijen en kolommen nodig is. Voorbeelden: `.action-group` (wisselt van kolom naar rij), `.tiles` (grid), `.footer-links` (wisselt van kolom naar rij), `.icon-link` (horizontaal, icoon naast tekst), `summary` (icoon naast tekst).

Per container wordt altijd één van deze twee mechanismes gebruikt, nooit beide tegelijk. De keuze voor `gap` of `> * + *` is een implementatiedetail — de spacing-waarde komt altijd uit dezelfde `layout-*` tokens.

## AI-assistentie in het ontwerpproces

In het ontwerpproces wordt [Claude](https://claude.ai/) ingezet als assistent bij het maken en itereren van het prototype. Dit is geen vervanging van het ontwerpproces, maar een versnelling ervan. De ontwerper blijft verantwoordelijk voor de richting, de keuzes en de kwaliteit.

Claude wordt onder andere ingezet voor:

- **Semi-realistische content** — het prototype wordt gevuld met inhoud die dicht bij de werkelijkheid ligt: bestaande subsidienamen, echte wetten, herkenbare bekendmakingen. Dit maakt het prototype geloofwaardiger in gebruikerstests dan _lorem ipsum_ of duidelijk verzonnen tekst. Claude genereert deze content op basis van publiek beschikbare (overheids)informatie.
- **Variatie en volume** — waar een ontwerp meerdere pagina's of varianten nodig heeft (bijvoorbeeld gepagineerde lijsten met berichten, subsidies of regelgeving), helpt Claude bij het aanmaken van consistente, gevarieerde content zonder dat elke regel handmatig geschreven hoeft te worden.
- **Component- en patronenontwikkeling** — Claude assisteert bij het schrijven van HTML, CSS en JavaScript voor nieuwe componenten en interactiepatronen, altijd binnen de bestaande ontwerpprincipes (semantische HTML, design tokens, toegankelijkheid).
- **Refactoring en abstractie** — herhalende patronen in de code worden met hulp van Claude geïdentificeerd en omgezet naar herbruikbare [_includes_](https://www.smashingmagazine.com/2018/03/static-site-with-nunjucks/) of geautomatiseerde logica, waardoor de codebase onderhoudbaar blijft naarmate het prototype groeit.

De inzet van AI-assistentie past bij het principe van _de eenvoudigst mogelijke oplossing_: het versnelt het werk zonder extra tooling, frameworks of afhankelijkheden te introduceren. De gegenereerde code en content worden altijd beoordeeld en waar nodig aangepast.

## Schrijfwijzer

Het prototype hanteert een schrijfwijzer die consistentie waarborgt in taalgebruik, aanspreekvormen, terminologie, datumnotatie en _microcopy_. Kernafspraken zijn onder andere: formele aanspreekvorm (“u”), genderneutraal taalgebruik, vaste termen per concept (bijvoorbeeld “Bewaar” in plaats van “Opslaan”), en correcte typografische aanhalingstekens en interpunctie.

## Ontwerppatronen

Het prototype documenteert terugkerende ontwerppatronen in Storybook, met onderbouwing vanuit gebruikersonderzoek en externe bronnen, zoals:

- **Interactie op inhoud** — het patroon waarmee gebruikers door middel van acties als Bewaar, Relevant, Niet relevant en Deel een profiel opbouwen dat de basis vormt voor gepersonaliseerde content (aanbevelingssysteem).
- **Context wisselen** — het patroon waarmee een gebruiker kan wisselen tussen privé- en zakelijke contexten, eigen ondernemingen en machtigingen, zonder opnieuw in te loggen. Geïmplementeerd als accountwisselaar in de header.

## Feature flags

Het prototype bevat een feature-flag systeem waarmee secties en functionaliteit in- of uitgeschakeld kunnen worden. Dit maakt het mogelijk om verschillende configuraties van het prototype te tonen zonder aparte versies te bouwen — bijvoorbeeld tijdens gebruikerstests of stakeholdergesprekken.

- **Togglebaar via het paneel** — rechtsonder in het prototype bevindt zich een “Flags”-knop die een paneel opent met alle beschikbare feature flags, gegroepeerd in _Pagina's_ (navigatie-items en secties) en _Functionaliteit_ (interactiemogelijkheden zoals delen en relevantie aangeven). Deze kunnen per pagina verschillen.
- **Onthouden in de browser** — feature flags worden opgeslagen in de browser middels [_localStorage_](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API). Standaard staan alle features aan; pas als een feature expliciet wordt uitgezet, wordt deze verborgen.
- **Declaratief in de markup** — een element markeren als feature-flagged is een kwestie van `data-feature="Naam"` en `data-feature-type="pagina|functionaliteit"` toevoegen.
- **localStorage wissen** — het paneel bevat een knop om alle opgeslagen staten (feature flags, favorieten, verborgen topics, gesloten notificaties) in één keer te resetten.

## Statische site-generatie

[Eleventy](https://www.11ty.dev/) wordt ingezet om herhalende elementen (header, footer, navigatie) als includes te beheren en pagina's te genereren. Dit houdt de HTML van individuele pagina's schoon en onderhoudbaar.

Ga naar [Ontwerpprincipes: Wat: Visie, principes en uitgangspunten](ontwerp-wat).
