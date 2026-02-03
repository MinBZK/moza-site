# Image naam en tag op basis van git branch
image := "moza-site:" + `git branch --show-current`

[private]
default:
    @just --list

# Start development server
up:
    ./setup-dev.sh
    docker run -it --rm -v $PWD/structurizr:/usr/local/structurizr structurizr/cli export --workspace workspace.dsl --format static --output ./diagrammen
    mkdir -p static/diagrammen/ && cp -r structurizr/diagrammen/* ./static/diagrammen/
    hugo server

# Bouw de site
build:
    ./setup-dev.sh
    docker run -it --rm -v $PWD/structurizr:/usr/local/structurizr structurizr/cli export --workspace workspace.dsl --format static --output ./diagrammen
    mkdir -p static/diagrammen/ && cp -r structurizr/diagrammen/* ./static/diagrammen/
    rm -rf public && hugo --minify --gc --logLevel warn

# Controleer op broken links
check:
    ./setup-dev.sh
    docker run -it --rm -v $PWD/structurizr:/usr/local/structurizr structurizr/cli export --workspace workspace.dsl --format static --output ./diagrammen
    mkdir -p static/diagrammen/ && cp -r structurizr/diagrammen/* ./static/diagrammen/
    rm -rf .htmltest && hugo --minify --quiet --destination .htmltest/public && htmltest && rm -rf .htmltest

# Voer pre-commit checks uit
pre-commit:
    lefthook run pre-commit

# Bouw container image
cbuild:
    podman build -t {{image}} .

# Start container op localhost:8080
crun:
    podman run --name moza-site -p 8080:8080 {{image}}

# Stop container
cstop:
    podman stop moza-site
    podman rm moza-site

# Verwijder container image en build cache
cclean:
    podman rm -f moza-site || true
    podman rmi {{image}} || true
    podman system prune -f
