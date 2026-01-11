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

## Content

- Front matter altijd in YAML formaat
- Slugs in kebab-case
- Afbeeldingen in page bundles waar mogelijk
