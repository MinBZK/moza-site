---
title: "Ontwerp met de eindgebruiker centraal"
card_title: "Ontwerp"
description: "Alles over het MOZa ontwerp, inclusief prototypes voor gebruikersonderzoeken."
image: "/images/tegel-ontwerp.svg"
image_alt: "Icoon van een ontwerp"
weight: 3
---

## Ontwerpprincipes MijnOverheid Zakelijk

### Context

Dit document beschrijft de ontwerpprincipes en technische keuzes die ten grondslag liggen aan het prototype van MijnOverheid Zakelijk. Het prototype wordt ingezet voor gebruikersonderzoek en dient als referentie voor de uiteindelijke realisatie.

- [Prototype](https://proef.moza.rijksapp.dev/moza/)
- [Storybook](https://proef.moza.rijksapp.dev/storybook/)

#### Ontwerp met de eindgebruiker centraal

Goed ontwerp begint bij luisteren. Daarom betrekken wij eindgebruikers vanaf het allereerste moment bij ons ontwerpproces. We starten met het in kaart brengen van hun dagelijkse praktijk: waar lopen zij tegenaan, wat kost onnodig tijd of frustratie, en waar liggen juist kansen? Door zowel pijnpunten als wensen expliciet te inventariseren, creëren we een scherp en gedeeld beeld van wat er echt toe doet.

##### Van idee tot initiatief

Het ministerie van Binnenlandse Zaken en Koninkrijksrelaties heeft in 2024 MKB'ers en ZZP'ers uitgenodigd om samen over oplossingen na te denken. Zij kwamen met het voorstel voor een centrale Mijn-omgeving, iets dat in de basis lijkt op MijnOverheid. Daar hebben ze zelf ontwerpen voor bedacht. met die plannen werken we nu verder.

##### Van inzicht naar eindproduct

In interactieve sessies, interviews en gebruikerstests leggen we onze inzichten en ideeën voor aan de eindgebruikers. Zo toetsen we aannames en krijgen we waardevolle feedback op functionaliteit, gebruiksgemak en flows. Deze inzichten vormen de basis voor onze ontwerprichtingen.

Voor gebruikerstests maken we vaak gebruik van interactive Figma prototypes. We gebruiken ze als hulpmiddel om samen te verkennen, keuzes te onderbouwen en verbeteringen door te voeren. De feedback die we ophalen verwerken we direct in het ontwerp, waarna we opnieuw testen en itereren.

Door deze continue cyclus van onderzoeken, ontwerpen, testen en verfijnen zorgen we ervoor dat wat we bouwen aansluit op de behoeften en verwachtingen van eindgebruikers. Waar directe inzichten nog ontbreken, werken we op basis van expliciete aannames. Deze aannames maken we zo snel mogelijk toetsbaar door ze te vertalen naar concrete ontwerpen die we voorleggen aan gebruikers.

#### Ontwerpen in code

Het ontwerpproces vindt niet plaats in grafische design tooling zoals Figma of Sketch, maar direct in front-end code: HTML, CSS en waar nodig JavaScript. Design tooling voegt een vertaalstap toe tussen ontwerp en eindresultaat — een vertaalstap die tijd kost, informatie verliest en afwijkingen introduceert. Door direct in het daadwerkelijke medium te werken vervalt die vertaling. Wat ontworpen wordt, is direct wat de gebruiker te zien krijgt.

Dit biedt een aantal concrete voordelen:

- **Direct resultaat** — een wijziging in de code is onmiddellijk zichtbaar in de browser. Er is geen export, overdracht of herinterpretatie nodig.
- **Echte interactie** — hover-staten, toetsenbordnavigatie, focusgedrag en animaties zijn direct te ervaren en te testen. In statische ontwerpen blijven deze onzichtbaar.
- **Toegankelijkheid vanaf het begin** — semantische HTML, ARIA-attributen en toetsenbordbediening zijn onderdeel van het ontwerpproces, niet iets dat er later aan toegevoegd wordt.
- **Eén bron van waarheid** — de code is het ontwerp. Er ontstaat geen discrepantie tussen wat in een ontwerptool staat en wat daadwerkelijk gebouwd is.
- **Lagere drempel voor wijzigingen** — aanpassingen naar aanleiding van gebruikersonderzoek of feedback worden direct in de code doorgevoerd, zonder tussenliggende stappen of afhankelijkheden van specifieke tooling.

### Ontwerpprincipes

#### 1. Toegankelijkheid als fundament

Toegankelijkheid is geen toevoeging achteraf maar een ontwerpuitgangspunt. Elk component wordt vanaf het begin ontworpen en gebouwd met toegankelijkheid in gedachten.

- **Semantische HTML eerst** — het ontwerp maakt gebruik van de juiste HTML-elementen voor de juiste functie. Een knop is een `<button>`, navigatie een `<li>` binnen een `<nav>`, een kop een `<h1>`–`<h6>`.
- **ARIA waar nodig, niet als vervanging** — ARIA-attributen zoals `aria-current="page"`, `aria-disabled` en `aria-invalid` geven staten en relaties aan die niet met HTML alleen uitgedrukt kunnen worden. `aria-disabled` heeft bijvoorbeeld de voorkeur boven het `disabled`-attribuut, omdat het element hiermee bereikbaar blijft voor hulptechnologie.
- **Toetsenbordbediening** — alle interactieve elementen zijn bereikbaar en bedienbaar met het toetsenbord. Focusindicatoren worden getoond via `:focus-visible`, zodat ze zichtbaar zijn bij toetsenbordnavigatie maar niet bij muisinteractie.

#### 2. Rijkshuisstijl als visuele basis

Het ontwerp volgt de Rijkshuisstijl: de visuele identiteit van de Rijksoverheid. Dit zorgt voor herkenbaarheid en vertrouwen.

- **Rijkslettertype** — alle tekst wordt weergegeven in het lettertype RijksSansVF.
- **Kleurenpalet** — alle kleuren komen uit het Rijkshuisstijl-palet en worden niet ad hoc gekozen. Het kleurcontrast voldoet aan de WCAG-richtlijnen.
- **Herkenbare patronen** — de componenten sluiten aan bij wat gebruikers verwachten van een overheidswebsite: duidelijke navigatie, voorspelbare interactie en een professionele uitstraling.

#### 3. Design tokens als gedeelde taal

Design tokens vormen de brug tussen ontwerp en ontwikkeling. Ontwerp-waarden zoals kleuren, typografie en maatvoering zijn opgeslagen in een centraal JSON-bestand (`tokens.json`) dat zowel vanuit Figma (via Tokens Studio) als vanuit de code bewerkt kan worden.

- **Twee lagen** — de tokens zijn opgedeeld in *opties* (de beschikbare waarden uit de Rijkshuisstijl) en *toepassingen* (semantische verwijzingen die bepalen hoe de opties worden ingezet). In de code worden altijd toepassingsvariabelen gebruikt, nooit opties rechtstreeks.
- **Eén bron van waarheid** — alle ontwerp-waarden leven in `tokens.json`. Style Dictionary vertaalt deze naar CSS custom properties. De gegenereerde CSS-bestanden worden niet handmatig aangepast.
- **Tweerichtingsverkeer** — ontwerpers en ontwikkelaars werken op hetzelfde tokenbestand. Wijzigingen in Figma worden teruggeschreven naar Git en andersom.

#### 4. Component-gedreven ontwerp

Het ontwerp is opgebouwd uit herbruikbare componenten die afzonderlijk ontwikkeld, getest en gedocumenteerd worden.

- **Storybook als componentenbibliotheek** — elk component heeft een story met varianten, beschrijvingen en configureerbare controls. Dit maakt het mogelijk om componenten te bekijken, te testen en te documenteren los van de pagina's waarin ze uiteindelijk worden gebruikt.
- **Van component naar pagina** — pagina's zijn samengesteld uit bestaande componenten. Dit zorgt voor consistentie en vermindert duplicatie.
- **Documentatie bij de code** — elke story bevat een beschrijving die uitlegt wanneer en hoe het component ingezet wordt. De componentenbibliotheek dient daarmee zowel als visuele referentie als gebruikershandleiding.

#### 5. De eenvoudigst mogelijke oplossing

Elk ontwerpvraagstuk wordt beantwoord met de eenvoudigst mogelijke technische oplossing die het probleem daadwerkelijk oplost. Complexiteit wordt pas toegevoegd wanneer eenvoud aantoonbaar tekortschiet.

- **HTML en CSS waar het kan, JavaScript waar het moet** — standaard browsergedrag en semantische HTML lossen verrassend veel interactieproblemen op zonder aanvullende code. JavaScript wordt alleen toegevoegd wanneer de gewenste functionaliteit niet met HTML en CSS te realiseren is.
- **Platform boven framework** — het ontwerp leunt op wat de browser al biedt: native formuliervalidatie, `<details>`/`<summary>` voor in- en uitklapbare secties, CSS voor responsiviteit. Frameworks en bibliotheken worden alleen ingezet als het platform aantoonbaar niet volstaat.
- **Minder is beter te onderhouden** — elke extra laag technologie is een extra laag die begrepen, onderhouden en getest moet worden. Door de oplossing zo dicht mogelijk bij de basis te houden, blijft het prototype toegankelijk voor een breed team en is het eenvoudiger over te dragen naar de uiteindelijke realisatie.

#### 6. Prototypen als communicatiemiddel

Het prototype is geen afgewerkt product maar een communicatiemiddel. Het wordt ingezet om ontwerpbeslissingen te toetsen in gebruikersonderzoek en om gesprekken met stakeholders concreet te maken.

- **Echte HTML en CSS** — het prototype is gebouwd met dezelfde technologie als het uiteindelijke product. Dit geeft een realistischer beeld dan statische ontwerpen en maakt het mogelijk om interactie, toegankelijkheid en responsiviteit vroegtijdig te toetsen.
- **Iteratief proces** — het ontwerp wordt stapsgewijs verbeterd op basis van inzichten uit gebruikersonderzoek. Componenten en pagina's worden aangepast, niet vanaf nul opnieuw gemaakt.

#### 7. Iteratief ontwerpen tussen vandaag en morgen

Het ontwerpproces beweegt zich continu tussen twee perspectieven: wat we nu kunnen bouwen en valideren, en waar we uiteindelijk naartoe willen. De stip op de horizon geeft richting, ook als die op dit moment technisch, juridisch of organisatorisch nog niet bereikbaar is.

- **Ontwerpen op aannames, valideren met gebruikers** — niet elk ontwerpbesluit kan vooraf onderbouwd worden met onderzoek. Waar directe inzichten ontbreken, formuleren we expliciete aannames die we zo snel mogelijk met gebruikers toetsen. Onderzoek en ontwerp wisselen elkaar voortdurend af.
- **De stip op de horizon als kompas** — sommige oplossingen zijn nu nog niet realiseerbaar: wetgeving staat het niet toe, systemen zijn er nog niet klaar voor, of de organisatie moet eerst anders ingericht worden. Toch ontwerpen we alvast voor die toekomst, zodat we daar klaar voor zijn wanneer de randvoorwaarden veranderen.
- **Kleine stappen in de goede richting** — elk increment levert iets op dat getest en gebruikt kan worden, maar brengt het ontwerp ook dichter bij het grotere doel. We kiezen bewust voor oplossingen die zowel op korte termijn waarde leveren als op lange termijn passen in het toekomstbeeld.

#### 8. Relevante onderzoeken en projecten

Een overzicht van projecten en gebruikersonderzoeken die als input dienen voor het ontwerp van MijnOverheid Zakelijk.

##### MijnOverheid Zakelijk Gebruikersonderzoeken

<!-- - **Co-creatiesessies BZK (2024)** — sessies met MKB'ers en ZZP'ers waarin het initiatief voor een centrale Mijn-omgeving is ontstaan. -->
- **[Rapportage Ontwerpend Onderzoek MijnOnderneming — januari 2025](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/Rapportage%20-%20BZK%20Ontwerpend%20Onderzoek%20MijnOnderneming%20-%20Januari%202025.pdf)** — rapportage van het ontwerpend onderzoek MijnOnderneming.
- **[Rapportage WetWijzer Design en Iteratie Sprint — februari 2025](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/01%20-%20Feb%202025/Rapportage%20_%20BZK%20WetWijzer%20Design%20en%20Iteratie%20Sprint%20_%20def%20feb%202025.pdf)** — rapportage van de WetWijzer design- en iteratiesprint.
- **[Onderzoek inzichten MOZa (ZZP'ers en MKB'ers) — juli 2025](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/01%20-%20Juli%202025/Onderzoek%20inzichten%20MOZa%20(gesprekken%20met%20ZZP%27ers%20en%20MKB%27ers)_juli%202025_UX%20Research.pdf)** — UX-onderzoek met ZZP'ers en MKB'ers.
- **[Ontwerpend onderzoek Ondernemers — Inzichtkaarten — juli 2025](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/01%20-%20Juli%202025/BZK%20Ontwerpendonderzoek%20Ondernemers%20-%20Analyse%20sessie%2018%20juli%20-%20Inzichtkaarten%20-%20alle%20minisessies.pdf)** — inzichtkaarten uit analysesessies met ondernemers.
- **[Rapportage usability onderzoek MOZa (MKB'ers) — augustus 2025](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/01%20-%20Aug%202025/Rapportage%20usability%20onderzoek%20inzichten%20MOZa%20(gesprekken%20met%20MKB%27ers)_augustus%202025_UX%20Research.pdf)** — rapportage usability-onderzoek met MKB'ers.
- **[MOZa usability onderzoek — oktober 2025](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/01%20-%20okt%202025/MOZa%20usability%20onderzoek%20oktober%202025%20DEF.pdf)** — definitief rapport van het usability-onderzoek.
- **[Verslaglegging aanname-sessie MOZa — oktober 2025](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/01%20-%20okt%202025/Verslaglegging%20aanname%20sessie%20MOZa%20(1%20oktober%202025).pdf)** — verslag van de aanname-sessie.
- **[WetWijzerBedrijven — Eindrapport v2.0 — oktober 2025](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/01%20-%20okt%202025/WetWijzerBedrijven%20-%20Eindrapport%20v2.0.pdf)** — eindrapport WetWijzerBedrijven.
- **[WetWijzerBedrijven — Publieksvriendelijk eindresultaat — september 2025](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/01%20-%20okt%202025/WetWijzerBedrijven%20IDO200625K%20-%20Publieksvriendelijk%20eindresultaat%20sep_2025.pdf)** — publieksvriendelijk eindresultaat WetWijzerBedrijven.
- **[MOZa presentatie eerste resultaten — maart 2026](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/01%20-%20mrt%202026/MOZa%20presentatie-eerste%20resultaten.pptx)** — presentatie van de eerste onderzoeksresultaten.
- **[RVO Service Ecosysteem](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/RVO%20-%20Service%20Ecosysteem/service%20ecosysteem.pptx)** — presentatie over het service-ecosysteem vanuit RVO.
- **[Master These — MOZa onderzoek — januari 2026](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/02%20-%20Master%20These%20PepeRubbens%20(jan%202026)/MOZa%20onderzoek%20Pepe%20PDF.pdf)** — onderzoeksrapport MOZa door Pepe Rubbens.
- **[Master These — Designing Entrepreneurial Adoption for MOZa-services](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/02%20-%20Master%20These%20PepeRubbens%20(jan%202026)/PepeRubbens_DesigningEntrepreneurialAdoptionforMOZa-services_Rep.pdf)** — masterthese over adoptie van MOZa-services door ondernemers.
- **[Klantreizen](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/Klantreizen)** — map met klantreis-onderzoeken.
- **[Verkenning onderzoek gegevensdeling](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/Verkenning%20onderzoek%20gegevensdeling)** — map met onderzoeken over gegevensdeling.
- **[Verkenning authenticatie](https://www.samenwerkruimten.nl/teamsites/programma%20mijnoverheid%20voor%20ondernemers/Gedeelde%20%20documenten/03%20-%20Programma%20inhoudelijke%20documenten/01%20-%20Gebruikersonderzoeken%20en%20input/01%20-%20Onderzoeken/Verkenning%20authenticatie)** — map met onderzoeken over authenticatie.

##### Oveige gebruikersonderzoeken

- **[Gebruikersonderzoeken.nl](https://gebruikersonderzoeken.nl/docs/thema/mijn-omgeving/)** — verzameling van gebruikersonderzoeken binnen de overheid.

##### Projecten

- **[Ondernemersplein](https://ondernemersplein.overheid.nl/)** — informatievoorziening voor ondernemers vanuit de overheid.
- **[NL Design System](https://nldesignsystem.nl/)** — een gedeeld design system met herbruikbare componenten, design tokens en richtlijnen waarmee overheden consistente en toegankelijke digitale diensten kunnen bouwen.
- **[MijnServices Community](https://nldesignsystem.nl/community/community-sprints/mijn-services-community/)** — community binnen NL Design System gericht op Mijn-omgevingen van de overheid.

##### Mijn-omgevingen

Een overzicht van bestaande Mijn-omgevingen van de overheid die als referentie dienen voor het ontwerp van MijnOverheid Zakelijk.

- **[MijnOverheid](https://mijn.overheid.nl/)** — portaal voor burgers met berichten, lopende zaken en persoonlijke gegevens.
- **[Mijn Belastingdienst](https://mijn.belastingdienst.nl/)** — persoonlijke omgeving voor belastingaangiften, toeslagen en beschikkingen.
- **[Mijn KVK](https://www.kvk.nl/mijn-kvk/)** — beheer van bedrijfsgegevens, handelsregisterinformatie en wijzigingen.
- **[Mijn UWV](https://www.uwv.nl/mijnuwv/)** — inzicht in uitkeringen, werkloosheidsverzekering en re-integratie.
- **[NL Portal](https://www.nl-portal.nl/fundamentals/wat-is-nl-portal)** — open-source portaal waarmee gemeenten inwoners en ondernemers een persoonlijke omgeving bieden voor zaken, berichten en taken.

##### Taken en statussen

- **[OpenZaak](https://openzaak.org/)** — open-source implementatie van de Zaakgericht Werken API's voor het registreren en opvolgen van zaken.
- **[Open Inwoner Platform](https://openinwoner.nl/)** — open-source platform waarmee inwoners en ondernemers hun lopende zaken en taken kunnen inzien.

##### Ontwerpbestanden en Storybook-omgevingen

- **[MOZa gebruikerstest prototype](https://www.figma.com/proto/Px77Bmqi8hjlbiPVtJrSkw/MOZa-gebruikerstest?page-id=80%3A8583&node-id=80-8586&p=f&viewport=48%2C148%2C0.95&t=uJgjNQ4HDQHspXj4-1&scaling=contain&content-scaling=fixed)** — eerdere Figma prototypes van MOZa, gebruikt voor gebruikerstests.
- **[Gezamenlijk Beeld — Geteste prototypes](https://www.figma.com/design/DLPqjxnE9tMCAst5wmtWlx/Gezamenlijk-Beeld---Geteste-prototypes?node-id=422-1316&t=JMr6S198p6BkqYU8-1)** — overzicht van geteste prototypes vanuit het programma Gezamenlijk Beeld.
- **[VNG Mijn Services prototype](https://www.figma.com/proto/rSgZgG5hoSoUycMgv3pdy3/VNG-mijn-services?page-id=106%3A5076&node-id=106-87423&viewport=-14628%2C-46%2C0.58&t=qMnOXZFFd1moQGMW-8&scaling=scale-down&content-scaling=fixed&starting-point-node-id=138%3A100252&hide-ui=1)** — Figma prototype van de VNG Mijn Services-omgeving.
- **[Profielservice schetsen](https://www.figma.com/proto/Q5n4JHUy3RmURfpLzAMMF5/Profielservice-schetsen?node-id=881-24161&p=f&t=EzIQyvIDM1u49Lm3-0&scaling=min-zoom&content-scaling=fixed&page-id=504%3A18166&starting-point-node-id=881%3A24161)** — Figma prototype met schetsen voor de profielservice.
- **[MijnServices Templates](https://www.figma.com/design/pB5d6RlVSa1B088Xpm1sSo/MijnServices---Templates?t=r7GhyhjkfU5gx61V-0)** — Figma designbestand met templates voor Mijn Services.
- **[Mijn Services Storybook](https://nl-design-system.github.io/mijn-services/?path=/story/mijn-omgeving-basis--default)** — Storybook met componenten voor Mijn Services vanuit NL Design System.
- **[Mijn Services documentatie](https://nl-design-system.github.io/mijn-services/?path=/docs/mijnservices-intro--docs)** — documentatie en introductie van Mijn Services in Storybook.
- **[RHC Bibliotheek](https://www.figma.com/design/Q5Imc7Xi9KnBQhcYI3Hytj/NL-Design-System---RHC-Bibliotheek?node-id=197-664&p=f&t=XOXogZcGaLGKENi9-0)** — Figma componentenbibliotheek van de Rijkshuisstijl Community.
- **[Rijkshuisstijl Community Templates](https://www.figma.com/design/H4hSqpPbvFMLklDZgswwgd/NL-Design-System---Templates---Rijkshuisstijl-Community?t=4NCdmtG144uwlppy-0)** — Figma templates vanuit de Rijkshuisstijl Community.
- **[Prototype Mijn-omgeving ondernemers](https://www.figma.com/proto/TzuzryjwKVXz4eNrl5RTiY/Prototype-1?node-id=533-10248&starting-point-node-id=792%3A9034)** — eerder Figma prototype voor een Mijn-omgeving voor ondernemers.
- **[Melden en corrigeren — MijnOverheid](https://www.figma.com/board/wa7luTrT2pN6GcThiPms1F/Melden-en-corrigeren---MijnOverheid?node-id=0-1&t=OXQle4D25K8Rt56e-1)** — FigJam-board over het melden en corrigeren van gegevens binnen MijnOverheid.
- **[MijnServices — Acato (design)](https://www.figma.com/design/RCHZdQClPESi6PRA2PWmew/MijnServices---Acato?node-id=3231-2590&t=l3Rryj3MQnxENXmd-1)** — Figma designbestand van MijnServices door Acato.
- **[MijnZaken — UX-verkenningen](https://www.figma.com/design/7FWSxhH1CFbnTeZoiYPeCZ/MijnZaken---UX-verkenningen?node-id=316-6982&t=3gOg6fwyOZAfChpk-1)** — UX-verkenningen voor MijnZaken.
- **[KVK-gegevens — Werk — MijnOverheid](https://www.figma.com/design/szyzeXe48axpu5aEfGAGVK/KVK-gegevens---Werk---MijnOverheid---Web---G-B?node-id=287-2325&t=LWZZOIt1Ijn7nJLz-1)** — ontwerp voor KVK-gegevens binnen de MijnOverheid-omgeving.
- **[MijnServices — Acato (prototype)](https://www.figma.com/proto/RCHZdQClPESi6PRA2PWmew/MijnServices---Acato?page-id=1714%3A34292&node-id=1714-34295&starting-point-node-id=1714%3A34295&t=TCZ1DigUkr9YphyQ-1)** — klikbaar prototype van MijnServices door Acato.
- **[Klantportaal — Mijn Producten](https://www.figma.com/proto/s27WoAoHeggy7QVtSFF8Ce/Klantportaal---Mijn-Producten?page-id=1330%3A18546&node-id=1816-95780&starting-point-node-id=1816%3A95780&t=V9wISVtTEuaM3lHa-1)** — klikbaar prototype van het klantportaal Mijn Producten.
- **[Generieke Services — MijnDenHaag](https://www.figma.com/design/6CFtgDTS2oUceGqTWYXhdN/%F0%9F%95%B9%EF%B8%8F-Generieke-Services---MijnDenHaag?node-id=0-1&t=vnOsWcHEkwgAem4x-1)** — ontwerp van generieke services voor MijnDenHaag.

##### Overige

- **[Regeldrukmonitor](https://www.regeldrukmonitor.nl/)** — inzicht in de regeldruk die ondernemers ervaren bij overheidsverplichtingen.
- **[Prototype 1Overheid](https://azdpc.github.io/prototype-1overheid/home.html)** — prototype van een geïntegreerde overheidsomgeving.
- **[Miro-board workshop Mijn Mijn Mijn](https://miro.com/app/board/uXjVIekQtL0=/)** — workshop-board over de opbouw en functionaliteit van Mijn-omgevingen van overheidsorganisaties.

### Technische ontwerpkeuzes

De stylesheets maken gebruik van moderne CSS-functionaliteit die breed ondersteund wordt door de huidige generatie browsers. Dit maakt preprocessors en polyfills overbodig en houdt de technische stack zo dicht mogelijk bij het webplatform.

#### Logical properties

De stylesheets maken gebruik van CSS logical properties (`inline-size`, `margin-block-start`, `padding-inline`) in plaats van physical properties (`width`, `margin-top`, `padding-left`). Dit maakt de CSS toekomstbestendig voor meertalige ondersteuning en verschillende schrijfrichtingen.

#### CSS nesting en custom properties

De stylesheets maken gebruik van native CSS nesting voor component-staten en varianten, en CSS custom properties voor alle ontwerp-waarden. Er worden geen preprocessors zoals Sass gebruikt.

#### Layout en spacing

Spacing tussen elementen wordt aangestuurd door één schaal van layout tokens (`--toepassing-space-layout-*`), ongeacht richting. Het juiste CSS-mechanisme wordt gekozen op basis van de context:

- **`> * + *` met margin** — voor content flow waar de parent geen specifiek layout-model nodig heeft. Voorbeelden: `body`, `header`, `.card`, `.accordion`, `footer nav`, `ul`/`ol`. Het voordeel is dat het eerste kind geen onnodige marge krijgt en dat spacing alleen ontstaat *tussen* elementen.

- **`gap` met flexbox of grid** — voor layouts waarbij alignment, richting-wisseling of een 2D-raster nodig is. Voorbeelden: `.action-group` (wisselt van kolom naar rij), `.tiles` (grid), `.footer-links` (wisselt van kolom naar rij), `.icon-link` (horizontaal, icoon naast tekst), `summary` (icoon naast tekst).

Per container wordt altijd één van deze twee mechanismes gebruikt, nooit beide tegelijk. De keuze voor `gap` of `> * + *` is een implementatiedetail — de spacing-waarde komt altijd uit dezelfde `layout-*` tokens.

#### AI-assistentie in het ontwerpproces

In het ontwerpproces wordt [Claude](https://claude.ai/) ingezet als assistent bij het maken en itereren van het prototype. Dit is geen vervanging van het ontwerpproces, maar een versnelling ervan. De ontwerper blijft verantwoordelijk voor de richting, de keuzes en de kwaliteit.

Claude wordt onder andere ingezet voor:

- **Semi-realistische content** — het prototype wordt gevuld met inhoud die dicht bij de werkelijkheid ligt: bestaande subsidienamen, echte wetten, herkenbare bekendmakingen. Dit maakt het prototype geloofwaardiger in gebruikerstests dan lorem ipsum of duidelijk verzonnen tekst. Claude genereert deze content op basis van publiek beschikbare overheidsinformatie.
- **Variatie en volume** — waar een ontwerp meerdere pagina's of varianten nodig heeft (bijvoorbeeld gepagineerde lijsten met berichten, subsidies of regelgeving), helpt Claude bij het aanmaken van consistente, gevarieerde content zonder dat elke regel handmatig geschreven hoeft te worden.
- **Component- en patronenontwikkeling** — Claude assisteert bij het schrijven van HTML, CSS en JavaScript voor nieuwe componenten en interactiepatronen, altijd binnen de bestaande ontwerpprincipes (semantische HTML, design tokens, toegankelijkheid).
- **Refactoring en abstractie** — herhalende patronen in de code worden met hulp van Claude geïdentificeerd en omgezet naar herbruikbare includes of geautomatiseerde logica, waardoor de codebase onderhoudbaar blijft naarmate het prototype groeit.

De inzet van AI-assistentie past bij het principe van *de eenvoudigst mogelijke oplossing*: het versnelt het werk zonder extra tooling, frameworks of afhankelijkheden te introduceren. De gegenereerde code en content worden altijd beoordeeld en waar nodig aangepast door de ontwerper.

#### Feature flags

Het prototype bevat een feature-flag systeem waarmee secties en functionaliteit per pagina in- of uitgeschakeld kunnen worden. Dit maakt het mogelijk om verschillende configuraties van het prototype te tonen zonder aparte versies te hoeven bouwen — bijvoorbeeld tijdens gebruikerstests of stakeholdergesprekken.

- **Togglebaar via het paneel** — rechtsonder in het prototype bevindt zich een "Flags"-knop die een paneel opent met alle beschikbare feature flags, gegroepeerd in *Pagina's* (navigatie-items en secties) en *Functionaliteit* (interactiemogelijkheden zoals delen en relevantie aangeven).
- **Persistent in localStorage** — feature flags worden opgeslagen in de browser. Standaard staan alle features aan; pas als een feature expliciet wordt uitgezet, wordt deze verborgen. Dit geldt zowel voor het navigatie-item als voor bijbehorende content op de pagina.
- **Declaratief in de markup** — een element markeren als feature-flagged is een kwestie van `data-feature="Naam"` en `data-feature-type="pagina|functionaliteit"` toevoegen. Het JavaScript en de CSS doen de rest.
- **localStorage wissen** — het paneel bevat een knop om alle opgeslagen staten (feature flags, favorieten, verborgen topics, gesloten notificaties) in één keer te resetten.

#### Statische site-generatie

[Eleventy](https://www.11ty.dev/) wordt ingezet om herhalende elementen (header, footer, navigatie) als includes te beheren en pagina's te genereren. Dit houdt de HTML van individuele pagina's schoon en onderhoudbaar.
