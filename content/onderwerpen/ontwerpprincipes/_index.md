---
title: "De ontwerpprincipes van MijnOverheid Zakelijk"
card_title: "Ontwerpprincipes"
description: "MijnOverheid Zakelijk is gebouwd vanuit een set ontwerpprincipes die richting geven aan elke keuze. In het ontwerpproces staat altijd de eindgebruiker centraal."
weight: 4
hide_tiles: true
prev_next: true
sectienavigatie: true
aliases:
  - /onderwerpen/ontwerp/
  - /onderwerpen/ontwerpprincipes/ontwerp-hoe/
---

Op deze pagina lees je hoe we MijnOverheid Zakelijk ontwerpen. We beginnen bij de gebruiker: met gebruikersonderzoek en een werkend prototype toetsen we onze ideeën. We ontwerpen direct in code, met hulp van AI. En bij elke ontwerpkeuze volgen we een paar vaste ontwerpprincipes.

## De gebruiker staat voorop

Goed ontwerpen begint met luisteren. Daarom betrekken we gebruikers vanaf het begin bij het ontwerpen. Eerst kijken we hoe hun werkdag eruitziet. Waar lopen ze tegenaan? Wat kost onnodig veel tijd of geeft ergernis? En waar liggen kansen?

We verzamelen zowel problemen als behoeften en wensen. Zo krijgen we een duidelijk beeld van wat echt belangrijk is voor onze gebruikers, en delen we dat beeld met elkaar.

### Gebruikersonderzoek: leren wat echt werkt

We leggen onze ideeën voor aan gebruikers, in gesprekken, interviews en gebruikersonderzoek. Zo controleren we of onze aannames kloppen. Ook horen we wat gebruikers vinden van de functies, het gemak en de stappen in een taak. Daarbij werken we met een prototype dat echt werkt.

Wat we leren, passen we direct toe in het ontwerp. Daarna testen we opnieuw. Zo past wat we maken bij wat gebruikers nodig hebben en verwachten.

Hoe we gebruikersonderzoek doen, lees je op de pagina [Gebruikersonderzoeken](/onderwerpen/gebruikersonderzoeken/). Daar publiceren we ook de resultaten.

#### Het prototype

Het prototype is geen afgewerkt product. Het is een hulpmiddel om te testen en te praten. Met het prototype proberen we nieuwe ideeën uit en toetsen we ontwerpkeuzes in gebruikersonderzoek. Ook maakt het gesprekken met belanghebbenden concreet. De code is daarom niet bedoeld om zo in een echt product te gebruiken.

- **Dezelfde techniek als een echte website.** We bouwen het prototype met [Next.js](https://nextjs.org/) en [React](https://react.dev/). Dat zijn veelgebruikte hulpmiddelen om websites te maken. We schrijven de code in [TypeScript](https://www.typescriptlang.org/). Die taal vangt fouten op voordat de website online staat.
- **Stap voor stap beter.** We verbeteren het ontwerp stap voor stap, op basis van wat we leren in onderzoek. We passen bouwstenen en pagina's aan. We beginnen niet steeds opnieuw.
- **Begrijpelijke taal.** Alle teksten in het prototype schrijven we op taalniveau B1, zodat zoveel mogelijk mensen ze begrijpen.

Het prototype staat op [moza.mijnoverheidzakelijk.nl](https://moza.mijnoverheidzakelijk.nl/). Dit is dezelfde versie die we in gebruikersonderzoeken aan ondernemers voorleggen.

## Ontwerpen in code, met hulp van AI

We ontwerpen niet in een ontwerpprogramma zoals Figma of Sketch, maar direct in de code van de website. Een tekenprogramma voegt een extra stap toe: het ontwerp moet daarna nog worden omgezet in code. Die stap kost tijd. Er gaat informatie verloren, en het resultaat wijkt vaak af. Als we direct in code werken, is die stap niet nodig. Wat we ontwerpen, is meteen wat de gebruiker ziet.

Dat heeft deze voordelen:

- **Je ziet het resultaat meteen.** Een wijziging is direct zichtbaar in de browser. Niemand hoeft het ontwerp over te nemen of uit te leggen.
- **De interactie is echt.** Je kunt direct ervaren wat er gebeurt als je met de muis over een knop gaat, met het toetsenbord werkt of op een knop drukt. Dat kunnen we ook direct testen.
- **Het werkt meteen op elk scherm.** In de browser zien we hoe het ontwerp werkt op een telefoon, een tablet en een groot scherm. We hoeven geen apart ontwerp per schermgrootte te maken.
- **Het is meteen toegankelijk.** Toegankelijkheid hoort bij het ontwerpen. We testen direct met muis, toetsenbord en spraak.
- **Er is maar één versie.** De code is het ontwerp. Er kan dus geen verschil ontstaan tussen een tekening en het prototype.
- **Aanpassen is makkelijk.** Na een test of feedback passen we de code direct aan. Daar zijn geen tussenstappen of extra programma's voor nodig.

Daarbij gebruiken we [Claude Code](https://claude.com/claude-code). Dat is een assistent die werkt met kunstmatige intelligentie (AI). De assistent neemt het ontwerpen niet over, maar helpt ons sneller te werken. De ontwerper bepaalt de richting, maakt de keuzes en bewaakt de kwaliteit. Claude helpt ons bijvoorbeeld bij het redigeren van teksten en bij een gebruikerservaring (UX) die overal hetzelfde is.

De assistent volgt vaste afspraken over code, toegankelijkheid en schrijven. We bekijken alles wat de assistent maakt, en passen het aan als dat nodig is.
