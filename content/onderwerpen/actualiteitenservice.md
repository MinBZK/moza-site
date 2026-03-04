---
title: "Actualiteitenservice"
description: "Een dienst om de voor de ondernemer relevante algemene informatie beschikbaar te stellen, en te informeren over nieuwe relevante updates" 
image: "/images/tegel-actualiteiten.svg"
image_alt: "Icoon van een nieuwsbericht"
weight: 6
aliases:
  - /onderwerpen/actualiteitenservice/
---

# Actualiteitenservice
**Één plek voor al je relevante overheidsinformatie**

---

## Wat is de Actualiteitenservice?
De actualiteitenservice stelt de ondernemer in staat om de voor hen relevante informatie te zien, vanuit verschillende overheidsbronnen. 

Vooorbeelden informatie en toepassing
> *"Nieuwe wetten, subsidies of eventueel lokale ontwikkelingen. De actualiteitenservice is in staat om deze informatie te filteren op basis van verschillende kenmerken en daarmee zo relevant mogelijk te zijn"*

De kenmerken waarop de filtering kan plaatvinden worden waar mogelijk voor ingevuld - maar de ondernemer is altijd in staat hier zelf keuzes in te maken. Tevens biedt de actualiteitenservice de mogelijkheid om pro-actief een signaal te ontvangen over nieuwe ontwikkelingen

---

## Waarom is dit nodig?

### Huidige situatie  ← FEITEN (wat is er nu?)
Ondernemers ontvangen overheidsinformatie via **10+ verschillende kanalen** zonder centrale regie:

- **Bronnen**: RVO, KVK, gemeentes, ministeries (allen apart)
- **Formaten**: Nieuwsbrieven, websites, PDF's, sociale media
- **Gebruikerservaring**:
  - Handmatig zoeken op meerdere sites
  - Apart inloggen per bron
  - Geen filter op relevantie
- **Resultaat**: 40% mist belangrijke updates (bijv. subsidie-deadlines)

*Voorbeeld*:
> "Als horecaondernemer check ik wekelijks 5 verschillende websites voor wetwijzigingen. Vorige maand mistte ik een cruciale aanpassing in de terrasregels."

### Probleemanalyse
De huidige situatie leidt tot **vier kernproblemen**:

1. **Inefficiëntie**:
   - Ondernemers besteden **3 uur/maand** aan zoekwerk
   - Overheden publiceren dezelfde content meerdere keren

2. **Informatieverlies**:
   - **40% mist kritieke updates** (bron: Ondernemerspanel 2025)
   - Geen proactieve meldingen bij nieuwe regelgeving

3. **Gebrek aan personalisatie**:
   - Ondernemers krijgen **irrelevante informatie** (bijv. landbouwsubsidies voor een IT-bedrijf)
   - Geen filtering op bedrijfstak/locatie

4. **Fragmentatie**:
   - Geen eenduidig beeld van overheidscommunicatie
   - Verschillende kanalen → verschillende kwaliteit/nauwkeurigheid

### Oplossing met de Actualiteitenservice

De actualiteitenservice lost deze problemen op door:

#### Voor ondernemers:
- **Één centrale plek** voor alle relevante overheidsinformatie
- **Automatisch gefilterd** op basis van bedrijfsprofiel en voorkeuren
- **Proactieve meldingen** bij nieuwe relevante informatie
- **Minder administratieve last** (geen herhaalde inlog of zoekwerk)

#### Voor overheidsorganisaties:
- **Groter bereik** van belangrijke berichten
- **Efficiënter communiceren** (één publicatie bereikt de juiste doelgroep)
- **Betere zichtbaarheid** van regelgeving en subsidies

