(function () {
  // Maakt van een plaat met stappen een speler. De korte stappen onder de plaat
  // (lijsten met class stappen-kort) worden de knoppen; de uitleg van de gekozen
  // stap komt direct onder die lijsten en de bijbehorende onderdelen in de plaat
  // lichten op. Zonder JavaScript linken de stappen naar hun uitleg verderop.
  const figuur = document.querySelector("figure[data-stappen-speler]");
  if (!figuur) return;

  const links = Array.from(document.querySelectorAll(".stappen-kort a[href*='#stap-']"));
  const stappen = links
    .map((link) => ({ link, id: link.hash.slice(1) }))
    .map((stap) => ({ ...stap, kop: document.getElementById(stap.id) }))
    .filter((stap) => stap.kop);
  if (!stappen.length) return;

  // De uitleg van een stap loopt van zijn kop tot de volgende kop van hetzelfde
  // of een hoger niveau.
  const niveau = (el) => Number(el.tagName.slice(1));
  stappen.forEach((stap) => {
    const blok = document.createElement("div");
    blok.className = "plaat-speler-stap";
    const delen = [];
    let el = stap.kop;
    do {
      delen.push(el);
      el = el.nextElementSibling;
    } while (el && !(/^H[1-6]$/.test(el.tagName) && niveau(el) <= niveau(stap.kop)));
    delen.forEach((deel) => blok.append(deel));
    stap.kop.tabIndex = -1;
    stap.blok = blok;
  });

  // Elke lijst met korte stappen is een scenario; de alinea erboven is de titel.
  const scenarios = [];
  stappen.forEach((stap) => {
    const lijst = stap.link.closest(".stappen-kort");
    let scenario = scenarios.find((s) => s.lijst === lijst);
    if (!scenario) {
      const vorigeEl = lijst.previousElementSibling;
      const titel = vorigeEl && vorigeEl.tagName === "P" ? vorigeEl : null;
      if (titel) titel.classList.add("plaat-scenario-titel");
      scenario = { lijst, titel, stappen: [] };
      scenarios.push(scenario);
    }
    stap.scenario = scenario;
    scenario.stappen.push(stap);
  });

  let keuze = null;
  if (scenarios.length > 1) {
    keuze = document.createElement("div");
    keuze.className = "plaat-scenario-keuze";
    keuze.setAttribute("role", "group");
    keuze.setAttribute("aria-label", "Kies een scenario");
    scenarios.forEach((scenario, n) => {
      const knop = document.createElement("button");
      knop.type = "button";
      const kort = scenario.titel && scenario.titel.dataset.kort;
      knop.textContent = kort ? (n + 1) + ". " + kort : (scenario.titel ? scenario.titel.textContent.trim() : "Scenario " + (n + 1));
      knop.addEventListener("click", () => toon(stappen.indexOf(scenario.stappen[0])));
      scenario.knop = knop;
      keuze.append(knop);
    });
    (scenarios[0].titel || scenarios[0].lijst).before(keuze);
  }

  const speler = document.createElement("section");
  speler.className = "plaat-speler";
  speler.setAttribute("aria-label", "Uitleg van de gekozen stap");

  const balk = document.createElement("div");
  balk.className = "plaat-speler-balk";
  const vorige = document.createElement("button");
  vorige.type = "button";
  vorige.className = "plaat-speler-pijl";
  vorige.textContent = "Vorige stap";
  const volgende = vorige.cloneNode();
  volgende.textContent = "Volgende stap";
  balk.append(vorige, volgende);

  speler.append(balk, ...stappen.map((stap) => stap.blok));
  links[links.length - 1].closest(".stappen-kort").after(speler);

  // Na het verplaatsen staat de kop boven de uitleg zonder inhoud.
  const uitlegKop = document.getElementById("uitleg-per-stap");
  if (uitlegKop) uitlegKop.hidden = true;

  const onderdelen = figuur.querySelectorAll("[data-stappen]");
  let actief = 0;

  function toon(i) {
    actief = i;
    const id = stappen[i].id.replace(/^stap-/, "");
    figuur.dataset.actief = id;
    // Onderdelen die in geen enkele stap van dit scenario meedoen, krijgen cp-buiten.
    const scenarioIds = stappen[i].scenario.stappen.map((stap) => stap.id.replace(/^stap-/, ""));
    onderdelen.forEach((el) => {
      const eigen = el.dataset.stappen.split(" ");
      el.classList.toggle("cp-actief", eigen.includes(id));
      el.classList.toggle("cp-buiten", !eigen.some((e) => scenarioIds.includes(e)));
    });
    stappen.forEach((stap, j) => {
      stap.blok.hidden = j !== i;
      if (j === i) stap.link.setAttribute("aria-current", "step");
      else stap.link.removeAttribute("aria-current");
    });
    const huidig = stappen[i].scenario;
    if (keuze) {
      scenarios.forEach((scenario) => {
        const gekozen = scenario === huidig;
        scenario.knop.setAttribute("aria-pressed", String(gekozen));
        scenario.lijst.hidden = !gekozen;
        if (scenario.titel) scenario.titel.hidden = !gekozen;
      });
    }
    const binnen = huidig.stappen.indexOf(stappen[i]);
    vorige.disabled = binnen === 0;
    volgende.disabled = binnen === huidig.stappen.length - 1;
    balk.hidden = huidig.stappen.length === 1;
  }

  stappen.forEach((stap, i) =>
    stap.link.addEventListener("click", (e) => {
      e.preventDefault();
      toon(i);
      stap.kop.focus({ preventScroll: true });
    })
  );
  vorige.addEventListener("click", () => toon(actief - 1));
  volgende.addEventListener("click", () => toon(actief + 1));

  // Klikken op een onderdeel in de plaat: de eerstvolgende stap waar het bij hoort.
  figuur.addEventListener("click", (e) => {
    const onderdeel = e.target.closest("[data-stappen]");
    if (!onderdeel || !onderdeel.dataset.stappen) return;
    const eigen = onderdeel.dataset.stappen.split(" ").map((id) => "stap-" + id);
    const kandidaten = stappen
      .map((stap, i) => (eigen.includes(stap.id) ? i : -1))
      .filter((i) => i >= 0);
    if (!kandidaten.length) return;
    // Eerst binnen het gekozen scenario zoeken, dan pas daarbuiten.
    const zelfde = kandidaten.filter((i) => stappen[i].scenario === stappen[actief].scenario);
    const lijst = zelfde.length ? zelfde : kandidaten;
    toon(lijst.find((i) => i > actief) ?? lijst[0]);
  });

  // Een link naar een kop binnen een stap (inhoudsopgave) opent die stap.
  function volgAnker() {
    const doel = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const blok = doel && doel.closest(".plaat-speler-stap");
    if (!blok) return false;
    toon(stappen.findIndex((stap) => stap.blok === blok));
    doel.scrollIntoView();
    return true;
  }

  window.addEventListener("hashchange", volgAnker);
  if (!volgAnker()) toon(0);
})();
