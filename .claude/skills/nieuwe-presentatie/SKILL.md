---
name: nieuwe-presentatie
description: Maak een nieuwe presentatie aan met de layout nldd-deck (NLDD-componenten). Gebruik wanneer de gebruiker een nieuwe presentatie of slidedeck wil maken, of dia's wil toevoegen aan een presentatie met `layout: nldd-deck`.
---

Nieuwe presentaties gebruiken de layout `nldd-deck`. De oudere MOZa Pulse-presentaties draaien op Reveal.js; die laten we zoals ze zijn, maar nieuwe presentaties maak je niet meer met Reveal.

Voorbeeld om van te leren: `content/documenten/presentaties/beproeving-federatief-berichtenstelsel/index.html`.

## Stappen

1. Vraag naar de titel, een korte beschrijving (max. 160 tekens) en de datum van de presentatie.
2. Maak de page bundle aan (slug in kebab-case):
   ```bash
   hugo new content --kind presentaties documenten/presentaties/naam-van-presentatie
   ```
3. Vul `description` in de front matter en schrijf de dia's. De footer toont op elke dia "MijnOverheid Zakelijk" met de tagline van de site (`tagline` in `hugo.yaml`). Hoort er een kanttekening bij de hele presentatie (bijvoorbeeld "is in ontwikkeling"), zet die dan in `disclaimer`: die vervangt de tagline. Een eigen `tagline` in de front matter kan ook; `tagline: ""` laat alleen de naam staan.
4. Draai `just checks` (tests, CSP, toegankelijkheid, links).

## Hoe het werkt

- Layout: `layouts/documenten/presentaties/nldd-deck.html`, met de footer in `layouts/_partials/nldd-deck-footer.html`.
- Opmaak: `assets/css/nldd-deck.css`. Bediening: `assets/js/nldd-deck.js`.
- De dia's schalen mee met de breedte (16:9, eenheid `cqw`). Maak afmetingen in eigen CSS dus ook in `cqw`.
- **Kleine schermen** (tot 900px breed of 500px hoog) tonen alle dia's onder elkaar met een scheidingslijn, en de footer alleen onderaan. Elke dia houdt zijn 16:9-vorm en schaalt mee; voor details zoom je in. Bouw geen aparte mobiele opmaak: een herschikte dia verliest het verhaal. Wat wel moet: alles in `cqw` houden, want vaste maten schalen niet mee. NLDD-componenten hebben vaste maten; het script zet `nldd-button` in een dia daarom op kleine schermen op `size="xs"`.
- **Leesmodus** is de standaard: elke dia staat volledig op het scherm. Met <kbd>P</kbd> gaat de **presentatiemodus** aan, die dia's per klik opbouwt. Daarin zie je alleen de dia, de footertekst en de voortgangsbalk; vorige en volgende verschijnen bij muisbeweging. Een link met `?presentatie` opent direct in presentatiemodus en toont de toetsen tot de eerste toets.
- Op een aanraakscherm blader je door horizontaal te vegen.
- Het adres van een dia is `#/1`, `#/2`, enzovoort, gelijk aan de teller. De oudere Reveal.js-presentaties tellen vanaf `#/0`; de zoekindex houdt daar rekening mee.

## Een dia

Elke dia is een `<section class="slide">` op het hoogste niveau, met een `aria-label`:

```html
<section class="slide" aria-roledescription="dia" aria-label="Korte naam van de dia">
  <p class="overline">Onderwerp</p>
  <h2 class="title">Titel van de dia</h2>
  <p class="lead">Eén of twee korte zinnen.</p>
</section>
```

De basis, in `nldd-deck.css`:

