---
title: "Actualiteitenservice"
description: "De Actualiteitenservice filtert en deelt relevante overheidsinformatie met ondernemers op basis van hun profiel, zodat zij geen belangrijke updates missen."
status: "Gepauzeerd"
weight: 8
---

## Huidige uitdaging

Ondernemers krijgen overheidsinformatie op allerlei manieren en van verschillende kanten. Omdat er geen centrale plek is waar alles samenkomt, moeten ze zelf overal zoeken, inloggen en filteren. Daardoor missen ze soms belangrijke berichten, lopen ze subsidies mis of voldoen ze per ongeluk niet aan verplichtingen.

## Wat is de Actualiteitenservice?

De actualiteitenservice stelt ondernemers in staat om de voor hen relevante informatie te zien, afkomstig uit verschillende overheidsbronnen. Denk aan nieuwe wetten, subsidies of lokale ontwikkelingen. De actualiteitenservice filtert deze informatie op basis van verschillende kenmerken, zoals branche, locatie of bedrijfsgrootte, en zorgt er zo voor dat de informatie zo relevant mogelijk is. De kenmerken waarop gefilterd wordt, worden waar mogelijk vooraf ingevuld, maar ondernemers kunnen deze altijd zelf aanpassen. Daarnaast biedt de actualiteitenservice de mogelijkheid om proactief een signaal te ontvangen over nieuwe ontwikkelingen.

## De oplossing

Hieronder lichten we de belangrijkste uitgangspunten van de actualiteitenservice toe en hoe deze werkt voor ondernemers en overheidsorganisaties.

### Gegevens

De actualiteitenservice werkt met **informatie-berichten** en **filterkenmerken**. In de ideale opzet koppelt een dienstverlener zijn informatie-bericht aan een of meerdere filterkenmerken, zodat het informatie-bericht alleen getoond wordt aan de relevante ondernemers op een specifiek hiervoor opgestelde inbox.

* **Informatie-bericht**: de informatie die een overheidsorganisatie wil delen, zoals een nieuwe wet, subsidie of lokale ontwikkeling.

* **Filterkenmerken**: de kenmerken waarop de informatie gefilterd wordt, zoals branche, locatie, bedrijfsgrootte, onderwerp of urgentie.

### Informatie

Elk informatie-bericht wordt gekoppeld aan een of meerdere **filterkenmerken**. Deze kenmerken bepalen welke ondernemers het informatie-bericht te zien krijgen. Een informatie-bericht kan bijvoorbeeld gekoppeld zijn aan de branche *Horeca* en de locatie *Amsterdam*, zodat alleen horecaondernemers in Amsterdam het informatie-bericht ontvangen.

De actualiteitenservice toont daarmee alleen informatie-berichten die relevant zijn voor ondernemers en die hen helpen hun bedrijfsprocessen beter uit te voeren. Concreet gaat het om informatie zoals wet- en regelgeving, subsidies, lokale ontwikkelingen en urgente mededelingen.

### Hergebruik gegevens

Een informatie-bericht kan relevant zijn voor meerdere ondernemers. Daarom wordt elk informatie-bericht opgeslagen met de bijbehorende filterkenmerken, zodat het automatisch getoond kan worden aan alle relevante ondernemers. Dit zorgt voor efficiëntie en voorkomt dat dezelfde informatie meerdere keren gepubliceerd moet worden.

### Hoe werkt dit voor ondernemers?

```mermaid
---
title: Klantreis ondernemer
---
graph LR
  accTitle: Klantreis ondernemer
  accDescr: De stappen die een ondernemer doorloopt: inloggen met eHerkenning of eIDAS, profiel instellen, informatie-berichten bekijken.
  A@{ icon: "tabler:login", label: "Inloggen met eHerkenning of eIDAS" }
  B@{ icon: "tabler:user", label: "Profiel instellen" }
  C@{ icon: "tabler:news", label: "Informatie-berichten bekijken" }
  D@{ icon: "tabler:bell", label: "Proactieve signalen ontvangen" }
  A --> B --> C --> D

```
Je logt in met eHerkenning of een Europees inlogmiddel (eIDAS), stelt je actualiteitenprofiel in met de relevante filterkenmerken en bekijkt de informatie-berichten die voor jou relevant zijn. Daarnaast ontvang je proactieve signalen over nieuwe ontwikkelingen.

