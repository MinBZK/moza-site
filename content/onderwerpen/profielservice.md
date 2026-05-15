---
title: "Profielservice"
description: "Eén plek voor contactvoorkeuren. Overheidsorganisaties bereiken burgers en ondernemers op de manier die ze zelf kiezen."
image: "/images/tegel-profiel.svg"
image_alt: "Icoon van een adresboek"
weight: 2
aliases:
  - /onderwerpen/profiel-service/
---
*Laatste update: 15 mei 2026*

# Huidige uitdaging

Overheidsorganisaties (dienstverleners, gemeenten) slaan contactgegevens en voorkeuren los van elkaar (decentraal) op. Burgers en ondernemers voeren daarom dezelfde gegevens steeds opnieuw in bij verschillende portalen. Dat kost tijd en leidt tot fouten. Tevens worden daarmee op verschillende plekken dezelfde functionaliteiten (door)ontwikkeld. Hiermee is er een duidelijke wens voor een centrale profielservice; waarmee het volgende wordt bereikt:

* **Voor burgers en ondernemers:** je beheert je gegevens op één plek. Minder administratie, betere communicatie.

* **Voor overheidsorganisaties/dienstverleners:** je krijgt actuele en betrouwbare gegevens uit één centrale bron.

* **Voor de digitale overheid:** een herbruikbare bouwsteen die past binnen de [Generieke Digitale Infrastructuur (GDI)](https://www.digitaleoverheid.nl/mido/generieke-digitale-infrastructuur-gdi/).

# Wat is de profielservice?

De profielservice is een centrale plek waar burgers en ondernemers hun contactgegevens en voorkeuren met de overheid beheren. Denk aan: wil je e-mail of post? En op welk adres? Je stelt dit één keer in en alle aangesloten overheidsorganisaties gebruiken dezelfde gegevens. Wil je iets wijzigen? Dat doe je op dezelfde plek en de nieuwe gegevens zijn direct beschikbaar.

# Oplossing

De toepassing van de profielservice kan als het volgt schematisch worden weergegeven:

![Profielservice overzicht](/images/Profielservice-overzicht.png)

## Uitgangspunten

Er zijn verschillende uitgangspunten gehanteerd bij de profielservice. Hieronder worden enkele belangrijke zaken toegelicht, waarbij dit niet de volledige lijst betreft.

### MOZa principes

Bij de ontwikkeling volgen we de [principes](https://mijnoverheidzakelijk.nl/handboek/werkwijze/principes/) van MOZa. We zoeken actief de samenwerking op, hanteren open standaarden en treden op als betrouwbare partij waar privacy en transparantie hoog in het vaandel staan. Al bij het ontwerp denken we na over minimale dataverwerking en het vastleggen van gegevensverwerkingen.

### Gegevens

Er wordt uitgegaan van een unieke **identificatie-contactgegeven&#x20;**&#x65;n/of **identificatie-voorkeur&#x20;**&#x76;astlegging. Dit is de unieke 'sleutel' waaraan de profielservicegegevens gekoppeld worden

* **Identificatie&#x20;**- op welke manier is de identiteit uniek herkenbaar? Denk aan bijv. BSN, KvK-nummer, RSIN of een ander nummer ℹ️

* **Contactgegeven&#x20;**- op welke manier wil je benaderd worden? Denk aan e-mail, post of sms of alternatieven

* **Voorkeur&#x20;**- welke voorkeuren heb je met betrekking tot overheidsinteracties? Denk aan taal, site-thema

_ℹ️ Bij de toepassing voor ondernemingen bestaat de identificatie uit twee onderdelen, een persoonskenmerk (bijv BSN) en een organisatiekenmerk (bijv KvK-nummer of RSIN)_

### Koppeling

De unieke vastlegging wordt gekoppeld aan een **dienstverlener&#x20;**&#x65;n eventueel **dienst;**

* **Dienstverlener&#x20;**&#x69;s bijv. *Gemeente Amsterdam&#x20;*&#x6F;f *Belastingdienst*

* **Dienst&#x20;**&#x77;ordt vastgesteld door - en daarmee altijd gekoppeld aan - een **dienstverlener.&#x20;**&#x56;oorbeelden hiervan zijn Zorg (binnen Amsterdam), Omzetbelasting (binnen Belastingdienst) *ℹ️*

_ℹ️ Een dienst is niet verplicht - een contactgegeven of voorkeur kan ook alleen gekoppeld zijn aan een dienstverlener_

Er is voor gekozen om vooralsnog geen additionele verdere specificatie binnen een dienst toe te kunnen passen. Dat betekent dat een dienstverlener op één niveau de contactgegeven & -voorkeuren kan specificeren.

### Hergebruik gegevens

Een ondernemer kan bij meerdere bedrijven betrokken zijn. En een bedrijf kan meerdere contactpersonen hebben. Daarom kun je met de profielservice per bedrijf andere contactvoorkeuren instellen. De profielservice slaat contactvoorkeuren op per combinatie van persoon en bedrijf. Dit heet een N:M-model: veel personen kunnen gekoppeld zijn aan veel bedrijven. Een overheidsorganisatie vraagt het contactgegeven op voor een specifiek bedrijf en krijgt de gegevens van de juiste contactpersonen terug.


```mermaid
---
title: N:M-model Profielservice
---
graph LR
  accTitle: N:M-model Profielservice
  accDescr: Meerdere personen kunnen gekoppeld zijn aan meerdere bedrijven (N:M-model). Elke pijl symboliseert een contactgegeven en/of voorkeur.
  P1@{ icon: "tabler:user", label: "Persoon A" }
  P2@{ icon: "tabler:user", label: "Persoon B" }
  P3@{ icon: "tabler:user", label: "Persoon C" }
  B1@{ icon: "tabler:buildings", label: "Bedrijf 1" }
  B2@{ icon: "tabler:buildings", label: "Bedrijf 2" }
  B3@{ icon: "tabler:buildings", label: "Bedrijf 3" }

  P1 <-->|contactgegeven/voorkeur| B1
  P2 <--> B2
  P2 <--> B3
  P3 <-->|contactgegeven/voorkeur| B3
```


In dit diagram staat elke pijl voor een contactvoorkeur. Persoon A is betrokken bij één bedrijf en heeft één contactvoorkeur. Persoon B is betrokken bij bedrijf 2 én bedrijf 3. Voor elk bedrijf kan persoon B een ander contactgegeven en/of voorkeur instellen. Bedrijf 3 heeft twee contactpersonen: persoon B en persoon C.

### Verificatie contactgegeven

De profielservice kan (indien gewenst) het contactgegeven verifiëren. Op het moment dat een nieuwe toevoeging op de profielservice wordt geïnitieerd waarbij het contactgegeven nog niet is geverifieerd dan zal de profielservice dit proces initiëren.

_ℹ️ Op dit moment is dit alleen mogelijk voor het contactgegeven e-mail_

Indien een dienstverlener zelf de verificatie heeft uitgevoerd - dan kan dit bij de toevoeging/aanpassing worden meegegeven. De profielservice zal hiervoor geen verificatie initiëren

### Hoe werkt dit voor de ondernemer?

```mermaid
---
title: Klantreis ondernemer
---
graph LR
  accTitle: Klantreis ondernemer
  accDescr: De stappen die een ondernemer doorloopt: inloggen met DigiD, eHerkenning of eIDAS, gegevens bekijken, contactvoorkeuren instellen.
  A@{ icon: "tabler:login", label: "Inloggen met DigiD, eHerkenning of eIDAS" }
  B@{ icon: "tabler:user", label: "Gegevens bekijken" }
  C@{ icon: "tabler:address-book", label: "Contactvoorkeuren instellen" }
  D@{ icon: "tabler:check", label: "Klaar" }

  A --> B --> C --> D
```


Je logt in met DigiD, eHerkenning of een Europees inlogmiddel (eIDAS), bekijkt je gegevens en stelt je contactvoorkeuren en bijbehorende gegevens in. Dat is alles. Je hoeft dit niet meer apart te doen bij elke overheidsorganisatie; en kan het centraal aanpassen. Dit betekent de volgende gegevens

### Hoe werkt dit voor overheidsorganisaties?

De toepassing is tweeledig:

#### 1. indirect gebruik door instanties

In dit geval gaat het over de toepassing van de profielservice in het notificatieproces. Hierbij hoeft een overheidsorganisatie alleen aan te geven naar wie en wat er verstuurd moet worden. Hierbij wordt de profielservice in het notificatieproces gebruikt voor de bepaling op welke manier en naar welke ontvanger de betreffende notificatie vestuurd moet worden.

#### *Voorbeeld: bestuurlijk bericht versturen*

```mermaid
---
title: Bestuurlijk bericht versturen
---
graph LR
  accTitle: Bestuurlijk bericht versturen
  accDescr: Een bericht wordt klaargezet in het berichtenmagazijn. De notificatieservice zoekt de contactvoorkeuren van de ondernemer op en verstuurt een e-mail of brief.
  A@{ icon: "tabler:inbox", label: "Bericht klaarzetten in berichtenmagazijn" }
  B@{ icon: "tabler:bell", label: "Notificatieservice" }
  C@{ icon: "tabler:address-book", label: "Contactvoorkeuren opzoeken in profielservice" }
  D@{ icon: "tabler:mail", label: "E-mail verstuurd" }
  E@{ icon: "tabler:mailbox", label: "Brief verstuurd" }

  A --> B --> C
  C -->|e-mail| D
  C -->|post| E
```


Een overheidsorganisatie zet een bestuurlijk bericht klaar in het berichtenmagazijn. De notificatiedienst zoekt via de profielservice het contactgegeven en/of voorkeur van de ondernemer op. Bij voorkeur voor e-mail gaat er een e-mailnotificatie uit. De ondernemer kan daarna in de berichtenbox het bericht lezen. Bij voorkeur voor post ontvangt de ondernemer een brief. Zo bepaalt de ondernemer zelf hoe die wordt bereikt.

#### 2. Direct gebruik door instanties

```mermaid
---
title: Klantreis overheidsorganisatie
---
graph LR
  accTitle: Klantreis overheidsorganisatie
  accDescr: De stappen die een overheidsorganisatie doorloopt: aansluiten via FSC, voorkeuren ophalen, de ondernemer bereiken.
  A@{ icon: "tabler:plug-connected", label: "Aansluiten via FSC" }
  B@{ icon: "tabler:address-book", label: "Voorkeuren ophalen" }
  C@{ icon: "tabler:mail", label: "Ondernemer bereiken" }

  A --> B --> C
```

Overheidsorganisaties sluiten eenmalig aan via [Federatieve Service Connectiviteit (FSC)](https://fsc-standaard.nl/) en [Federatieve Toegangsverlening (FTV)](https://vng-realisatie.github.io/ftv/). Bij elk contactmoment halen zij de contactvoorkeuren van de ondernemer op en bereiken zij de ondernemer op de manier die deze zelf heeft\
gekozen.

## Huidige status

De profielservice wordt verder gebracht naar een betá versie, waarbij de toepassing zowel vanuit de techniek alsook juridisch geborgd wordt. De fasering van de profielservice ziet er als volgt uit:

### 👨‍💻 In ontwikkeling

We onderkennen hierbij een verschil tussen wat technisch al mogelijk is, en hoe de profielservice daadwerkelijk functioneel zal worden ingezet. De techniek zal in staat zijn tot meer dan de daadwerkelijk toepassing zoals voorzien vanuit het juridische proces.

De eerste versie die live zal gaan richt zich op de functionele toepassing binnen het notificatieproces - zoals aangeboden in de notificatiedienst. Hieronder volgt daarmee een uiteenzetting met welke functionaliteiten de profielservice wordt ingezet, en daaronder welke verdere mogelijkheden de profielservice heeft.

### Functioneel

De profielservice wordt ingezet in de volgende functionele processen; het indirecte gebruik door een overheidsinstantie (via het notificatieproces)

1. De ondernemer is in staat middels een overheidsportaal de voorkeur (e-mail of fysiek) en eventueel bijbehorende gegevens (e-mailadres) in te voeren

   * Het is de intentie om hierbij zoveel mogelijk uit te gaan van één e-mailadres - waarbij de toepassing overheidsbreed is

2. De notificatiedienst kan de profielservice bevragen wanneer er een notificatie uitgestuurd moet worden. Hierbij dient een overheidsinstantie bij het initiëren van een notificatie ook de juiste identifier(s) mee ter sturen zoals de ontvanger bekend is in de profielservice

ℹ️ *Er wordt onderzocht of ook reeds het direct gebruik van de profielservice door een overheidsinstantie kan worden gefaciliteerd. Dit betekent echter wel dat dat bij(bestuurlijke) afspraken rondom het juridische proces er een uitzondering gemaakt moet worden t.o.v. het reguliere proces*

### Technisch

Er wordt in deze eerste versie verder gekeken dan alleen deze functionele toepassing. Vanuit de techniek zijn er de volgende zaken ingeregeld:

* Koppelen van unieke identifiers (**identificatie-contactgegeven&#x20;**&#x65;n **identificatie-voorkeur)** aan de verschillende overheidsorganisaties en eventuele specifieke diensten

* Mogelijkheid tot het instellen van een primaire voorkeur

* Mogelijkheid tot het instellen van verschillende voorkeuren, waaronder

  * SMS

  * App-id's

  * Taal

* Mogelijkheid tot het verwijderen van gegevens (gekoppeld aan specifieke uitgangspunten)

* Mogelijkheid tot het opvragen van informatie ook door derde partijen (o.a. als onderdeel van het [Federatieve Service Connectiviteit (FSC)](https://fsc-standaard.nl/) en [Federatieve Toegangsverlening (FTV)](https://vng-realisatie.github.io/ftv/))

### 📡 Vervolgstappen

We bekijken de vervolgstappen vanuit verschillende perspectieven:

#### MOZa

Vanuit MOZa blijven we profielservice verder ontwikkelen, waarbij we ons nu richten op:

* Inbeheername bij Logius

* Verfijning specifieke functionaliteiten (o.a. verwijderen gegevens)

Voor de volledige en meest recente backlog - kijk gerust hier: [Profielservice - Beta · MijnOverheid Zakelijk](https://github.com/orgs/MinBZK/projects/40/views/20?pane=issue\&itemId=133100172\&issue=MinBZK%7CMijnOverheidZakelijk%7C24).

#### Meedoen

De profielservice bouwen we samen met mensen uit diverse organisaties en vakgebieden — van beleid en ontwerp tot juridisch en techniek. Want deze voorziening heeft alleen waarde als alle overheidsorganisaties meedoen. We nodigen je uit om mee te denken, mee te bouwen en kennis te delen. Benieuwd? Sluit je aan en [praat met ons mee!](https://mijnoverheidzakelijk.nl/contact/)

## Meer info

* [Voortgang en broncode op GitHub](https://github.com/MinBZK/moza-profiel-service)

* [Technische documentatie](https://docs.mijnoverheidzakelijk.nl/workspace/documentation/Profiel%20Service)

* Uitproberen in [het portaal MijnOverheid Zakelijk](https://moza.mijnoverheidzakelijk.nl/) als onderdeel van [de proeftuin](https://mijnoverheidzakelijk.nl/onderwerpen/proeftuin/)
