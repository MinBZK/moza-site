# Project Landingspagina

Welkom bij de landingspagina voor presentaties en weeklies. Dit project is gebouwd met React en Vite en genereert automatisch overzichtspagina's op basis van de bestanden in de content-map.

## Content Toevoegen

Het toevoegen van nieuwe wekelijkse updates of presentaties is heel eenvoudig. Je hoeft hiervoor geen code aan te passen; je hoeft alleen bestanden in de juiste map te plaatsen.

### 1. Wekelijkse Updates (Weekly's)
Alle wekelijkse updates staan in de map `public/content/weekly`.

*   **Hoe voeg je een nieuwe toe?**
    1.  Maak een nieuw Markdown-bestand (`.md`) aan in `public/content/weekly`.
    2.  Gebruik een duidelijke naam, bijvoorbeeld: `20260101-moza-weekly-01-januari.md`.
    3.  De applicatie zal dit bestand automatisch oppikken en tonen in het overzicht.

### 2. Presentaties
Alle presentaties staan in de map `public/content/presentaties`.

*   **Hoe voeg je een nieuwe toe?**
    1.  Maak een nieuwe map aan binnen `public/content/presentaties` met de naam van je presentatie.
    2.  Plaats je Markdown-bestand (bijv. `index.md`) en eventuele bijbehorende afbeeldingen in deze nieuwe map.
    3.  De presentaties worden getoond op basis van de mapstructuur.

## Bekijken

Om de pagina te bekijken, voer de volgende commando's uit:

1.  Installeer de afhankelijkheden: `npm install`
2.  Start de ontwikkelingsserver: `npm run dev`

De pagina is nu beschikbaar op `http://localhost:8080`.


## Zoeken laten werken
Zoeken werkt niet in de vite dev omgeving.

Om zoekfunctie te laten werken, run het volgende commando:
npm run build && npm run preview

De pagina is nu beschikbaar op `http://localhost:8080`.