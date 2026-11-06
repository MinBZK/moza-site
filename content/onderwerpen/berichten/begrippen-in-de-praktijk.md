---
title: "Begrippen in de praktijk"
description: "Hoe de soorten berichten door de onderdelen van MOZa lopen: drie scenario's van dienstverlener tot ondernemer, stap voor stap en met voorbeelden."
weight: 3
---

## Overzicht

Op de pagina [Begrippen rond berichten](/onderwerpen/berichten/begrippen/) staan de begrippen één voor één. Op deze pagina zie je hoe ze samenhangen. We volgen daarvoor drie scenario's door de plaat *Componenten in samenhang* uit het [plan voor fase 5](/documenten/rapportages/plan-moza-fase-5/).

De plaat laat versie 1 zien: wat we op de korte termijn neerzetten. Hier gaat het om de route van de berichten. Daarom hebben de onderdelen geen statuskleur. De status per onderdeel zie je in het plan.

In scenario 1 en 2 gebruiken we als voorbeeld een vergunning die een gemeente verleent.

De voorbeelden van e-mails komen uit de map [kennisgeving en attendering van MOZa](https://github.com/MinBZK/MijnOverheidZakelijk/tree/main/Docs/kennisgeving-attendering). Het zijn geen echte e-mails. De makers noemen ze "puur illustratief voor het concept en de uitleg van het verschil tussen een kennisgeving en een attendering".

{{< plaat-componenten-samenhang stappen="ja" >}}

**Scenario 1: inhoudelijk bericht met kennisgeving (melding)**
{data-kort="Inhoudelijk bericht en kennisgeving (melding)"}

1. [Vanuit een proces heeft de dienstverlener een inhoudelijk bericht voor de ondernemer, bijvoorbeeld een besluit.](#stap-1-1)
2. [De dienstverlener zet dat bericht zelf klaar, in de plaat via de OMC: lokaal (optie A) of centraal (optie B).](#stap-1-2)
3. [Daarnaast start de dienstverlener zelf de kennisgeving (melding). Die loopt door de notificatiedienst en komt als e-mail bij de ondernemer.](#stap-1-3)
{.stappen-kort}

**Scenario 2: attendering**
{data-kort="Attendering"}

1. [Vanuit een proces wil de dienstverlener de ondernemer iets laten weten, zonder inhoudelijk bericht. Bijvoorbeeld de stand van een aanvraag of een herinnering.](#stap-2-1)
2. [De dienstverlener stuurt zelf een attendering. Die loopt door de notificatiedienst en komt als e-mail bij de ondernemer.](#stap-2-2)
{.stappen-kort}

**Scenario 3: contactherstel**
{data-kort="Contactherstel"}

1. [De e-mail met de kennisgeving (melding) komt niet aan.](#stap-3-1)
2. [De notificatiedienst stuurt de ondernemer een contactherstelmelding per brief.](#stap-3-2)
{.stappen-kort}

## Uitleg per stap

### Scenario 1, stap 1: het inhoudelijk bericht {#stap-1-1}

Het begint bij de **procesapplicatie** van een dienstverlener, bijvoorbeeld een gemeente of de Belastingdienst. Uit een proces komt een *inhoudelijk bericht* voor de ondernemer.

Bijvoorbeeld een gemeente die een vergunning verleent. Het besluit is dan het inhoudelijk bericht.

Een inhoudelijk bericht is de inhoud zelf. Het is het stuk waar het de ondernemer om gaat. Een notificatie wijst er alleen op. Het is bijvoorbeeld een [besluit](/onderwerpen/berichten/begrippen/#besluit), zoals een beschikking of een aanslag. Of een [overig inhoudelijk bericht](/onderwerpen/berichten/begrippen/#overig-inhoudelijk-bericht), zoals een overzicht.

In de volgende stappen draait alles om dit bericht. In stap 2 zet de dienstverlener het klaar. In stap 3 laat de kennisgeving (melding) weten dat het klaarstaat.

### Scenario 1, stap 2: het bericht klaarzetten, lokaal of centraal {#stap-1-2}

De dienstverlener zet het inhoudelijk bericht zelf klaar. In de plaat doet de **outputmanagementcomponent (OMC)** van de dienstverlener dat. Dat is een voorbeeld. Het kan ook een andere applicatie van de dienstverlener zijn. Dat geldt ook voor de kennisgeving (melding) in stap 3.

Het klaarzetten kan op twee manieren:

- **Optie A, lokaal plaatsen**: in een eigen **berichtenmagazijn** van de dienstverlener. Zo zet de gemeente de vergunning in haar eigen berichtenmagazijn.
- **Optie B, centraal plaatsen**: in de **Berichtenbox voor Burgers en Ondernemers (BBO)**.

Het doel is in beide gevallen hetzelfde: het inhoudelijk bericht staat klaar voor de ondernemer.

Bij een besluit telt dit moment. Een besluit aan een belanghebbende wordt bekendgemaakt "door toezending of uitreiking" (Awb [3:41](https://wetten.overheid.nl/BWBR0005537/2026-08-15/#Hoofdstuk3_Afdeling3.6_Artikel3:41)). Een besluit dat in de Berichtenbox van MijnOverheid wordt gezet, geldt als toegezonden. "Een besluit treedt niet in werking voordat het is bekendgemaakt." (Awb [3:40](https://wetten.overheid.nl/BWBR0005537/2026-08-15/#Hoofdstuk3_Afdeling3.6_Artikel3:40)) Zie ook [*Bekendmaking*](/onderwerpen/berichten/begrippen/#betekenissen-bekendmaking).

Elektronisch verzenden mag alleen als de ontvanger "uitdrukkelijk kenbaar heeft gemaakt dat hij langs deze weg voldoende bereikbaar is" (Awb [2:8](https://wetten.overheid.nl/BWBR0005537/2026-08-15/#Hoofdstuk2_Afdeling2.3_Paragraaf2.3.2_Artikel2:8)).

### Scenario 1, stap 3: de kennisgeving (melding), via de notificatiedienst als e-mail {#stap-1-3}

Naast het inhoudelijk bericht start de dienstverlener zelf een [kennisgeving (melding)](/onderwerpen/berichten/begrippen/#kennisgeving-melding). Via de OMC vraagt hij de **Notificatie Management Component (NMC)** van de [notificatiedienst](/onderwerpen/notificatiedienst/) om die te versturen. De overheid moet de kennisgeving (melding) binnen 48 uur sturen (Awb [2:10](https://wetten.overheid.nl/BWBR0005537/2026-08-15/#Hoofdstuk2_Afdeling2.3_Paragraaf2.3.2_Artikel2:10) lid 1).

Bij de vergunning krijgt de ondernemer zo binnen 48 uur een kennisgeving (melding) per e-mail.

Het inhoudelijk bericht zelf gaat niet mee. Op de pagina over de notificatiedienst staat: "Een beschikking kan dus niet via de notificatiedienst worden verstuurd, wél het bericht dat er een beschikking klaarstaat en waar die te vinden is."

De NMC laat de dienstverlener weten hoe het met de notificatie gaat. Bijvoorbeeld "notificatie verzonden" of "contactherstel gestart via post". Zo'n statusupdate tussen systemen is een [gebeurtenisbericht](/onderwerpen/berichten/begrippen/#gebeurtenisbericht).

De notificatiedienst verstuurt de kennisgeving (melding) als e-mail naar de ondernemer. De kennisgeving (melding) laat weten dat er een inhoudelijk bericht klaarstaat. De inhoud staat er niet in. E-mail is daarbij het medium, niet het type.

Voorbeeld van een generieke kennisgeving (melding):

> **Onderwerp:** Bericht van [afzender] (document ontvangen)
>
> U heeft een bericht van [afzender] ontvangen in uw Berichtenbox van MijnOverheid Zakelijk.
>
> Log in op MijnOverheid Zakelijk of de Berichtenbox-app om het bericht te lezen.

Voorbeeld van een kennisgeving (melding) over een automatische incasso:

> **Onderwerp:** Bericht van [afzender] (automatische incasso)
>
> U moet betalen voor [datum_actie]. Het bedrag wordt van uw rekening afgeschreven via een automatische incasso. Lees het bericht voor meer informatie.

Dit tweede voorbeeld zegt ook wat de ontvanger moet doen en voor wanneer. Vanaf 1 januari 2027 vraagt de wet dat: de kennisgeving (melding) "vermeldt, voor zover van toepassing, de termijn voor het verrichten van een handeling door de geadresseerde" (Awb [2:10](https://wetten.overheid.nl/BWBR0005537/2027-01-01/#Hoofdstuk2_Afdeling2.3_Paragraaf2.3.2_Artikel2:10) lid 2).

### Scenario 2, stap 1: iets laten weten, zonder inhoudelijk bericht {#stap-2-1}

Ook dit scenario begint bij de **procesapplicatie** van een dienstverlener. Uit een proces komt deze keer geen inhoudelijk bericht. De dienstverlener wil de ondernemer alleen iets laten weten, bijvoorbeeld de stand van een aanvraag of een herinnering.

Ook bij de vergunning komt een attendering voor. Legt de gemeente het ontwerpbesluit ter inzage, dan krijgen buurtbewoners die zich hebben aangemeld voor berichten over hun buurt een attendering. De ontvanger is dan geen ondernemer, maar de route is dezelfde.

### Scenario 2, stap 2: de attendering, via de notificatiedienst als e-mail {#stap-2-2}

De dienstverlener stuurt zelf een [attendering](/onderwerpen/berichten/begrippen/#attendering) naar de notificatiedienst. In de plaat gaat dat via de OMC, net als bij de kennisgeving (melding).

Een attendering bevat de informatie zelf. Ze verwijst niet naar een bericht in een berichtenmagazijn. De Awb regelt de attendering niet. Mist iemand bijvoorbeeld een herinnering, dan loopt een termijn gewoon door.

De notificatiedienst verstuurt de attendering als e-mail naar de ondernemer. Organisaties kunnen daarbij eigen tekstuele templates en tot op zekere hoogte hun eigen merkidentiteit gebruiken.

Voorbeeld van een herinnering van de Belastingdienst:

> **Onderwerp:** Bericht van Belastingdienst (Uw btw-aangifte over het 4e kwartaal 2025)
>
> Het is binnenkort tijd om de btw-aangifte over het 4e kwartaal 2025 in te dienen voor ******000B01. De uiterste inleverdatum is 31-01-2026.

Voorbeeld over de stand van een aanvraag bij de RDW:

> **Onderwerp:** Bericht van RDW (Aanvraag ontvangen en in behandeling)
>
> We hebben uw aanvraag ontvangen en zijn voor u aan de slag.
>
> De afhandeling van uw aanvraag duurt ongeveer 2 werkdagen.

Voorbeeld over een verhuizing die is doorgegeven bij een gemeente:

> **Onderwerp:** Bericht van Gemeente Voorbeeld (aanvraag verhuizing)
>
> Het duurt 5 werkdagen om een verhuizing te verwerken.
>
> U kunt de status van uw verhuisaanvraag inzien in MijnOverheid Zakelijk.

### Scenario 3, stap 1: de e-mail komt niet aan {#stap-3-1}

Soms komt de e-mail met de kennisgeving (melding) uit scenario 1 niet aan, bijvoorbeeld omdat een e-mailadres niet meer bestaat. De notificatiedienst merkt dat en laat het de dienstverlener weten.

Dat de e-mail niet is bezorgd, hoort de notificatiedienst via een technisch signaal. Dat is geen bericht aan de ondernemer, en dus geen type uit de begrippen. Daarom staat bij de rode pijl "Niet bezorgd".

Volgens [VNG](https://vng.nl/sites/default/files/2024-01/requirements_notificeren_volgens_de_wmebv_v1.0.pdf) hangt de vervolgstap af van de oorzaak. Bij een tijdelijk probleem moet de notificatie "nogmaals worden verzonden naar hetzelfde elektronische adres". Bij een permanent probleem geldt dat "het bestuursorgaan via een andere weg contact moet opnemen met de ontvanger".

Mist de ondernemer de kennisgeving (melding) buiten eigen schuld, dan heeft dat een gevolg. "De overschrijding van een termijn wordt de geadresseerde evenmin tegengeworpen" (Awb [2:22](https://wetten.overheid.nl/BWBR0005537/2026-08-15/#Hoofdstuk2_Afdeling2.3_Paragraaf2.3.5_Artikel2:22) lid 2). De overheid moet de verzending en ontvangst bewijzen (Awb [2:25](https://wetten.overheid.nl/BWBR0005537/2026-08-15/#Hoofdstuk2_Afdeling2.3_Paragraaf2.3.6_Artikel2:25)).

### Scenario 3, stap 2: de contactherstelmelding per brief {#stap-3-2}

Daarna kan de notificatiedienst **contactherstel** starten. Dat gebeurt niet automatisch: de dienstverlener bepaalt mee hoe ([notificatiedienst, contactherstel](/onderwerpen/notificatiedienst/#contactherstel)). De **Printstraat** stuurt de ondernemer dan een brief: een [contactherstelmelding](/onderwerpen/berichten/begrippen/#contactherstelmelding). Die laat weten dat de kennisgeving (melding) niet kon worden bezorgd, en wat de ondernemer kan doen om kennisgevingen weer te ontvangen. De overheid is dat verplicht (Awb [2:11](https://wetten.overheid.nl/BWBR0005537/2026-08-15/#Hoofdstuk2_Afdeling2.3_Paragraaf2.3.2_Artikel2:11) lid 2).

De brief is het medium, de contactherstelmelding het type. Wat het niet aankomen betekent voor het proces zelf, bepaalt de dienstverlener (zie [procesherstel](/onderwerpen/notificatiedienst/#procesherstel)).

## Afkortingen

- **Awb**: Algemene wet bestuursrecht
- **BBO**: Berichtenbox voor Burgers en Ondernemers
- **NMC**: Notificatie Management Component
- **OMC**: outputmanagementcomponent
- **RDW**: Dienst Wegverkeer
- **VNG**: Vereniging van Nederlandse Gemeenten
