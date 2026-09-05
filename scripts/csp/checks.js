/**
 * Controles op constructies die de Content-Security-Policy blokkeert.
 *
 * De policy staat in de nginx-configuratie in container/. Zonder `unsafe-inline` negeert de
 * browser inline styles en scripts zonder foutmelding: de pagina laadt, maar
 * ziet er anders uit dan lokaal. Deze controle maakt dat verschil zichtbaar.
 */

const CSP_HEADER = /add_header\s+Content-Security-Policy\s+"([^"]+)"/;

const PATTERNS = {
  style: [
    [/<[a-z][^>]*?\sstyle\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "inline style-attribuut"],
    [/<style[\s>]/gi, "style-element"],
  ],
  script: [
    [/<script(?![^>]*\ssrc\s*=)[^>]*>/gi, "inline script"],
    [/<[a-z][^>]*?\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "event handler-attribuut"],
    [/(?:href|src)\s*=\s*["']?javascript:/gi, "javascript:-URL"],
  ],
};

/** Leest de CSP-directives uit een nginx-configuratie. */
function parseCsp(conf) {
  const header = conf.match(CSP_HEADER)?.[1];
  if (!header) return null;

  const directives = {};
  for (const part of header.split(";")) {
    const [name, ...values] = part.trim().split(/\s+/);
    if (name) directives[name] = values;
  }
  return directives;
}

/** Geeft de directives waarvoor inline content geblokkeerd wordt. */
function blockedSources(directives) {
  const fallback = directives["default-src"] ?? [];
  return Object.keys(PATTERNS).filter((kind) => {
    const values = directives[`${kind}-src`] ?? fallback;
    return values.length > 0 && !values.includes("'unsafe-inline'");
  });
}

/** Zoekt geblokkeerde constructies in één HTML-document. */
function findViolations(html, kinds) {
  const findings = [];

  for (const kind of kinds) {
    for (const [pattern, label] of PATTERNS[kind]) {
      for (const [match] of html.matchAll(pattern)) {
        findings.push({ label, fragment: match.slice(0, 80) });
      }
    }
  }

  return findings;
}

export { parseCsp, blockedSources, findViolations };
