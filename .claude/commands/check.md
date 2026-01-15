Voer een volledige kwaliteitscheck uit op de Hugo site.

## Technische checks

1. Run: `rm -rf public && hugo --minify --logLevel warn`
2. Run: `rm -rf .htmltest && hugo --minify --quiet --destination .htmltest/public && htmltest && rm -rf .htmltest`
3. Rapporteer eventuele problemen in begrijpelijke taal

## Optionele vervolgchecks

Na de technische checks, vraag of de gebruiker ook wil:
- **Content review**: Gebruik de `content-reviewer` agent om recente of gewijzigde content te controleren op spelling en leesbaarheid
- **Toegankelijkheid**: Gebruik de `a11y-reviewer` agent om templates te controleren op WCAG 2.1 compliance
- **SEO**: Gebruik de `seo-checker` agent om meta descriptions en heading structuur te controleren

## Bij fouten

- Leg uit wat het probleem is
- Geef suggesties voor hoe het opgelost kan worden
- Bied aan om te helpen met de fix

Dit is dezelfde check die ook automatisch draait via de pre-commit hook (Lefthook).
