# Code Conventies

## Hugo Templates

- Gebruik de nieuwe Hugo template structuur (v0.146.0+)
- Templates direct in `layouts/` (niet in `_default/`)
- Partials in `layouts/_partials/`
- Shortcodes in `layouts/_shortcodes/`

## CSS

- Pure CSS, geen preprocessor
- Gebruik variabelen uit `tokens.css`
- Geen inline styles in templates
- Mobile-first approach

## Commentaar

- Alleen voor een beperking of valkuil die niet uit de code blijkt
- Geen uitleg van een keuze of van hoe iets zo gekomen is: dat hoort in de commit

## Content

- Front matter altijd in YAML formaat
- Slugs in kebab-case
- Afbeeldingen in page bundles waar mogelijk; beeld dat in meer presentaties terugkomt staat in `assets/images/beeldbank/` (zie de skill `nieuwe-presentatie`)
- Description: max 160 tekens voor SEO en social media
  - Plaats belangrijkste info in eerste 69 tekens (LinkedIn limiet)
  - Hugo toont waarschuwing bij te lange descriptions

## Zoekindex

- Wat een bezoeker moet kunnen vinden, moet in de zoekindex staan (`layouts/index.json`, gebouwd als `public/index.json`). Valideer dat bij elke nieuwe shortcode, layout, datastructuur of soort content: bouw de site en zoek een woord uit die nieuwe tekst op in `public/index.json`.
- Staat de tekst er niet in, pas dan de index aan in dezelfde PR. Tekst die alleen een shortcode of template toont, komt niet vanzelf in de index.