### Filterkenmerken

De service filtert informatie op basis van bedrijfsspecifieke kenmerken. Hieronder een *illustratief* overzicht van de kenmerken waarop gefilterd kan worden:

| **Categorie**       | **Voorbeelden**                                                            | **Toelichting**                                           |
| ------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Branche**         | Horeca, Bouw, Zorg, Retail, Landbouw, IT, Transport                        | Bepaalt welke sector-specifieke informatie getoond wordt. |
| **Locatie**         | Gemeente, Provincie, Landelijk, EU-wijd                                    | Filtert op regionale regelgeving en subsidies.            |
| **Bedrijfsgrootte** | ZZP, MKB (1-50), Middelgroot (50-250), Groot (250+)                        | Bepaalt welke regelgeving van toepassing is.              |
| **Onderwerpen**     | Subsidies, Wetgeving, Ruimtelijke ordening, Milieu, Financieel, Veiligheid | Stel in welke onderwerpen je wilt volgen.                 |
| **Urgentie**        | Laag, Medium, Hoog, Kritiek                                                | Filter op belangrijkheid van informatie-berichten         |

### Proactieve signalen

```mermaid
---
title: Proactieve signalen
---
graph LR
  accTitle: Proactieve signalen
  accDescr: Het proces van proactieve signalen: informatie-bericht publiceren, filtering toepassen, signaal versturen.
  A@{ icon: "tabler:edit", label: "Dienstverlener publiceert informatie-bericht" }
  B@{ icon: "tabler:filter", label: "Filtering toepassen" }
  C@{ icon: "tabler:bell", label: "Signaal versturen" }
  D@{ icon: "tabler:user", label: "Ondernemer ontvangt signaal" }
  A --> B --> C --> D
```

Wanneer een nieuw informatie-bericht wordt gepubliceerd door een dienstverlener, past de actualiteitenservice filterkenmerken toe en verstuurt indien gewenst een signaal over deze informatie naar de relevante ondernemers. Gekoppeld aan de notificatiedienst kan de ondernemer een signaal via het gekozen kanaal, zoals e-mail of een melding in hun dashboard, ontvangen.

## Hoe werkt dit voor overheidsorganisaties?

Hieronder wordt beschreven hoe dit dan zou kunnen werken vanuit een overheidsorganisatieperspectief. Let wel - in de proefopstelling die is gerealiseerd zijn niet al deze principes toegepast. Tevens zijn er ook meerdere mogelijkheden om dit principe vorm te geven; hieronder is daarmee één van de uitwerkingen toegelicht.

### Publicatieproces

In dit geval publiceert een overheidsorganisatie informatie-berichten via de actualiteitenservice. De informatie-berichten worden automatisch gefilterd en getoond aan de relevante ondernemers.

```mermaid
---
title: Publicatieproces overheidsorganisatie
---
graph LR
  accTitle: Publicatieproces overheidsorganisatie
  accDescr: De stappen die een overheidsorganisatie doorloopt: aansluiten via FSC/FTV, informatie-berichten publiceren, automatische distributie.
  A@{ icon: "tabler:plug-connected", label: "Aansluiten via FSC/FTV" }
  B@{ icon: "tabler:edit", label: "Informatie-berichten publiceren" }
  C@{ icon: "tabler:share", label: "Automatische distributie" }
  A --> B --> C
```

Overheidsorganisaties sluiten eenmalig aan via Federatieve Service Connectiviteit (FSC) en Federatieve Toegangsverlening (FTV). Vervolgens publiceren zij informatie-berichten met gestructureerde metadata. De actualiteitenservice zorgt voor automatische distributie naar de relevante ondernemers.

### Filterkenmerken

Elk informatie-bericht moet voorzien zijn van gestructureerde filterkenmerken voor optimale filtering. Hieronder een voorbeeld van verschillende kenmerken.

