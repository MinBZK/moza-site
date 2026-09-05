/**
 * Toegankelijkheidscontroles die pa11y en axe niet dekken.
 *
 * Reguliere expressies volstaan omdat onze eigen templates deze markup
 * genereren. Koppen in codevoorbeelden staan ge-escaped en tellen niet mee.
 */

const HEADING = /<h([1-6])\b[^>]*>/gi;
const MERMAID_IMG = /<img\b[^>]*\bclass="[^"]*\bmermaid-img\b[^"]*"[^>]*>/gi;
const ALT = /\balt="([^"]*)"/i;

/**
 * Koppenstructuur (WCAG 1.3.1). Axe rekent `heading-order` tot best-practice
 * en zet die regel uit bij WCAG2AA; HTML_CodeSniffer dekt het niet.
 */
function checkHeadingOrder(html) {
  const findings = [];
  const levels = [...html.matchAll(HEADING)].map((match) => Number(match[1]));

  if (levels.length === 0) return findings;
  if (levels[0] !== 1) {
    findings.push(`eerste kop op de pagina is een h${levels[0]}, verwacht een h1`);
  }

  const h1Count = levels.filter((level) => level === 1).length;
  if (h1Count > 1) {
    findings.push(`${h1Count} h1-koppen op één pagina, verwacht er precies één`);
  }

  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      findings.push(`kopniveau springt van h${levels[i - 1]} naar h${levels[i]}`);
    }
  }

  return findings;
}

/**
 * Tekstalternatief van Mermaid-diagrammen (WCAG 1.1.1). De render hook vult
 * `alt` met `accDescr`; ontbreekt die, dan geeft `alt=""` een geldig maar
 * onterecht "decoratief" diagram waar geen scanner iets van zegt.
 */
function checkDiagramAlt(html) {
  const findings = [];

  for (const [tag] of html.matchAll(MERMAID_IMG)) {
    const alt = tag.match(ALT)?.[1] ?? null;
    if (alt === null) {
      findings.push("diagram zonder alt-attribuut");
    } else if (alt.trim() === "") {
      findings.push("diagram met lege alt-tekst; voeg accDescr toe aan het Mermaid-blok");
    }
  }

  return findings;
}

export { checkHeadingOrder, checkDiagramAlt };
