---
title: "Besluiten uit de werksessies"
description: "De besluiten over de notificatiedienst die we samen met dienstverleners nemen in de maandelijkse werksessies."
status: "In ontwikkeling"
weight: 1
---

We ontwikkelen de notificatiedienst samen met dienstverleners. Elke maand houden we daarvoor een werksessie. Daarin nemen we samen besluiten over hoe de dienst werkt. Op deze pagina staan de besluiten die we tot nu toe hebben genomen.

Elk besluit heeft een eigen nummer. Vult een latere werksessie een besluit aan, dan staat die aanvulling bij het oorspronkelijke besluit.

Wil je meedenken in de werksessies? [Praat met ons mee!](/contact/)

## Besluiten

| Nr | Onderwerp | Besluit | Besloten op |
| --- | --- | --- | --- |
| B20260902_01 | Invalideren bij geen ontvangst | Direct invalideren bij geen ontvangst, zodat je de juiste acties kunt initiëren. Dit bij de bron doen. | 2 september 2026 |
| B20260902_02 | Status informatie notificatie opslag | Geen expliciete opslag van aanvullende persoonsinformatie. Vastgelegd worden: het notificatie-ID en de status, zolang relevant. Vanuit de Belastingdienst kan de informatie weg als het proces is afgerond. *Aangevuld op 28 oktober 2026: voor een eerste versie kan het 'fire & forget' worden voor de notificatiedienst, maar alleen als zeker is dat de notificatie goed is aangekomen.* | 2 september 2026, aangevuld 28 oktober 2026 |
| B20260902_03 | Verwerking | Is er 7 dagen na verzending van de e-mail geen negatieve DSN ontvangen, dan is er een juridische basis om aan te nemen dat de verzending is gelukt. | 2 september 2026 |
| B20260902_04 | Bounce | Bij een bounce altijd contactherstel initiëren. Alleen bij een 4000-foutcode opnieuw proberen, niet bij een 5000-foutcode.[^awb-2-11] | 2 september 2026 |
| B20260902_05 | Bulkverwerking | We moeten een piek van 2,2 miljoen berichten per piekmaand aankunnen. | 2 september 2026 |
| B20260902_06 | Referentie-ID | Er wordt altijd een referentie-ID meegegeven door de aanroeper. De aanname is dat de referentie-ID per notificatie uniek is. *Aangevuld op 28 oktober 2026: eventueel kan dit via templates worden afgedwongen met een verplicht veld.* | 2 september 2026, aangevuld 28 oktober 2026 |
| B20260902_07 | Time-out | Een time-out wordt anders behandeld dan een reguliere verzending: we nemen aan dat het bericht niet is verstuurd, en behandelen het ook zo. | 2 september 2026 |
| B20260930_01 | Templates: historie en template-register | Er moet historie/versiebeheer zijn op de templates, zodat reconstructie mogelijk is. Dit moet een nog vast te stellen periode beschikbaar zijn (naar verwachting 7 jaar). *Aangevuld op 28 oktober 2026: templates worden vastgelegd in een template-register; de aanroepende partij geeft een template-ID mee. Zo is altijd te reconstrueren hoe een template er op welk moment uitzag, en dus wat er is verstuurd.* | 30 september 2026, aangevuld 28 oktober 2026 |
| B20261028_01 | Beschikbaarheid (RTO) | Voor nu gaan we uit van een RTO van 24 uur: notificaties worden binnen 24 uur verwerkt. Dit eventueel uitwerken ten opzichte van de totale wettelijke termijn van 48 uur ([artikel 2:10, lid 1, Awb](https://wetten.overheid.nl/BWBR0005537/2026-08-15#Hoofdstuk2_Afdeling2.3_Paragraaf2.3.2_Artikel2:10)). | 28 oktober 2026 |
| B20261028_03 | Bewijslast/bewaartermijnen | De afnemer (bijvoorbeeld de Belastingdienst of de gemeente Amsterdam) legt de opdracht vast op basis van de terugmeldingen. Voor een eerste versie slaan organisaties dit zelf op. Voor nu worden alleen templates bewaard, voor een nog vast te stellen periode. | 28 oktober 2026 |

## Afkortingen

* **Awb:** Algemene wet bestuursrecht.
* **DSN:** Delivery Status Notification. Een automatisch bericht van een mailserver over de aflevering van een e-mail. Een negatieve DSN meldt dat de e-mail niet is afgeleverd.
* **RTO:** Recovery Time Objective. De tijd waarbinnen de dienst na een storing weer moet werken.

[^awb-2-11]: De wet schrijft iets anders voor. Volgens [artikel 2:11 Awb](https://wetten.overheid.nl/BWBR0005537/2026-08-15#Hoofdstuk2_Afdeling2.3_Paragraaf2.3.2_Artikel2:11) wordt een kennisgeving (melding) die niet is bezorgd, opnieuw verzonden. Dit besluit wijkt daarvan af: bij een 5000-foutcode doen we geen nieuwe poging.