| Klasse | Waarvoor |
| --- | --- |
| `overline` | Klein geel label boven de titel |
| `title`, `title-hero` | Titel; `title-hero` alleen op de titeldia |
| `lead`, `lead-hero` | Inleidende zin onder de titel |
| `title statement` | Drie korte zinnen, elk in een `<span>`, met één `<strong>` als geel accent per zin |
| `footnote` | Toelichting met gele streep, max. twee regels |
| `compare`, `card` | Twee kaarten naast elkaar (bijvoorbeeld nu en straks) |
| `flow`, `flow-step` | Stappen in een rij met pijlen ertussen; het aantal kolommen volgt het aantal stappen |
| `slide-cover` met `cover` | Titel- of slotdia met foto over de hele dia; met `data-overgang` vervaagt de foto |
| `slide-video`, `slide-reserve` | Video over de hele dia (via de shortcode `lokaal`), met een reservedia voor online |
| `quotes` | Drie citaten naast elkaar |
| `split`, `split-wide`, `mission`, `photo`, `screenshot` | Tekst links, beeld rechts |
| `demo-side`, `services` | Titel, diensten met icoon en een knop naast een schermafbeelding |
| `blocks` | Drie blokken met icoon, titel en tekst |
| `context` | Kaarten in twee kolommen met een gele afkorting als kop |
| `open-band` | Band onder een rij stappen, bijvoorbeeld over open werken |

Kopieer de HTML van zo'n dia uit een bestaande presentatie (zoals `nldd-introductie-moza-voor-ezk-dg-dso`), niet de CSS.

### MOZa-dia's

Dia's over MOZa zelf, in `assets/css/nldd-deck-moza.css`. Voorbeeld in `nldd-introductie-moza-voor-ezk-dg-dso`.

| Klasse | Waarvoor |
| --- | --- |
| `timeline` + `flow` | De historie van MOZa: tijdlijn 2007 tot nu boven drie pogingen, `flow-step-nu` is MOZa |
| `clover` | Klavertje vier: de vier overheidsbrede portalen |
| `rings`, `levels`, `org` | Ringen om het MOZa-team met logo's eromheen |

Ringen met logo's: elk logo is een `<span class="org logo-<naam>">`, op volgorde rond de ring vanaf boven met de klok mee. De posities rekent de CSS uit. Standaard zijn het dertien logo's; bij een ander aantal stel je in `presentatie.css` het aantal en de afstand bij, zoals `.rings { --orgs: 9; --straal: 73%; }`. Is een organisatie het publiek, geef de tegel dan `org-publiek` (geel), en wat erbij hoort `org-uitgelicht` (gele rand).

### Beeldbank

Beeld dat in meer dan één presentatie terugkomt (logo's, foto's, schermafbeeldingen van MOZa) staat in `assets/images/beeldbank/`, logo's in `logos/`. Gebruik de shortcode `beeld`, die het adres laat meegaan met de baseURL:

```html
<img src="{{< beeld "logos/kvk.png" >}}" alt="KVK">
```

Beeld dat maar in één presentatie staat, blijft in de page bundle (`images/`). Komt het later in een tweede presentatie terug, verplaats het dan naar de beeldbank in plaats van het te kopiëren. Een nieuw logo dat zonder witruimte zwaar oogt, krijgt een hoogte in `nldd-deck-moza.css` (`.logo-<naam> img`).

Beeld dat al bij een pagina van de site hoort, zoals de foto in een nieuwsbericht, kopieer je niet: haal het op met `{{< afbeelding-url pagina="/actueel/…" bestand="foto.jpg" >}}`.

### Eigen opmaak

Opmaak die alleen voor jouw presentatie is, zoals een eigen plaat of diagram, zet je in `presentatie.css` in de page bundle, naast `index.html`. De layout laadt dat bestand vanzelf als het er is, na `nldd-deck.css` en `nldd-deck-moza.css`. Voorbeeld: de bouwblokkenplaat (`bb-*`) in de berichtenpresentatie.

## Opbouwen per klik

Alleen in presentatiemodus; in leesmodus staat alles er meteen.

- `data-step="n"` op een onderdeel: verschijnt bij stap n. Nog niet getoonde onderdelen staan gedimd.
- `class="step-reveal"` erbij: helemaal onzichtbaar tot de stap, in plaats van gedimd.
- `data-start="1"` op de `<section>`: de dia opent met stap 1 al actief.
- `data-overgang` op de `<section>`: van en naar deze dia blijft de oude dia even staan en vervaagt (`is-leaving`), terwijl de nieuwe erover opkomt (`is-entering`); een foto kan via `.is-leaving .cover` langzamer vervagen. Bedoeld voor een titeldia met foto. Niet bij `prefers-reduced-motion`, in de sprekersweergave of in de scrollmodus.
- `<video data-step="1">` op een dia staat stil op het eerste beeld en start bij die stap (volgende, spatie of klikker, ook vanuit de sprekersweergave). Daarna pauzeren spatie en een klik op de video; volgende gaat door naar de volgende dia. Speelt alleen in presentatiemodus, niet in de sprekersweergave of de scrollmodus.