| Filterkenmerken     | **Voorbeeldwaarden**                      | **Verplicht?** | **Toelichting**                             |
| ------------------- | ----------------------------------------- | -------------- | ------------------------------------------- |
| **Doelgroep**       | Horeca, Bouw, Zorg, MKB, Grote bedrijven  | Ja             | Bepaalt welke ondernemers het informatie-bericht zien. |
| **Regio**           | Landelijk, Noord-Holland, Amsterdam       | Ja             | Voor lokale of regionale informatie-berichten.            |
| **Onderwerp**       | Subsidie, Wetgeving, Ruimtelijke ordening | Ja             | Categorie van het informatie-bericht.                  |
| **Urgentie**        | Laag, Medium, Hoog, Kritiek               | Ja             | Bepaalt prioriteit in weergave.             |
| **Geldigheid**      | Tijdelijk (datum), Permanent              | Nee            | Voor tijdgebonden informatie-berichten.                |
| **Contactgegevens** | E-mail, telefoonnummer, website           | Nee            | Voor follow-up vragen.                      |

## Huidige status

We hebben de actualiteitenservice als concept getest bij gebruikers, en tevens hebben wij een vroege alpha versie gerealiseerd. Dit om de eerste concepten ook technisch na te gaan; en te toetsen of deze ook daadwerkelijk gerealiseerd kunnen worden.

### Functioneel

In huidige vroege alpha versie ondersteunt de actualiteitenservice de volgende functionele toepassingen:

1. Een ondernemer kan via een portaal zijn profiel instellen met de relevante filterkenmerken.

2. Informatie-berichten van overheidsorganisaties kunnen (automatisch) gefilterd worden (op basis van eerder ingegeven voorkeuren) en getoond worden aan de ondernemers.

### Technisch

Om de functionaliteiten te bieden zijn er vanuit de techniek de volgende zaken ingeregeld:

* Centraal ophalen van informatie vanuit verschillende bronnen

  * [Ondernemersplein API | Ondernemersplein](https://ondernemersplein.overheid.nl/ondernemersplein-api/)

  * wetten.overheid.nl

  * [Berichten over uw Buurt - Rondom een zelfgekozen adres](https://www.overheid.nl/berichten-over-uw-buurt)

* Koppelen van informatie-berichten aan filterkenmerken

* Mogelijkheid tot het instellen van verschillende filterkenmerken, waaronder branche, locatie, bedrijfsgrootte, onderwerp en urgentie.

## Vervolgstappen

Op basis van [gebruikersonderzoek](/weekly/moza-weekly-20-mei-2026/#gebruikersonderzoek) is er geconcludeerd dat de beschikbare informatie en de mogelijkheden die daarmee geboden worden niet de gewenste toegevoegde waarde bieden voor de ondernemers. Uit het onderzoek is gebleken dat het erg belangrijk is dat er primair relevante informatie getoond wordt, iets dat op basis van de huidige mogelijkheden niet haalbaar is. Dit komt vooral uit het feit dat de informatie zelf (nog) niet voorzien is van de gewenste filterkenmerken, en uit het feit dat de informatie in de huidige vorm niet genoeg meerwaarde biedt.

Daarom is op dit moment op basis van de huidige inzichten ervoor gekozen om de verdere ontwikkeling op de actualiteitenservice te pauzeren.

## Meedoen

De actualiteitenservice is ontwikkeld vanuit de wens om de ondernemer te helpen. Echter op dit moment hebben we nog niet de juiste bronnen beschikbaar om dat te kunnen bereiken. En deze voorziening heeft immers alleen waarde als meerdere overheidsorganisaties meedoen. Heb je nieuwe inzichten op dit gebied? Kom dan vooral met ons in contact. We nodigen je uit om mee te denken, mee te bouwen en kennis te delen, dus [praat met ons mee!](/contact/)

## Meer info

* [Voortgang en broncode op GitHub](https://github.com/MinBZK/moza-actualiteiten-service)

* Uitproberen in [het portaal MijnOverheid Zakelijk](https://moza.mijnoverheidzakelijk.nl/) als onderdeel van [de proeftuin](/onderwerpen/proeftuin/)
