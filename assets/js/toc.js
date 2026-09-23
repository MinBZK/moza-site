(function () {
  // Markeer de actieve sectie in de inhoudsopgave tijdens het scrollen.
  const headings = Array.from(
    document.querySelectorAll("article h2[id], article h3[id], article h4[id]")
  );
  const tocLinks = document.querySelectorAll(".toc a");

  if (!headings.length || !tocLinks.length) return;

  function updateActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight * 0.2;

    let current = null;
    for (const heading of headings) {
      if (heading.offsetTop <= scrollPos) {
        current = heading;
      } else {
        break;
      }
    }

    tocLinks.forEach((link) => link.classList.remove("active"));
    if (current) {
      const activeLink = document.querySelector(`.toc a[href="#${current.id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
})();

(function () {
  // Elk blok in de rechterkolom wordt een uitklapregel met een knop in de kop.
  // Het breekpunt moet gelijk zijn aan dat in components/page-aside.css.
  const chevron = document.getElementById("page-aside-chevron");
  const blokken = Array.from(document.querySelectorAll(".page-aside > nav"))
    .map(function (blok) {
      return { kop: blok.querySelector(":scope > h2"), inhoud: blok.querySelector(":scope > h2 + *") };
    })
    .filter(function (blok) {
      return blok.kop && blok.inhoud;
    });

  if (!chevron || !blokken.length) return;

  blokken.forEach(function (blok, i) {
    if (!blok.inhoud.id) blok.inhoud.id = "page-aside-blok-" + (i + 1);
  });

  function maakKnop(blok) {
    if (blok.kop.querySelector(".page-aside-toggle")) return;
    const knop = document.createElement("button");
    knop.type = "button";
    knop.className = "page-aside-toggle";
    knop.setAttribute("aria-expanded", "false");
    knop.setAttribute("aria-controls", blok.inhoud.id);
    knop.append(chevron.content.cloneNode(true), ...blok.kop.childNodes);
    knop.addEventListener("click", function () {
      const open = knop.getAttribute("aria-expanded") === "true";
      knop.setAttribute("aria-expanded", String(!open));
      blok.inhoud.hidden = open;
    });
    blok.kop.append(knop);
    blok.inhoud.hidden = true;
  }

  function haalKnopWeg(blok) {
    const knop = blok.kop.querySelector(".page-aside-toggle");
    if (!knop) return;
    knop.querySelector("svg").remove();
    blok.kop.replaceChildren(...knop.childNodes);
    blok.inhoud.hidden = false;
  }

  const smal = window.matchMedia("(max-width: 949px)");

  function pasAan() {
    blokken.forEach(smal.matches ? maakKnop : haalKnopWeg);
  }

  smal.addEventListener("change", pasAan);
  pasAan();
})();
