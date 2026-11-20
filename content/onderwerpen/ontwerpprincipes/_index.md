---
title: "De ontwerpprincipes van MijnOverheid Zakelijk"
card_title: "Ontwerpprincipes"
description: "MijnOverheid Zakelijk is gebouwd vanuit een set ontwerpprincipes die richting geven aan elke keuze. In het ontwerpproces staat altijd de eindgebruiker centraal."
weight: 4
hide_tiles: true
aliases:
  - /onderwerpen/ontwerp/
  - /onderwerpen/ontwerpprincipes/ontwerp-hoe/
  - /onderwerpen/ontwerpprincipes/ontwerp-wat/
---

Bij het ontwerpen van MijnOverheid Zakelijk staat de gebruiker voorop. Goed ontwerpen begint met luisteren. Daarom betrekken we ondernemers vanaf het begin bij het ontwerpen. Waar lopen ze tegenaan? Wat kost onnodig veel tijd of geeft ergernis? En waar liggen kansen? We verzamelen zowel problemen als behoeften en wensen. Zo krijgen we een duidelijk beeld van wat echt belangrijk is voor onze gebruikers, en delen we dat beeld met elkaar.

Bij elke ontwerpkeuze volgen we daarnaast deze principes:

1. [Ontwerpen voor de toekomst](#ontwerpen-voor-de-toekomst)
2. [Leren wat echt werkt met gebruikersonderzoek](#gebruikersonderzoek-leren-wat-echt-werkt)
3. [Ontwerpen in code, met hulp van AI](#ontwerpen-in-code-met-hulp-van-ai)
4. [Ontwerpfundamenten](#ontwerpfundamenten)
   1. [Toegankelijkheid](#toegankelijkheid)
   2. [De Rijkshuisstijl](#de-rijkshuisstijl)

## Ontwerpen voor de toekomst

We ontwerpen niet alleen voor wat nu kan, maar ook voor hoe het in de toekomst kan werken. Dat toekomstbeeld geeft richting. Ook als het nu nog niet haalbaar is, door techniek, wetgeving of de manier waarop de overheid is georganiseerd.

- **Het toekomstbeeld als kompas.** Sommige oplossingen kunnen nu nog niet. Toch ontwerpen we er alvast voor. Zo laten we zien wat mogelijk is, en zijn we klaar als het wel kan.
- **Aannames toetsen bij gebruikers.** Over de toekomst weten we nog niet alles. Daarom schrijven we onze aannames op en toetsen we die zo snel mogelijk bij gebruikers.
- **Kleine stappen in de goede richting.** Elke stap levert nu iets op dat we kunnen testen en gebruiken. Tegelijk brengt elke stap ons dichter bij dat toekomstbeeld.

## Gebruikersonderzoek: leren wat echt werkt

We leggen onze ideeën voor aan gebruikers, in gesprekken, interviews en gebruikersonderzoek. Zo controleren we of onze aannames kloppen. Ook horen we wat gebruikers vinden van de functies, het gemak en de stappen in een taak. Daarbij werken we met een prototype dat echt werkt.

Wat we leren, passen we direct toe in het ontwerp. Daarna testen we opnieuw. Zo past wat we maken bij wat gebruikers nodig hebben en verwachten.

Hoe we gebruikersonderzoek doen, lees je op de pagina [Gebruikersonderzoeken](/onderwerpen/gebruikersonderzoeken/). Daar publiceren we ook de resultaten.

### Het prototype

Het prototype is geen afgewerkt product. Het is een hulpmiddel om te testen en te praten. Met het prototype proberen we nieuwe ideeën uit en toetsen we ontwerpkeuzes in gebruikersonderzoek. Ook maakt het gesprekken met belanghebbenden concreet. De code is daarom niet bedoeld om zo in een echt product te gebruiken.

- **Dezelfde techniek als een echte website.** We bouwen het prototype met [Next.js](https://nextjs.org/) en [React](https://react.dev/). Dat zijn veelgebruikte hulpmiddelen om websites te maken. We schrijven de code in [TypeScript](https://www.typescriptlang.org/). Die taal vangt fouten op voordat de website online staat.
- **Stap voor stap beter.** We verbeteren het ontwerp stap voor stap, op basis van wat we leren in onderzoek. We passen bouwstenen en pagina's aan. We beginnen niet steeds opnieuw.
- **Begrijpelijke taal.** Alle teksten in het prototype schrijven we op taalniveau B1, zodat zoveel mogelijk mensen ze begrijpen.

Het prototype staat op [moza.mijnoverheidzakelijk.nl](https://moza.mijnoverheidzakelijk.nl/). Dit is dezelfde versie die we in gebruikersonderzoeken aan ondernemers voorleggen.

## Ontwerpen in code, met hulp van AI

We ontwerpen direct in de code van de website, niet in een ontwerpprogramma zoals Figma of Sketch. Zo hoeft niemand een ontwerp nog om te zetten naar code. Dat scheelt tijd, er gaat geen informatie verloren en het resultaat wijkt niet af van het ontwerp. Wat we ontwerpen, is meteen wat de gebruiker ziet.

Dat heeft deze voordelen:

- **Je ziet het resultaat meteen.** Een wijziging is direct zichtbaar in de browser. Niemand hoeft het ontwerp over te nemen of uit te leggen.
- **De interactie is echt.** Je kunt direct ervaren wat er gebeurt als je met de muis over een knop gaat, met het toetsenbord werkt of op een knop drukt. Dat kunnen we ook direct testen.
- **Het werkt meteen op elk scherm.** In de browser zien we hoe het ontwerp werkt op een telefoon, een tablet en een groot scherm. We hoeven geen apart ontwerp per schermgrootte te maken.
- **Het is meteen toegankelijk.** Toegankelijkheid hoort bij het ontwerpen. We testen direct met muis, toetsenbord en spraak.
- **Er is maar één versie.** De code is het ontwerp. Er kan dus geen verschil ontstaan tussen een tekening en het prototype.
- **Aanpassen is makkelijk.** Na een test of feedback passen we de code direct aan. Daar zijn geen tussenstappen of extra programma's voor nodig.

Daarbij gebruiken we [Claude Code](https://claude.com/claude-code). Dat is een assistent die werkt met kunstmatige intelligentie (AI). De assistent neemt het ontwerpen niet over, maar helpt ons sneller te werken. De ontwerper bepaalt de richting, maakt de keuzes en bewaakt de kwaliteit. Claude helpt ons bijvoorbeeld bij het redigeren van teksten en bij een gebruikerservaring (UX) die overal hetzelfde is.

De assistent volgt vaste afspraken over code, toegankelijkheid en schrijven. We bekijken alles wat de assistent maakt, en passen het aan als dat nodig is.

## Ontwerpfundamenten

De basis van ons ontwerp bestaat uit een paar vaste fundamenten. Die bouwen we stap voor stap uit. Zo groeien we toe naar een volwaardig design systeem: een gedeelde set afspraken en bouwstenen die het hele team gebruikt.

### Toegankelijkheid

Iedereen moet een overheidswebsite kunnen gebruiken. Ook mensen met een beperking. Toegankelijkheid is daarom geen extraatje achteraf. We houden er vanaf het begin rekening mee, bij het ontwerpen en bij het bouwen.

De regels voor digitale toegankelijkheid staan in de Europese norm [EN 301 549](https://accessible-eu-centre.ec.europa.eu/content-corner/digital-library/en-3015492021-accessibility-requirements-ict-products-and-services_en). Die norm volgt de internationale richtlijnen [WCAG 2.2](https://www.w3.org/Translations/WCAG22-nl/). We bouwen volgens niveau AA. Dat is het niveau dat de overheid verplicht stelt.

- **Eerst de juiste HTML.** We gebruiken [het juiste HTML-element voor elke functie](https://developer.mozilla.org/en-US/curriculum/core/semantic-html/). Zo begrijpt een schermlezer de pagina. [ARIA](https://www.w3.org/TR/wai-aria/#introroles) gebruiken we alleen als HTML het zelf niet kan.
- **Alles werkt met toetsenbord en spraak.** Je ziet altijd waar je bent op de pagina.

### De Rijkshuisstijl

Het ontwerp volgt zoveel mogelijk [de Rijkshuisstijl](https://www.rijkshuisstijl.nl/): de huisstijl van de Rijksoverheid. Gebruikers herkennen die, en dat geeft vertrouwen. We nemen het lettertype, de kleuren en de vaste waarden (design tokens) over. Ook gebruiken we de bouwstenen van de [Rijkshuisstijl Community](https://rijkshuisstijl-community.vercel.app/), zoals knoppen, formulieren en tabellen. Alleen als iets daar niet in staat, maken we zelf een oplossing.
