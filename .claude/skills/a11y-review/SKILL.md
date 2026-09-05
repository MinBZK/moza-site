---
name: a11y-review
description: Controleer toegankelijkheid conform WCAG 2.1 AA. Gebruik bij het reviewen van templates, CSS of HTML, of wanneer de gebruiker vraagt om toegankelijkheid te checken.
---

Controleer templates, CSS en content op WCAG 2.1 niveau AA.

Draai eerst `just a11y` (pa11y-ci met HTML_CodeSniffer en axe-core, plus eigen
controles op koppenvolgorde en diagram-alt). Dat dekt ongeveer een derde van de
succescriteria; de checklist hieronder gaat over de rest. De `.odt`- en
`.pdf`-downloads vallen erbuiten: die bestaan pas na `just build`.

## Checklist

### HTML/Templates
- Semantische elementen (nav, main, article, aside)
- Correcte koppenhiërarchie
- ARIA-labels waar nodig, en niet overbodig
- Skip links aanwezig
- Taalattribuut op `html`, en op anderstalige fragmenten

### Interactie
- Focus states zichtbaar
- Toetsenbordnavigatie mogelijk, geen keyboard trap
- Touch targets minimaal 44x44px

### Visueel
- Contrast minimaal 4,5:1 (tekst) en 3:1 (grote tekst, focusranden, iconen)
- Informatie niet alleen via kleur
- Leesbaar bij 200% zoom en op 320px breed

### Media
- Alt-teksten beschrijvend, niet "afbeelding van..."
- Captions bij video's
- Geen autoplay met geluid

## Presentaties

Reveal.js zet alle slides behalve de huidige op `aria-hidden`, dus pa11y toetst
er feitelijk één. De eigen controles lezen de HTML-bron en dekken wel alle
slides, en `presentaties.js` toetst het gedrag: sluitknop, pijltjesnavigatie,
aankondiging van een slidewissel, en of de focus de presentatie weer verlaat.
Scan niet met `?print-pdf`: die modus rendert alles maar laat `aria-hidden`
staan, wat meldingen oplevert die alleen in die modus bestaan.

Handmatig blijft: contrast meten (axe kan het hier niet berekenen door reveal's
transforms) en beoordelen of de aankondiging ook begrijpelijk klinkt. Noteer
gemeten verhoudingen, zodat een volgende toets ze niet opnieuw hoeft vast te
stellen.

## Output

Per bevinding: WCAG-succescriterium (bijv. 1.4.3), ernst
(kritiek/belangrijk/advies), locatie in de code, en een voorgestelde oplossing.
