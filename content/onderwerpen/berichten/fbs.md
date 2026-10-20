---
title: "Federatief Berichtenstelsel"
description: "Proefopstelling en pilot: berichten van de overheid ophalen bij de organisatie die ze stuurt, en lezen waar het voor jou logisch is."
status: "In ontwikkeling"
weight: 1
aliases:
  - /onderwerpen/berichten-fbs/
---

## Waar werken we aan?

Als ondernemer wil je je post van de overheid digitaal ontvangen. En je wilt hem lezen op de plek die voor jou logisch is. Op een portaal als MijnOverheid (Zakelijk), in je bedrijfssoftware of in een app zie je berichten van verschillende organisaties bij elkaar. In de MijnOmgeving van een organisatie lees je de berichten van die organisatie.

Dat moet kunnen zonder dat er overal kopieën van je berichten komen te staan. Een federatief stelsel voor berichten is daarvoor een oplossing. Zo'n stelsel sluit aan op het [Federatief Datastelsel (FDS)](https://federatief.datastelsel.nl/): de afspraken waarmee overheden gegevens veilig en verantwoord met elkaar delen.

We zoeken uit hoe zo'n stelsel in de praktijk werkt, met een proefopstelling en een pilot. Elke organisatie bewaart daarin haar berichten in een eigen berichtenmagazijn, en een portaal of app haalt ze daar op. Dat onderzoek doen we samen met Logius, dat in opdracht van het ministerie van Binnenlandse Zaken en Koninkrijksrelaties (BZK) het [Federatief Berichtenstelsel (FBS)](https://www.logius.nl/onze-dienstverlening/interactie/federatief-berichten-stelsel) ontwikkelt.

## Waarom federatief?

De overheid kan alle berichten van alle organisaties op één centrale plek bewaren. Maar dan staan veel persoonsgegevens bij elkaar. En valt die plek uit, dan kan niemand nog berichten lezen.

Organiseren we het federatief, dan blijft een bericht bij de organisatie die ervoor verantwoordelijk is. Het staat in haar eigen magazijn. Dat magazijn beheert ze zelf, of ze laat het hosten, bijvoorbeeld als dienst van een leverancier. Het stelsel zorgt ervoor dat je het bericht kunt vinden en lezen.

Dat levert veel op:

