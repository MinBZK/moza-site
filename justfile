# Image naam en tag op basis van git branch
image := "moza-site:" + `git branch --show-current`

[private]
default:
    @just --list

# Installeer dependencies (eenmalig)
setup:
    npm install

# Voer tests uit
test:
    npm test

# Render Mermaid-diagrammen als SVG
render-mermaid:
    npm run render-mermaid

# Start development server
up:
    npm run render-mermaid
    hugo server

# Watch mermaid-bestanden en herrender bij wijzigingen (apart terminal)
watch-mermaid:
    npm run render-mermaid -- --watch

# Bouw de site
build:
    npm run render-mermaid
    rm -rf public && hugo --minify --gc --logLevel warn
    npm run render-downloads

# Genereer alleen de downloadbestanden (.odt en .pdf), vereist een bestaande build
render-downloads:
    npm run render-downloads

# Controleer of het toegankelijkheidslabel bij de bron is gewijzigd
check-label:
    npm run check-label

# Controleer op broken links
check:
    npm run render-mermaid
    rm -rf .htmltest && hugo --minify --quiet --baseURL / --destination .htmltest/public && htmltest && rm -rf .htmltest

# Voer pre-commit checks uit
pre-commit:
    lefthook run pre-commit

# Verwijder gegenereerde bestanden
clean:
    rm -rf public static/images/render .cache

# Haal Mattermost-input op voor MOZa Weekly, schrijf geanonimiseerde JSON voor
# LLM-input, en render HTML-rapport. Vereist MATTERMOST_TOKEN in env;
# zie scripts/moza-weekly/README.md.
moza-weekly *FLAGS:
    #!/usr/bin/env bash
    set -euo pipefail
    uv run scripts/moza-weekly/fetch.py {{FLAGS}}
    YAML=tmp/moza-weekly/$(date +%Y-%m-%d).yaml
    uv run scripts/moza-weekly/anonymize.py "$YAML"
    uv run scripts/moza-weekly/render.py "$YAML"

# Alleen HTML opnieuw renderen (na handmatige YAML-bewerking)
moza-weekly-render YAML:
    uv run scripts/moza-weekly/render.py {{YAML}}

# Alleen geanonimiseerde JSON regenereren (na handmatige YAML-bewerking)
moza-weekly-anonymize YAML:
    uv run scripts/moza-weekly/anonymize.py {{YAML}}

# Draai de unit-tests van de moza-weekly-scripts
moza-weekly-test:
    uv run --with pytest --with pyyaml --with jinja2 --with markdown-it-py \
        --with httpx --with tenacity --with beautifulsoup4 \
        pytest scripts/moza-weekly/tests/ -q

# Bouw container image
cbuild:
    podman build -t {{image}} -f container/Containerfile .

# Start container op localhost:8080
crun:
    podman run --rm --replace --name moza-site -p 8080:8080 {{image}}

# Stop container
cstop:
    podman stop moza-site
    podman rm moza-site

# Verwijder container image en build cache
cclean:
    podman rm -f moza-site || true
    podman rmi {{image}} || true
    podman system prune -f
