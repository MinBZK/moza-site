(function () {
  const toc = document.getElementById("toc");
  const toggleButton = document.querySelector(".toc-toggle");
  const STORAGE_KEY = "toc-open";

  // TOC toggle functionaliteit
  if (toc && toggleButton) {
    // Herstel voorkeur uit localStorage
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState === "true") {
      openToc();
    }

    toggleButton.addEventListener("click", function () {
      const isOpen = toc.classList.contains("is-open");
      if (isOpen) {
        closeToc();
      } else {
        openToc();
      }
    });

    function openToc() {
      toc.classList.add("is-open");
      toggleButton.setAttribute("aria-expanded", "true");
      toggleButton.querySelector(".visually-hidden").textContent =
        "Inhoudsopgave verbergen";
      localStorage.setItem(STORAGE_KEY, "true");
    }

    function closeToc() {
      toc.classList.remove("is-open");
      toggleButton.setAttribute("aria-expanded", "false");
      toggleButton.querySelector(".visually-hidden").textContent =
        "Inhoudsopgave tonen";
      localStorage.setItem(STORAGE_KEY, "false");
    }
  }

  // Active link highlighting
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
      const activeLink = document.querySelector(
        `.toc a[href="#${current.id}"]`
      );
      if (activeLink) activeLink.classList.add("active");
    }
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
})();
