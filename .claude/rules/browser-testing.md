# Browser Testing

Als Playwright MCP beschikbaar is, gebruik deze voor browser-gebaseerde tests.

## Mogelijkheden

- **Visuele checks**: screenshots van pagina's
- **Toegankelijkheid**: DOM-snapshots voor a11y-analyse
- **Debugging**: console errors en netwerk requests uitlezen
- **Interactie**: formulieren invullen, klikken, navigeren

## Beschikbare tools

| Tool | Gebruik |
|------|---------|
| `browser_navigate` | Naar URL navigeren |
| `browser_snapshot` | Toegankelijke DOM-structuur |
| `browser_take_screenshot` | Visuele screenshot |
| `browser_console_messages` | Console logs/errors/warnings |
| `browser_network_requests` | Netwerk requests (incl. failures) |
| `browser_evaluate` | JavaScript uitvoeren |
| `browser_click/type/fill_form` | Interactie simuleren |
| `browser_close` | Browser afsluiten |

## Workflow

1. Zorg dat de dev server draait (`just up`)
2. `browser_navigate` naar `http://localhost:1313/`
3. Gebruik de juiste tool voor je doel:
   - `browser_snapshot` voor toegankelijkheid
   - `browser_console_messages` voor errors
   - `browser_take_screenshot` voor visuele check
4. `browser_close` na afloop

## Tips

- `browser_snapshot` is beter dan screenshots voor a11y-analyse
- `browser_console_messages` met `level: "error"` voor alleen errors
- `browser_network_requests` toont ook failed requests