## Sprekersnotities en sprekersweergave

- Notities staan per dia in `<aside class="notes">`, als gewone alinea's. Ze zijn nooit zichtbaar op de dia en komen niet in de zoekindex. Ze staan wel in de HTML-bron: wat niet openbaar mag, hoort niet in een presentatie die live gaat.
- <kbd>S</kbd> opent de **sprekersweergave** in een eigen venster (`?spreker`): de dia van nu, de volgende stap of dia, de notities, een klok en de verstreken tijd. Zet `duur: 10` (minuten) in de front matter om de tijd af te zetten tegen het plan; daarna kleurt hij geel.
- Beide vensters volgen elkaar, wie er ook bladert. Sleep het publieksvenster naar de beamer en druk daar op <kbd>F</kbd>. Werkt binnen dezelfde browser, ook in een sandbox (zoals op Plak) zolang je de sprekersweergave met <kbd>S</kbd> opent.

## Exporteren (Plak, offline)

- `just presentatie-export <slug>` bouwt de site (ook drafts) en exporteert de presentatie als één HTML-bestand in `tmp/export/<slug>/index.html`: opmaak, fonts, script en afbeeldingen zitten erin. Het script is `scripts/presentatie-export.js`.
- Publiceren op Plak: `plak publish tmp/export/<slug> --site <groep>/<site> --preview <ref>`, zie de skill `plak:plak-publish`. Presentaties van MOZa staan in de groep `nldd`, met toegang SSO Rijk.
- De sluitknop en links naar de site vallen weg. De notities gaan wel mee: wie de bron bekijkt, kan ze lezen.
- Materiaal dat niet publiek mag (zoals video uit gebruikersonderzoek) zet je in de map `lokaal/` van de bundle; `.gitignore` houdt elke `lokaal/`-map onder `content/` buiten git. Zet de dia zelf ook daar, in een eigen HTML-bestand, en voeg hem in met `{{< lokaal "video-dia.html" >}}reservedia{{< /lokaal >}}`. Ontbreekt het bestand (zoals bij anderen), dan komt de reservedia in de plaats, bijvoorbeeld een vervaagd beeld zonder mensen met een titel. Geef de lokale dia `data-lokaal`: de export zet er dan ook de reservedia voor in de plaats.

## Iconen en componenten

- Iconen: `<span class="ic"><nldd-icon name="bell"></nldd-icon></span>`. De `span` bepaalt grootte en kleur. Gebruik alleen namen uit de NLDD-icoonset (zie de `nldd`-skill of `node_modules/@nldd/design-system/dist/components/content/icon/icon-registry.js`).
- Knoppen: `<nldd-button>` met `href` voor een link die eruitziet als knop.
- Het script laadt alleen `icon`, `icon-button`, `button` en `keyboard-shortcut`. Gebruik je een ander NLDD-component, voeg dan de import toe in `assets/js/nldd-deck.js`.

## Regels

- Geen inline `style` of `<script>` in de content: de CSP blokkeert die. Opmaak hoort in `nldd-deck.css` (algemeen), `nldd-deck-moza.css` (MOZa-dia's) of `presentatie.css` in de bundle (alleen voor deze presentatie).
- Afbeeldingen in de page bundle, of in de beeldbank als ze in meer presentaties terugkomen, met een `alt` die zegt wat er te zien is.
- Tekst volgens `.claude/rules/taal-en-stijl.md`: B1, korte zinnen. Een dia is geen document.
- Externe links die achter een login zitten (zoals een democonsole) geven in de linkcontrole een 403. Zet ze dan op de negeerlijst in `.htmltest.yml`, met een regel uitleg.

## Output

Toon het pad naar de aangemaakte presentatie en het lokale adres (`just up`, dan `http://localhost:1313/documenten/presentaties/<slug>/`), en bied aan de eerste dia's te schrijven.
