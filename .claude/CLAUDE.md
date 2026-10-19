# MijnOverheid Zakelijk Site

Hugo static site (v0.166.0) | Nederlands | Rijkshuisstijl | theme `hugo-theme-rijksoverheid` als Hugo Module

## Theme

Kop, voet, pagina-opmaak, zoeken, de CSS-basis (tokens, NLDD-primitives), iconen en het lettertype komen uit het theme ([RijksICTGilde/hugo-theme-rijksoverheid](https://github.com/RijksICTGilde/hugo-theme-rijksoverheid), versie in `go.mod`). Een bestand met hetzelfde pad in deze repo gaat voor dat van het theme: kopieer er dus geen. Wat moza bewust zelf houdt en waarom staat in de README onder "Theme". Gedrag stel je in met `params` in `hugo.yaml` of met de hooks van het theme.

## Structuur

```
content/                          # Markdown content
content/documenten/presentaties/  # Presentaties (HTML page bundles, layout nldd-deck); begin bij dia-bibliotheek/
layouts/                          # Go templates
layouts/_partials/                # Partials (underscore prefix)
layouts/_shortcodes/              # Shortcodes
assets/css/                       # Eigen CSS van moza; tokens.css komt uit het theme
assets/images/beeldbank/          # Beeld en logo's die in meer presentaties terugkomen
assets/vendor/                    # Vendored JS (Reveal.js)
go.mod                            # Versie van het theme (Hugo Module)
scripts/                          # Build scripts (render-mermaid.js)
static/images/render/             # Pre-gerenderde Mermaid SVGs (gegenereerd, in .gitignore)
hugo.yaml                         # Configuratie
justfile                          # Commands: just up, just build, just checks
```

## Commando's

```bash
just setup              # Node dependencies installeren (eenmalig, voor Mermaid rendering)
just up                 # Render SVGs + dev server
just build              # Render SVGs + build
just test               # Tests uitvoeren
just render-mermaid     # Alleen SVGs renderen
just watch-mermaid      # SVGs herrenderen bij wijzigingen (aparte terminal)
just checks             # Alle controles op één build (tests, ongebruikt beeld, csp, a11y, links)
just links              # Alleen de linkcontrole
just a11y               # Toegankelijkheidstoets (WCAG 2.1 AA) op de gebouwde site
just reflow             # Horizontale overloop bij kleine vensters en grote tekst
just csp                # Controleer op door de CSP geblokkeerde constructies
just beeld              # Controleer of elk beeldbestand ergens gebruikt wordt
just clean              # Verwijder gegenereerde bestanden
just pre-commit         # Pre-commit checks
```

## Mermaid-diagrammen

Diagrammen in Markdown worden vooraf gerenderd als SVG (light + dark) door `scripts/render-mermaid.js`. De render hook van het theme (`layouts/_markup/render-codeblock-mermaid.html`) toont de pre-gerenderde SVGs als `<img>`. Als de SVGs ontbreken, faalt de Hugo build.

Elk mermaid-blok moet een `accTitle` hebben voor de bestandsnaam en toegankelijkheid. Zonder `accTitle` wordt een fallback `diagram-N` gebruikt.

`accTitle` is de `alt`-tekst: kort, een naam. Ook `accDescr` is verplicht: dat is de uitgebreide beschrijving, als verborgen tekst direct na het diagram. In de PDF-download staat hij achter de `alt`.

Kleuren in een diagram (bijvoorbeeld in `classDef`) nooit hardcoden: gebruik `var(--token)` uit `tokens.css`, zoals `color:var(--color-text)`. Het renderscript vult per variant de light- of dark-waarde in.

## Kleuren

Kleurtokens (`tokens.css`) en NLDD-primitives (`nldd-primitives.css`) komen uit het theme; een nieuw algemeen token hoort daar. Moza's verzadigde neutrale schaal heet `--theme-neutral-<stap>`; `--primitives-color-neutral-*` is die van NLDD. Moza's eigen iconen in `static/images/icons/` (bestandstypen), de favicon en het touch-icon komen uit `@nldd/design-system` via `just nldd` (mapping in `scripts/nldd-iconen.js`); in diagrammen gebruik je `nldd:<naam>`.

## Skills

Workflow: `/check`, `/nieuwe-weekly`, `/nieuwe-presentatie`, `/herzie-onderzoek`
Review: `/content-review`, `/a11y-review`, `/seo-check`
Hulp: `/hugo`

## Rules

Zie `.claude/rules/` voor:
- `taal-en-stijl.md` - Nederlands, B1, Rijkshuisstijl
- `code-conventies.md` - Hugo templates, CSS, content
- `documentatie.md` - Hugo, NLDD en Mermaid docs
- `git.md` - Commit conventies
- `toegankelijkheidsrapport.md` - Onderzoek en verklaring, versie en checklist
- `browser-testing.md` - Playwright MCP voor browser tests
