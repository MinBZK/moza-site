/**
 * Toegankelijkheidscontroles die pa11y en axe niet dekken.
 *
 * Reguliere expressies volstaan omdat onze eigen templates deze markup
 * genereren. Koppen in codevoorbeelden staan ge-escaped en tellen niet mee.
 */

const HEADING = /<h([1-6])\b[^>]*>/gi;
const MERMAID_IMG = /<img\b[^>]*\bclass="[^"]*\bmermaid-img\b[^"]*"[^>]*>/gi;
const ARTICLE = /<article\b[^>]*>([\s\S]*?)<\/article>/gi;
const IMG = /<img\b[^>]*>/gi;
const MERMAID_CLASS = /\bclass="[^"]*\bmermaid-img\b[^"]*"/i;
const DECORATIEF = /\brole=["']?presentation\b|\baria-hidden=["']?true\b/i;
const ZIJKOLOM = /<aside\b[^>]*\bclass="[^"]*\bpage-aside\b[^"]*"[\s\S]*?<\/aside>/gi;
const MERMAID_DIAGRAM = /<div\b[^>]*\bclass="[^"]*\bmermaid-diagram\b[^"]*"[\s\S]*?<\/div>/gi;
const BESCHRIJVING = /<p\b[^>]*\bclass="[^"]*\bmermaid-beschrijving\b[^"]*"[^>]*>([\s\S]*?)<\/p>/i;
const VOETNOTEN_ROL = /<div\b[^>]*\brole=["']?doc-endnotes/gi;

/**
 * De minifier haalt aanhalingstekens weg bij een waarde zonder spaties, en
 * maakt van een lege waarde (alt="") een kaal attribuut (alt).
 */
function attribuut(tag, naam) {
  const m = tag.match(new RegExp(`\\s${naam}(?:=(?:"([^"]*)"|([^\\s"'>]+)))?(?=[\\s/>])`, "i"));
  return m ? (m[1] ?? m[2] ?? "") : null;
}

/**
 * Koppenstructuur (WCAG 1.3.1). Axe rekent `heading-order` tot best-practice
 * en zet die regel uit bij WCAG2AA; HTML_CodeSniffer dekt het niet.
 *
 * De rechterkolom staat tussen de h1 en de tekst; zijn koppen ("Op deze
 * pagina", "Download deze pagina") zouden een sprong van h1 naar h3 in de
 * tekst maskeren.
 */
function checkHeadingOrder(html) {
  const findings = [];
  const levels = [...html.replace(ZIJKOLOM, "").matchAll(HEADING)].map((match) => Number(match[1]));

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
 * `alt` met `accTitle`, of met `accDescr` als de titel ontbreekt; ontbreken
 * beide, dan geeft `alt=""` een geldig maar onterecht "decoratief" diagram
 * waar geen scanner iets van zegt.
 */
function checkDiagramAlt(html) {
  const findings = [];

  for (const [tag] of html.matchAll(MERMAID_IMG)) {
    const alt = attribuut(tag, "alt");
    if (alt === null) {
      findings.push("diagram zonder alt-attribuut");
    } else if (alt.trim() === "") {
      findings.push("diagram met lege alt-tekst; voeg accTitle en accDescr toe aan het Mermaid-blok");
    }
  }

  return findings;
}

/**
 * Tekstalternatief van afbeeldingen in de content (WCAG 1.1.1). `alt=""` is
 * geldige HTML voor een decoratieve afbeelding, dus scanners melden niets bij
 * een inhoudelijke afbeelding zonder alt-tekst. Alleen het artikel wordt
 * gecontroleerd; de rest van de pagina komt uit onze eigen templates.
 *
 * Is een afbeelding wél decoratief, markeer dat dan met `role="presentation"`
 * of `aria-hidden="true"`.
 */
function checkContentImageAlt(html) {
  const findings = [];

  for (const [, inhoud] of html.matchAll(ARTICLE)) {
    for (const [tag] of inhoud.matchAll(IMG)) {
      if (MERMAID_CLASS.test(tag)) continue;

      const alt = attribuut(tag, "alt");
      const src = attribuut(tag, "src") ?? "afbeelding";

      if (alt === null) {
        findings.push(`${src} zonder alt-attribuut`);
      } else if (alt.trim() === "" && !DECORATIEF.test(tag)) {
        findings.push(
          `${src} met lege alt-tekst; beschrijf de afbeelding of markeer haar als decoratief`,
        );
      }
    }
  }

  return findings;
}

// Class-attributen met en zonder aanhalingstekens: de minifier laat die weg
const CLASS_ATTR = /\bclass=(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi;

/**
 * Welk soort presentatie een pagina is: "reveal", "nldd-deck" of null. Leest
 * de class-attributen, zodat het ook werkt op geminificeerde HTML.
 */
function presentatieSoort(html) {
  const classes = new Set();
  for (const [tag] of html.matchAll(/<[a-z][^>]*>/gi)) {
    for (const match of tag.matchAll(CLASS_ATTR)) {
      for (const name of (match[1] ?? match[2] ?? match[3]).split(/\s+/)) classes.add(name);
    }
  }
  if (classes.has("reveal")) return "reveal";
  if (classes.has("deck")) return "nldd-deck";
  return null;
}

/**
 * Beschrijving van Mermaid-diagrammen (WCAG 1.1.1). De alt draagt alleen de
 * korte `accTitle`; de uitgebreide `accDescr` staat als verborgen tekst na het
 * diagram en is het enige volledige tekstalternatief, ook in de PDF-download.
 */
function checkDiagramBeschrijving(html) {
  const findings = [];

  for (const [diagram] of html.matchAll(MERMAID_DIAGRAM)) {
    const tekst = diagram.match(BESCHRIJVING)?.[1] ?? null;
    if (tekst === null) {
      findings.push("diagram zonder beschrijving; voeg accDescr toe aan het Mermaid-blok");
    } else if (tekst.trim() === "") {
      findings.push("diagram met lege beschrijving; vul accDescr in het Mermaid-blok");
    }
  }

  return findings;
}

/**
 * Voetnotenblok van Goldmark (WCAG 1.3.1). `role="doc-endnotes"` erft van list
 * en eist listitem-kinderen, maar er staat een <hr> en een <ol> in. De partial
 * inhoud.html haalt de rol eruit; slaat een layout die over, dan ontbreekt
 * die partial daar.
 */
function checkVoetnootRol(html) {
  const aantal = [...html.matchAll(VOETNOTEN_ROL)].length;
  if (aantal === 0) return [];
  return [
    `voetnotenblok met role="doc-endnotes" (${aantal}x); laat de layout .Content door de partial inhoud.html gaan`,
  ];
}

const SVG_VORMEN = new Set(["rect", "path", "circle", "ellipse", "line", "polyline", "polygon", "use"]);
// Commentaar, CDATA, script en style kunnen tekst bevatten die op een tag lijkt
const GEEN_MARKUP = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;
const TAG = /<(\/?)([a-z][\w:-]*)((?:"[^"]*"|'[^']*'|[^"'>])*)>/gi;
const MAX_TAG = 80;

function kortTag(tag) {
  return tag.length > MAX_TAG ? `${tag.slice(0, MAX_TAG - 1)}…>` : tag;
}

/**
 * Niet-gesloten vormelementen in inline SVG. Staat er een geneste <svg> in,
 * dan verlaat de minifier na de eerste geneste </svg> de SVG-modus en haalt
 * hij de / weg uit `<rect ... />`. De browser leest zo'n <rect> dan als open
 * element: alles wat erna komt wordt zijn kind en verdwijnt uit beeld. Geen
 * scanner meldt dat.
 *
 * Een element dat geen eigen sluittag krijgt, sluit pas bij de sluittag van
 * een voorouder; zo leest de browser het ook.
 */
function checkSvgGesloten(html) {
  const findings = [];
  const open = [];
  const meldOpen = (elementen) => {
    for (const { naam, tag } of elementen) {
      if (SVG_VORMEN.has(naam)) findings.push(`${kortTag(tag)} is niet gesloten`);
    }
  };

  for (const [tag, sluit, ruweNaam, rest] of html.replace(GEEN_MARKUP, "").matchAll(TAG)) {
    const naam = ruweNaam.toLowerCase();
    const zelfsluitend = rest.trimEnd().endsWith("/");

    if (open.length === 0) {
      if (!sluit && naam === "svg" && !zelfsluitend) open.push({ naam, tag });
      continue;
    }

    if (!sluit) {
      if (!zelfsluitend) open.push({ naam, tag });
      continue;
    }

    const index = open.findLastIndex((element) => element.naam === naam);
    if (index === -1) continue;
    meldOpen(open.splice(index + 1));
    open.pop();
  }

  meldOpen(open);
  return findings;
}

export {
  checkHeadingOrder,
  checkDiagramAlt,
  checkContentImageAlt,
  checkDiagramBeschrijving,
  checkVoetnootRol,
  checkSvgGesloten,
  presentatieSoort,
};