* **De bron blijft bij de eigenaar.** De organisatie die het bericht stuurt, blijft er verantwoordelijk voor. De organisatie bewaart het bericht op één plek. Er komt geen blijvende tweede kopie.
* **Minder kwetsbaar.** Valt één berichtenmagazijn uit, dan werkt de rest gewoon door. De berichten zelf staan niet op één centrale plek.
* **Lezen waar het logisch is.** Omdat berichten niet aan één portaal vastzitten, kun je ze lezen op de plek die jij kiest.
* **Ondernemers kiezen zelf.** Ze bepalen of ze berichten van de overheid digitaal ontvangen.
* **Organisaties houden de regie.** Een organisatie zet haar berichten klaar in haar eigen berichtenmagazijn. Ze bepaalt zelf wanneer ze die publiceert, en dus ook wanneer de ontvanger een seintje krijgt.
* **Herbruikbaar voor de hele overheid.** Het stelsel is een bouwsteen binnen de [Generieke Digitale Infrastructuur (GDI)](https://www.digitaleoverheid.nl/mido/generieke-digitale-infrastructuur-gdi/), gebouwd op open standaarden.

In het stelsel heeft iedereen een duidelijke rol:

* **Verzenders:** overheidsorganisaties die berichten versturen naar ondernemers en burgers.
* **Het stelsel:** de laag die verzenders en ontvangers met elkaar verbindt, zonder berichten blijvend centraal op te slaan.
* **Ontvangers:** ondernemers en burgers die hun berichten lezen.

## Wat hebben we gedaan? Een proefopstelling

We bouwden een [proefopstelling](https://minbzk.github.io/moza-poc-fbs-berichtenbox/) die laat zien hoe een federatief berichtenstelsel kan werken.

Er zijn twee routes om berichten op te halen. In route 1 doet het Berichten Uitvraag Systeem dat bij alle magazijnen. In route 2 haalt een portaal of app de berichten zelf op. De proefopstelling werkt met route 1, en bestaat uit deze onderdelen.

**In het berichtenmagazijn van de organisatie:**

1. **Aanleveren:** de organisatie zet een bericht in haar berichtenmagazijn.
2. **Controleren:** het magazijn controleert het bericht op technische eisen en op toestemming van de ontvanger.
3. **Publiceren:** op de publicatiedatum maakt het magazijn het bericht beschikbaar. Bij route 1 meldt het magazijn het bericht ook aan bij het Berichten Uitvraag Systeem.

**In het Berichten Uitvraag Systeem (route 1):**

4. **Ophalen:** na het inloggen haalt het uitvraagsysteem de gepubliceerde berichten op bij alle magazijnen. Het uitvraagsysteem ziet een bericht dus pas nadat het is gepubliceerd.

**Daaromheen:**

5. **Berichtenlijst:** een eenvoudig scherm dat laat zien hoe het stelsel er voor de gebruiker uitziet.
6. **Demo-omgeving:** hier bootsen we lastige situaties na, zoals honderd magazijnen tegelijk, een magazijn dat uitvalt of berichten die traag binnenkomen.

### Hoe hangen de onderdelen samen?

{{< diagram-berichtenstelsel >}}

* **Berichten Uitvraag Systeem:** dit onderdeel staat centraal in route 1. Het bevraagt alle magazijnen en zet de berichten in één lijst. De inhoud van een bericht blijft in het magazijn. Wel bewaart het uitvraagsysteem tijdelijk een paar gegevens per bericht: afzender, onderwerp, datum en voor wie het bericht is. Zo laadt de lijst snel en kun je erin zoeken.
* **Federated Service Connectivity ([FSC](https://fsc-standaard.nl/hoe-werkt-fsc/)):** vaste afspraken tussen het uitvraagsysteem en de magazijnen. Daarin staat wie welke dienst mag aanroepen.
* **Inloggen en machtigen:** wie ben je, en namens wie? Je logt in met DigiD of eHerkenning, en later ook met een digitale wallet voor bedrijven.
* **Toegang:** wie een bericht mag zien, willen we regelen met [Federatieve Toegangsverlening (FTV)](https://vng-realisatie.github.io/ftv/). In de proefopstelling controleert het magazijn dat nog zelf, op een eenvoudige manier.
* **Logboek:** elk onderdeel dat persoonsgegevens verwerkt, legt dat vast in het [Logboek Dataverwerkingen (LDV)](https://www.logius.nl/onze-dienstverlening/gegevensuitwisseling/logboek-dataverwerkingen). Zo kan de overheid laten zien waar en door wie je gegevens zijn verwerkt.
* **Ondersteunende diensten:** de [profielservice](/onderwerpen/profielservice/) voor je keuze voor digitaal en je contactgegevens. De [notificatiedienst](/onderwerpen/notificatiedienst/) voor het seintje dat er een bericht klaarstaat. Komt dat seintje niet aan, dan zoekt de dienst een andere manier om je te bereiken.

De proefopstelling is gekoppeld aan het prototype van ons [portaal](/onderwerpen/portaal/). De berichtenlijst daarin toont dus geen vaste voorbeelden meer, maar berichten die echt uit het stelsel komen. Alles is open source. Je vindt de code op GitHub: [MinBZK/moza-poc-fbs-berichtenbox](https://github.com/MinBZK/moza-poc-fbs-berichtenbox/).

In een gebruikersonderzoek hebben we een prototype van de berichtenlijst getest met zes ondernemers, van zzp'ers tot klein-mkb. Ze liepen scenario's door, zoals inloggen, een bericht openen en wisselen tussen de MijnOmgeving van de Belastingdienst en MijnOverheid Zakelijk.

## Wat gaan we doen? Een pilot met overheidsorganisaties

In de pilot testen we het stelsel in de praktijk, met overheidsorganisaties die berichten versturen. Dat doen we samen met Logius, in de werkgroep Berichten van het programma Overheidsbrede Interactieservices (OBIS).

We kijken naar twee routes:

1. **Route 1: via het Berichten Uitvraag Systeem.** Hiermee beginnen we. Je logt in op een portaal, bijvoorbeeld MijnOverheid Zakelijk. Het portaal vraagt je berichten op bij het uitvraagsysteem. Dat haalt ze via FSC op bij alle magazijnen en zet ze in één lijst.

   Met de deelnemende organisaties testen we of de afspraken in het stelsel werken, en wat er nodig is om aan te sluiten.
2. **Route 2: rechtstreeks bij de magazijnen.** Hier haalt een portaal of app de berichten zelf op bij elk magazijn. Er zit geen uitvraagsysteem tussen. Welke magazijnen meedoen, staat in een ondertekende lijst: het stelseldocument. De route is gebaseerd op [FSC voor Burgers](https://fsc4b.nl/), een open standaard voor een veilige verbinding tussen burgers en overheidsorganisaties. [Mijn Betaaloverzicht](https://mijn-betaaloverzicht.nl/) (eerder Vorderingenoverzicht Rijk) werkt er al mee: daarin zien burgers op één plek wat ze nog aan overheidsorganisaties moeten betalen.

   Wij zoeken uit of het ook werkt voor ondernemers. Hoe ziet een magazijn bijvoorbeeld namens welke onderneming je een bericht opvraagt? En is de route snel en betrouwbaar genoeg als je veel magazijnen tegelijk bevraagt? Deze route werken we parallel uit.

In de pilot werken vanaf het begin beleid, ontwerp, juridische zaken en techniek samen.

## Doe mee

Wil je als overheidsorganisatie meedoen aan de pilot? Of wil je meedenken over de doorontwikkeling van het stelsel? [Neem contact met ons op](/contact/).

Bij deze vragen kunnen we jouw input goed gebruiken:

* Hoe zorgen we ervoor dat alleen mensen die daartoe gemachtigd zijn een bericht te zien krijgen?
* Wat is het verschil in werking tussen een magazijn dat je zelf beheert en een magazijn dat je laat hosten?
* Berichten en notificaties horen vaak bij een zaak. Kunnen berichten, zaken en taken via hetzelfde mechanisme lopen?

## Meer info

* [Documentatie van de proefopstelling](https://minbzk.github.io/moza-poc-fbs-berichtenbox/)
* [Code op GitHub](https://github.com/MinBZK/moza-poc-fbs-berichtenbox/)
* [Federatief Berichtenstelsel bij Logius](https://www.logius.nl/onze-dienstverlening/interactie/federatief-berichten-stelsel)
* [Federatief Datastelsel (FDS)](https://federatief.datastelsel.nl/)
* [Federated Service Connectivity (FSC)](https://fsc-standaard.nl/hoe-werkt-fsc/)
* [FSC voor Burgers](https://fsc4b.nl/)
* [Mijn Betaaloverzicht](https://mijn-betaaloverzicht.nl/)
* [Federatieve Toegangsverlening (FTV)](https://vng-realisatie.github.io/ftv/)
* [Logboek Dataverwerkingen (LDV)](https://www.logius.nl/onze-dienstverlening/gegevensuitwisseling/logboek-dataverwerkingen)
* [Profielservice](/onderwerpen/profielservice/)
* [Notificatiedienst](/onderwerpen/notificatiedienst/)
