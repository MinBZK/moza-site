---
title: "Profiel service"
description: "Interactieservice waarmee je op één plek je gegevens en voorkeuren kunt beheren."
image: "/images/tegel-profiel.svg"
image_alt: "Icoon van een profiel"
weight: 2
---
Op één plek je contactgegevens en communicatievoorkeuren beheren
================================================================

De Profiel Service is een van de services die binnen het programma MOZa wordt ontwikkeld. Dankzij deze service kunnen ondernemers straks, net als burgers, op één plek hun contactgegevens en communicatievoorkeuren met de overheid (digitaal of per post) beheren. Ze hoeven deze dus niet meer op verschillende plekken in te voeren of bij te houden.

Visie profielservice
====================

De profielservice slaat contactvoorkeuren en eventueel contactgegevens op die (nog) geen centrale (wettelijke) plek hebben. Vanuit de context voor de ondernemer legt de profielservice dit vast in de combinatie persoon-bedrijf, en beide kunnen 1 tot n zijn. Simpelweg betekent dit dat één persoon gekoppeld kan zijn aan meerdere bedrijven - maar ook meerdere personen aan één bedrijf. Hieronder wordt dit conceptueel uitgelicht:  

![Profielservice Concept](https://mijnoverheidzakelijk.nl/images/Profielservice-concept.svg)

Aan de 'pijlen' wordt de contactvoorkeur gekoppeld - en per 'pijl' is daarmee een (eigen) contactvoorkeur. Echter de profielservice zal altijd wanneer mogelijk refereren naar de (wettelijke) bronnen die daarvoor zijn ingericht. De profielservice is daarmee:

*   Dé centrale plek waarin een voorkeur kenbaar gemaakt wordt
*   Dé startplek waar contactgegevens te vinden zijn, ofwel;
    *   Als eigen bron; contactgegeven wordt opgeslagen, wanneer deze nog geen andere centrale plek heeft (bijv. mailadres)
    *   Als register; wanneer het contactgegeven al reeds op een andere plek te vinden is (bijv. adres). In dit geval geeft de profielservice aan wáár deze gegevens te vinden zijn
        *   In dit geval is het aan de bevragende partij zelf om de informatie bij de bron op te halen.

Voorbeelden
===========

Het meer voor de hand liggende voorbeeld hiervan is het mailadres. Vooralsnog is er geen centrale plek waar dit wettelijk wordt vastgelegd - en is daarmee een goed voorbeeld wat de profielservice centraal zal gaan opslaan. Adresgegevens worden al reeds vastgelegd bij de KvK, de profielservice zal daarmee geen (alternatieve) adresgegevens opslaan - en zal altijd verwijzen in welke bron dit zal staan. 

Overheden kunnen gegevens opvragen
==================================

Overheidsorganisaties kunnen deze profielgegevens (als de ondernemer daar toestemming voor heeft gegeven) via gestandaardiseerde API's opvragen en gebruiken. Deze gegevens worden dan niet meer versnipperd opgeslagen in losse portalen en applicaties, maar komen samen in een centraal, goed beheerd register.

*   Geeft ondernemers controle over hun profielgegevens en hoe zij met de overheid willen communiceren. Ze ervaren minder administratieve handelingen en lasten en betere communicatie met de overheid.
*   Voorziet overheidsorganisaties van actuele en verifieerbare gegevens, rechtstreeks uit een centrale bron.
*   Versterkt de digitale overheid met een herbruikbare bouwsteen die past binnen de Generieke Digitale Infrastructuur (GDI).

Gefaseerde ontwikkelstrategie
=============================

De Profiel Service wordt stapsgewijs ontwikkeld, met een nadruk op eenvoud, hergebruik en federatieve samenwerking. We beginnen met een basisprofiel (e-mailadres, telefoonnummer, postadres en één algemene contactvoorkeur). Later kunnen er meer contactvoorkeuren aangegeven worden. Er worden steeds meer bronregisters gekoppeld zoals KvK, BRP en BAG. Tot slot kunnen overheidsorganisaties aansluiten via standaarden en API's. Bij de ontwikkeling volgen we de Nederlandse Richtlijn Digitale Systemen (NeRDS) en gebruiken we open standaarden (NORA, NL GOV API Design Rules en GDI-richtlijnen). Toegang wordt geregeld via DigiD, eHerkenning en eIDAS. We hanteren privacy by design principes (minimale dataverwerking, transparantie en logging conform LDV).

Oproep tot samenwerking
=======================

De ontwikkeling van MOZa en daarbinnen de Profiel Service vraagt intensieve samenwerking tussen beleidsmakers, ontwerpers, ontwikkelaars en uitvoeringsorganisaties. Alleen door gezamenlijk standaarden te ontwikkelen, adoptie te stimuleren en kennis te delen ontstaat een breed gedragen voorziening die écht waarde toevoegt. Wij nodigen daarom alle overheidsorganisaties uit om mee te denken, mee te bouwen en mee te leren. Samen maken we van MOZa niet alleen een technische voorziening, maar een belangrijke bijdrage aan het fundament voor betrouwbare, toegankelijke en toekomstbestendige digitale dienstverlening.

Wil je meer weten over hoe de profiel service tot stand komt? Kijk dan op onze GitHub: \[GitHub profiel service\]([https://github.com/MinBZK/moza-profiel-service](https://github.com/MinBZK/moza-profiel-service))
