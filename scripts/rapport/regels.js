/**
 * Regels voor het onderzoeksrapport en de toegankelijkheidsverklaring.
 *
 * Het rapport onderbouwt de verklaring in het landelijke register en heeft
 * daarmee een juridische functie. Een herziening zonder nieuw versienummer
 * levert twee documenten op die hetzelfde heten maar iets anders zeggen.
 */

// Het rapport per onderzoeksjaar.
const RAPPORT = /^content\/documenten\/toegankelijkheid\/onderzoek-\d{4}\.md$/;
const VERSIEREGEL = /^\+.*\|\s*Versie van dit rapport\s*\|/m;

/**
 * Meldt een gewijzigd rapport waarvan het versienummer gelijk bleef.
 *
 * `diffPerBestand` is een map van pad naar de aanstaande diff van dat bestand.
 */
function checkVersiebump(diffPerBestand) {
  const findings = [];

  for (const [pad, diff] of Object.entries(diffPerBestand)) {
    if (!RAPPORT.test(pad)) continue;
    if (VERSIEREGEL.test(diff)) continue;
    findings.push(
      `${pad} wijzigt zonder nieuw versienummer; werk de regel "Versie van dit rapport" bij, of sla deze controle over met LEFTHOOK_EXCLUDE=rapport-versie als de wijziging niet inhoudelijk is`,
    );
  }

  return findings;
}

export { checkVersiebump, RAPPORT };
