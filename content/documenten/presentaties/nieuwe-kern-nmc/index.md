---
title: "De nieuwe kern van het NMC"
description: "Geen notificatie verloren en altijd een eindstatus: video en dia's over de nieuwe kern van het Notificatie Management Component."
date: 2026-11-04
---

Het Notificatie Management Component (NMC) is een onderdeel van de [notificatiedienst](/onderwerpen/notificatiedienst/). Van buiten verandert er weinig: het NMC verstuurt nog steeds notificaties. Van binnen is het hele mechanisme herzien. Zo gaat er geen notificatie meer verloren en ziet de dienstverlener altijd een eindstatus.

## Video

In deze video van 12 minuten lopen we door de dia's. Ondertitels zet je aan met de knop in de videospeler. Lees je liever? Verderop staat de hele tekst.

{{< video bestand="nieuwe-kern-nmc.mp4" ondertitels="nieuwe-kern-nmc.nl.vtt" titel="De nieuwe kern van het NMC" breedte="1920" hoogte="1076" >}}

## Dia's bij de video

[Download de dia's die bij de video horen](de-nieuwe-kern-van-de-nmc.pdf) (PDF, 8 dia's, 605 kB).

## Uitgeschreven tekst

De tekst van de video, met de kop van de dia die op dat moment in beeld is. Spreektaal hebben we licht aangepast.

### Inleiding

Hallo, ik heb even nagedacht over hoe ik het het beste kon laten zien, want aan de buitenkant van deze rework lijkt niks veranderd te zijn aan de NMC. Je stuurt je notificaties, dat doet die nog steeds. Alleen intern is het hele mechanisme herzien. Dus de vraag is: waarom was dat nu nodig?

### Van buiten hetzelfde, van binnen een ander mechanisme

Dat komt neer op drie dingen eigenlijk. De eerste: er gaat nu niks meer verloren. Een notificatie is aangenomen zodra hij is opgeslagen in onze database, en elke notificatie zonder eindstatus heeft altijd een open taak. De tweede: we zijn niet meer afhankelijk van de callback van NotifyNL. Die komt uiterlijk vijf keer terug en dan is die weg. Wat we nu doen is: we slaan nu de receipts eerst op, vragen zelf na indien dat nodig is, en stellen de bezorging pas na zeven dagen vast. De derde: de dienstverlener krijgt een afleverbewijs en een eventlog die hij kan uitlezen, zo vaak hij maar wil.

### Van aanname tot definitief bezorgd

De eerste stap is voor de dienstverlener niet echt veranderd. Hij stuurt een bericht naar ons en krijgt direct een 200 terug. In de oude variant betekende dit dat wij al naar NotifyNL een bericht hadden gestuurd. In de nieuwe versie hebben wij hem alleen intern opgeslagen. Na opslag intern gaat een verzendtaak het e-mailadres ophalen bij de profielservice, in het geval van een centrale koppeling, en daarna verstuurt hij hem naar NotifyNL. Asynchroon meldt NotifyNL delivered terug aan ons. De receipt wordt dan opgeslagen, wat ik net al zei, en dan verwerkt. De status wordt dan ook op bezorgd gezet. Dan is het voor ons bezorgd. Zeven dagen later, als er geen faalreceipts meer kwamen van NotifyNL, stellen we de bezorging vast met een heel andere taak, en dan staat hij dus op definitief bezorgd. Elke overgang is een event in het log, en dat log leest de dienstverlener mee met een cursor. Dat is het tweede grote zichtbare verschil.

### Vier dingen die vroeger stil bleven liggen

Al het andere zie je pas als er echt iets misgaat. En dat is eigenlijk de grootste reden waarom we het deden. Die situaties zijn hier even uitgeschetst, waar het oude model niet echt een antwoord op had. Als NotifyNL of de profielservice onbereikbaar is, dan wordt de taak uitgesteld en later opnieuw geprobeerd. Ontvangen wij de receipt niet van NotifyNL, dan vraagt de NMC nu periodiek zelf na. Als dat zonder uitkomst blijft, dan eindigt de bezorgstatus op onbekend, wat dus nog wel zou kunnen gebeuren. Valt een pod uit tijdens het verzenden, dan kan hij nu opgepakt worden door een andere pod. Voorheen, omdat die de directe koppeling had met NotifyNL, verloor je hem dan een beetje. Maar omdat dat nu altijd wordt vastgelegd in deze taaktabellen, wordt dat nu goed bijgehouden. Een ander ding dat zou kunnen gebeuren in het vorige is dat je twee receipts krijgt die botsen van NotifyNL. Nu zit er dus een taakverwerker tussen die kijkt: welke van deze receipts is nu precies nieuwer, welke kan ik vertrouwen. En die gaat hij dan opslaan, in de juiste volgorde, en je kunt ook de geschiedenis terugzien van wat er nu allemaal ontvangen is.

