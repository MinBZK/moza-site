FROM alpine:3.21 AS builder

ARG HUGO_VERSION=0.154.4

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

FROM nginxinc/nginx-unprivileged:stable-alpine

COPY --from=builder /app/public /usr/share/nginx/html

RUN echo 'server { \
    listen 8080; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    error_page 404 /404.html; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header Referrer-Policy "strict-origin-when-cross-origin" always; \
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always; \
    add_header Content-Security-Policy "default-src '\''self'\''; script-src '\''self'\'' '\''unsafe-inline'\''; style-src '\''self'\'' '\''unsafe-inline'\''; img-src '\''self'\'' data:; font-src '\''self'\'';" always; \
    add_header Strict-Transport-Security "max-age=31536000" always; \
    location /.well-known/security.txt { \
        return 302 https://www.ncsc.nl/.well-known/security.txt; \
    } \
    location / { \
        try_files $uri $uri/ =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080
