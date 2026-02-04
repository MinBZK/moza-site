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
hugo.yaml              # Configuratie
justfile               # Commands: just up, just build, just check
```

## Commando's

```bash
just up          # Dev server
just build       # Build
just check       # Broken links check
just pre-commit  # Pre-commit checks
```

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
