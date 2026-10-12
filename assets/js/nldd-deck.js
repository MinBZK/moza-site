// Bediening van NLDD-presentaties (layout documenten/presentaties/nldd-deck).
// De offline versie laadt de volledige NLDD-bundle en slaat deze imports over.
import "@nldd/design-system/icon";
import "@nldd/design-system/icon-button";
import "@nldd/design-system/button";
import "@nldd/design-system/keyboard-shortcut";

(() => {
  const slides = [...document.querySelectorAll(".slide")];

  // Een fixed footer zet de browser bij printen maar op één pagina. Daarom krijgt
  // elke dia een eigen kopie, die alleen in de printweergave zichtbaar is.
  const footerText = document.querySelector(".deck-footer .footer-text");
  if (footerText) {
    slides.forEach((slide) => {
      const copy = footerText.cloneNode(true);
      copy.className = "print-footer";
      copy.setAttribute("aria-hidden", "true");
      slide.append(copy);
    });
  }
  const counter = document.getElementById("counter");
  const progress = document.getElementById("progress");
  const announce = document.getElementById("announce");

  // Kleine schermen tonen alle dia's onder elkaar om door te scrollen. Zelfde
  // mediaquery als in nldd-deck.css.
  const scrollMode = matchMedia("(max-width: 900px), (max-height: 500px)");

  // Sprekersweergave (?spreker): notities, tijd en een voorbeeld van nu en
  // hierna, gekoppeld aan het publieksvenster. Het venster is vaak smal, maar
  // scrolt nooit.
  const speaker = new URLSearchParams(location.search).has("spreker");
  const scrolling = () => !speaker && scrollMode.matches;

  // Leesmodus (standaard) toont elke dia volledig; presentatiemodus bouwt dia's op per klik
  let presenting = speaker || new URLSearchParams(location.search).has("presentatie");
  if (presenting && !speaker) document.body.classList.add("show-mode-hint");

  const maxStep = (slide) =>
    Math.max(0, ...[...slide.querySelectorAll("[data-step]")].map((el) => Number(el.dataset.step)));

  // data-start: met welke stap een dia opent in presentatiemodus
  const minStep = (slide) => (presenting ? Number(slide.dataset.start ?? 0) : maxStep(slide));

  // #/1 is de eerste dia, gelijk aan de teller. Reveal.js telt vanaf 0; de
  // zoekindex (layouts/index.json) houdt per layout rekening met dat verschil.
  const indexFromHash = () => {
    const match = location.hash.match(/^#\/(\d+)/);
    return match ? Number(match[1]) - 1 : -1;
  };

  let index = slides[indexFromHash()] ? indexFromHash() : 0;
  let step = minStep(slides[index]);
  // De dia die nog uitfadet tijdens een overgang (zie go)
  let leaving = null;

  // NLDD-knoppen hebben vaste maten en schalen niet mee met een dia. In de
  // scrollmodus is de dia klein, dus krijgen ze daar de kleinste maat.
  const slideButtons = [...document.querySelectorAll(".slide nldd-button")];
  slideButtons.forEach((b) => { b.dataset.size = b.getAttribute("size") ?? ""; });
  function sizeButtons() {
    slideButtons.forEach((b) => {
      const size = scrolling() ? "xs" : b.dataset.size;
      if (size) b.setAttribute("size", size);
      else b.removeAttribute("size");
    });
  }

  const view = speaker ? buildSpeakerView() : null;

  function buildSpeakerView() {
    document.body.classList.add("is-speaker");
    document.title = `Spreker · ${document.title}`;
    const root = document.createElement("div");
    root.className = "speaker";
    root.setAttribute("role", "region");
    root.setAttribute("aria-label", "Sprekersweergave");
    root.innerHTML = `
      <div class="speaker-bar">
        <span class="speaker-timer"><span data-elapsed>0:00</span><span data-duration></span></span>
        <nldd-icon-button variant="inherit-tinted" size="sm" icon="arrow-2-counter-clockwise" text="Tijd opnieuw starten" data-reset></nldd-icon-button>
        <span class="speaker-clock" data-clock></span>
        <span class="speaker-counter" data-position></span>
        <nldd-icon-button variant="inherit-tinted" size="sm" icon="arrow-left" text="Vorige" data-prev></nldd-icon-button>
        <nldd-icon-button variant="inherit-tinted" size="sm" icon="arrow-right" text="Volgende" data-next></nldd-icon-button>
      </div>
      <div class="speaker-current"><p class="speaker-label">Nu</p><div class="speaker-stage" data-current></div></div>
      <div class="speaker-next"><p class="speaker-label" data-next-label>Hierna</p><div class="speaker-stage" data-upcoming></div></div>
      <div class="speaker-notes"><p class="speaker-label">Notities</p><div class="speaker-notes-body" data-notes></div></div>`;
    document.body.append(root);
    const $ = (sel) => root.querySelector(sel);

    const minutes = Number(document.body.dataset.duur) || 0;
    if (minutes) $("[data-duration]").textContent = ` / ${minutes}:00`;
    let started = Date.now();
    $("[data-reset]").addEventListener("click", () => { started = Date.now(); tick(); });
    function tick() {
      const s = Math.floor((Date.now() - started) / 1000);
      $("[data-elapsed]").textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
      $(".speaker-timer").classList.toggle("is-over", minutes > 0 && s >= minutes * 60);
      $("[data-clock]").textContent = new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
    }
    tick();
    setInterval(tick, 1000);

    return {
      current: $("[data-current]"),
      upcoming: $("[data-upcoming]"),
      nextLabel: $("[data-next-label]"),
      position: $("[data-position]"),
      notes: $("[data-notes]"),
    };
  }

  // Een kopie van de dia, opgebouwd tot en met stap n
  function preview(target, k, n) {
    if (!slides[k]) { target.replaceChildren(); return; }
    const copy = slides[k].cloneNode(true);
    copy.hidden = false;
    copy.removeAttribute("aria-label");
    copy.querySelectorAll(".notes").forEach((el) => el.remove());
    copy.querySelectorAll("[data-step]").forEach((el) => {
      el.classList.toggle("is-shown", Number(el.dataset.step) <= n);
      el.classList.toggle("is-current", Number(el.dataset.step) === n);
    });
    target.replaceChildren(copy);
  }

  function renderSpeaker() {
    const slide = slides[index];
    const max = maxStep(slide);
    preview(view.current, index, step);
    if (step < max) {
      view.nextLabel.textContent = "Volgende stap";
      preview(view.upcoming, index, step + 1);
    } else {
      view.nextLabel.textContent = slides[index + 1] ? "Volgende dia" : "Einde";
      preview(view.upcoming, index + 1, slides[index + 1] ? minStep(slides[index + 1]) : 0);
    }
    view.position.textContent = `Dia ${index + 1} / ${slides.length}${max ? ` · stap ${step} / ${max}` : ""}`;
    const notes = slide.querySelector(".notes");
    if (notes) view.notes.replaceChildren(...[...notes.childNodes].map((n) => n.cloneNode(true)));
    else view.notes.textContent = "Geen notities bij deze dia.";
  }

  // Publieks- en sprekersvenster volgen elkaar via een BroadcastChannel (zelfde
  // origin) en via postMessage tussen opener en popup. Dat laatste werkt ook
  // als de pagina in een sandbox draait, zoals op Plak: daar heeft elk venster
  // een eigen, anonieme origin en bereikt het BroadcastChannel niemand.
  // `synced` voorkomt dat een ontvangen stand weer wordt teruggestuurd.
  const channel = "BroadcastChannel" in window ? new BroadcastChannel(`nldd-deck:${location.pathname}`) : null;
  let speakerWindow = null;
  const peers = () => [speakerWindow, window.opener].filter((w) => w && !w.closed);
  function send(message) {
    channel?.postMessage(message);
    peers().forEach((w) => w.postMessage(message, "*"));
  }
  // Een sprekersvenster dat (opnieuw) opent, stuurt zijn beginstand niet door:
  // het vraagt met "hello" de stand van het publieksvenster op.
  let synced = speaker ? `${index}:${step}` : "";
  function broadcast() {
    const state = `${index}:${step}`;
    if (state === synced) return;
    synced = state;
    send({ type: "nldd-deck-state", index, step });
  }
  function receive(data) {
    if (data?.type === "nldd-deck-hello") {
      synced = "";
      broadcast();
    } else if (data?.type === "nldd-deck-state" && slides[data.index]) {
      synced = `${data.index}:${data.step}`;
      if (!presenting) presenting = true;
      document.body.classList.remove("show-mode-hint");
      go(data.index, data.step);
    } else if (data?.type === "nldd-deck-video-pauze" && data.id !== lastToggle) {
      // Komt via beide kanalen binnen; een tweede keer zou de pauze weer opheffen
      lastToggle = data.id;
      toggleVideo();
    }
  }
  channel?.addEventListener("message", ({ data }) => receive(data));
  // Alleen berichten van het eigen sprekers- of publieksvenster
  window.addEventListener("message", (e) => {
    if (peers().includes(e.source)) receive(e.data);
  });

  // Een video met data-step="1" staat stil op het eerste beeld. In presentatiemodus
  // start hij bij die stap (volgende, spatie of klikker); dat is gewone stap-stand,
  // dus het sprekersvenster stuurt mee. In leesmodus starten spatie en klik hem.
  // Daarna pauzeren en hervatten spatie en klik. Nooit afspelen in het
  // sprekersvenster (daar staat het deck verborgen, maar het geluid zou wel
  // klinken) of in de scrollmodus.
  const videos = [...document.querySelectorAll(".slide video[data-step]")];
  const currentVideo = () => slides[index].querySelector("video[data-step]");
  function startVideo(v) {
    v.dataset.gestart = "1";
    v.currentTime = 0;
    v.play().catch(() => {});
  }
  function stopVideo(v) {
    if (!v.dataset.gestart) return;
    v.pause();
    v.currentTime = 0;
    delete v.dataset.gestart;
  }
  function syncVideos() {
    videos.forEach((v) => {
      const active = !speaker && !scrolling() && slides[index].contains(v);
      if (!active || (presenting && step < Number(v.dataset.step))) stopVideo(v);
      else if (presenting && !v.dataset.gestart) startVideo(v);
    });
  }
  let lastToggle = "";
  function toggleVideo() {
    const v = currentVideo();
    if (speaker) send({ type: "nldd-deck-video-pauze", id: `${Date.now()}-${Math.random()}` });
    else if (v && !v.dataset.gestart) startVideo(v);
    else if (v) v.paused ? v.play() : v.pause();
  }
  videos.forEach((v) => v.addEventListener("click", () => { if (v === currentVideo()) toggleVideo(); }));

  function render() {
    sizeButtons();
    document.body.classList.toggle("is-presenting", presenting && !scrolling());
    if (scrolling()) {
      slides.forEach((s) => { s.hidden = false; });
      document.querySelectorAll("[data-step]").forEach((el) => {
        el.classList.add("is-shown");
        el.classList.remove("is-current");
      });
      syncVideos();
      return;
    }

    const slide = slides[index];
    slides.forEach((s, k) => { s.hidden = k !== index && s !== leaving; });

    slide.querySelectorAll("[data-step]").forEach((el) => {
      const n = Number(el.dataset.step);
      el.classList.toggle("is-shown", n <= step);
      el.classList.toggle("is-current", presenting && n === step);
    });

    counter.textContent = `${index + 1} / ${slides.length}`;
    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
    document.querySelectorAll("[data-prev]").forEach((b) => { b.disabled = index === 0 && step === minStep(slide); });
    document.querySelectorAll("[data-next]").forEach((b) => { b.disabled = index === slides.length - 1 && step === maxStep(slide); });
    history.replaceState(null, "", `${speaker ? "?spreker" : presenting ? "?presentatie" : location.pathname}#/${index + 1}`);
    if (view) renderSpeaker();
    syncVideos();
    broadcast();
  }

  function setMode(on) {
    presenting = on;
    step = minStep(slides[index]);
    render();
    announce.textContent = presenting ? "Presentatiemodus aan" : "Presentatiemodus uit";
  }

  // data-overgang op een dia: de oude dia blijft even staan en vervaagt
  // (is-leaving), de nieuwe komt erover op (is-entering)
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const fades = (from, to) =>
    !speaker && !scrolling() && !reducedMotion.matches &&
    (slides[from].hasAttribute("data-overgang") || slides[to].hasAttribute("data-overgang"));

  // Een nieuwe klik rondt een lopende overgang meteen af
  function settle() {
    leaving = null;
    slides.forEach((s) => s.classList.remove("is-leaving", "is-entering"));
  }

  function go(to, toStep) {
    if (to < 0 || to >= slides.length) return;
    const from = index;
    const changed = to !== from;
    settle();
    index = to;
    step = toStep ?? minStep(slides[to]);
    if (changed && fades(from, to)) {
      const fade = slides[from];
      leaving = fade;
      fade.classList.add("is-leaving");
      slides[to].classList.add("is-entering");
      render();
      const anims = [fade, slides[to]].flatMap((s) => s.getAnimations({ subtree: true }));
      Promise.all(anims.map((a) => a.finished.catch(() => {}))).then(() => {
        if (leaving !== fade) return;
        settle();
        render();
      });
    } else render();
    if (changed) announce.textContent = `Dia ${index + 1} van ${slides.length}: ${slides[index].getAttribute("aria-label")}`;
  }

  function next() {
    if (step < maxStep(slides[index])) { step++; render(); } else go(index + 1);
  }

  function prev() {
    if (step > minStep(slides[index])) { step--; render(); return; }
    if (index === 0) return;
    // Terug op een videodia: video stil op het eerste beeld, niet meteen afspelen
    const before = slides[index - 1];
    go(index - 1, before.querySelector("video[data-step]") ? minStep(before) : maxStep(before));
  }

  document.addEventListener("keydown", (e) => {
    // Bij scrollen horen de pijltoetsen en spatie bij de browser
    if (scrolling()) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    // Spatie en Enter horen bij een knop of link die focus heeft
    if ((e.key === " " || e.key === "Enter") && e.target.closest?.("a, button, nldd-button, nldd-icon-button")) return;
    document.body.classList.remove("show-mode-hint");
    switch (e.key) {
      case " ":
        e.preventDefault();
        // Speelt de video al, dan is spatie pauze en hervatten in plaats van verder
        if (currentVideo() && step >= Number(currentVideo().dataset.step)) toggleVideo();
        else next();
        break;
      case "ArrowRight": case "PageDown": e.preventDefault(); next(); break;
      case "ArrowLeft": case "PageUp": e.preventDefault(); prev(); break;
      case "Home": e.preventDefault(); go(0); break;
      case "End": e.preventDefault(); go(slides.length - 1, maxStep(slides.at(-1))); break;
      case "f": case "F":
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
        break;
      case "p": case "P":
        if (!speaker) setMode(!presenting);
        break;
      case "s": case "S":
        if (speaker) break;
        speakerWindow = window.open(`${location.pathname}?spreker#/${index + 1}`, "nldd-deck-spreker", "popup,width=1280,height=800");
        if (!presenting) setMode(true);
        break;
    }
  });

  const hideModeHint = () => document.body.classList.remove("show-mode-hint");
  document.querySelectorAll("[data-next]").forEach((b) => b.addEventListener("click", () => { hideModeHint(); next(); }));
  document.querySelectorAll("[data-prev]").forEach((b) => b.addEventListener("click", () => { hideModeHint(); prev(); }));

  // Vegen op een aanraakscherm: horizontaal en minstens 50px, anders is het scrollen of tikken
  let swipe = null;
  document.querySelector(".deck").addEventListener("pointerdown", (e) => {
    if (scrolling() || e.pointerType === "mouse") return;
    if (e.target.closest("a, button, nldd-button, nldd-icon-button")) return;
    swipe = { x: e.clientX, y: e.clientY };
  });
  document.addEventListener("pointerup", (e) => {
    if (!swipe) return;
    const dx = e.clientX - swipe.x;
    const dy = e.clientY - swipe.y;
    swipe = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    document.body.classList.remove("show-mode-hint");
    if (dx < 0) next(); else prev();
  });
  document.addEventListener("pointercancel", () => { swipe = null; });

  // Presentatiemodus: vorige en volgende verschijnen bij muisbeweging en
  // verdwijnen na 2 seconden stilstand. Alleen bij een muis: een tik op een
  // aanraakscherm geeft ook een pointermove.
  let controlsTimer;
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || !presenting) return;
    document.body.classList.add("show-controls");
    clearTimeout(controlsTimer);
    controlsTimer = setTimeout(() => document.body.classList.remove("show-controls"), 2000);
  });

  // Sluitknop (alleen op de site): terug als je van de site komt, anders naar de homepage
  const close = document.querySelector("[data-close]");
  if (close) {
    const fromSite = document.referrer.startsWith(location.origin);
    close.addEventListener("click", () => {
      if (fromSite) history.back();
      else location.href = "/";
    });
  }

  scrollMode.addEventListener("change", () => {
    settle();
    step = minStep(slides[index]);
    render();
  });

  window.addEventListener("hashchange", () => {
    const to = indexFromHash();
    if (scrolling()) { slides[to]?.scrollIntoView(); return; }
    if (to !== index && slides[to]) go(to);
  });

  window.addEventListener("beforeprint", () => {
    document.querySelectorAll("[data-step]").forEach((el) => el.classList.add("is-shown"));
  });
  window.addEventListener("afterprint", render);

  render();
  document.documentElement.classList.add("deck-ready");
  if (scrolling() && indexFromHash() > 0) slides[indexFromHash()]?.scrollIntoView();
  if (speaker) send({ type: "nldd-deck-hello" });
})();
