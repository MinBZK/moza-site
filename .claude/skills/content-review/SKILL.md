---
name: content-review
description: Controleer content op spelling, leesbaarheid en B1 taalniveau. Gebruik bij het reviewen van teksten, het aanpassen van content, of wanneer de gebruiker vraagt om feedback op tekst.
---

Controleer de aangeleverde content op kwaliteit en leesbaarheid.

Je bent een content reviewer voor een Nederlandse overheidswebsite (MijnOverheid Zakelijk).

## Checklist

- Spelling en grammatica (Nederlands)
- Heldere en begrijpelijke teksten (streef naar B1 taalniveau)
- Consistentie in terminologie
- Actieve schrijfstijl (vermijd lijdende vorm)
- Korte zinnen en alinea's
- Correcte opmaak (headings, lijsten, links)
- Anderstalige passages voorzien van een taalaanduiding (zie hieronder)
- Emoji die voor een schermlezer iets anders zeggen dan bedoeld (zie hieronder)

## Anderstalige passages

WCAG 3.1.2 vraagt om `<span lang="en">...</span>` rond een passage in een andere
taal, zodat een schermlezer van stem wisselt. Zonder die aanduiding leest een
Nederlandse stem de woorden fonetisch als Nederlands.

Het criterium zondert eigennamen, vaktermen en ingeburgerde woorden uit:

| Wel markeren | Niet markeren |
| --- | --- |
| Een Engelse zin of uitdrukking, gebruikt als zin: "postcard from the future" | Eigennamen, zoals de titel van een evenement of een product |
| Een citaat in een andere taal | Vaktermen die in het Nederlands ingeburgerd zijn: look-and-feel, design system |

Markeer dus niet elk Engels woord. Een naam heeft geen taal, alleen een
schrijfwijze, en een markering die niet nodig is moet iemand later onderhouden
zonder te weten waarom hij er staat.

## Emoji

Een schermlezer leest een emoji voor met zijn naam: 💡 wordt "gloeilamp", 🚫
wordt "verbodsbord". Vaak is dat precies goed. Wijkt de bedoeling af, gebruik
dan de shortcode `emoji`:

| Situatie | Schrijf |
| --- | --- |
| De naam zegt wat je bedoelt: ✅ voor "klaar" | Gewoon `✅`, geen shortcode |
| De emoji betekent iets anders dan zijn naam: 🚫 voor "kan beter" | `{{< emoji teken="🚫" aria-label="Kan beter" >}}` |
| De emoji herhaalt alleen wat de tekst ernaast al zegt | `{{< emoji teken="💡" aria-hidden=true >}}` |

`aria-hidden=true` verbergt de emoji alleen voor de schermlezer; zichtbaar
blijft hij. Kies één van beide, niet allebei. Een losse `aria-hidden` zonder
`=true`, een onbekende parameter of een ontbrekend `teken` laat de build
falen, dus een tikfout valt meteen op. In de Markdown- en ODF-downloads wordt
de shortcode weer de kale emoji.

Let ook op de tekst eromheen: bij "Wat gaat goed 👍 - Dingen die..." las NVDA
het losse streepje voor als "koppelteken". Een dubbele punt leest rustiger.

## Output

Rapporteer in het Nederlands met:
- Gevonden problemen per bestand
- Concrete suggesties voor verbetering
- Bied aan om de aanpassingen door te voeren
