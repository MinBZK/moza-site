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
