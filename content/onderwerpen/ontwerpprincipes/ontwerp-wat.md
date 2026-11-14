---
title: "Wat: visie en principes"
page_title: "Ontwerpprincipes - Wat: visie en principes"
weight: 1
description: "Het “Wat” beschrijft waar wij in geloven en van uitgaan bij het ontwerpen."
---

## De gebruiker staat voorop

Goed ontwerpen begint met luisteren. Daarom betrekken wij gebruikers vanaf het begin bij het ontwerpen. Eerst kijken wij hoe hun werkdag eruitziet. Waar lopen zij tegenaan? Wat kost onnodig veel tijd of geeft ergernis? En waar liggen kansen?

Wij verzamelen zowel problemen als behoeften en wensen. Zo krijgen wij een duidelijk beeld van wat echt belangrijk is voor onze gebruikers, en delen wij dat beeld met elkaar.

### Van inzicht naar product

Wij leggen onze ideeën voor aan gebruikers. Dat doen wij in gesprekken, interviews en gebruikersonderzoek. Zo controleren wij of onze aannames kloppen. Ook horen wij zo bijvoorbeeld wat gebruikers vinden van de functies, het gemak en de stappen in een taak. Op basis daarvan kiezen wij een richting voor het ontwerp.

Bij gebruikersonderzoek werken wij met een prototype dat echt werkt. Daarmee zoeken wij samen met gebruikers naar oplossingen. Ook onderbouwen wij er keuzes mee. Wat wij leren, passen wij direct toe in het ontwerp. Daarna testen wij opnieuw.

Zo onderzoeken, ontwerpen, testen en verbeteren wij steeds opnieuw. Daardoor past wat wij maken bij wat gebruikers nodig hebben en verwachten. Weten wij iets nog niet zeker? Dan gaan wij uit van een aanname. Die verwerken wij in een ontwerp, en dat leggen wij voor aan gebruikers.

## Ontwerpen in code

Wij ontwerpen niet in een ontwerpprogramma zoals Figma of Sketch, maar direct in de code van de website. Een tekenprogramma voegt een extra stap toe: het ontwerp moet daarna nog worden omgezet in code. Die stap kost tijd. Er gaat informatie verloren, en het resultaat wijkt vaak af. Als wij direct in code werken, is die stap niet nodig. Wat wij ontwerpen, is meteen wat de gebruiker ziet.

Dat heeft deze voordelen:

- **U ziet het resultaat meteen.** Een wijziging is direct zichtbaar in de browser. Niemand hoeft het ontwerp over te nemen of uit te leggen.
- **De interactie is echt.** U kunt direct ervaren wat er gebeurt als u met de muis over een knop gaat, met het toetsenbord werkt of op een knop drukt. Dat kunnen wij ook direct testen.
- **Het werkt meteen op elk scherm.** In de browser zien wij hoe het ontwerp werkt op een telefoon, een tablet en een groot scherm. Wij hoeven geen apart ontwerp per schermgrootte te maken.
- **Het is meteen toegankelijk.** Toegankelijkheid hoort bij het ontwerpen. Wij testen direct met muis, toetsenbord en spraak.
- **Er is maar één versie.** De code is het ontwerp. Er kan dus geen verschil ontstaan tussen het ontwerp en wat er gebouwd is.
- **Aanpassen is makkelijk.** Na een test of feedback passen wij de code direct aan. Daar zijn geen tussenstappen of extra programma’s voor nodig.

## Ontwerpprincipes

### 1. Toegankelijkheid is de basis

Toegankelijkheid is geen extraatje achteraf. Wij houden er vanaf het begin rekening mee, bij het ontwerpen en bij het bouwen. Wij volgen de regels van WCAG 2.2 op niveau AA en de Europese norm EN 301 549.

