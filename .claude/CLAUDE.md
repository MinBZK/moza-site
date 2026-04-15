# MijnOverheid Zakelijk Site

Hugo static site (v0.153.5) | Nederlands | Rijkshuisstijl

## Structuur

```
content/               # Markdown content
content/presentaties/  # Reveal.js (HTML page bundles)
layouts/               # Go templates
layouts/_partials/     # Partials (underscore prefix)
layouts/_shortcodes/   # Shortcodes
assets/css/            # CSS, tokens in tokens.css
assets/vendor/         # Vendored JS (Fuse.js, Reveal.js)
scripts/               # Build scripts (render-mermaid.js)
static/images/render/  # Pre-gerenderde Mermaid SVGs (gegenereerd, in .gitignore)
hugo.yaml              # Configuratie
justfile               # Commands: just up, just build, just check
```

## Commando's

```bash
just setup              # Node dependencies installeren (eenmalig, voor Mermaid rendering)
just up                 # Render SVGs + dev server
just build              # Render SVGs + build
just test               # Tests uitvoeren
just render-mermaid     # Alleen SVGs renderen
just watch-mermaid      # SVGs herrenderen bij wijzigingen (aparte terminal)
just check              # Render SVGs + broken links check
just clean              # Verwijder gegenereerde bestanden
just pre-commit         # Pre-commit checks
```

## Mermaid-diagrammen

Diagrammen in Markdown worden vooraf gerenderd als SVG (light + dark) door `scripts/render-mermaid.js`. De render hook (`layouts/_markup/render-codeblock-mermaid.html`) toont de pre-gerenderde SVGs als `<img>`. Als de SVGs ontbreken, faalt de Hugo build.

Elk mermaid-blok moet een `accTitle` hebben voor de bestandsnaam en toegankelijkheid. Zonder `accTitle` wordt een fallback `diagram-N` gebruikt.

## Skills

Workflow: `/check`, `/new-weekly`, `/new-presentatie`
Review: `/content-review`, `/a11y-review`, `/seo-check`
Hulp: `/hugo`

## Rules

Zie `.claude/rules/` voor:
- `taal-en-stijl.md` - Nederlands, B1, Rijkshuisstijl
- `code-conventies.md` - Hugo templates, CSS, content
- `documentatie.md` - Hugo en Reveal.js docs
- `git.md` - Commit conventies
- `browser-testing.md` - Playwright MCP voor browser tests
