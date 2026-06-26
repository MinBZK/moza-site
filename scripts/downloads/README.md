# scripts/downloads

Genereert downloadbestanden voor pagina's met `download: true` in de front matter.
Draait ná de Hugo-build (zie `just build` en de Containerfile).

| Bestand | Rol |
|---|---|
| `render-downloads.js` | Leest `download.json` (manifest, door Hugo gegenereerd) en maakt per pagina een `.odt` (pandoc) en `.pdf` (Chromium drukt de HTML-pagina af). |
| `render-downloads.test.js` | Integratietest: fixture + manifest → controleert dat `.odt` en `.pdf` ontstaan. Slaat over als pandoc ontbreekt. |
| `reference.odt` | Pandoc-stijlsjabloon (`--reference-doc`): Verdana 10pt, koppen 16/13/11,5pt, opgemaakte note, rijksblauwe links. Gecommit — de build heeft het nodig. |
| `make-reference-odt.py` | Regenereert `reference.odt` uit pandocs default + onze stijlpatches. Alleen handmatig draaien bij opmaakwijzigingen. |

## Reference.odt opnieuw maken

```bash
python3 scripts/downloads/make-reference-odt.py   # vereist pandoc
```

## Waarom een reference.odt en geen config?

Pandoc haalt de opmaak voor ODT uitsluitend uit een reference-document. Anders dan
bij PDF/LaTeX of HTML is er géén CLI- of config-optie voor lettertype of groottes,
dus Verdana 10pt kan alleen via dit sjabloon. De PDF gebruikt geen pandoc: die
wordt door Chromium uit de gerenderde HTML-pagina gedrukt (zelfde stijl als de site).
