---
title: "Hoe: uitgangspunten bij het ontwerpen"
page_title: "Ontwerpprincipes - Hoe: uitgangspunten bij het ontwerpen"
weight: 2
description: "Het “Hoe” beschrijft de uitgangspunten die wij volgen bij het ontwerpen van het prototype."
---

Bij het ontwerpen staat de gebruiker voorop. Daarnaast volgen wij een aantal uitgangspunten. Die gaan over het prototype, ontwerpen in code met hulp van AI en hoe wij schrijven.

## Het prototype

Het prototype is geen afgewerkt product. Het is een hulpmiddel om te testen en te praten. Met het prototype proberen wij nieuwe ideeën uit en toetsen wij ontwerpkeuzes in gebruikersonderzoek. Ook maakt het gesprekken met belanghebbenden concreet. De code is daarom niet bedoeld om zo in een echt product te gebruiken.

- **Dezelfde techniek als een echte website.** Wij bouwen het prototype met [Next.js](https://nextjs.org/) en [React](https://react.dev/). Dat zijn veelgebruikte hulpmiddelen om websites te maken. Wij schrijven de code in [TypeScript](https://www.typescriptlang.org/). Die taal vangt fouten op voordat de website online staat.
- **Stap voor stap beter.** Wij verbeteren het ontwerp stap voor stap, op basis van wat wij leren in onderzoek. Wij passen bouwstenen en pagina's aan. Wij beginnen niet steeds opnieuw.

## Ontwerpen in code, met hulp van AI

Wij ontwerpen niet in een ontwerpprogramma zoals Figma of Sketch, maar direct in de code van de website. Een tekenprogramma voegt een extra stap toe: het ontwerp moet daarna nog worden omgezet in code. Die stap kost tijd. Er gaat informatie verloren, en het resultaat wijkt vaak af. Als wij direct in code werken, is die stap niet nodig. Wat wij ontwerpen, is meteen wat de gebruiker ziet.

Dat heeft deze voordelen:

- **U ziet het resultaat meteen.** Een wijziging is direct zichtbaar in de browser. Niemand hoeft het ontwerp over te nemen of uit te leggen.
- **De interactie is echt.** U kunt direct ervaren wat er gebeurt als u met de muis over een knop gaat, met het toetsenbord werkt of op een knop drukt. Dat kunnen wij ook direct testen.
- **Het werkt meteen op elk scherm.** In de browser zien wij hoe het ontwerp werkt op een telefoon, een tablet en een groot scherm. Wij hoeven geen apart ontwerp per schermgrootte te maken.
- **Het is meteen toegankelijk.** Toegankelijkheid hoort bij het ontwerpen. Wij testen direct met muis, toetsenbord en spraak.
- **Er is maar één versie.** De code is het ontwerp. Er kan dus geen verschil ontstaan tussen een tekening en het prototype.
- **Aanpassen is makkelijk.** Na een test of feedback passen wij de code direct aan. Daar zijn geen tussenstappen of extra programma's voor nodig.

Daarbij gebruiken wij [Claude Code](https://claude.com/claude-code). Dat is een assistent die werkt met kunstmatige intelligentie (AI). De assistent neemt het ontwerpen niet over, maar helpt ons sneller te werken. De ontwerper bepaalt de richting, maakt de keuzes en bewaakt de kwaliteit. Claude helpt ons bijvoorbeeld bij het redigeren van teksten en bij een gebruikerservaring (UX) die overal hetzelfde is.

De assistent volgt vaste afspraken over code, toegankelijkheid en schrijven. Wij bekijken alles wat de assistent maakt, en passen het aan als dat nodig is.

## Schrijfwijzer

Wij hebben een schrijfwijzer. Daarin staan afspraken over hoe wij schrijven:

* wij spreken de gebruiker aan met *“u”* en schrijven *“u heeft”*. Over onszelf schrijven wij *“wij”*;
* wij schrijven genderneutraal en op taalniveau B1;
* voor elk begrip gebruiken wij één woord. Bewaren, Opslaan en Versturen betekenen bijvoorbeeld elk iets anders. Na het versturen heet een aanvraag een dossier;
* er zijn vaste afspraken voor datums, bedragen, aanhalingstekens, knoppen, foutmeldingen en lege pagina's.
