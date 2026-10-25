---
name: nieuwe-weekly
description: Gebruik bij het maken van een nieuwe MOZa Weekly.
---

# Nieuwe MOZa Weekly

## Stappen

1. Vraag welke datum (of gebruik vandaag). Sla over als de datum al gegeven is.
2. **Lees de laatste 3-5 weeklies** in `content/weekly/YYYY/`. Hieruit volgen: huidige sectie-indeling, toon, linkpatronen en de lopende agenda. Kopieer het patroon, schrijf niet vanaf nul.
3. Run: `hugo new content weekly/YYYY/YYYY-MM-DD.md`.
4. Verzamel input (sla over als de input al gegeven is):
   - **Controleer vooraf de Docs-mappen**: kijk met `grep '^MOZA_WEEKLY_DOCS_FOLDERS=' .env` welke mappen in Docs worden doorgelopen. Is de variabele leeg of ontbreekt hij, dan neemt de pipeline geen enkele map mee. Meld welke mappen erin staan, of dat hij leeg is, en vraag of er een map bij moet of af kan. Pas `.env` alleen aan na bevestiging.
   - Standaardbron is de Mattermost-pipeline: run `just moza-weekly` (zie `scripts/moza-weekly/README.md`). Dat levert drie bestanden op in `tmp/moza-weekly/`.
   - De pipeline neemt ook de Walletbrief mee: een referentie met `bron: walletbrief`, met de wallet-berichten uit de periode en de komende evenementen. Gebruik de berichten als input voor de wallet-sectie. Leg de evenementen die nog niet op de agenda staan voor aan de gebruiker; zet ze er niet zelf op.
   - Gebruik `tmp/moza-weekly/<datum>.anonymized.json` als input. Nooit de `.yaml` of `.html` gebruiken: die bevatten namen.
   - De gebruiker cureert eventueel de YAML; run daarna `just moza-weekly-anonymize tmp/moza-weekly/<datum>.yaml` om de JSON te verversen.
   - **Controleer op gemiste namen**: run `just moza-weekly-namencheck tmp/moza-weekly/<datum>.anonymized.json`. Loop het rapport langs en leg de kandidaten die écht een persoon zijn voor aan de gebruiker, met de vraag of ze in `~/.config/moza-weekly/extra-namen.txt` moeten. Voeg zelf niets toe: dat bestand staat buiten de repo en is van de gebruiker. Vul je die aan, draai dan `just moza-weekly-anonymize` opnieuw.
     - De meeste kandidaten zijn vakjargon, teams of tools; die horen niet in het namenbestand maar eventueel in `GEEN_PERSOON` in `namencheck.py`.
     - Ook persona-namen uit gebruikersonderzoek moeten blijven staan: dat zijn geen echte personen.
   - Vraag de gebruiker om aanvullende input die niet uit Mattermost komt.
   - Ontbreekt `DOCS_SESSION` of is die verlopen, dan meldt `fetch.py` dat met instructies. Geef die door aan de gebruiker: zonder die cookie blijven de gespreksverslagen buiten de input.
5. Groepeer de input in secties op basis van wat er deze week speelt — secties zijn niet vast, ze volgen de onderwerpen. Laat een sectie weg als er geen inhoud voor is.

## Secties zijn onderwerp-gedreven

Secties sluiten vaak aan op bestaande onderwerpen (zie `content/onderwerpen/`) of lopende werkstromen. Ze zijn **niet voorgeschreven**: voeg toe, laat weg of combineer op basis van wat die week speelt. Kijk in de vorige weeklies welke secties actief zijn.

**Interne links**: als er voor een onderwerp een eigen pagina bestaat in `content/onderwerpen/`, link intern in plaats van extern (bv. `[Profielservice](/onderwerpen/profielservice/)`). Verifieer dat interne URL's correct zijn — ook sub-pagina's hebben het `/onderwerpen/` prefix nodig.

**Externe links** voor terugkerende diensten en projecten: zoek in eerdere weeklies naar het linkpatroon (bv. `[RegelRecht](https://regelrecht.rijks.app/)`, `[Digilab](https://digilab.overheid.nl/)`). Link bij de eerste vermelding in de weekly.

## Stijlregels

- Bullet-stijl volgt de vorige weekly (typisch: `* **Label:** tekst.`)
- B1 Nederlands, actieve zinnen (zie `.claude/rules/taal-en-stijl.md`)
- "profielservice", "notificatieservice" (één woord)
- **Geen persoonlijke namen** en geen persoonlijk nieuws (ziek zijn, verjaardagen, etc.)
- Emoji: kijk per emoji of de schermlezer iets zinnigs voorleest. Zo niet, gebruik de shortcode `emoji` met `aria-label` of `aria-hidden=true` (zie de sectie Emoji in de skill `content-review`)

## Inhoud en bronnen

