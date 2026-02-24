# Documentatie

Raadpleeg bij twijfel altijd de officiële documentatie.

## Hugo

- **Documentatie**: https://gohugo.io/documentation/
- **Templates**: https://gohugo.io/templates/
- **Functies**: https://gohugo.io/functions/
- **Nieuwe template structuur**: https://gohugo.io/templates/new-templatesystem-overview/

Dit project gebruikt Hugo v0.153.5+ met de nieuwe template structuur.

## Reveal.js

- **Documentatie**: https://revealjs.com/
- **Markup**: https://revealjs.com/markup/
- **Configuratie**: https://revealjs.com/config/

Presentaties staan in `content/presentaties/` als HTML page bundles.

## Mermaid

- **Documentatie**: https://mermaid.js.org/intro/
- **Syntax**: https://mermaid.js.org/syntax/flowchart.html

Mermaid-diagrammen worden conditioneel geladen via `layouts/_markup/render-codeblock-mermaid.html`. Gebruik een `mermaid` codeblock in Markdown. Kleuren volgen automatisch het actieve thema via design tokens.

## Aanpak

Bij Hugo of Reveal.js vragen:
1. Raadpleeg eerst de officiële documentatie via WebFetch
2. Controleer of de oplossing past bij de projectconventies
3. Test lokaal met `hugo server`