### Hoe een status verandert

Dan heb je hier nu hoe een status verandert. Elke statuswijziging, van welke kant die ook komt, loopt door dezelfde zes stappen. Iets wil een statuswijziging doorvoeren, of dat nu een receipt is, een verzendtaak, een navraag of het vangnet dat we intern hebben ingebouwd. Als eerste wordt de rij in de database vergrendeld, zodat niemand anders hem meer aanpast terwijl deze pod ermee bezig is. Dan wordt hij getoetst: staat deze overgang in een tabel van toegestane overgangen. Je mag niet zeggen: ik wil van de eerste status gelijk naar definitief. Dat staan we gewoon niet toe, dus dat houden we dan tegen. Dan komt de commit, daar zit ook een extra slot op. De database controleert ook nog: probeer je nu een oudere versie weg te schrijven dan al is opgeslagen? Dus als je iets wegschrijft en zegt: dit is versie 1, en je komt daarna terug met versie 0.5, dan zegt de database: je doet iets fout, dat klopt niet. Dus daar hebben we nu ook een muurtje voor gebouwd, zodat dat goed veilig wordt gesteld. En alles staat er nu ook in de database. Dat was hiervoor ook al zo, maar dat was een afweging die we gemaakt hebben, om dus geen broker of workflow engine of ander systeem hierbij te betrekken. Dat maakt het voor ons makkelijker om ervoor te zorgen dat receipts niet botsen met elkaar, omdat je dus echt maar op één plek die verandering uiteindelijk hebt. En die kunnen we goed vergrendelen terwijl dat gebeurt, zodat je hierdoor nooit conflicterende berichten over een notificatie hebt.

### De takentabel en de pods

Dan de cyclus waar een notificatie doorheen moet. Wat ik zei: vroeger gebeurde alles in de aanroep of in de callback, en als dat wegviel, dan viel de notificatie een beetje weg. En nu staat alles dus in een takentabel. Die wordt dan geclaimd door pods. Dit hebben we dus ook gedaan zodat meerdere pods makkelijk de data tegelijk kunnen verwerken. Laten we zeggen: er zijn 40 nieuwe aanmeldingen. We hebben twee pods draaien, beide pods claimen 20 van die aanmeldingen en gaan daarmee aan de slag. En dan kijken ze natuurlijk ook naar elkaar: ik kan niet degene oppakken waar een andere pod al mee bezig is. De aanroep naar NotifyNL valt buiten elke databasetransactie en blijft binnen een configureerbaar verzendbudget dat we ook hebben ingezet. En dat verzendbudget is weer verdeeld over dienstverleners. En dat is ook met reden, omdat NotifyNL in principe een gelimiteerd aantal berichten heeft. Die heeft ook een verzendbudget, om het zo te zeggen. We kunnen niet 10 miljoen berichten per seconde sturen. Ik weet even niet het precieze getal, maar er zit een getal op. Afronden, maar alleen als de claim nog van deze pod is. Dus wat ik zei: een pod claimt een set taken. Als hij die niet afkrijgt binnen zijn lease, wat in principe nooit moet gebeuren, maar als er een error komt zou dat kunnen gebeuren, wordt dat weer geweigerd. Dat zie je ook als een controletaak: je mag er niet te lang over doen, want dan is het misschien al verlopen en opgepakt door een andere pod. En dat komt dus ook weer terug op punt 1 van de intro, dat we niet willen dat er iets verloren gaat. Want die taak wordt echt op slot gezet door de pod, en dan gaat hij ermee aan de slag. En bovenop dit hele podverhaal komt ook de schaalbaarheid van het hele product mee. Ik heb het nu getest met 10.000 aanvragen binnen een minuut, daar had hij helemaal geen problemen mee. Dus dat gaat ook de goede kant op.

### Twee wegen uit hetzelfde eventlog

