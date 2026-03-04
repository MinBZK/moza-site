---
title: "Huidige opzet MijnOverheid Zakelijk"
description: "Bouwstenen voor uniforme dienstverlening"
image: "/images/tegel-applicatie.svg"
image_alt: "Pictogram van de MOZa-architectuur"
weight: 7
---

# MijnOverheid Zakelijk
**De bouwstenen voor uniforme digitale dienstverlening aan ondernemers**

---
MijnOverheid Zakelijk (MOZa) maakt het voor ondernemers mogelijk om **één uniforme overheid** te ervaren – zonder herhaalvragen, inlogdrempels of versnipperde informatie. Om dit te realiseren, ontwikkelen we **digitale bouwstenen** (interactieservices) die samenwerken in één omgeving.

**Deze pagina beschrijft de *huidige technische opzet* van MOZa** – de eerste werkende versie die:
- **De basis legt** voor de interactieservices (zoals profielbeheer, notificaties en relevante ontwikkelingen).
- **Aantoont** hoe deze services samenwerken in een **centrale testomgeving**.
- **Overheden helpt** om snel aan te sluiten op de nieuwe infrastructuur, zodat ondernemers straks **minder administratieve lasten** ervaren.

---

## Waarom deze eerste versie?
MijnOverheid Zakelijk (MOZa) is een **overheidsbreed programma** dat de dienstverlening voor ondernemers verbetert. We bouwen aan een digitale omgeving waar ondernemers **één uniforme overheid** ervaren – met de ambitie voor minder administratieve lasten, herhaalvragen en inlogdrempels.

### Probleem dat we oplossen
Ondernemers geven aan:
> *"Ik zie door de bomen het bos niet meer. Geef mij een overzicht van wat ik moet doen."*
> *"Steeds opnieuw dezelfde gegevens invullen is nutteloos. Dit kan veel eenvoudiger."*

**Huidige situatie:**
- Informatie en diensten zijn **versnipperd** over tientallen overheden.
- Ondernemers moeten **herhaaldelijk inloggen** en dezelfde gegevens delen.
- Geen **centraal overzicht** van taken, subsidies of relevante wetgeving.

**Oplossing:**
MOZa brengt dit samen in **één digitale omgeving** – vergelijkbaar met MijnOverheid, maar specifiek voor zakelijke gebruikers. De **eerste versie** legt hiervoor het **fundament**.

---
## Hoe de huidige opzet bijdraagt
De huidige versie van MOZa is de **eerste stap** naar deze uniforme dienstverlening. 

---
## Architectuur van de huidige versie
De huidige opzet bestaat uit **modulaire componenten** die samenwerken:
<!-- Hugo shortcode -->
{{< figure src="images/Overzicht-MOZa-oplossing.svg" alt="Schematisch overzicht van de MOZa-architectuur: interactieservices, integratielaag met koppelingen naar KVK/Belastingdienst, en testomgeving" >}}

<!-- Git/GitHub fallback -->
![Schematisch overzicht van de MOZa-architectuur: interactieservices, integratielaag met koppelingen naar KVK/Belastingdienst, en testomgeving](/images/Overzicht-MOZa-oplossing.svg)

### 1. Kernbouwstenen (interactieservices)
We ontwikkelen **digitale bouwstenen** die samen de "snelwegen" vormen voor zakelijke dienstverlening:
- **Profielservice**: Beheer contactgegevens en voorkeuren op één plek.
- **Notificatieservice**: Ontvang seintjes voor acties (bijv. nieuwe subsidies).
- **Relevante ontwikkelingen**: Overzicht van wetgeving, subsidies en lokale updates.

*Voorbeeld:*
> Een horecaondernemer krijgt een melding over een relevante subsidie. Hij logt in op MOZa, ziet de informatie over die subsidies en kan deze lezen, archiveren of bewaren voor later. 

### 2. Centrale testomgeving
De huidige opzet omvat een **testomgeving** waar we:
- **Samenhang** tussen services valideren.
- **Gebruikerservaring** testen (voor ondernemers én ambtenaren).
- **Bewijs leveren** dat de architectuur werkt.

### 3. Principes voor de toekomst
Al in deze versie borgen we de **kernprincipes** van MOZa:
- **Federatief**: Gegevens blijven bij de bron (bijv. KVK), maar zijn centraal beschikbaar.
- **Event-gedreven**: Ondernemers krijgen **automatische seintjes** bij relevante acties.
- **Transparant**: Ondernemers bepalen zelf **wie wat mag inzien**.


### Wat zit er in deze versie?
| Component               | Functie                                                                 |
|-------------------------|-------------------------------------------------------------------------|
| **Interactieservices**  | Basisfunctionaliteit voor ondernemers (inloggen, meldingen, statusupdates). |
| **Integratielaag**      | Koppelt services met externe bronnen (KVK, Belastingdienst, gemeenten). |
| **Testomgeving**        | Simuleert de productie-omgeving voor realistische tests.               |
| **Monitoring**           | Registreert gebruik en prestaties voor verbeteringen.                 |

---
## Waarom is deze versie belangrijk?
De huidige opzet is **essentieel** om:
1. **Zaken te concretiseren**:
   - Overheidsinstanties kunnen zien hoe de bouwstenen (bijv. Profielservice) werken - en daarmee zien hoe dit kan worden ingepast
   - Overheidsinstanties kunnen hun interactieservies intergreren op de centrale plek - zodat zijzelf - maar ook andere instanties hiervan kunnen leeren.

2. **Samenhang te testen**:
   - We valideren of services **naadloos samenwerken** (bijv. notificaties → profiel → aanvraag) en kijken hoe dit in de praktijk werkt
   - We gebruiken deze opzet voor gebruikerstesten en meten **gebruiksgemak** en passen aan waar nodig.

3. **Vertrouwen te creëren**:
   - De opzet toont aan dat de **technische architectuur** werkt.
   - Overheden zien hoe ze **eigen diensten kunnen integreren**.

---
## Vervolgstappen: Wat komt eraan?
Na deze versie werken we aan:
- **Uitbreiding van services**:
  - **Berichtenservice** (digitale brievenbus voor overheidspost).
  - **Takenbeheer** (overzicht van openstaande acties voor ondernemers).
- **Schaalbaarheid**:
  - Meer overheidsorganisaties aansluiten.
  - Integratie met **lokale systemen** (bijv. gemeentelijke vergunningen).
- **Gebruikersfeedback**:
  - Prototypes testen met ondernemers en ambtenaren.

***Suggesties**:*
> Heb je suggesties voor verdere doorontwikelling - laat het ons weten. Dit is een iteratief proces waarbij de ambitie altijd is zoveel **meerwaarde** te bieden voor zoveel mogelijk betrokkenen.

---
## Samenwerking 
MOZa is altijd op zoek naar verdere samenwerking met verschillende organisaties. Als je vragen hebt - kom dan gerust in de lucht bij ons via moza@minbzk.nl