- **Lees de bron zelf, niet alleen de titel**: Kamerstukken, EU-dossiers (eerstekamer.nl, tweedekamer.nl), Staatscourant, ADR's in MinBZK/MijnOverheidZakelijk, verslagen. Haal eruit wat er gevraagd of besloten wordt en waarom dat voor MOZa telt. Een brief van de Eerste Kamer met nadere vragen over de business wallet bleek bijvoorbeeld een vraag over een uitvoeringstoets van Logius te bevatten.
- **Besluit in de Staatscourant**: noem het bij soort en afzender, bijvoorbeeld "autorisatiebesluit van de Rijksdienst voor Identiteitsgegevens".
- **Noem geen bewindspersonen**: schrijf "het kabinet".
- **Geef elk punt een haakje**: wat heeft de ondernemer of lezer eraan? Schrijf het effect, niet de techniek: niet "unieke id per magazijn", wel "je moet erop kunnen vertrouwen dat je niets mist". Zonder haakje hoort het punt er waarschijnlijk niet in. Een ADR of de kwaliteitseisen leggen vaak uit waarom iets gebouwd wordt.
- **Controleer elke bewering tegen de bron**: niet afronden, niet aanvullen met wat aannemelijk klinkt. Is iets niet te vinden, meld dat aan de gebruiker in plaats van het op te schrijven.
- **Geen vulling**: geen aantallen deelnemers, geen "flink wat wijzigingen", geen verwachting wanneer iets wordt samengevoegd, geen "meer hierover lees je hieronder".
- **Tijd en status kloppen**: wat af is staat in de verleden tijd; een voornemen zonder datum blijft een voornemen ("willen we"). Schrijf bij samenwerking niet "meer samenwerking" (klinkt alsof het eerst niet zo was) maar bijvoorbeeld "nadrukkelijker dan eerst".
- **Links achter een inlog** mogen, met de linktitel "besloten": `[tekst](https://... "besloten")`. De render hook (`layouts/_partials/render-link.html`) zet er dan het slotje en de verborgen tekst "(besloten omgeving)" bij. Gebruik geen eigen emoji.
- **Plak-links** (plak.rijks.app): controleer elke link vooraf met `curl`. 302 naar `/-/login` is besloten, 200 is publiek, 404 bestaat niet.
- **Herstel geanonimiseerde links**: de anonimisering vervangt soms een deel van een domein door `[collega]` (`plak.[collega].app` is `plak.rijks.app`). Herstel zo'n link en controleer hem.
- **Namen**: geen namen van teamleden. Wie in een openbare rol optreedt, zoals een gast in een podcast, mag bij naam met organisatie; neem de spelling over van de openbare bron.

## Agenda

Agenda is **cumulatief**: neem items uit de vorige weekly over die nog niet zijn geweest, verwijder voorbije items (inclusief de publicatiedatum zelf — de weekly verschijnt 's ochtends). Structuur en inleidingsregel uit de vorige weekly overnemen. Items staan in **chronologische volgorde**.

De twee labels onder `## Agenda` zijn echte koppen: `### MOZa` en `### Evenementen`, nooit een regel met alleen vette tekst. Die rendert als alinea en valt buiten de koppenstructuur (WCAG 1.3.1).

**Vaste overleggen altijd op de agenda**: MOZa Pulse, Regieteam en Stuurgroep horen altijd met een eerstvolgende datum op de agenda. Als één van deze drie is geweest en er geen nieuwe datum in de input staat, vraag proactief om de volgende datum voordat je de weekly afrondt.

**Agenda-items uit alle kanalen**: een evenement of debat staat niet altijd in `~agenda`. Loop de hele input langs (ook `~in-de-kamer`, `~check-in` en de themakanalen) op datums en evenementen, en leg wat nog niet op de agenda staat voor aan de gebruiker.

**Kamerdebatten controleren**: haal de geplande debatten van de komende maanden op uit de open data van de Tweede Kamer, bijvoorbeeld:

```bash
curl -s -G "https://gegevensmagazijn.tweedekamer.nl/OData/v4/2.0/Activiteit" \
  --data-urlencode "\$filter=Datum ge 2026-11-01T00:00:00Z and Datum le 2027-01-31T00:00:00Z and Verwijderd eq false and Soort ne 'Procedurevergadering' and (Voortouwnaam eq 'vaste commissie voor Digitale Zaken' or Voortouwnaam eq 'vaste commissie voor Binnenlandse Zaken')" \
  --data-urlencode "\$select=Nummer,Soort,Onderwerp,Aanvangstijd,Status" \
  --data-urlencode "\$expand=Agendapunt(\$select=Onderwerp)"
```

- Plenaire debatten, zoals een begroting, hebben `Voortouwnaam eq 'TK'`; zoek die op onderwerp.
- Kijk op de agendapunten welke debatten MOZa raken: digitale overheid, regeldruk, GDI, de Digitale Dienst.
- Vergelijk met de agenda van de vorige weekly. Staat een debat er al op, controleer dan `Status`: een `Verplaatst` debat hoort eraf of krijgt de nieuwe datum. De oude activiteit noemt de nieuwe datum vaak in het `Onderwerp`.
- Een relevant debat dat ontbreekt, komt in `~agenda` als eigen post, met korte context en de link `https://www.tweedekamer.nl/debat_en_vergadering/commissievergaderingen/details?id=<Nummer>`. Een plenair debat gebruikt `plenaire_vergaderingen/details/activiteit?id=<Nummer>`. Laat de teksten eerst aan de gebruiker zien, want de post verschijnt onder de naam van de gebruiker.

## Bij onduidelijkheden

Benoem expliciet aan de gebruiker wat ontbreekt (datums, links, context) in plaats van te gokken.

**Voorbije events zonder update**: loop de agenda van de vorige weekly langs en kijk welke items tussen toen en nu zijn geweest. Als een voorbij event niet in de input wordt genoemd, vraag proactief of er toch iets over te melden is — soms is dat namelijk wel zo.

## Publiceren

- Branch: `weekly/YYYY-MM-DD`
- Commit-bericht: `MOZa Weekly DD maand YYYY` (bv. `MOZa Weekly 15 april 2026`)
