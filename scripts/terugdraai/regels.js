/**
 * De regel achter de pre-commit hook: staat een bestand dat klaarstaat om te
 * committen terug op een oudere versie uit zijn eigen historie?
 */

/**
 * @typedef {{sha: string, kort: string, datum: string, onderwerp: string, blob: string}} Versie
 * @param {Record<string, {klaar: string, huidig: string, geschiedenis: Versie[]}>} perBestand
 *   `geschiedenis` staat nieuwste eerst, zoals `git log` die geeft.
 * @returns {string[]} Een melding per bestand dat terugvalt.
 */
function checkTerugdraai(perBestand) {
  const findings = [];

  for (const [pad, { klaar, huidig, geschiedenis }] of Object.entries(perBestand)) {
    if (klaar === huidig) continue;
    const ouder = geschiedenis.find((versie) => versie.blob === klaar);
    if (!ouder) continue;
    findings.push(
      `${pad} is gelijk aan de versie uit ${ouder.kort} ` +
        `(${ouder.datum}, ${ouder.onderwerp})`
    );
  }

  return findings;
}

export { checkTerugdraai };
