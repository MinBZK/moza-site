window.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.querySelector('.close-button');
  if (closeButton) {
    const fromSite = document.referrer.startsWith(location.origin);
    closeButton.addEventListener('click', () => {
      if (fromSite) history.back();
      else location.href = '/';
    });
  }

  if (typeof Reveal !== 'undefined') {
    Reveal.initialize({
      embedded: true,
      // Een toetscode met waarde null laat reveal zijn eigen binding overslaan.
      keyboard: {
        58: null, 59: null, 63: null, 66: null, 70: null, 71: null,
        72: null, 74: null, 75: null, 76: null, 78: null, 79: null,
        80: null, 86: null, 190: null, 191: null
      },
      // Reveal roept preventDefault aan op spatie; zonder dit bladert Tab+spatie
      // op een knop door in plaats van die knop te bedienen.
      keyboardCondition: e =>
        !(e.key === ' ' || e.key === 'Enter') || !e.target.closest?.('a, button'),
      controls: false,
      progress: true,
      overview: true,
      hash: true
    }).then(() => {
      // Check logo visibility on initial load
      updateLogoVisibility(Reveal.getCurrentSlide());
      vertaalBediening();
      haalApplicatierolWeg();
      maakVoortgangsbalkDecoratief();
      volgDiaStaten();
      regelPresentatiefuncties();
      regelNavigatieknoppen();
      volgTekstgrootte();
    });

    const macOS = /mac|iphone|ipad|ipod/i.test(
      navigator.userAgentData?.platform || navigator.platform || ''
    );
    const tooltip = letter => `(${macOS ? '\u2325' : 'Alt'} + ${letter})`;

    function regelPresentatiefuncties() {
      const schermKnop = document.querySelector('[data-volledig-scherm]');
      const overzichtKnop = document.querySelector('[data-overzicht]');

      function toonVolledigScherm() {
        const aan = Boolean(document.fullscreenElement);
        schermKnop.toggleAttribute('data-aan', aan);
        const tekst = aan ? 'Volledig scherm verlaten' : 'Volledig scherm';
        const label = `${tekst} ${tooltip('F')}`;
        schermKnop.setAttribute('aria-label', label);
        schermKnop.setAttribute('title', label);
      }

      function toonOverzicht() {
        const aan = Reveal.isOverview();
        overzichtKnop.toggleAttribute('data-aan', aan);
        const tekst = aan ? 'Dia-overzicht sluiten' : 'Dia-overzicht';
        const label = `${tekst} ${tooltip('O')}`;
        overzichtKnop.setAttribute('aria-label', label);
        overzichtKnop.setAttribute('title', label);
      }

      function wisselVolledigScherm() {
        if (document.fullscreenElement) document.exitFullscreen();
        else Reveal.getViewportElement().requestFullscreen?.().catch(() => {});
      }

      schermKnop.addEventListener('click', wisselVolledigScherm);
      overzichtKnop.addEventListener('click', () => Reveal.toggleOverview());
      document.addEventListener('fullscreenchange', toonVolledigScherm);
      Reveal.on('overviewshown', toonOverzicht);
      Reveal.on('overviewhidden', toonOverzicht);
      toonVolledigScherm();
      toonOverzicht();

      document.addEventListener('keydown', e => {
        if (!e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return;
        // Option maakt op macOS een ander teken van e.key (Option+F geeft ƒ), dus e.code
        switch (e.code) {
          case 'KeyF': e.preventDefault(); wisselVolledigScherm(); break;
          case 'KeyO': e.preventDefault(); Reveal.toggleOverview(); break;
        }
      });
    }

    function regelNavigatieknoppen() {
      const wortel = document.querySelector('.presentatie-navigatie');
      const knoppen = {
        omhoog: wortel.querySelector('[data-omhoog]'),
        links: wortel.querySelector('[data-links]'),
        rechts: wortel.querySelector('[data-rechts]'),
        omlaag: wortel.querySelector('[data-omlaag]')
      };
      const stapels = Boolean(document.querySelector('.slides > section > section'));
      wortel.toggleAttribute('data-stapels', stapels);
      knoppen.omhoog.hidden = knoppen.omlaag.hidden = !stapels;

      // Zelfde regels als Reveal: fragmenten horen bij omhoog en omlaag in een
      // stapel, anders bij links en rechts.
      function werkNavigatieBij() {
        const routes = Reveal.availableRoutes();
        const fragmenten = Reveal.availableFragments();
        const huidige = Reveal.getCurrentSlide();
        const inStapel = Reveal.isVerticalSlide(huidige) &&
          huidige.parentElement.querySelectorAll(':scope > section').length > 1;
        const zet = (naam, aan) => { knoppen[naam].disabled = !aan; };
        zet('links', routes.left || (!inStapel && fragmenten.prev));
        zet('rechts', routes.right || (!inStapel && fragmenten.next));
        zet('omhoog', routes.up || (inStapel && fragmenten.prev));
        zet('omlaag', routes.down || (inStapel && fragmenten.next));
        const focus = document.activeElement;
        if (focus?.disabled && wortel.contains(focus)) {
          Object.values(knoppen).find(k => !k.hidden && !k.disabled)?.focus();
        }
      }

      knoppen.omhoog.addEventListener('click', () => Reveal.up());
      knoppen.links.addEventListener('click', () => Reveal.left());
      knoppen.rechts.addEventListener('click', () => Reveal.right());
      knoppen.omlaag.addEventListener('click', () => Reveal.down());
      for (const gebeurtenis of ['slidechanged', 'fragmentshown', 'fragmenthidden', 'ready']) {
        Reveal.on(gebeurtenis, werkNavigatieBij);
      }
      werkNavigatieBij();
    }

    let scrollBreedte;

    // De maat die de dia in de leesmodus krijgt: de 32px van .reveal, maal de
    // schaal die Reveal anders op de dia zou zetten (zelfde rekensom als daar),
    // maal de vergroting die de gebruiker heeft ingesteld.
    function leesmaat(wortel) {
      const config = Reveal.getConfig();
      const marge = 1 - config.margin;
      const schaal = Math.min(
        (window.innerWidth * marge) / config.width,
        (window.innerHeight * marge) / config.height
      );
      const begrensd = Math.min(Math.max(schaal, config.minScale), config.maxScale);
      return 32 * begrensd * (wortel / 16);
    }

    // Boven de 16px loopt de dia als gewone tekst door de pagina (zie reveal.css)
    // en laat Reveal de toetsen los, zodat de pijltoetsen schuiven.
    function pasTekstgrootteToe() {
      const wortel = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const vergroot = wortel > 16.5;
      if (vergroot) document.documentElement.style.setProperty('--leesmaat', leesmaat(wortel) + 'px');
      else document.documentElement.style.removeProperty('--leesmaat');
      document.documentElement.classList.toggle('tekst-vergroot', vergroot);
      // De scrollweergave schaalt elke dia opnieuw passend en zou op een smal
      // scherm over de leesmodus heen komen.
      Reveal.configure({
        keyboard: !vergroot,
        scrollActivationWidth: vergroot ? null : scrollBreedte
      });
      if (vergroot && Reveal.isScrollView()) Reveal.toggleScrollView(false);
      Reveal.layout();
    }

    // Een wijziging van de basislettergrootte geeft geen event; de maat van een
    // element in rem wel.
    function volgTekstgrootte() {
      scrollBreedte = Reveal.getConfig().scrollActivationWidth;
      const meter = document.createElement('div');
      meter.className = 'tekstmeter';
      meter.setAttribute('aria-hidden', 'true');
      document.body.append(meter);
      new ResizeObserver(pasTekstgrootteToe).observe(meter);
      window.addEventListener('resize', pasTekstgrootteToe);
    }

    // Reveal.js zet Engelse aria-labels op zijn knoppen. Ze staan hardgecodeerd
    // in de bundel en kennen geen taalinstelling.
    function vertaalBediening() {
      const hervatten = document.querySelector('.resume-button');
      if (hervatten) {
        hervatten.textContent = 'Presentatie hervatten';
      }
    }

    // Reveal zet role="application" op zijn wrapper, zonder naam. Dat schakelt
    // de leesnavigatie van een schermlezer uit.
    function haalApplicatierolWeg() {
      Reveal.getRevealElement().removeAttribute('role');
    }

    function maakVoortgangsbalkDecoratief() {
      const balk = document.querySelector('.reveal .progress');
      if (balk) {
        balk.setAttribute('aria-hidden', 'true');
      }
    }

    function werkDiaStatenBij() {
      const secties = document.querySelectorAll('.slides section');
      const scrollweergave = Reveal.isScrollView();
      const huidige = Reveal.getCurrentSlide();
      for (const sectie of secties) {
        if (scrollweergave) {
          sectie.inert = false;
          if (sectie.getBoundingClientRect().height > 10) {
            sectie.removeAttribute('aria-hidden');
            sectie.removeAttribute('hidden');
          }
        } else {
          sectie.inert = !(sectie === huidige || sectie.contains(huidige));
        }
      }
    }

    function volgDiaStaten() {
      const slides = document.querySelector('.slides');
      if (!slides) return;
      let gepland = false;
      const waarnemer = new MutationObserver(() => {
        if (gepland) return;
        gepland = true;
        requestAnimationFrame(() => {
          gepland = false;
          waarnemer.disconnect();
          werkDiaStatenBij();
          waarnemer.observe(slides, opties);
        });
      });
      const opties = { subtree: true, attributes: true, attributeFilter: ['aria-hidden', 'hidden', 'class'] };
      werkDiaStatenBij();
      waarnemer.observe(slides, opties);
      window.addEventListener('resize', werkDiaStatenBij);
    }

    function updateLogoVisibility(slide) {
      const logo = document.getElementById('header-logo');
      if (logo) {
        if (slide && slide.classList.contains('hide-logo')) {
          logo.classList.add('logo-hidden');
        } else {
          logo.classList.remove('logo-hidden');
        }
      }
    }

    // Hide logo when slide has .hide-logo class
    Reveal.on('slidechanged', event => {
      updateLogoVisibility(event.currentSlide);
    });
  }
});