Dan de dienstverlener. In eerste instantie hadden we gezegd: we gaan twee mogelijkheden bieden. De dienstverlener kan per notificatie de status opvragen, of hij kan per notificatie een callback krijgen: hij is nu afgeleverd. Dus hij kwam vragen, of wij kwamen het vertellen. In het geval van miljoenen notificaties dachten wij: misschien ook niet het handigst. We hebben nu een derde manier geïntroduceerd en dat is een eventfeed. Daar kan een dienstverlener eigenlijk bij ons aankloppen: geef mij de laatste 100 updates over notificaties die van mij zijn. Dan krijgt hij gewoon een lijst terug: dit was het. En dan mag hij zeggen: ik heb tot hier deze lijst gelezen. De volgende keer wil ik dat je bij 100 verdergaat, en dan krijg je 101 tot en met 200. En dat is dus naar verwachting uiteindelijk ook handiger voor de dienstverlener. Dat is meer uit voorzorg, dat hebben we nu alvast geïmplementeerd. Je kan ook nog steeds de webhook registreren, en daar hebben we nu ook de functie in meegenomen dat hij dat gebundeld terug kan leveren. Zodat je dus niet per se over één notificatie steeds een update krijgt, maar dat je het ook over 100 notificaties tegelijk zou kunnen krijgen. Dat hebben we al configureerbaar gemaakt per dienstverlener, want wij accepteren ook dat niet elke dienstverlener klaar is om zoiets op te pakken. Een punt is wel: als wij een 200 krijgen op de webhook, hebben we nog wel gezegd dat dat nog geen bevestiging is dat de dienstverlener het ook heeft ontvangen. Dat moeten ze zelf afmelden bij de eventfeed. Dat betekent niet dat we ze gaan spammen met callbacks, dat doen we nog steeds maar één keer. Maar ze moeten het dus zelf afmelden, als ze dat willen.

### Persoonsgegevens: zo kort als het kan

Tot slot, wat niet in de drie punten van net zat maar wel meekwam: de persoonsgegevens. Met deze methodiek, omdat we die data langer vasthouden, hebben wij wel meer data en staat er meer in de database. Dat betekent bij ons dat we nu bij aanname de ontvanger en de inhoud gelijk versleuteld opslaan, met een eigen sleutel per notificatie. En alleen de verzendtaak, dus degene die moet weten wat nu precies iemands e-mailadres is of wat het BSN is, zodat ik iemands e-mailadres kan ophalen, die ontsleutelt nog. Zeven dagen na het ontvangen van de eindstatus wordt de sleutel gewist, en dan zijn de gegevens dus in principe niet meer uit te lezen. Het afleverbewijs blijft er dan wel. Na een jaar gaat de rij in zijn geheel weg. Dat gezegd hebbende: dit zijn configureerbare waardes die we nu hebben neergelegd. Dan nog een punt over het eventlog: die bevat natuurlijk nooit persoonsgegevens.

### Afsluiting

En om de cirkel weer rond te krijgen: vanaf buiten stuurt de NMC nog steeds de notificatie. Vanaf binnen gaat er nu minder verloren, en is er meer zekerheid voor ons vooral. We zijn niet meer afhankelijk van een NotifyNL of een profielservice die misschien down is. En de dienstverlener kan beter afleverbewijzen ontvangen.

## Wat alleen op de dia's staat

Deze punten staan wel op de dia's, maar worden in de video niet genoemd.

- **Hoe een status verandert:** alles staat in PostgreSQL, in vier tabellen: notificatie, verzending, event en taak. Het event is het afleverbewijs: je kunt er alleen iets aan toevoegen, nooit iets wijzigen. Is er geen event bij de nieuwe versie, dan weigert de database de hele wijziging.
- **De takentabel en de pods:** een pod claimt 20 taken, met een lease van 2 minuten. Het verzendbudget is 1400 per minuut. Een fout betekent opnieuw proberen met een oplopende wachttijd; na vijf keer wacht de taak op beheer. Elke 5 minuten zoekt een controletaak elke notificatie zonder eindstatus en zonder open taak, en plant de taak die bij haar status hoort. Kan niets haar verder brengen, dan krijgt ze alsnog een eindstatus.
- **Twee wegen uit hetzelfde eventlog:** een event bevat het volgnummer, van welke naar welke status, de reden en de tijd. Er staat geen e-mailadres, BSN of referentie van de dienstverlener in. De webhook is ondertekend en wacht en pauzeert vanzelf bij fouten. De dienstverlener herkent hetzelfde event in beide wegen aan dezelfde id en ziet aan het volgnummer of een update is ingehaald. Er zijn tien statussen, met een reden bij een eindstatus: onbereikbaar, geen contactgegevens, technisch, verlopen of geannuleerd.
- **Wat er verandert voor de dienstverlener:** de aanname antwoordt 202 in plaats van 200. De statuswaarden zijn van het NMC en niet meer die van NotifyNL. De callback-URL per notificatie vervalt: de webhook staat per dienstverlener in het register.
- **Persoonsgegevens:** in geen endpoint, log of event staat de klare tekst, en beheer kan die niet lezen. Elke notificatiesleutel is op zijn beurt versleuteld met een hoofdsleutel; roteren raakt alleen die laag. Het e-mailadres komt bij centrale regie uit de profielservice en wordt gebruikt, maar niet opgeslagen. Het eventlog wordt per partitie opgeruimd.
