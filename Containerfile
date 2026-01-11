FROM alpine:3.21 AS builder

ARG HUGO_VERSION=0.153.5

RUN apk add --no-cache wget \
    && wget -O hugo.tar.gz https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-amd64.tar.gz \
    && tar -xzf hugo.tar.gz -C /usr/local/bin \
    && rm hugo.tar.gz

WORKDIR /app
COPY . .

ARG BASE_URL
RUN if [ -n "$BASE_URL" ]; then \
      hugo --minify --baseURL "$BASE_URL"; \
    else \
      hugo --minify; \
    fi

FROM nginx:stable-alpine
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    error_page 404 /404.html; \
    location /.well-known/security.txt { \
        return 302 https://www.ncsc.nl/.well-known/security.txt; \
    } \
    location / { \
        try_files $uri $uri/ =404; \
    } \
}' > /etc/nginx/conf.d/default.conf
COPY --from=builder /app/public /usr/share/nginx/html
