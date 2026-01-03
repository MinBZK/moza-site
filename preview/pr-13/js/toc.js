(function () {
  const headings = Array.from(document.querySelectorAll("article h2[id], article h3[id], article h4[id]"));
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