- **Eerst de juiste HTML.** Wij gebruiken [het juiste HTML-element voor elke functie](https://developer.mozilla.org/en-US/curriculum/core/semantic-html/). Een knop is een `<button>`, een menu staat in een `<nav>` en een kop is een `<h1>` tot en met `<h6>`. Hulpmiddelen zoals een schermlezer begrijpen de pagina daardoor goed.
- **[ARIA](https://www.w3.org/TR/wai-aria/#introroles) alleen als het nodig is.** Met ARIA geven wij extra informatie door aan een schermlezer, bijvoorbeeld welke pagina actief is (`aria-current="page"`). Dat doen wij alleen als HTML dat zelf niet kan.
- **Alles werkt met toetsenbord en spraak.** Elke knop, link en elk veld is te bereiken en te bedienen met het toetsenbord en met spraak. Gebruikt u het toetsenbord, dan ziet u altijd waar u bent op de pagina.

### 2. De Rijkshuisstijl als basis

Het ontwerp volgt [de Rijkshuisstijl](https://www.rijkshuisstijl.nl/): de huisstijl van de Rijksoverheid. Gebruikers herkennen die, en dat geeft vertrouwen.

- **Het lettertype Rijks Sans.** Alle tekst staat in Rijks Sans. Wij gebruiken één [variabel lettertypebestand](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/Variable_fonts). Daarin zitten alle diktes, van dun tot vet.
- **De kleuren van de Rijksoverheid.** Alle kleuren komen uit de Rijkshuisstijl. Tekst en achtergrond verschillen genoeg van elkaar, volgens [de regels van WCAG](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- **Herkenbare onderdelen.** De onderdelen werken zoals gebruikers dat verwachten van een overheidswebsite: een duidelijk menu, knoppen die doen wat ze beloven en een professionele uitstraling.

### 3. Vaste waarden als gedeelde taal

Kleuren, afstanden, letters en randen liggen vast als [design tokens](https://www.w3.org/community/design-tokens/). Dat zijn vaste waarden met een naam. Ontwerpers en ontwikkelaars gebruiken dezelfde namen. Zo begrijpen zij elkaar.

- **De tokens van de Rijkshuisstijl Community.** Wij gebruiken de tokens van de [Rijkshuisstijl Community](https://rijkshuisstijl-community.vercel.app/) (RHC). Deze worden door veel overheidsorganisaties gebruikt.
- **Eigen tokens alleen als het nodig is.** Wijkt MijnOverheid Zakelijk af, dan maken wij een eigen token. Een voorbeeld is de kleur als u met de muis over een knop gaat. Die waarde staat op één plek, en geldt dan voor knoppen, het menu en uitklappers tegelijk.
- **Geen losse waarden.** In de code staan geen losse kleuren of afstanden. Wij gebruiken altijd een token. Zo blijft alles overal hetzelfde.

### 4. Bouwen met vaste bouwstenen

Het ontwerp bestaat uit bouwstenen die wij steeds opnieuw gebruiken, zoals knoppen, formulieren, tabellen en kaarten. In vaktaal heten die componenten.

- **Eerst wat er al is.** Wij gebruiken bouwstenen van de Rijkshuisstijl Community. Volstaat die niet, dan breiden wij een bestaande bouwsteen uit met een nieuwe variant. Pas als dat ook niet kan, maken wij een nieuwe bouwsteen. Die maken wij dan zo algemeen mogelijk zodat deze in verschillende situaties te gebruiken is.
- **Van bouwsteen naar pagina.** Een pagina bestaat uit bestaande bouwstenen. Daardoor ziet alles er hetzelfde uit en schrijven wij minder dubbele code.
- **Uitleg bij elke bouwsteen.** In het prototype staat een overzicht van alle bouwstenen, met een voorbeeld en de mogelijke instellingen. Daar staat ook wanneer u een bouwsteen gebruikt. Voor oplossingen voor een hele taak staan er ontwerppatronen.

### 5. De eenvoudigste oplossing

Wij kiezen altijd de eenvoudigste oplossing die werkt. Wij maken iets pas ingewikkelder als de eenvoudige oplossing aantoonbaar tekortschiet.

- **Eerst wat de browser al kan.** Een browser kan al veel zelf, zoals een uitklapper of een formulier. Daar gebruiken wij HTML en CSS voor. Extra code voegen wij alleen toe als het niet anders kan.
- **Een bekende basis.** Het portaal toont echte gegevens en taken in stappen, met berekeningen. Daarom bouwen wij met [Next.js](https://nextjs.org/) en [React](https://react.dev/). Dat zijn veelgebruikte hulpmiddelen om websites te maken. Wij voegen pas een extra hulpmiddel toe als dat echt nodig is.
- **Minder is makkelijker te onderhouden.** Elk extra hulpmiddel moet iemand begrijpen, bijhouden en testen. Hoe dichter wij bij de basis blijven, hoe meer mensen in het team ermee kunnen werken. Ook is het prototype dan makkelijker over te dragen aan wie het product straks echt bouwt.

### 6. Het prototype helpt om te praten

Het prototype is geen afgewerkt product. Het is een hulpmiddel om te testen en te praten. Met het prototype toetsen wij ontwerpkeuzes in gebruikersonderzoek. Ook maakt het gesprekken met belanghebbenden concreet.

- **Dezelfde techniek als het echte product.** Het prototype is gebouwd met dezelfde techniek als een echte website. Dat geeft een beter beeld dan een plaatje. Ook kunnen wij de interactie, de toegankelijkheid en de werking op elk scherm vroeg testen.
- **Varianten zonder aparte versies.** Met schakelaars zetten wij onderdelen aan of uit. Zo tonen wij verschillende versies in één prototype, bijvoorbeeld de huidige en de aankomende nieuwe huisstijl.
- **Stap voor stap beter.** Wij verbeteren het ontwerp stap voor stap, op basis van wat wij leren in onderzoek. Wij passen bouwstenen en pagina’s aan. Wij beginnen niet steeds opnieuw.

### 7. Ontwerpen voor nu en voor later

Bij het ontwerpen kijken wij steeds naar twee dingen. Wat kunnen wij nu bouwen en testen? En waar willen wij uiteindelijk naartoe? Dat einddoel geeft richting. Ook als het nu nog niet haalbaar is, door techniek, wetgeving of de manier waarop de overheid is georganiseerd.

- **Ontwerpen op aannames, toetsen bij gebruikers.** Niet elke keuze kunnen wij vooraf onderbouwen met onderzoek. Weten wij iets nog niet? Dan schrijven wij onze aanname op, en toetsen wij die zo snel mogelijk bij gebruikers. Onderzoek en ontwerp wisselen elkaar steeds af.
- **Het einddoel als kompas.** Sommige oplossingen kunnen nu nog niet. De wet staat het niet toe, systemen zijn er nog niet klaar voor, of de overheid moet eerst anders werken. Toch ontwerpen wij er alvast voor. Dan zijn wij klaar als dat wel kan.
- **Kleine stappen in de goede richting.** Elke stap levert iets op dat wij kunnen testen en gebruiken. Tegelijk brengt elke stap ons dichter bij het einddoel. Wij kiezen oplossingen die nu waarde hebben en later blijven passen.
