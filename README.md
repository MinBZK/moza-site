# MijnOverheid Zakelijk - Landingspagina

In deze repository beheren we de website en content van [mijnoverheidzakelijk.nl](https://mijnoverheidzakelijk.nl).
De site wordt gegenereerd met [Hugo](https://gohugo.io/).

## Lokaal ontwikkelen

### Vereisten

Installeer Hugo door de [officiële installatie-instructies](https://gohugo.io/installation/) te volgen.

### Development server starten

```bash
hugo server
```

De site is dan beschikbaar op [http://localhost:1313/](http://localhost:1313/).

## Content toevoegen

### Weekly

Voeg een nieuwe weekly toe met:

```bash
hugo new content weekly/2026/2026-01-01.md
```

### Presentatie

Presentaties gebruiken [Reveal.js](https://revealjs.com/) en wijken daarmee af van de overige pagina's.

Maak een nieuwe presentatie:

```bash
hugo new content presentaties/moza-pulse-x
```

#### Slide syntax

Elke slide is een `<section>` element:

```html
<section>
  <h2>Slide titel</h2>
  <p>Inhoud van de slide</p>
</section>
```

Geneste sections maken verticale slides (navigeer met pijltje omlaag). Zie [Reveal.js](https://revealjs.com/) voor meer informatie.

## Code kwaliteit

We gebruiken [Lefthook](https://github.com/evilmartians/lefthook) voor pre-commit checks. Dit controleert automatisch of de site correct bouwt en of er geen broken links zijn.

### Installatie

```bash
# macOS
brew install lefthook htmltest

# Activeer hooks in dit project
lefthook install
```

### Handmatig uitvoeren

```bash
lefthook run pre-commit
```

## Bouwen

### Lokaal bouwen

```bash
hugo --minify --gc
```

De gegenereerde site staat in de `public/` directory.

### Container bouwen

Bouw een container met Podman (of Docker):

```bash
# Standaard (zonder specifieke baseURL)
podman build -t moza-site .

# Met productie baseURL
podman build --build-arg BASE_URL=https://mijnoverheidzakelijk.nl -t moza-site .
```

Container draaien:

```bash
podman run -p 8080:8080 moza-site
```

De site is dan beschikbaar op [http://localhost:8080/](http://localhost:8080/).

## Projectstructuur

```
.
├── archetypes/          # Archetype templates voor nieuwe content
├── assets/              # CSS, JavaScript en image bestanden (worden o.a. geminimaliseerd door Hugo)
├── content/             # Markdown en HTML content
│   ├── onderwerpen/     # Onderwerpen pagina's
│   ├── presentaties/    # Reveal.js presentaties
│   └── weekly/          # Weekly updates
├── layouts/             # Templates voor pagina's en componenten
│   ├── _partials/       # Herbruikbare template onderdelen
│   └── _shortcodes/     # Shortcodes, ofwel componenten, voor in content
├── static/              # Statische bestanden (worden 1-op-1 gekopieerd)
└── hugo.yaml            # Hugo configuratie
```
