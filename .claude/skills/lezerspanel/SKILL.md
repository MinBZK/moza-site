---
name: lezerspanel
description: Laat een tekst lezen door een panel van lezers (persona's) zoals een ondernemer, een beleidsmedewerker, een Kamerlid of een journalist. Gebruik bij het schrijven of herschrijven van publieke pagina's, nieuwsberichten en presentaties, of als de gebruiker vraagt om "het lezerspanel", "lees mee als ..." of een review vanuit verschillende doelgroepen.
---

# Lezerspanel

Een tekst op deze site heeft meer lezers dan de schrijver voor ogen heeft. Het
lezerspanel laat elke lezer apart reageren en legt de reacties daarna naast
elkaar. Taal en B1 vallen erbuiten: daarvoor is `/content-review`.

De persona's staan in [personas.md](personas.md). Lees dat bestand eerst.

## Werkwijze

1. **Bepaal de tekst.** Welke bestanden horen bij elkaar? Een sectie lees je
   als geheel: een lezer klikt door. Noem de bestanden met volledig pad.
2. **Kies de persona's.** Standaard alle. Bij een weekly volstaan meestal de
   geïnteresseerde overheidsorganisatie, de beleidsmedewerker en de
   journalist. Zeg welke je overslaat en waarom.
3. **Start per persona een eigen agent, allemaal in één bericht** zodat ze
   tegelijk lopen. Gebruik `general-purpose` met model `sonnet`. De agent
   leest alleen, en wijzigt niets. Geef in de prompt mee:
   - de volledige personakaart uit `personas.md` (de agent kent dit
     gesprek niet);
   - de paden van de bestanden, en dat shortcodes (`{{< ... >}}`) op de
     site worden vervangen door een tabel, plaat of kaart;
   - de opdracht hieronder.
4. **Leg de reacties naast elkaar** (zie "Samenvatten").

### Opdracht per persona

> Je bent [persona]. Lees de tekst zoals deze lezer hem leest: met haar
> vragen, haar voorkennis en haar tijd. Blijf in de rol. Antwoord in het
> Nederlands, in hoogstens 300 woorden:
>
> 1. **Wat neem ik mee?** In één zin: wat onthoud ik na het lezen?
> 2. **Wat zoek ik en vind ik niet?** Hoogstens drie punten.
> 3. **Waar haak ik af?** Citeer de zin of het woord, en zeg waarom.
> 4. **Wat roept vragen of argwaan op?** Een belofte, een vage term, iets dat
>    niet klopt met wat ik al weet.
> 5. **Hoe nuttig is dit voor mij?** Een cijfer van 1 tot 5, met één zin
>    uitleg.
>
> Doe geen voorstellen voor betere zinnen. Zeg wat je als lezer ervaart.

## Samenvatten

Geef de gebruiker geen zeven losse verslagen. Maak er één overzicht van:

- **Wat bij meer lezers terugkomt.** Dat weegt het zwaarst.
- **Waar lezers botsen.** De ondernemer wil minder tekst, de onderzoeker
  meer onderbouwing. Benoem de keuze, maak hem niet stilletjes.
- **Per pagina de belangrijkste verbeteringen**, met het citaat erbij.
- **Wat je bewust niet overneemt**, en waarom. Toets elk voorstel aan de
  regels in `.claude/rules/` en aan wat de site niet noemt (zoals bedragen of
  welke organisatie wanneer aansluit).

Pas de tekst alleen aan als de gebruiker daarom vroeg.
