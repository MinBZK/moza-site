# Git Conventies

## Commits

- Geen Co-Authored-By header voor Claude toevoegen
- Commit messages in het Nederlands
- Beschrijf wat de wijziging doet, niet hoe

## Branches

- Feature branches: `feature/beschrijving`
- Bugfix branches: `fix/beschrijving`
- Gebruik kebab-case voor branchnamen

## Bestandsoperaties

- Gebruik `git mv` in plaats van `mv` (behoudt historie)
- Gebruik `git rm` in plaats van `rm` voor tracked files

## Verplichte checks

De ruleset `main` op GitHub eist vijf jobs uit `.github/workflows/test.yml` op naam: Python-scripts, Node-scripts, Toegankelijkheid, Downloads en PDF/UA, Content-Security-Policy. "Links" is bewust niet verplicht: een externe URL die even plat ligt, mag een merge niet tegenhouden. "Site bouwen" ook niet: faalt de build, dan falen de verplichte jobs die erop wachten vanzelf. "Toegankelijkheid" is een verzameljob: de toetsen zelf draaien als "Toegankelijkheid (…)" op drie runners, en die namen staan niet in de ruleset.

- Hernoem of verwijder je zo'n job, pas dan de ruleset aan (Settings, Rules) zodra die PR gemerged is; de ruleset staat niet in de repo. Anders wacht elke PR op een check die nooit komt.
- Een nieuwe job wordt niet vanzelf verplicht; voeg hem toe aan de ruleset als hij een merge moet tegenhouden.
