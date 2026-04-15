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
