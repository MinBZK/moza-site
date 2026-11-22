#!/usr/bin/env bash
# Start het gebouwde image met een willekeurige UID en groep 0, zoals ZAD dat
# doet, en controleer dat nginx de site serveert. `apk upgrade` in de
# Containerfile haalt bij elke build de nieuwste Alpine-pakketten naast een
# vastgepinde nginx, dus een bibliotheekupdate kan nginx breken zonder dat de
# build faalt.
#
# Gebruik: container/test-nginx.sh <image>   (lokaal: CONTAINER_ENGINE=podman)
set -euo pipefail

image="${1:?gebruik: $0 <image>}"
engine="${CONTAINER_ENGINE:-docker}"
name="test-nginx-$$"
port="${TEST_PORT:-18080}"

trap '"$engine" rm -f "$name" >/dev/null 2>&1 || true' EXIT

"$engine" run -d --name "$name" --user 54321:0 -p "127.0.0.1:${port}:8080" "$image" >/dev/null

status() { curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${port}$1" || true; }

for _ in $(seq 1 30); do
  [ "$(status /)" = 200 ] && break
  sleep 1
done

fail=0
check() {
  local path="$1" want="$2" got
  got="$(status "$path")"
  if [ "$got" = "$want" ]; then
    echo "ok   $path -> $got"
  else
    echo "FOUT $path -> $got, verwacht $want"
    fail=1
  fi
}

check / 200
check /over-moza/ 200
check /bestaat-niet/ 404

if ! curl -s -H 'Accept-Encoding: gzip' -o /dev/null -D - "http://127.0.0.1:${port}/" | grep -qi '^content-encoding: gzip'; then
  echo "FOUT / wordt niet met gzip geserveerd"
  fail=1
fi

if ! curl -s -o /dev/null -D - "http://127.0.0.1:${port}/" | grep -qi '^content-security-policy:'; then
  echo "FOUT / heeft geen Content-Security-Policy"
  fail=1
fi

if ! curl -s -H 'Accept: text/markdown' -o /dev/null -D - "http://127.0.0.1:${port}/contact/" | grep -qi '^content-type: text/markdown'; then
  echo "FOUT /contact/ geeft geen markdown bij Accept: text/markdown"
  fail=1
fi

"$engine" exec "$name" nginx -t || fail=1

# io_setup faalt onder emulatie (geen native AIO); dat is geen nginx-fout. Met
# een willekeurige UID opent nginx bij de start eerst het ingebouwde logbestand,
# voordat `error_log /dev/stderr` uit nginx.conf geldt; daarna logt hij gewoon.
if "$engine" logs "$name" 2>&1 | grep -E '\[(emerg|alert|crit)\]' | grep -v -e 'io_setup()' -e 'could not open error log file'; then
  echo "FOUT nginx logde fouten"
  fail=1
fi

if [ "$fail" -ne 0 ]; then
  echo "--- containerlog ---"
  "$engine" logs "$name" 2>&1 | tail -20
fi

exit "$fail"
