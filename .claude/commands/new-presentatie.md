Help bij het maken van een nieuwe Reveal.js presentatie.

Dit type content wijkt af van normale pagina's:
- Presentaties zijn HTML, geen Markdown
- Ze staan in een page bundle (map met index.html)
- Afbeeldingen komen in een images/ submap

## Stappen

1. Vraag naar de naam/slug van de presentatie (gebruik kebab-case, bijv. "moza-pulse-januari")
2. Run: `hugo new content presentaties/<naam>`
3. Dit maakt de basisstructuur aan via het archetype
4. Open het index.html bestand en toon de structuur
5. Leg uit hoe slides werken:
   - Elke slide is een `<section>` element
   - Geneste sections maken verticale slides
   - Afbeeldingen in de images/ submap plaatsen

Voorbeeld slide structuur:
```html
<section>
  <h2>Slide titel</h2>
  <p>Inhoud van de slide</p>
</section>
```

## Na het maken

Wanneer de presentatie is gemaakt:
- Gebruik de `a11y-reviewer` agent om de slides te controleren op toegankelijkheid (heading hierarchie, alt-teksten, contrast)
- Controleer of afbeeldingen in de `images/` submap staan en alt-teksten hebben
