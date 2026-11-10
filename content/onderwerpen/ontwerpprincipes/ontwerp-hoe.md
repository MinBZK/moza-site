---
title: "Hoe: werkwijze en techniek"
page_title: "Ontwerpprincipes - Hoe: werkwijze en techniek"
weight: 2
description: "Het “Hoe” beschrijft welke techniek wij gebruiken en hoe wij werken."
---

Bij het ontwerpen staat de gebruiker voorop. Maar uiteindelijk moet er ook iets gebouwd worden. Wij ontwerpen daarom direct in code. Zo kunnen wij snel werken en blijft het prototype dicht bij een echt product. Hieronder leest u welke keuzes wij maken.

## Techniek

Het prototype is een website die wij bouwen met [Next.js](https://nextjs.org/) en [React](https://react.dev/). Dat zijn veelgebruikte hulpmiddelen om websites te maken. Wij schrijven de code in [TypeScript](https://www.typescriptlang.org/). Die taal vangt fouten op voordat de website online staat.

* **De server doet het meeste werk**. De pagina's maken wij zoveel mogelijk op de server klaar. In de browser draait alleen code als het echt nodig is, bijvoorbeeld bij een formulier of een schuifregelaar. Zo blijft de website snel.
* **Alle bouwstenen staan op één pagina**. In het prototype staat [een overzicht van alle bouwstenen](https://moza.mijnoverheidzakelijk.nl/demo), met een voorbeeld en de mogelijke instellingen.
* **Gegevens ophalen gebeurt op één plek**. De code die gegevens ophaalt, staat apart van de code die iets toont. Voor tests gebruiken wij voorbeeldgegevens die op echte gegevens lijken.
* **Wij rekenen met de echte wet**. Bijvoorbeeld bij [een taak als Iemand aannemen met afstand tot de arbeidsmarkt](https://moza.mijnoverheidzakelijk.nl/personeel/iemand-aannemen/) rekent een programma in de browser uit welke regelingen gelden. Dat programma volgt de wet. Zo kloppen de bedragen en de voorwaarden. Hierbij maken wij onder andere gebruik van [RegelRecht](https://regelrecht.rijks.app/).
* **Automatische controles**. Bij elke wijziging controleren programma's of de code goed is opgemaakt en geen fouten bevat.

## Opmaak (CSS)

Met CSS bepalen wij hoe de website eruitziet. Wij gebruiken alleen wat moderne browsers zelf kunnen. Er zijn dus geen extra programma's nodig om de opmaak te laten werken.

### Drie lagen

De opmaak bestaat uit drie lagen:

* De basis (`rhc.css`) geldt altijd, in elke huisstijl. Hierin staat bijvoorbeeld hoe onderdelen naast of onder elkaar staan.
* Het thema (`mox.css`) geeft de website het uiterlijk van MijnOverheid. Met een schakelaar kunt u kiezen tussen de huidige huisstijl en de nieuwe huisstijl die voor MijnOverheid in ontwikkeling is.
* Hulpmiddelen (`utils.css`) zijn alleen voor het prototype, zoals het Flags-paneel. Die horen niet bij het product.

Elke laag heeft een eigen begin van de naam (*‘namespace’*): `rhc-mox-`, `mox-` en `prototype-`. Zo ziet u meteen waar iets bij hoort. Namen zeggen wat iets is, niet hoe het eruitziet. Een waarschuwing heet dus `--warning`, niet `--oranje`.

### Vaste waarden (design tokens)

Kleuren, afstanden, letters en randen liggen vast in zogenoemde design tokens. Dat zijn vaste waarden met een naam. Wij gebruiken die van de Rijkshuisstijl. Wijken wij af, dan maken wij een eigen token. Zo staat een waarde maar op één plek. Een voorbeeld: de kleur als u met de muis over een knop gaat, is overal hetzelfde. Dat geldt voor knoppen, het menu en uitklappers.

### Werkt in elke schrijfrichting

Wij gebruiken in onze code niet de woorden *links* en *rechts*, maar *begin* en *eind van de regel*. Zo werkt de pagina ook goed als iemand een andere taal kiest, bijvoorbeeld met een vertaalprogramma. Sommige talen worden van rechts naar links geschreven. Ook dan staat alles op de juiste plek. Een programma controleert dit automatisch.

### Afstand tussen onderdelen

De ruimte tussen onderdelen regelt het blok eromheen. Een element neemt zelf geen ruimte mee. Dit zorgt voor visuele consistentie, en maakt het mogelijk om afstanden op één plek aan te passen.

Alleen bij tekst die wij niet zelf maken, zoals tekst uit een ander systeem, werkt dat anders. Daar krijgt elk stuk tekst ruimte boven zich. Wij gebruiken per blok altijd maar één van deze twee manieren.

## Toegankelijk voor iedereen

Wij bouwen volgens de regels voor digitale toegankelijkheid ([WCAG 2.2 AA](https://www.w3.org/Translations/WCAG22-nl/)/[EN 301 549](https://accessible-eu-centre.ec.europa.eu/content-corner/digital-library/en-3015492021-accessibility-requirements-ict-products-and-services_en)):

* de website werkt ook met alleen het toetsenbord;
* u ziet altijd waar u bent op de pagina;
* een label staat boven het invulveld;
* een knop werkt altijd, en zegt wat er nog ontbreekt;
* beweging gaat uit als u dat in uw computer heeft ingesteld.
* gebruikers met een gezichtbeperking kunnen structuur en inhoud voor laten lezen.

## Hulp van AI bij het ontwerpen

Bij het ontwerpen gebruiken wij [Claude Code](https://claude.com/claude-code). Dat is een assistent die werkt met kunstmatige intelligentie (AI). De assistent neemt het ontwerpen niet over, maar helpt ons sneller te werken. De ontwerper bepaalt de richting, maakt de keuzes en bewaakt de kwaliteit. We proberen AI zo spaarzaam mogelijk in te zetten om zo controle over het eindproduct te behouden.

De assistent volgt afspraken die bij de code staan. Zo werkt iedereen in het team met dezelfde regels:

* **Een vast bestand met afspraken**. Daarin staat hoe de code is opgebouwd, hoe de opmaak werkt, wat de regels voor toegankelijkheid zijn en hoe wij schrijven. De assistent leest dit bestand elke keer.
Vaste werkwijzen. Voor taken die vaak terugkomen, heeft de assistent een vaste aanpak. Een voorbeeld is de tekstcontrole: die loopt alle teksten na op woordkeus, taalniveau en aanspreking.
Automatische controles. Sommige afspraken controleert een programma meteen. Bijvoorbeeld dat er geen overbodige uitleg in de opmaak komt.
* **Vaste werkwijzen**. Voor taken die vaak terugkomen, heeft de assistent een vaste aanpak. Een voorbeeld is de tekstcontrole: die loopt alle teksten na op woordkeus, taalniveau en aanspreking.
* **Automatische controles**. Sommige afspraken controleert een programma meteen. Bijvoorbeeld dat er geen overbodige uitleg in de opmaak komt.

De assistent helpt onder meer met:

* **Teksten die echt lijken**. Het prototype bevat bestaande regelingen, echte wetten en herkenbare berichten. Dat werkt in tests beter dan nepteksten. De assistent maakt deze teksten op basis van openbare informatie van de overheid.
* **Bouwstenen en patronen**. De assistent schrijft code binnen onze afspraken. Maakt de assistent een nieuwe bouwsteen, dan meldt die dat en zet de bouwsteen in het overzicht om vervolgens door een mens gecontroleerd te worden.
* **Controles**. De assistent loopt teksten, toegankelijkheid en code na. Daarna volgt een rapport met concrete voorstellen.
* **Opruimen**. Code die vaak terugkomt, maakt de assistent herbruikbaar. Zo blijft het prototype ook bij groei goed te onderhouden.

Wij bekijken alles wat de assistent maakt, en passen het aan als dat nodig is.

## Schrijfwijzer

Wij hebben een schrijfwijzer. Daarin staan afspraken over hoe wij schrijven:

* wij spreken de gebruiker aan met *“u”* en schrijven *“u heeft”*. Over onszelf schrijven wij *“wij”*;
* wij schrijven genderneutraal en op taalniveau B1;
* voor elk begrip gebruiken wij één woord. Bewaren, Opslaan en Versturen betekenen bijvoorbeeld elk iets anders. Na het versturen heet een aanvraag een dossier;
* er zijn vaste afspraken voor datums, bedragen, aanhalingstekens, knoppen, foutmeldingen en lege pagina's.

## Ontwerppatronen

Een ontwerppatroon is een vaste oplossing voor iets dat vaak terugkomt. Wij onderbouwen elk patroon met onderzoek en met betrouwbare bronnen, zoals GOV.UK, Nielsen Norman Group, het Web Web Accessibility
Initiative van de W3C en de regels voor toegankelijkheid. Elk patroon staat met uitleg op een eigen pagina in het prototype. Een paar voorbeelden:

* **Interactie op inhoud**. Met Bewaren, Niet relevant voor mij en Delen laat de gebruiker zien wat belangrijk is. Daarmee tonen wij informatie die beter past.
* **Context wisselen**. De gebruiker wisselt tussen privé, de eigen bedrijven en machtigingen. Opnieuw inloggen is niet nodig. U vindt dit bovenaan de pagina.
* **Een taak in stappen**. Een taak zoals Iemand aannemen bestaat uit stappen, met een balk die laat zien waar u bent. De knop Verder werkt altijd. Ontbreekt er iets, dan wijst de pagina aan wat.
* **Zoeken en hulp op elke pagina**, **Veranderde waarden tonen** en **Verschillende invoerformaten accepteren**.

## Varianten en het ‘Flags’-paneel

Met schakelaars (*feature flags*) zetten wij onderdelen aan of uit. Zo tonen wij verschillende versies van het prototype zonder dat wij aparte versies hoeven te bouwen. Dat is handig bij onderzoeken met gebruikers en in gesprekken.

* **Het Flags-paneel**. Rechtsonder in het prototype staat een knop. Die opent een paneel met onder meer:
  * de keuze tussen de huidige en de nieuwe huisstijl die in ontwikkeling is;
  * de digitale assistent aan of uit;
  * verschillende versies van de berichtenbox;
  * een persona kiezen: een voorbeeldgebruiker met een eigen bedrijf, eigen gegevens en eigen berichten.
* **Keuzes blijven bewaard**. De browser onthoudt de keuzes in een cookie. Daardoor toont de pagina meteen de juiste versie.
* **Hulp bij onderzoek**. Met **Interactie-flow herstellen** zet een onderzoeker een taak terug naar het begin, voor de volgende deelnemer. Met **Alles wissen** gaat alles terug naar het begin.
* **Gescheiden van het product**. Hulpmiddelen voor het team staan altijd in het Flags-paneel, nooit op de pagina's zelf. Deelnemers aan een test zien zo alleen het product.

## Prototype

Het prototype van MijnOverheid Zakelijk staat op [moza.mijnoverheidzakelijk.nl](https://moza.mijnoverheidzakelijk.nl/). Deze versie leggen wij ook voor aan gebruikers.
