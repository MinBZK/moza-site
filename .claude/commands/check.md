Voer een volledige kwaliteitscheck uit op de Hugo site.

Stappen:
1. Run: `rm -rf public && hugo --minify --logLevel warn`
2. Run: `rm -rf .htmltest && hugo --minify --quiet --destination .htmltest/public && htmltest && rm -rf .htmltest`
3. Rapporteer eventuele problemen in begrijpelijke taal

Als er fouten zijn:
- Leg uit wat het probleem is
- Geef suggesties voor hoe het opgelost kan worden
- Bied aan om te helpen met de fix

Dit is dezelfde check die ook automatisch draait via de pre-commit hook (Lefthook).
