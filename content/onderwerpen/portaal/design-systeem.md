---
title: "Design systeem"
description: "Welk design systeem gebruiken we voor de front-end van het portaal?"
---

## Wat is een design systeem?

Een design systeem is een samenhangende set van herbruikbare UI-componenten, richtlijnen en design tokens die zorgen voor consistentie in vormgeving en gedrag. Het helpt teams sneller en betrouwbaarder te bouwen doordat visuele en interactieve regels centraal worden beheerd en hergebruikt.
Dit is specifiek van belang vanuit de gedachte dat de overheid één herkenbare vormgeving voor de burgers en ondernemers wil presenteren.

## Waar moet het design systeem aan voldoen voor MOZa?

Uiteindelijk moet het MOZa project in beheer genomen worden door Logius. Hiervoor zijn een serie eisen opgesteld waaraan het project moet voldoen. Specifiek voor de front-end komt dat neer op:

- Taal: Typescript
- Front-end framework: Next.JS (met App router)
- Library: React
- Design systeem: Lux design system

Deze laatste eis wordt momenteel onderzocht. In het overdracht-document staat namelijk:

> Front-end onderdelen moeten gebruikmaken van het Logius Design System (LUX). Op het moment van schrijven zijn de LUX React-componenten nog niet compatibel met Next.js.
> Zolang dit het geval is, geldt:
>
> - Gebruik LUX design tokens voor kleuren, typografie en spacing;
> - Maak geen gebruik van eigen styling frameworks of externe UI-bibliotheken;
> - Componenten worden zo opgezet dat ze in de toekomst eenvoudig geïntegreerd kunnen worden in LUX (conform het Open-Tenzij beleid).

## Wat is het LUX design system?

Het [LUX design system](https://github.com/nl-design-system/lux) staat voor **Logius User eXperience** en is gebaseerd op het NLDS. Het [RHC-nlds](https://www.rijkshuisstijl-community.nl/) - De Rijkshuisstijl Community Design System - doet hetzelfde.
Bij navraag bij de developers bij team UX (onderdeel van KOOP) is het volgende gemeld:

> Wij onderhouden zowel LUX-ds als RHC-nlds. Sinds een jaar is uitgesproken dat het beter zou zijn als LUX-ds deprecated gemaakt zou worden, zodat de focus volledig kan liggen op RHC-nlds (in praktijk is dit al bijna zo). Ook binnen Logius wordt nu al (onofficieel) geadviseerd om RHC-nlds te gebruiken.
> Er is wel de LUX design tokens set (hier werd in het overdracht document naar gerefereerd): een reeks van kleuren en afstanden, waardoor je eigen specificaties kunt definiëren bovenop RHC-nlds.

## Kunnen we het RHC-nlds gebruiken?

In het begin van het MOZa project is uitgebreid gekeken naar RHC-nlds. Het project is echter nog niet volwassen genoeg om breed te gebruiken. We zijn voor een paar maanden aangehaakt bij de ontwikkeling van RHC-nlds om te zien of we iets konden bijdragen (en ervoor konden zorgen dat het design systeem bruikbaarder zou worden voor MOZa). Zoals bescheven in [dit document](mox-nlds.md) zijn er echter een aantal fundamentele problemen in de kern-opzet van RHC-nlds, waardoor we tot nu toe gewerkt hebben aan een eigen systeem (Het **MOX-nlds**). Er is nu in het team-overleg besloten om opnieuw te kijken naar wat er mogelijk is in de bestaande design systemen, om te voorkomen dat er meerdere teams aan verschillende dingen werken maar eigenlijk hetzelfde doen.

## Alternatief: NLDD Design System

Er is binnen de overheid nog iemand bezig met het ontwikkelen van een design systeem wat bedoeld is als de de-facto keuze voor het opzetten van front-end in Rijksoverheids applicaties:

[NLDD Design system](https://github.com/MinBZK/storybook): Het design systeem van de Nederlandse Digitale Dienst / Regelrecht. Dit wordt beheerd door [Bart van den Biezen](https://github.com/bartvandebiezen).

Dit systeem is echter niet voor React componenten gebouwd, maar voor Vue. Ook voldoet het niet aan de Rijkshuisstijl. Dit zal dus niet gaan werken met MOZa, omdat we verplicht zijn in React te werken vanuit Logius.

## Vergelijking: Logius eisen vs. bestaande systemen

| Logius vereisten | RHC-nlds | NLDD Design system |
| ---------------- | :------: | :----------------: |
| Typescript       |    ✓     |         ✗          |
| React            |    ✓     |         ✗          |
| Next.JS          |   ✗ \*   |         ✗          |

(\*) Opmerking: RHC-nlds is op dit moment nog niet goed compatibel met Next.JS `Links` en andere typische Next-componenten zoals `Image`. Datzelfde geldt voor React server components. Dit zorgt op dit moment nog voor veel extra noodzaak om dingen custom te bouwen.

## Conclusie

Zodra we MOZa overdragen aan Logius, is RHC-nlds wellicht volledig ontwikkeld en bruikbaar. Tot die tijd moeten we echter een strategie volgen om overstappen op RHC-nlds zo pijnloos mogelijk te maken.

Op dit moment is het portaal gebouwd door custom CSS en Tailwind-classes.
We gaan kijken in hoeverre we de LUX design-tokens al kunnen gebruiken.
Een poging om al deels componenten van RHC-nlds te gebruiken wordt verder onderzocht. Er zijn nog wel een aantal fundamentele problemen bij RHC-nlds, die we met MOX-nlds wilden oplossen. Het idee is nu om toch een tussenvorm te vinden. Er wordt nog besproken of we daarvoor een grotere rol willen spelen bij de Rijkshuisstijl Community.
