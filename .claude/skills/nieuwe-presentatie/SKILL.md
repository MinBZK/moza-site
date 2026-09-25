---
name: nieuwe-presentatie
description: Maak een nieuwe presentatie aan met de layout nldd-deck (NLDD-componenten). Gebruik wanneer de gebruiker een nieuwe presentatie of slidedeck wil maken, of dia's wil toevoegen aan een presentatie met `layout: nldd-deck`.
---

Nieuwe presentaties gebruiken de layout `nldd-deck`. De oudere MOZa Pulse-presentaties draaien op Reveal.js; die laten we zoals ze zijn, maar nieuwe presentaties maak je niet meer met Reveal.

Voorbeeld om van te leren: `content/documenten/presentaties/beproeving-federatief-berichtenstelsel/index.html`.

## Stappen

1. Vraag naar de titel, een korte beschrijving (max. 160 tekens) en de datum van de presentatie.
2. Maak de page bundle aan (slug in kebab-case):
   ```bash
   hugo new content --kind presentaties documenten/presentaties/naam-van-presentatie
   ```
3. Vul `description` in de front matter en schrijf de dia's. Hoort er een kanttekening bij de hele presentatie (bijvoorbeeld "is in ontwikkeling"), zet die dan in `disclaimer`: de footer toont hem op elke dia.
4. Draai `just checks` (tests, CSP, toegankelijkheid, links).

## Hoe het werkt

- Layout: `layouts/documenten/presentaties/nldd-deck.html`, met de footer in `layouts/_partials/nldd-deck-footer.html`.
- Opmaak: `assets/css/nldd-deck.css`. Bediening: `assets/js/nldd-deck.js`.
- De dia's schalen mee met de breedte (16:9, eenheid `cqw`). Maak afmetingen in eigen CSS dus ook in `cqw`.
- **Leesmodus** is de standaard: elke dia staat volledig op het scherm. Met <kbd>P</kbd> gaat de **presentatiemodus** aan, die dia's per klik opbouwt. Een link met `?presentatie` opent direct in presentatiemodus.
- Het adres van een dia is `#/0`, `#/1`, enzovoort (telt vanaf 0, net als de zoekindex).

## Een dia

Elke dia is een `<section class="slide">` op het hoogste niveau, met een `aria-label`:

```html
<section class="slide" aria-roledescription="dia" aria-label="Korte naam van de dia">
  <p class="overline">Onderwerp</p>
  <h2 class="title">Titel van de dia</h2>
  <p class="lead">Eén of twee korte zinnen.</p>
</section>
```

Bouwstenen, allemaal in `nldd-deck.css`:

| Klasse | Waarvoor |
| --- | --- |
| `overline` | Klein geel label boven de titel |
| `title`, `title-hero` | Titel; `title-hero` alleen op de titeldia |
| `lead`, `lead-hero` | Inleidende zin onder de titel |
| `title statement` | Drie korte zinnen, elk in een `<span>`, met één `<strong>` als geel accent per zin |
| `footnote` | Toelichting met gele streep, max. twee regels |
| `compare`, `card` | Twee kaarten naast elkaar (bijvoorbeeld nu en straks) |
| `flow`, `flow-step` | Stappen in een rij met pijlen ertussen; het aantal kolommen volgt het aantal stappen |

Opmaak die alleen voor jouw presentatie is, zoals een eigen plaat of diagram, zet je in `presentatie.css` in de page bundle, naast `index.html`. De layout laadt dat bestand vanzelf als het er is. Voorbeeld: de bouwblokkenplaat (`bb-*`) in de berichtenpresentatie.

## Opbouwen per klik

Alleen in presentatiemodus; in leesmodus staat alles er meteen.

- `data-step="n"` op een onderdeel: verschijnt bij stap n. Nog niet getoonde onderdelen staan gedimd.
- `class="step-reveal"` erbij: helemaal onzichtbaar tot de stap, in plaats van gedimd.
- `data-start="1"` op de `<section>`: de dia opent met stap 1 al actief.

## Iconen en componenten

- Iconen: `<span class="ic"><nldd-icon name="bell"></nldd-icon></span>`. De `span` bepaalt grootte en kleur. Gebruik alleen namen uit de NLDD-icoonset (zie de `nldd`-skill of `node_modules/@nldd/design-system/dist/components/content/icon/icon-registry.js`).
- Knoppen: `<nldd-button>` met `href` voor een link die eruitziet als knop.
- Het script laadt alleen `icon`, `icon-button`, `button` en `keyboard-shortcut`. Gebruik je een ander NLDD-component, voeg dan de import toe in `assets/js/nldd-deck.js`.

## Regels

- Geen inline `style` of `<script>` in de content: de CSP blokkeert die. Opmaak hoort in `nldd-deck.css` (algemeen) of `presentatie.css` in de bundle (alleen voor deze presentatie).
- Afbeeldingen in de page bundle, met een `alt` die zegt wat er te zien is.
- Tekst volgens `.claude/rules/taal-en-stijl.md`: B1, korte zinnen. Een dia is geen document.
- Externe links die achter een login zitten (zoals een democonsole) geven in de linkcontrole een 403. Zet ze dan op de negeerlijst in `.htmltest.yml`, met een regel uitleg.

## Output

Toon het pad naar de aangemaakte presentatie en het lokale adres (`just up`, dan `http://localhost:1313/documenten/presentaties/<slug>/`), en bied aan de eerste dia's te schrijven.
