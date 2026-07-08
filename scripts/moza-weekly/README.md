# MOZa Weekly — Mattermost-input

Drie-staps Python-pipeline die input verzamelt voor de wekelijkse MOZa Weekly-publicatie.

1. **`fetch.py`** haalt berichten en threads op uit Mattermost-kanalen (default: `check-in`, `agenda`, `sprint-faq`) en schrijft een gestructureerd YAML-bestand.
2. **`anonymize.py`** schrijft een geanonimiseerde JSON-variant van die YAML — bedoeld als veilige LLM-input voor de MOZa Weekly skill.
3. **`render.py`** rendert het YAML-bestand naar een single-file HTML-rapport in de nldd-stijl (voor menselijke lezers).

| Output | Bestemming | Bevat namen / mentions? |
|---|---|---|
| `.yaml` | Editor (mens) | ✅ ja |
| `.html` | Lezer (mens) | ✅ ja |
| `.anonymized.json` | LLM / MOZa Weekly skill | ❌ pseudoniemen + mentions/namen geschrubd |

## Vereisten

- [uv](https://docs.astral.sh/uv/) — bewaakt automatisch de venv per script.
- Een Mattermost personal access token met leesrechten op de gewenste kanalen.

Het script gebruikt PEP 723 inline dependency-metadata: `uv run` zorgt voor alles wat nodig is.

## Setup token

Genereer een **personal access token** in Mattermost:
**Account Settings → Security → Personal Access Tokens → Create New Token.**

Twee patterns om de token in te zetten — kies één:

### A. 1Password CLI

Sla de token op in 1Password (bv. item "MOZa Mattermost", veld `token`).

Kopieer `.env.example` naar `.env` en zet erin:
```
MATTERMOST_TOKEN=op://Private/MOZa Mattermost/token
```

Roep dan aan via `op run`:
```bash
op run --env-file=.env -- just moza-weekly
```

### B. Directe waarde in `.env`

Kopieer `.env.example` naar `.env` en zet erin:
```
MATTERMOST_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

`.env` staat in `.gitignore` — niet committen. Roep dan direct aan:
```bash
just moza-weekly
```

> **Tip:** `chmod 600 .env` voorkomt dat andere users op de machine het bestand lezen.

## Gebruik

### Eén commando: fetch + anonymize + render

```bash
just moza-weekly
```

Output landt in `tmp/moza-weekly/<vandaag>.yaml`, `.anonymized.json` én `.html`. Verkort schema:

| Default | Wat |
|---|---|
| Periode | Vandaag − 7 dagen t/m vandaag |
| Kanalen | uit `MOZA_WEEKLY_CHANNELS` env (of CLI `--channel`) |
| Output | `tmp/moza-weekly/<einde-datum>.{yaml,html}` |

### Periode overschrijven

```bash
# Alleen --from; --to blijft default (vandaag)
just moza-weekly --from 2026-05-13

# Beide
just moza-weekly --from 2026-05-13 --to 2026-05-20
```

### Specifieke kanalen

```bash
just moza-weekly --channel check-in
just moza-weekly --channel check-in --channel agenda --channel werkdomein
```

### Bestaand outputbestand overschrijven

```bash
just moza-weekly --force
```

### Alleen HTML opnieuw renderen

Handig wanneer je in de YAML handmatig posts hebt geschrapt of geredigeerd:

```bash
just moza-weekly-render tmp/moza-weekly/2026-05-27.yaml
```

### Alleen geanonimiseerde JSON regenereren

Idem, wanneer je YAML hebt bijgewerkt en de JSON moet bijwerken:

```bash
just moza-weekly-anonymize tmp/moza-weekly/2026-05-27.yaml
```

### Bots uitsluiten

```bash
just moza-weekly --no-bots
```

### Verbose / quiet

```bash
just moza-weekly --verbose   # toont elke HTTP-call en retry
just moza-weekly --quiet     # alleen errors
```

## Workflow voor een MOZa Weekly

1. **Verzamel**: `just moza-weekly` — drie bestanden ontstaan in `tmp/moza-weekly/`.
2. **Open YAML** in editor: `tmp/moza-weekly/<datum>.yaml`. Schrap posts die niet relevant zijn, herorden indien gewenst.
3. **Bekijk HTML**: `tmp/moza-weekly/<datum>.html` open in browser. Klik door tabs, controleer context-banners.
4. **Regenereer na YAML-edits**:
   ```bash
   just moza-weekly-render tmp/moza-weekly/<datum>.yaml
   just moza-weekly-anonymize tmp/moza-weekly/<datum>.yaml
   ```
5. **MOZa Weekly skill aanroepen** met `tmp/moza-weekly/<datum>.anonymized.json` als input. Geen namen of mentions in die file.
6. **Editor leest mee**: gebruik desgewenst het HTML-rapport of de volledige YAML om de gegenereerde concept-MOZa-Weekly te corrigeren.
7. **Schrijf MOZa Weekly markdown**: definitief opslaan in `content/weekly/<jaar>/<datum>.md`.

## Anonimisering

De `anonymized.json` wijkt op deze punten af van de YAML:

- **Authors** → vervangen door pseudoniemen `person_1`, `person_2`, ... (en `bot_1` voor bots). De mapping is stabiel binnen één run (dezelfde persoon krijgt dezelfde ID in zowel root als replies), maar verandert tussen runs.
- **`@mentions`** in message-bodies → `[@collega]`.
- **Bekende collega-namen** (full name + voornaam ≥ 4 letters, geleerd uit de auteur-set) → `[collega]`. Voornamen < 4 letters worden niet vervangen om vals-positieven te vermijden.
- **Bot-flag** blijft bewaard (`is_bot: true/false`).
- **Permalinks, timestamps, scope-flags, attachments** blijven onveranderd — die identificeren posts, niet personen.

**Bewuste beperking**: namen in message-bodies die *niet* in de auteur-set voorkomen worden NIET geschrubd. Wie buiten de huidige threads om genoemd wordt blijft dus in de JSON staan. Voor een strakker filter zou NER nodig zijn — voor v0.1 een bewuste tradeoff.

## Hoe threading werkt

Berichten in Mattermost kunnen in threads zitten. Het script hanteert deze regels (zie ook design-spec):

| Situatie | Wat we ophalen | Hoe het in YAML staat |
|---|---|---|
| Root **én** replies binnen periode | Alles | `in_scope: true` voor allemaal |
| Root binnen, sommige replies buiten | Alles | Late reply `in_scope: false`, root gewoon |
| Root **buiten** periode, reply binnen | Root + replies | Root `context_only: true` + `in_scope: false`; reply `in_scope: true` |

In het HTML-rapport wordt een buiten-periode root visueel gedimd met een banner "Buiten periode — context", zodat duidelijk is dat die niet hoort in de MOZa Weekly maar er staat voor context.

## Exit-codes

| Code | Betekenis |
|---|---|
| 0 | Volledig succes |
| 2 | Configuratie-fout (token mist, ongeldige args) |
| 3 | Auth-fout (401/403) |
| 4 | Team niet gevonden |
| 5 | Eén+ kanaal faalde, andere wel succesvol |
| 6 | Netwerk- of server-fout na retries |
| 7 | Output-bestand bestaat al, `--force` ontbreekt |
| 8 | YAML-input parse- of schema-fout (alleen `render.py`) |

## Troubleshooting

**`MATTERMOST_TOKEN ontbreekt`** — `.env` staat niet in cwd of token-regel mist. Run `cat .env` om te checken; let op trailing whitespace en quotes.

**`401 Unauthorized`** — token verlopen of ingetrokken. Vernieuw via Mattermost-UI.

**`403 Forbidden op …`** — je account heeft geen leesrechten op dat kanaal. Vraag toegang, of haal kanaal uit `MOZA_WEEKLY_CHANNELS`.

**`Team 'mijnoverheid-zakelijk' niet gevonden`** — andere team-slug? Check de URL in Mattermost (`/<team>/channels/...`).

**`Kanaal '...' niet gevonden`** — kanaal hernoemd of niet bestaand. Andere kanalen worden alsnog opgehaald — exit-code is 5.

**Verbose-mode toont URLs maar geen content** — `--verbose` log alleen paden, geen request-bodies of headers (vanwege token).

**HTML toont posts niet, alleen lege tab** — geen posts in periode voor dat kanaal? Check YAML; daar staat `note: "Geen posts binnen periode."` als het kanaal echt leeg was.

## Bestandslayout

```
scripts/moza-weekly/
├── fetch.py              # CLI-script, stap 1 (Mattermost → YAML)
├── anonymize.py          # CLI-script, stap 2 (YAML → anonymized JSON)
├── render.py             # CLI-script, stap 3 (YAML → HTML)
├── _mattermost.py        # API-client (intern)
├── _model.py             # dataclasses (intern)
├── templates/
│   ├── report.html.j2    # hoofdtemplate
│   └── _rijkslogo.svg    # inline-include
└── README.md             # dit bestand

tmp/moza-weekly/          # gitignored output
└── <datum>.{yaml,anonymized.json,html}
```

## Verder

Het design-document staat in `status-rapportage/docs/superpowers/specs/2026-05-27-moza-weekly-mattermost-input-design.md`.

Tests komen in een vervolg-iteratie nadat schema en HTML-layout op echte data zijn gevalideerd.
