/**
 * Een URL langer dan deze grens breekt documenten: Word en Windows kappen een
 * hyperlink af op 2083 tekens, waarna Word de .odt als beschadigd meldt en
 * repareert. Gemeten: 2000 tekens opent goed, 2200 niet.
 */
const MAX_URL = 2083;

// Geminificeerde HTML zet attributen met en zonder aanhalingstekens.
const HREF = /\bhref=("([^"]*)"|'([^']*)'|([^\s>]+))/gi;

/**
 * Domeinen waar een lange URL bij hoort. Voeg er alleen iets aan toe als de
 * lengte daar een functie heeft; de download vervangt zo'n link door een
 * verwijzing naar de webpagina (partial markdown-body).
 */
const TOEGESTAAN = [
  // De tekening van een sequence diagram zit in de URL zelf, zodat de editor
  // hem kan openen en bewerken.
  "sequencediagram.org",
];

function host(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function toegestaan(url) {
  const naam = host(url);
  return TOEGESTAAN.some((domein) => naam === domein || naam.endsWith(`.${domein}`));
}

function checkUrlLengte(html) {
  const findings = [];

  for (const match of html.matchAll(HREF)) {
    const url = match[2] ?? match[3] ?? match[4] ?? "";
    if (url.length <= MAX_URL) continue;
    if (toegestaan(url)) continue;
    findings.push(`link van ${url.length} tekens: ${url.slice(0, 60)}...`);
  }

  return findings;
}

export { checkUrlLengte, MAX_URL, TOEGESTAAN };
