// Bediening van NLDD-presentaties (layout documenten/presentaties/nldd-deck).
// De offline versie laadt de volledige NLDD-bundle en slaat deze imports over.
import "@nldd/design-system/icon";
import "@nldd/design-system/icon-button";
import "@nldd/design-system/button";
import "@nldd/design-system/keyboard-shortcut";

(() => {
  const slides = [...document.querySelectorAll(".slide")];
  const counter = document.getElementById("counter");
  const progress = document.getElementById("progress");
  const announce = document.getElementById("announce");

  // Leesmodus (standaard) toont elke dia volledig; presentatiemodus bouwt dia's op per klik
  let presenting = new URLSearchParams(location.search).has("presentatie");

  const maxStep = (slide) =>
    Math.max(0, ...[...slide.querySelectorAll("[data-step]")].map((el) => Number(el.dataset.step)));

  // data-start: met welke stap een dia opent in presentatiemodus
  const minStep = (slide) => (presenting ? Number(slide.dataset.start ?? 0) : maxStep(slide));

  // #/3 telt vanaf 0, net als Reveal.js en de zoekindex van de site
  const indexFromHash = () => {
    const match = location.hash.match(/^#\/(\d+)/);
    return match ? Number(match[1]) : -1;
  };

  let index = slides[indexFromHash()] ? indexFromHash() : 0;
  let step = minStep(slides[index]);

  function render() {
    const slide = slides[index];
    slides.forEach((s, k) => { s.hidden = k !== index; });

    slide.querySelectorAll("[data-step]").forEach((el) => {
      const n = Number(el.dataset.step);
      el.classList.toggle("is-shown", n <= step);
      el.classList.toggle("is-current", presenting && n === step);
    });

    counter.textContent = `${index + 1} / ${slides.length}`;
    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
    document.querySelectorAll("[data-prev]").forEach((b) => { b.disabled = index === 0 && step === minStep(slide); });
    document.querySelectorAll("[data-next]").forEach((b) => { b.disabled = index === slides.length - 1 && step === maxStep(slide); });
    history.replaceState(null, "", `${presenting ? "?presentatie" : location.pathname}#/${index}`);
  }

  function setMode(on) {
    presenting = on;
    step = minStep(slides[index]);
    render();
    announce.textContent = presenting ? "Presentatiemodus aan" : "Presentatiemodus uit";
  }

  function go(to, toStep) {
    if (to < 0 || to >= slides.length) return;
    const changed = to !== index;
    index = to;
    step = toStep ?? minStep(slides[to]);
    render();
    if (changed) announce.textContent = `Dia ${index + 1} van ${slides.length}: ${slides[index].getAttribute("aria-label")}`;
  }

  function next() {
    if (step < maxStep(slides[index])) { step++; render(); } else go(index + 1);
  }

  function prev() {
    if (step > minStep(slides[index])) { step--; render(); } else if (index > 0) go(index - 1, maxStep(slides[index - 1]));
  }

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    // Spatie en Enter horen bij een knop of link die focus heeft
    if ((e.key === " " || e.key === "Enter") && e.target.closest?.("a, button, nldd-button, nldd-icon-button")) return;
    switch (e.key) {
      case "ArrowRight": case "PageDown": case " ": e.preventDefault(); next(); break;
      case "ArrowLeft": case "PageUp": e.preventDefault(); prev(); break;
      case "Home": e.preventDefault(); go(0); break;
      case "End": e.preventDefault(); go(slides.length - 1, maxStep(slides.at(-1))); break;
      case "f": case "F":
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
        break;
      case "p": case "P":
        setMode(!presenting);
        break;
    }
  });

  document.querySelectorAll("[data-next]").forEach((b) => b.addEventListener("click", next));
  document.querySelectorAll("[data-prev]").forEach((b) => b.addEventListener("click", prev));

  // Sluitknop (alleen op de site): terug als je van de site komt, anders naar de homepage
  const close = document.querySelector("[data-close]");
  if (close) {
    const fromSite = document.referrer.startsWith(location.origin);
    close.addEventListener("click", () => {
      if (fromSite) history.back();
      else location.href = "/";
    });
  }

  window.addEventListener("hashchange", () => {
    const to = indexFromHash();
    if (to !== index && slides[to]) go(to);
  });

  window.addEventListener("beforeprint", () => {
    document.querySelectorAll("[data-step]").forEach((el) => el.classList.add("is-shown"));
  });
  window.addEventListener("afterprint", render);

  render();
})();
