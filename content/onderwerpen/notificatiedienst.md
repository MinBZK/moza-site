---
title: "Notificatiedienst"
description: "Een voorziening waarmee overheidsorganisaties burgers en ondernemers op het juiste moment via het juiste kanaal informeren."
status: "In ontwikkeling"
weight: 2
---

## Huidige uitdaging

Overheidsorganisaties willen burgers en ondernemers betrouwbaar en efficiënt informeren. Er is alleen geen gezamenlijke voorziening voor het versturen van meldingen, notificaties en e-mails. Daardoor lopen we tegen knelpunten aan:

* **Versnippering:** organisaties gebruiken elk hun eigen systemen, teksten en werkwijzen.
* **Complexiteit:** elke organisatie regelt zelf het versturen, beheren en loggen van notificaties. Dat leidt tot dubbel werk en tot verschillen in uitvoering.
* **Inefficiëntie:** veel organisaties hebben dezelfde behoefte, maar bouwen bij gebrek aan een standaardvoorziening allemaal een eigen oplossing.

Een gezamenlijke notificatiedienst lost dit op. Daarmee bereiken we:

* **Voor burgers en ondernemers:** je krijgt tijdig bericht over zaken die je aandacht vragen, op het kanaal dat je zelf hebt gekozen. Komt een digitaal bericht niet aan, dan wordt een alternatief kanaal ingezet.
* **Voor overheidsorganisaties:** je hoeft zelf geen verzendkanaal, printstraat of contactherstelproces in te richten. Je sluit aan op een centrale voorziening en krijgt terugkoppeling over wat er met je notificatie is gebeurd.
* **Voor de digitale overheid:** een herbruikbare bouwsteen die past binnen de [Generieke Digitale Infrastructuur (GDI)](https://www.digitaleoverheid.nl/mido/generieke-digitale-infrastructuur-gdi/).

## Wat is de notificatiedienst?

De notificatiedienst helpt overheidsorganisaties om burgers en ondernemers op het juiste moment via het juiste kanaal te informeren. Dankzij één gezamenlijke voorziening worden berichten betrouwbaar verstuurd en opgevolgd, en waar nodig ondersteund met contactherstel.

De notificatiedienst is een gezamenlijk initiatief van Logius en het programma OBIS. De dienst werkt als een digitale postbezorger voor de overheid: een infrastructuur waarmee dagelijks miljoenen berichten veilig en betrouwbaar naar burgers en ondernemers kunnen worden verstuurd.

### Vijf stappen

De notificatiedienst ondersteunt vijf stappen in het verzenden en opvolgen van digitale berichten:

1. **Ontvangers bepalen.** Vaststellen wie een bericht moet ontvangen en via welk contactkanaal die persoon of organisatie bereikbaar is.
2. **Berichten versturen.** Het opstellen en verzenden van de notificatie via het juiste kanaal.
3. **Reacties verwerken.** Het vastleggen en verwerken van terugkoppelingen op verzonden berichten.
4. **Contactherstel bepalen.** Signaleren dat een bericht niet aankomt en vaststellen welke vervolgstappen nodig zijn.
5. **Contactherstel uitvoeren.** Het starten, volgen en afhandelen van acties om alsnog contact te leggen.

Een organisatie kan de hele notificatiedienst afnemen, maar ook alleen de onderdelen die zij nodig heeft. Zo sluit de dienst aan op de behoeften die binnen MOZa en OBIS zijn opgehaald bij ondernemers, burgers, overheidsorganisaties en medewerkers van die organisaties.

## Wat de dienst wel en niet doet

De notificatiedienst verstuurt geen officiële documenten. De dienst ondersteunt het digitale proces en informeert burgers en ondernemers dát er ergens een bericht klaarstaat, en waar. Denk aan een melding dat een beschikking, aanvraag of ander document klaarstaat in een portaal.

De dienst is vooralsnog niet geschikt voor het afleveren van het inhoudelijke bericht zelf.

> [!INFO]
> Een beschikking kan dus niet via de notificatiedienst worden verstuurd, wél het bericht dat er een beschikking klaarstaat en waar die te vinden is.
>
> **Voorbeeld:**  
> een ondernemer ontvangt een e-mail met de boodschap "Er staat een nieuw bericht voor u klaar. U kunt dit bekijken via [naam portaal]."  
> 
> Het bericht zelf haalt de ondernemer vervolgens op in het systeem van de overheidsorganisatie.

## De oplossing

De oplossing start bij de dienstverlener die een notificatie naar de ondernemer of burger wil versturen. De dienstverlener start de notificatie vanuit de eigen procesapplicatie, meestal via een lokaal [outputmanagementcomponent (OMC)](#begrippen) of een vergelijkbare voorziening. De [Notificatie Management Component (NMC)](#begrippen) neemt het vanaf daar over: contactgegevens bepalen, de notificatie laten versturen door Notify, de terugkoppeling verwerken en waar nodig contactherstel starten.

{{< diagram-notificatiedienst caption="De notificatiedienst in samenhang met componenten van de dienstverlener en centrale voorzieningen." >}}

### Via welke kanalen wordt genotificeerd?

Op dit moment richten we ons op één primair kanaal: **e-mail**. In de toekomst kunnen daar kanalen bij komen, zoals fysieke verzending per post, sms, alternatieve digitale berichtenkanalen en andere vormen van elektronische communicatie.

Voor contactherstel wordt fysieke verzending per post straks wél mogelijk. Juist als het digitale kanaal niet werkt, is post de manier om iemand alsnog te bereiken.

### Wie bepaalt naar wie wordt genotificeerd?

De overheidsorganisatie die de notificatie verstuurt, bepaalt zelf hoe de ontvanger wordt vastgesteld. Dat kan op twee manieren:

1. **Decentrale profielservice.** De dienstverlener heeft een eigen profielservice en bepaalt daarmee zelf wat de contactvoorkeur is en welke gegevens daarbij horen. Worden die gegevens meegegeven, dan gebruikt de notificatiedienst ze bij het verzenden. Ook als er in een centrale profielservice andere gegevens beschikbaar zijn.
2. **Centrale profielservice.** Er is één centrale plek waar contactvoorkeuren en bijbehorende gegevens worden vastgelegd. Op basis van een identificerend nummer zoals een KVK-nummer of BSN kan het juiste contactgegeven worden opgehaald.

Het heeft de voorkeur om zoveel mogelijk gebruik te maken van de [centrale profielservice](/onderwerpen/profielservice/). Contactgegevens zijn dan eenvoudiger te beheren, informatie kan centraal worden bevraagd en processen zoals contactherstel zijn centraal te organiseren.

### Verzending en terugkoppeling

Geen enkele e-maildienst kan garanderen dat een bericht daadwerkelijk door de ontvanger is gelezen. Daarom geldt: is een bericht succesvol afgeleverd bij de mailserver van de ontvanger, dan beschouwen we dat als een succesvolle verzending.

De notificatiedienst koppelt per functionaliteit terug wat de status is. De verzendende organisatie weet daardoor steeds waar haar notificatie in het proces staat. Die terugkoppeling bestaat uit twee delen:

1. **Wat is de huidige status,** en wat is er eventueel al opgevolgd? De dienst meldt dat het bericht is verzonden en meldt problemen zodra ze zich voordoen. Dat kan uitmonden in de terugkoppeling dat verzending niet is gelukt en dat wordt overgegaan op contactherstel.
2. **Wat gebeurt er hierna,** als er geen tegenbericht komt? Bijvoorbeeld: "notificatie verzonden, we wachten 48 uur". Komt er tussentijds een softbounce binnen, een melding dat de e-mailserver tijdelijk onbereikbaar is, dan volgt "softbounce ontvangen, nieuwe poging over 3 uur". En uiteindelijk mogelijk: "notificatie niet afgeleverd, contactherstel via post gestart".

Voorbeelden van statussen die kunnen optreden:

* contactgegeven niet gevonden, alternatief adres nodig
* notificatie verzonden
* tijdelijke afleverfout, nieuwe poging gepland
* notificatie niet afgeleverd
* contactherstel gestart via post
* contactherstel afgeleverd

Dit zijn voorbeelden. De lijst vullen we verder aan naarmate we de dienst samen met dienstverleners vormgeven.

### Wat gebeurt er als een notificatie niet aankomt? En wie bepaalt de vervolgstappen?

Soms kan een notificatie niet worden afgeleverd, bijvoorbeeld omdat een e-mailadres niet meer bestaat of niet bereikbaar is. Dan kunnen er herstelacties nodig zijn. Bij notificeren onderscheiden we er twee: procesherstel en contactherstel.

#### Procesherstel

Het niet kunnen afleveren van een notificatie heeft mogelijk gevolgen voor het onderliggende proces. Of dit zo is, dat wordt vastgesteld door de dienstverlener. De dienstverlener bepaalt bijvoorbeeld of een bericht opnieuw moet worden verstuurd, of een proces moet worden gepauzeerd, wanneer vervolgacties nodig zijn en welke gevolgen een mislukte aflevering heeft. Dat noemen we **procesherstel**: het verder oppakken van het proces waaraan de notificatie is gekoppeld.

Een voorbeeld maakt duidelijk waarom dat bij de dienstverlener hoort:

* Een proces richt zich op de btw-aangifte.
* Dat proces leidt tot een beschikking, die bekend moet worden gemaakt aan de ontvangers. Onderdeel daarvan is een notificatie over die beschikking.
* In de beschikking staat dat er een bedrag betaald moet worden.

Om te bepalen wat het betekent dat de notificatie niet is aangekomen, is kennis van dat proces nodig. Zijn er meerdere ontvangers, en hebben die de notificatie wel gekregen? Is het bedrag inmiddels betaald, en maakt dat uit voor de vraag of opnieuw verzonden moet worden? En als er niet is betaald: per wanneer komt daar een boete bij?

De notificatiedienst heeft in de meeste situaties verder geen rol meer in het **procesherstel**.

#### Contactherstel

Het feit dat een notificatie niet kan worden afgeleverd, betekent in veel gevallen ook dat contactherstel nodig is. Ofwel, we starten een proces op waarmee we de ondernemer of burger vragen om hun contactgegevens bij te werken. Het doel daarvan is dat de burger of ondernemer het digitale adres corrigeert, zodat toekomstige notificaties weer aankomen.

Voordat contactherstel start, stellen we eerst vast hoe de verzending is verlopen. Het initiëren van contactherstel is dus niet een proces dat automatisch in gang wordt gezet. Ook hier is er interactie met de dienstverlener. De dienstverlener bepaalt daarbij bijvoorbeeld zelf hoe het contacthersteladres wordt vastgesteld. Dat kan op twee manieren:

1. **Via de dienstverlener zelf.** Net als bij het initiëren van de notificatie kan de dienstverlener het contacthersteladres zelf meegeven. Dat kan direct bij het initiëren van de notificatie, of het adres wordt op dat moment actief bij de dienstverlener opgehaald. Onze voorkeur gaat uit naar het tweede, omdat dat beter past bij het principe van dataminimalisatie.

2. **Als onderdeel van de notificatiedienst.** Kiest de dienstverlener daarvoor en zijn er voldoende gegevens beschikbaar, dan kan de notificatiedienst zelf contactherstel starten en een adres bepalen. Bijvoorbeeld op basis van een KVK-nummer, RSIN of BSN.

> [!INFO]
> Op basis van een pseudo-id of een ander kenmerk van de dienstverlener is geen adres te herleiden in centrale bronnen. Heeft een dienstverlener geen officieel kenmerk, dan kan de notificatiedienst het contactherstel niet zelf organiseren. De dienstverlener kan de contactherstelgegevens dan wel bij de aanroep meegeven.

We onderzoeken of contactherstelacties voor hetzelfde contactgegeven periodiek gegroepeerd kunnen worden, zodat de ontvanger daarover één bericht krijgt in plaats van meerdere. Dat scheelt post aan mensen van wie het e-mailadres niet meer werkt.

De notificatiedienst houdt bij dat contactherstel is gestart en stelt ook vast wanneer het is afgerond. Na een bepaalde periode worden die gegevens weer verwijderd.

### Dataverwerking

Bij het versturen van berichten worden gegevens verwerkt. Op basis van de standaard [Logboek Dataverwerkingen](https://www.logius.nl/onze-dienstverlening/gegevensuitwisseling/logboek-dataverwerkingen/wat-is-logboek-dataverwerkingen) leggen we vast welke verwerkingen binnen de notificatiedienst hebben plaatsgevonden.

## Uitgangspunten

Bij het vormgeven van de notificatiedienst hanteren we de volgende uitgangspunten:

* **Functionaliteit is leidend,** de techniek volgt daaruit.
* **Zo snel mogelijk meerwaarde bieden** voor zoveel mogelijk dienstverleners.
* **De aansluitdrempel is zo laag mogelijk** voor alle dienstverleners.
* **De regiekeuze blijft bij de dienstverlener.** Die bepaalt zelf welke functionaliteiten er gebruikt worden.

### Centrale en decentrale regie

Er is behoefte aan zowel centrale als decentrale regie op notificeren.

Decentraal ligt regie voor de hand bij het koppelen van notificaties en statussen aan een klantcontactsysteem, het besluit tot herverzending, en de koppeling met procesherstel. Een decentraal OMC kan die rol goed invullen, maar een dienstverlener kan dit ook anders organiseren.

Centraal ligt regie voor de hand bij het ontzorgen van het notificatieproces, zodat dit vanuit een overheidsstandaard steeds op dezelfde manier verloopt. Ook het uitvoeren van contactherstel hoort daarbij, zodat niet elke dienstverlener afzonderlijk contactherstel hoeft te starten. En het bepalen van ontvangersgegevens, waarbij meerdere bronnen een rol kunnen spelen, zoals de profielservice, de Basisregistratie Personen (BRP) en het Handelsregister (HR).

Van sommige functies is nog niet duidelijk of ze logischerwijs centraal horen. Die kunnen mogelijk ook decentraal worden belegd. Dat verkennen we in samenhang, aan de hand van concrete use-cases.

De NMC heeft uitdrukkelijk niet de bedoeling om decentrale OMC's te vervangen. De NMC ontstaat ernaast. Het bestaande OMC is ontwikkeld voor gemeenten, binnen Common Ground en MijnServices. De NMC bouwen we als een voorziening om centrale processen te regisseren. Daarbij bouwt de NMC voort op het OMC. Deze aanname toetsen we periodiek opnieuw.

### Moderne overheidsstandaarden

De notificatiedienst gebruikt moderne overheidsstandaarden, waaronder [Federatieve Service Connectiviteit (FSC)](https://fsc-standaard.nl/), [Logboek Dataverwerkingen](https://www.logius.nl/onze-dienstverlening/gegevensuitwisseling/logboek-dataverwerkingen), de [NeRDS-principes](https://minbzk.github.io/NeRDS/) en de [API-standaarden](https://developer.overheid.nl/kennisbank/api-ontwikkeling/standaarden/). Daardoor kunnen overheidsorganisaties hun bestaande systemen eenvoudig aansluiten. De dienst ondersteunt niet alleen het versturen van berichten, maar ook het terugkoppelen van bezorginformatie en het uitvoeren van vervolgacties zoals contactherstel.

### Afsprakenstelsel

Over de dienstverlening maken we duidelijke afspraken, vastgelegd in een [afsprakenstelsel](https://www.logius.nl/onze-dienstverlening/afsprakenstelsels). Aangesloten organisaties weten daardoor vooraf wat zij kunnen verwachten.

Organisaties kunnen ook gebruikmaken van een speciale aansluiting. Is daar een juridische grondslag voor, dan kunnen zij een bericht versturen op basis van een identificerend nummer zoals een BSN of KVK-nummer. De notificatiedienst haalt dan via de centrale profielservice de voorkeurscontactgegevens van de ontvanger op, en verstuurt het bericht automatisch via het juiste kanaal met het juiste berichtsjabloon. Zo komt belangrijke informatie sneller en betrouwbaarder aan, via het kanaal dat de ontvanger zelf heeft gekozen.

## Vervolgstappen

We ontwikkelen de notificatiedienst verder. Op de agenda staan:

* Het toevoegen van kanalen naast e-mail.
* Het toevoegen van alternatieve informatiestromen binnen de overheid.
* Het toevoegen van inhoudelijke aflevering, dus het bericht zelf en niet alleen de notificatie erover.
* Onderzoek naar tweerichtingsverkeer. Naast het versturen van notificaties ligt de vraag op tafel wat er nodig is voor communicatie in twee richtingen, en welke rol de notificatiedienst daarin speelt.

## Onze werkwijze

Bij de ontwikkeling volgen we de [werkwijze](/handboek/werkwijze/) en [principes](/handboek/werkwijze/principes/) van MOZa. We zoeken actief de samenwerking op, hanteren open standaarden en treden op als betrouwbare partij waar privacy en transparantie hoog in het vaandel staan. Al bij het ontwerp denken we na over minimale dataverwerking en het vastleggen van gegevensverwerkingen.

## Meedoen

De notificatiedienst bouwen we samen met overheidsorganisaties. De dienst heeft alleen waarde als organisaties meedoen, dus we nodigen je uit om mee te denken, mee te bouwen en kennis te delen. Hiervoor organiseren we ook maandelijkse werksessies waarin we samen met elkaar aan deze dienstverlening werken. Benieuwd? Sluit je aan en [praat met ons mee!](/contact/)

## Begrippen

**Dienstverlener.** Alle overheidsinstanties, zoals gemeenten en uitvoeringsorganisaties, die als overheidsinstantie notificeren richting burgers en ondernemers.

**Procesapplicatie.** Ook wel vakapplicatie. De applicatie die het functionele proces uitvoert of regisseert vanuit de dienstverlener. Deze bepaalt dat communicatie nodig is, en in welke vorm. In de context van de notificatiedienst start deze applicatie de notificatie, eventueel via een lokaal OMC. Ook procesherstel wordt hier georganiseerd.

**Outputmanagementcomponent (OMC).** Decentraal component dat binnen het domein van de dienstverlener de regie voert op het notificatieproces en lokale koppelingen kan leggen.

**Notificatie Management Component (NMC).** Het component dat vanuit centraal oogpunt invulling geeft aan de vijf functionaliteiten van de notificatiedienst. Een dienstverlener kan alle vijf functionaliteiten afnemen, of alleen de onderdelen die nodig zijn.

**Decentraal profiel.** De gegevens van een burger of ondernemer die een dienstverlener lokaal heeft staan. In de praktijk kan dat uit meerdere applicaties of informatiebronnen bestaan.

**Centraal profiel.** De gegevens van een burger of ondernemer die centraal worden opgeslagen. Ook dit kan in de praktijk uit meerdere bronnen bestaan.

**Notify.** De centrale verzendcomponent van de notificatiedienst, inclusief templating. Hiervoor zetten we de opensourcecomponent [NotifyNL](https://github.com/Worth-NL/notifynl-api) in.

## Meer info

* [Code op GitHub](https://github.com/MinBZK/moza-notificatiemanagementcomponent)
* [Uitgewerkte flow van de notificatiedienst (sequence diagram)](https://sequencediagram.org/index.html#initialData=C4S2BsFMAIDkHtQDMQGMCGpIBMSQHYDOwS48A7tAIwDsAtAGx0BMADMw9ABQAyAogBVoAeQAKAGmiQATtADW6fNGwBXQlILR8eFeRgA3GYTzQAXiABWSutFQALSKjnR9IdNAC28U+gACAI1M5ADp8cABKACgAB3RpUFQQWPxgAHNpeBVo6AARPCJgQ2kofBloAHpcxwJgaXR0cBi4hKTFYGhRDNRIQnRo6PA0TDwm+LRWlOgAIRk0O2ACf3gAD1GW5PbReHiGtfGN3IBhTvgUSEbYscSD4QBZQ8iCbD3rtvTM7MOauqhc-OIXhM0hksnBECAUN1pARAQdYPdIrC2tABJAPANhvhUkjJghkABPHHtQ7wFLoVDABzSYjnRGXdbIzogFLEOqYR74Z70-aMjJncCEGSubpE6AAaX0YvKUwASqIOVzmjzJrd0CBwNAAMpCmSirbEdDYaGESLk4DbDpGeCk00UkD6TAwE7dXr9QYYLCRfCIGDwIodLo9PoDIZYSRbHYagDcAGYo9h0IQHNgAFwASXA4DUtWGkCQKYAOvg8u0QOp4NFQKTIOdoDZNAolBjMIRXJyCEX9Na6khUvVOdB+9AHO0isQVNClA6lDX8EXvchQyNIhX2lRprN7At8EtVs6g26lzA6AA+GbSObb3cpjrgerAQVKZl2TLYc6WZz+TfzIsKleV6BmBEMJmSdbZgF2fdXRDD0TFPCMIPAG9RDvFtNGfV93wsT9v2AX8nkRREoODd1czrE9iMPWDIBvGZYhKaAvxfPMFk7bstHBSFc0id5QTxCEj2Uf5gERXjsioYJoAACUgdov3ozRp2UX0UmnVJiC7bY5EgCdoAAS6UCs7AaTR-EsJjtieFTCkUdS0kgVJIEMIgiMDaDSKwciRHuG8020UAAGvJ1seAPA8FRtGo21QAdBZvIeBp2hyaoUh+GBoVSZdEugL5UpM6Boj5PANUFaRhUgRE7kOeCivOUrypvYRomMhjNOkbTdPgfx9BvIsbAlMVoAAag6QUVGweA02wCpoBlTU01gSopk1WA+r+AgNJkEoZDWvINpEs17UdANTmK+q0Aq7KqEiE5+XO7pyKqm8AHFZ2gRzHOc9Qv0IewQDkfx6mkP9suYG7aoFIULsenyctJCCKTajrpBvNE1XAIs0fVG9mSQeAAhwC8LCQUJGgIt9Dtip0IfuiqCOy5LujyhoCohyr7nInJjghlMmpaxTu2R6Aup66A1oG4bRp0iappmuaFqWlbduEoptukZX9uio64q527isRXWIZhw4bxJMlEcFnSUakDx0cx23segXH8a-I1LBJsJIgpu0qaOPXaQI9nqpPJ6NwUpRHP8aQVH+lxFE7GRTCeD6nI2xF6fAYlvnyjKRiq094RN6A-LAEAgs0VBQvCyKyJFwt8DFAA1KV5cW5bVvwLXfcLyJC-I-3IbKi7Guakyp0tzrut6-B+slSXRDGmXpsqVvFY7mw9oKVWCB2mf1oKLvjoH2nwdOuqoYe084Fhs2EcKCfraxjHSgdpCnfwPGCbd4nSb-RFKeOlVf+Psj40wvhVb2MVQFn0HuVYBUCdbcxgYiSB2sYCG2Qag32QC-5iUApJGS7RegeH2ucBimgEyGj0O1LCzgihJ3bFORQykOKLiitlJmOZfi5wqoXAuPkS5YDKPQp4zJsQZ3aG+ThaVoA8MiFVcihdfL+TLsFBcAlqKeFksoIGzJ66zzFPgWQI1oiL0msvVuM124ay3ltHe6s96b2IGtAQ+JogGETqIrE09oB1mgAAMXxMYSAchyhPzWnwV+OMP4u0Ju7UmLi3EwC-BeLca1zyXkIO4xIZxtLvzxtIW2WB65+JyJgFQHguCECiARPup5UTojvKAbxIhR4MQWI0zEqRhZT0Se4xiuFD5xQaRiZp2IRlNLEV5JR0BG5GHsOgJASBNAdNGRAyAADhlolGWI3uHMr4zKajSTMplcL6NmSoE5ShVlNMgGtTU6ASEFDIac1J8w9mHEUZxfEyjS7lynJ4zkuzNkwH4kgQkYL8ReVVOqLUOprZzOpMACcrzLxDJgDCjU2oyq6lEFaUkdYr6YrhTi62PBIAMLFjuQZgc8ExmktoisalNCaFzqyGQilmHGmiKSQU6g7B4AyNEf+mctQqFQC6LsjRiXYv9AXb5N5NQQWReoNgrBe7fOmbDRF45gqEHFZK+AjQ6knhmY3RMEAHKOSUNy3ldNOSmlFbAPARCDU9Clb8RZUAihTOujK+FXyCSNVUrZTQeMVDAErm+dQ9zlVqGgAAVmCMsZNwRY3lPUAAFlTSmr2GyQFxX9aSjVBItVFx1citRLroD6ole6o1Hz+FFzomPDi8BsA+HQM4IsVIRFAqxFSrgZkLCMUsPoaA4bI3tpgNmlNKaohYOOpCkVWc8rcIciME1x9wHKIdIMN8wUn50ENMaEGorGbZ3XZlXh9xTyhwrSipQWQExxQ8P4doXrU4XgHQAMhtujE9PR0XxXkbek8GD+S7oaCAA9mhX6AZNARJDDqeIgmyNmhlclIDhzjkoSu5tKRGAWBqUy5lIAvknG+YWIasTEBTl9R1q6uEwBlBum9wcZktoYt6dtnbnCaEEaoiu8MzRUmOSUvxA06D4AqSQ2QpxpgrQGb9AVAMgbQA+f3MBQ9ug3lgOgPszD8N3zE8R1ceATQgpOndcBp8bM6ePCea+RdXrOWFpWCzRYuCNmFvAZwjlNDmZgOYKwUQ+EnlvqJoj5xfmBWCsZs0w5osai4CLXD4pJTSiUwAZ6QKOiwFlKPvQcqnTuVnIsUlM7SCrhGkW1lPDVqrb8uOKSFEauyfR-ztD5q28FwTnAIciI15L5EBrSjlCPfmSg+t4AG0aIDVmxuynlEtuU5Fht1bfjqhZSzNCDcXXFVb8pkPPDzVZ7dDngNHbOwWmA12JG+IvWu9KbHQPB3irRbDraeMdvqHIIsCXKvJd-AzFKOYWaFWQfncDSDINwAM0OQHtXjn0bTlZiD+sMf1ZDtq+ZxldsRxKwxg76DYf6we7lcHGpIf8je1pmBtM9MI6MyJoHm3UcuXO9puBF3ypeXvXjxZyzCefQ2twZkuBTkqf+oDOIf4TuiTQ4mgh2iY73w5TOQy0QpXWvS0jprK6qjSJzq9hRTbYtCbw6z5HxGek9XFpKIxktTHS3MRUSxa8bGbWKPYtaG3jl9I8dIBhuAWlFl8TYQJ-WwmvwiVE-JsTv4e2fjYVx-SUmXnSbhLJjgBIhJgM7QpuYSkb3KZU6pv4ScgYp5el716hvW6a15f3tuLf-JCnlNnxy-4MxAJlRCQeQ9TP18lzT9TtmTJaT1hiI-NtFhuY6EHt2UQT66ZECZXTFG4+pDt4X0AF8LBuwgmAG+xlj6c4c0xxGGIZ63Ocxulz2mr9YnvB5Tzjk39wgWc-kK2-BT7aHtiFZsupCtCujCSkUDeA+sFLfu8lZkWkUDdPitYESuAbKjIDeOSpSkWLASJIxmKnWq2A2ggWUPKkGlqHGqqqwOqqAQctvrqpoLWoasavsqatqhalAKkLrrakQPas8NlM6tokwfWicoOKQF+rsiQbIGQRCD8sBDZFiGGpkFOtGlSjYEqhmsrnOmmq-pQdALOqmigvmsftAFISWrIWWlAURo+loNWsIUQY0FXsuunA6tlJTjInIlutzsPMXPgHujBhrv+uqMevNohihqDsblepumBqHK5owZQc+o6MBkAvnKeFjm-AAKrRAvrCYEZUhz6KGi4uQK7ZRR6zaD5eLdKz7d5uG16yKvYt7Y5wx5HJafY4bVHEZFgzYhLQB-rmhfaECPjFZFGWbL7XZV73auGipSJ1FyLQ6hwtZKA-Z8Yd4mYjbdFyB05pFk4xbT6srnBORtAwAc6jEmHpGRDpH870G76aAnFH5oJ+xsxm5sFFyCY1iyAbGrFRYFEjTDqFZWTDGlYmhV5AL0xjGZbLb3G+zXYN4tGbbkSn5iKTatodHnDz7P6XTL6IlYjr7P5TINaN6tGzKC4E774YlQnHTYnYiwlrHwk1TMgPjg7AA3g5DdhJzADbguDdhdFBLlEuCAqAHAZMgshMngwMmsj3j9zwAGihFWFIo2H4BAxFiDbCmMlsjtAElwniYbiGDEB95TIJzB6VEUlxSqkSnsh4rUjWgoEUTSkQSynQBYGoppKIiNEajm46k9CgCZQDoAG7JV5un4HuEm717hZmocFWoEDTzqF6F+kDpcCORZhyDADlDaDaKJkqDJnhBrQ8DwBcH+nGEPE9y1KsEfbEk774576JGH5WZALZQzHPb1H17zGwy5n5kDp2Axy4COQ1qUH4QOoK7PGUQwTF65BsmyScnVnrK1kIiByESuTwAugkSCQ1SLkHgjnFJhzfbWi-ZdqGk66HSQBVLhDnIySkpD5Yjf6RBAA)
* [Technische documentatie](https://docs.mijnoverheidzakelijk.nl/workspace/documentation/Notificatiedienst)
* [NotifyNL op GitHub](https://github.com/Worth-NL/notifynl-api)
* Lees ook over de [profielservice](/onderwerpen/profielservice/), waar contactgegevens en voorkeuren worden vastgelegd
