# MijnOverheid Zakelijk Site

## Project Overview

- **Type**: Hugo static site (v0.153.5)
- **Taal**: Nederlands (NL)
- **Doel**: Site voor MijnOverheid Zakelijk
- **Design**: Rijkshuisstijl

## Projectstructuur

- `content/` - Markdown content (pagina's, weekly updates)
- `content/presentaties/` - Reveal.js presentaties (HTML page bundles)
- `layouts/` - Go templates, partials, shortcodes
- `assets/css/` - CSS met design tokens in `tokens.css`
- `static/` - Statische bestanden (fonts, favicon)
- `hugo.yaml` - Hoofdconfiguratie
- `justfile` - Command runner (just up, just build, etc.)

## Veelvoorkomende Taken

### Weekly Update Maken

1. Run: `hugo new content weekly/YYYY/YYYY-MM-DD.md` (vervang jaar en datum)
2. Bewerk het nieuw aangemaakte bestand in `content/weekly/YYYY/`
3. Vraag naar input voor de Weekly en vul op basis daarvan de sectie Algemeen en eventueel andere secties in

### Nieuwe Presentatie Maken

Presentaties gebruiken Reveal.js en wijken af van andere pagina's:

1. Run: `hugo new content presentaties/naam-van-presentatie` (gebruik kebab-case)
2. Bewerk `index.html` met Reveal.js slides (geen Markdown)
3. Plaats afbeeldingen in `images/` submap

## Project Commands

Dit project heeft Claude commands voor veelvoorkomende taken:

- `/check` - Voer een volledige kwaliteitscheck uit
- `/new-weekly` - Maak een nieuwe weekly update aan
- `/new-presentatie` - Maak een nieuwe Reveal.js presentatie

## Agents

Gespecialiseerde agents voor specifieke taken:

- `content-reviewer` - Controleer content op spelling, leesbaarheid en B1 taalniveau
- `seo-checker` - Analyseer SEO-aspecten (meta tags, headings, alt-teksten)
- `a11y-reviewer` - Controleer toegankelijkheid (WCAG 2.1 AA)
- `hugo-helper` - Help met Hugo templates, shortcodes en debugging

Gebruik agents door ernaar te verwijzen in je prompt, bijv.: "Gebruik de content-reviewer agent om deze pagina te controleren."

## Rules

Gedragsregels in `.claude/rules/`:

- `taal-en-stijl.md` - Nederlands, B1 taalniveau, Rijkshuisstijl
- `code-conventies.md` - Hugo templates, CSS, content structuur
- `documentatie.md` - Links naar Hugo en Reveal.js documentatie

## Code Conventies

- CSS: Pure CSS met variabelen (geen preprocessor)
- Design tokens staan in `assets/css/tokens.css`
- Nederlands voor alle content en UI teksten
- Gebruik bestaande components waar mogelijk

### Hugo Layouts Structuur (v0.146.0+)

Dit project gebruikt de nieuwe Hugo template structuur.

- Templates direct in `layouts/` plaatsen (niet in `_default/`)
- Partials in `layouts/_partials/` (met underscore)
- Shortcodes in `layouts/_shortcodes/` (met underscore)
- Homepage template: `layouts/home.html` (niet `index.html`)
- Baseof templates: `layouts/baseof.html`

Zie [Hugo template system overview](https://gohugo.io/templates/new-templatesystem-overview/) voor details.

## Verificatie

Dit project gebruikt [just](https://just.systems/) als command runner:

- Dev server: `just up`
- Build: `just build`
- Check broken links: `just check`
- Pre-commit checks: `just pre-commit`
- Screenshots: Playwright MCP kan worden gebruikt voor het maken van screenshots van pagina's

De pre-commit hook (Lefthook) draait de checks automatisch bij elke commit.

## Onderhoud

Bij het aanpassen van instructies in dit bestand: check ook `.claude/commands/` of de bijbehorende command files moeten worden bijgewerkt (en vice versa).
