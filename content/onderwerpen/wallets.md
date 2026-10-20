---
title: "Wallets: inloggen en machtigen"
card_title: "Wallets"
description: "Wat wallets betekenen voor inloggen en machtigen door ondernemers, en wat MijnOverheid Zakelijk daarmee beproeft."
status: "Verkenning"
weight: 9
---

## Wallets in Europa

Europa werkt aan wallets. Met de [eIDAS-verordening](https://eur-lex.europa.eu/eli/reg/2024/1183/oj) moet elk EU-land zijn inwoners eind 2026 een persoonlijke wallet aanbieden. Voor ondernemingen heeft de Europese Commissie een eigen wallet voorgesteld: de [European Business Wallet](https://digital-strategy.ec.europa.eu/nl/policies/business-wallets). De regels daarvoor staan nog niet vast.

Nu log je als ondernemer bij de overheid in met DigiD of eHerkenning. De komende jaren schuift dat op naar wallets. Daarom verkennen we wat wallets betekenen voor ondernemers en voor MijnOverheid Zakelijk (MOZa). Ons doel: werkende oplossingen waarmee ondernemers makkelijk inloggen en anderen machtigen.

## Wat is een wallet?

Een wallet is een app of dienst waarin je betrouwbare gegevens over jezelf of je onderneming bewaart. Die gegevens heten attestaties. Een organisatie die de gegevens beheert, geeft ze uit. Jij bepaalt zelf welke gegevens je deelt en met wie.

Er zijn twee soorten wallets:

* **De persoonlijke wallet (EDI-wallet).** Voor personen, zoals de eigenaar van een onderneming of een medewerker. Hierin staan bijvoorbeeld je persoonsgegevens, je rijbewijs of je diploma. EDI staat voor Europese digitale identiteit. In Nederland ontwikkelt de overheid de [NL Wallet](https://github.com/MinBZK/nl-wallet).
* **De business wallet (EBW).** Voor ondernemingen en publieke organisaties. Hierin staan gegevens van de onderneming zelf, zoals de inschrijving in het Handelsregister of een vergunning. EBW staat voor European Business Wallet. Een onderneming kan een business wallet afnemen bij een aanbieder.

### Zo hangt het samen

De twee soorten wallets kunnen samenwerken. Zo kan de eigenaar van een onderneming met de persoonlijke wallet de business wallet van de onderneming beheren.

Een voorbeeld: een onderneming met een eigenaar en een medewerker. De eigenaar machtigt de medewerker om een vergunning aan te vragen.

{{< diagram-wallets >}}

De plaat geeft een eenvoudig beeld. Meer details staan in ons [overzicht van het EBW-landschap](https://roadmap-moza.rijksapp.dev/ebw-landschap.html). Dat is nog een werkversie. Daar zie je welke gegevens er in elke wallet staan, hoe het stap voor stap werkt en welke keuzes een dienstverlener heeft. Ook zie je waarover nog een besluit moet vallen, zoals of een eigenaar bij sommige diensten toch een aparte machtiging nodig heeft.

Zo werkt het, van boven naar beneden:

1. **Persoonsgegevens.** De Rijksdienst voor Identiteitsgegevens zet je persoonsgegevens in je persoonlijke wallet. Dat geldt voor de eigenaar en voor de medewerker.
2. **Bevoegdheid en gegevens onderneming.** KVK zet in de wallet van de eigenaar de bevoegdheid om namens de onderneming te handelen. In de business wallet zet KVK de gegevens van de onderneming.
3. **Beheren.** De business wallet is van de onderneming, niet van een persoon. De eigenaar logt erop in met de persoonlijke wallet en beheert hem. De gemeente zet er bijvoorbeeld een vergunning in.
4. **Machtigen.** Vanuit de business wallet machtigt de eigenaar een medewerker, per dienst. De medewerker krijgt die machtiging in de eigen persoonlijke wallet.
5. **Gebruiken.** Met die machtiging vraagt de medewerker bijvoorbeeld een vergunning aan bij de gemeente.

## Wat we beproeven

We leren door te bouwen. Een eerste beproeving voor [inloggen met een wallet](https://proef.moza.rijksapp.dev/inloggen/zakelijk/) staat klaar. Je logt bij MOZa in met een testversie van de NL Wallet op je telefoon. MOZa vraagt twee gegevens: je naam en je bevoegdheid voor de onderneming. Een gebruikersnaam en wachtwoord heb je niet nodig.

Een business wallet heb je daarvoor niet nodig: een onderneming kan ook zonder. De bevoegdheid komt in de beproeving van een fictieve KVK.

Wil je het zelf proberen? Druk op de inlogpagina op **Shift+P**. Je krijgt dan stap voor stap uitleg: de app installeren op een Android-telefoon, testgegevens in je wallet zetten en inloggen met de QR-code. De beproeving draait op een testomgeving met fictieve gegevens. De officiële NL Wallet werkt hier (nog) niet.

## Wat we nog willen weten

* Hoe kunnen eHerkenning en de business wallet straks samenwerken?
* Kun je met DigiD eenmalig een attestatie in je wallet zetten, en daarmee inloggen bij de business wallet?
* Welke rol kan MOZa spelen bij het uitgeven van zakelijke attestaties?
* Hoe log je in namens een eenmanszaak? Voor zover bekend bestaat daarvoor nog geen Europese attestatie. Nu regelt eHerkenning dat.

## Samenwerking

We werken onder andere samen met:

* het ministerie van Binnenlandse Zaken en Koninkrijksrelaties
* het ministerie van Economische Zaken
* KVK
* DICTU
* Logius
* het NL Wallet-team

We bouwen voort op wat anderen al verkend hebben. Zo volgen we het [WE BUILD-consortium](https://www.webuildconsortium.eu/) en leren we van de resultaten. Daarin beproeven onder andere KVK en de Belastingdienst de business wallet in Europa. Ook hebben we goede contacten met de gemeenten Nijmegen en Rotterdam, die al langer met wallets aan de slag zijn.

## Meedoen

Heb je feedback op deze pagina of op de beproeving? Of wil je meedenken over wallets voor ondernemers? Dat kan altijd: [neem contact met ons op!](/contact/)

## Meer info

* [Ons overzicht van het EBW-landschap](https://roadmap-moza.rijksapp.dev/ebw-landschap.html) (werkversie)
* [Code van de inlogbeproeving](https://github.com/MinBZK/moza-poc/tree/main/server/nl-wallet)
* [Code van de testomgeving van de NL Wallet voor MOZa](https://github.com/MinBZK/moza-wallet-testomgeving)
* [Code van de NL Wallet](https://github.com/MinBZK/nl-wallet)
* [Business wallets bij de Europese Commissie](https://digital-strategy.ec.europa.eu/nl/policies/business-wallets)
* [WE BUILD-consortium](https://www.webuildconsortium.eu/) (Engels)
* [Onderzoek naar ID-wallets bij de gemeente Nijmegen](https://www.nijmegen.nl/onderzoek-id-wallets/)
* [ID-wallets bij gemeenten](https://id-wallets.nl/): voorbeelden en onderzoek uit het sociaal domein
* [Peter en de Wallet](https://peterendewallet.nl/): voorbeelden van het gebruik van persoonlijke en business wallets in Europa
