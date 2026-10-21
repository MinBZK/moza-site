/* Tooltip voor knoppen met alleen een pictogram. Zet `data-tooltip="tekst"` op
   het element; de toegankelijke naam blijft uit de verborgen tekst komen, dus de
   ballon is puur visueel en krijgt aria-hidden.

   1.4.13 stelt drie eisen: te sluiten met Escape, aanwijsbaar zonder dat hij
   verdwijnt, en blijvend zolang de aanwijzer of de focus er is. De ballon staat
   daarom in de body (geen clipping in een scrollend paneel) en de aanwijzer
   wordt op knop én ballon gevolgd. */
(function () {
  const triggers = document.querySelectorAll("[data-tooltip]");
  if (!triggers.length) return;

  const ballon = document.createElement("div");
  ballon.className = "tooltip";
  ballon.setAttribute("aria-hidden", "true");
  ballon.hidden = true;
  document.body.appendChild(ballon);

  const RUIMTE = 2;
  let actief = null;
  let gesloten = null; // met Escape weggeklikt; pas weer na verlaten
  let opBallon = false;

  function plaats(el) {
    const r = el.getBoundingClientRect();
    ballon.style.top = `${r.bottom + RUIMTE}px`;
    ballon.style.left = "0px";
    // Rechts uitlijnen op de knop, of in het midden met
    // data-tooltip-uitlijning="midden", maar binnen het venster blijven.
    const breedte = ballon.getBoundingClientRect().width;
    const gewenst = el.dataset.tooltipUitlijning === "midden"
      ? r.left + (r.width - breedte) / 2
      : r.right - breedte;
    const links = Math.min(Math.max(8, gewenst), window.innerWidth - breedte - 8);
    ballon.style.left = `${links}px`;
  }

  function toon(el) {
    if (gesloten === el) return;
    actief = el;
    ballon.textContent = el.dataset.tooltip;
    ballon.hidden = false;
    plaats(el);
  }

  function verberg() {
    actief = null;
    opBallon = false;
    ballon.hidden = true;
  }

  for (const el of triggers) {
    el.addEventListener("pointerenter", () => toon(el));
    el.addEventListener("focus", () => toon(el));
    el.addEventListener("pointerleave", () => {
      // Even wachten: de aanwijzer kan onderweg zijn naar de ballon.
      setTimeout(() => {
        if (actief === el && !opBallon && el !== document.activeElement) verberg();
      }, 80);
    });
    el.addEventListener("blur", () => {
      if (actief === el && !opBallon) verberg();
      if (gesloten === el) gesloten = null;
    });
  }

  ballon.addEventListener("pointerenter", () => {
    opBallon = true;
  });
  ballon.addEventListener("pointerleave", () => {
    opBallon = false;
    if (actief && actief !== document.activeElement) verberg();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || ballon.hidden) return;
    gesloten = actief;
    verberg();
    e.stopPropagation();
  });

  window.addEventListener("scroll", () => actief && plaats(actief), { passive: true });
  window.addEventListener("resize", () => actief && plaats(actief), { passive: true });
})();