#### Voor de digitale overheid:
- **Herbruikbare bouwsteen** binnen de [Generieke Digitale Infrastructuur (GDI)](https://www.digitaleoverheid.nl/mido/generieke-digitale-infrastructuur-gdi/)
- **Standaardisatie** van informatieverspreiding
- **Koppeling met andere services** (bijv. Profielservice voor contactvoorkeuren)


---

## Hoe werkt het?

### Voor ondernemers

*Plaatje: Stappen ondernemer*
*Beschrijving: Stroomdiagram van het proces voor ondernemers: inloggen, profiel instellen, filtering nagaan, informatie ontvangen.*

---

#### Filterkenmerken

De service filtert informatie op basis van **bedrijfsspecifieke kenmerken**:

| Categorie          | Voorbeelden                                                                 | Toelichting                                  |
|---------------------|-----------------------------------------------------------------------------|----------------------------------------------|
| **Branche**         | Horeca, Bouw, Zorg, Retail, Landbouw, IT, Transport                        | Bepaalt welke sector-specifieke informatie getoond wordt |
| **Locatie**         | Gemeente, Provincie, Landelijk, EU-wijd                                    | Filtert op regionale regelgeving en subsidies |
| **Bedrijfsgrootte** | ZZP, MKB (1-50), Middelgroot (50-250), Groot (250+)                      | Bepaalt welke regelgeving van toepassing is  |
| **Onderwerpen**     | Subsidies, Wetgeving, Ruimtelijke ordening, Milieu, Financieel, Veiligheid | Stel in welke onderwerpen je wilt volgen     |
| **Urgentie**        | Laag, Medium, Hoog, Kritiek                                                 | Filter op belangrijkheid van berichten      |

*Voorbeeldinstellingen voor een horecaondernemer in Amsterdam:*
> 

#### Proactieve signalen

*Plaatje: Proactieve signalen*
*Beschrijving: Stroomdiagram van het signaalproces: wanneer en hoe ondernemers meldingen ontvangen.*

---

### Voor overheidsorganisaties

De Actualiteitenservice biedt overheidsorganisaties een **gestandaardiseerde manier** om informatie te publiceren en te verspreiden onder ondernemers.

#### Publicatieproces

1. **Aansluiten op de service**:
   - Via **standaard API-koppelingen** (FSC/FTV)
   - Eenmalige configuratie per organisatie

2. **Informatie publiceren**:
   - Publiceer berichten met **gestructureerde metadata** (zie tabel hieronder)
   - Ondersteuning voor verschillende contenttypes:
     - Wet- en regelgeving
     - Subsidie-aankondigingen
     - Lokale ontwikkelingen
     - Urgente mededelingen

3. **Automatische distributie**:
   - Berichten worden **automatisch gefilterd** en getoond aan relevante ondernemers
   - **Rapportage** van bereik en gelezen status (optioneel)

*Plaatje: Publicatieproces overheidsorganisatie*
*Beschrijving: Stroomdiagram van het publicatieproces: aansluiten, bericht publiceren, automatische distributie.*

---
#### Metadata-standaard

Elk bericht moet voorzien zijn van **gestructureerde metadata** voor optimale filtering:

| Metadata-veld       | Voorbeeldwaarden                          | Verplicht | Toelichting                          |
|----------------------|-------------------------------------------|-----------|--------------------------------------|
| **Doelgroep**        | Horeca, Bouw, Zorg, MKB, Grote bedrijven | Ja        | Bepaalt welke ondernemers het bericht zien |
| **Regio**            | Landelijk, Noord-Holland, Amsterdam       | Ja        | Voor lokale/regionale berichten     |
| **Onderwerp**        | Subsidie, Wetgeving, Ruimtelijke ordening | Ja        | Categorie van het bericht           |
| **Urgentie**         | Laag, Medium, Hoog, Kritiek              | Ja        | Bepaalt prioriteit in weergave      |
| **Geldigheid**       | Tijdelijk (datum), Permanent              | Nee       | Voor tijdgebonden berichten         |
| **Contactgegevens**  | E-mail, telefoonnummer, website           | Nee       | Voor follow-up vragen               |

---
#### Voordelen voor overheidsorganisaties

✅ **Efficiënter communiceren**:
   - Één publicatie bereikt alle relevante ondernemers
   - Geen aparte nieuwsbrieven of mailings nodig

✅ **Groter bereik**:
   - Berichten zijn zichtbaar in het persoonlijke dashboard van ondernemers
   - Proactieve meldingen verhogen de kans dat berichten gelezen worden

✅ **Inzicht in bereik**:
   - Optionele rapportages over hoeveel ondernemers het bericht hebben gezien
   - Feedbackmogelijkheid voor ondernemers

✅ **Koppeling met bestaande systemen**:
   - Integreert met bestaande contentmanagement-systemen
   - Ondersteunt standaard formaten (bijv. XML, JSON)

---

## Technische werking

Voor de meer technische werking kijk vooral naar: [Technische documentatie] (LINK nog toevoegen


---




