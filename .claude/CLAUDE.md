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

## Skills

Skills worden automatisch geladen wanneer relevant. Je kunt ze ook direct aanroepen met `/skill-naam`.

### Workflow
- `/check` - Kwaliteitscheck (build + broken links)
- `/new-weekly` - Nieuwe weekly update
- `/new-presentatie` - Nieuwe Reveal.js presentatie

### Review (auto-invocation)
- `/content-review` - Spelling, leesbaarheid, B1 taalniveau
- `/a11y-review` - Toegankelijkheid (WCAG 2.1 AA)
- `/seo-check` - SEO-aspecten (meta tags, headings)

### Hulp (auto-invocation)
- `/hugo-help` - Hugo templates, shortcodes, debugging

De review en hulp skills worden automatisch geactiveerd wanneer je vraagt om content te checken, toegankelijkheid te controleren, of hulp nodig hebt met Hugo.

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

Bij het aanpassen van instructies in dit bestand: check ook `.claude/skills/` of de bijbehorende skill files moeten worden bijgewerkt (en vice versa).
