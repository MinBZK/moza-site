window.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.querySelector('.close-button');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      history.back();
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
      controls: true,
      controlsTutorial: false,
      controlsBackArrows: 'visible',
      progress: true,
      overview: true,
      hash: true
    }).then(() => {
      // Check logo visibility on initial load
      updateLogoVisibility(Reveal.getCurrentSlide());
      vertaalBediening();
      maakVoortgangsbalkDecoratief();
      volgDiaStaten();
      regelPresentatiefuncties();
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

    // Reveal.js zet Engelse aria-labels op zijn knoppen. Ze staan hardgecodeerd
    // in de bundel en kennen geen taalinstelling.
    function vertaalBediening() {
      const labels = {
        '.navigate-left': 'Vorige slide',
        '.navigate-right': 'Volgende slide',
        '.navigate-up': 'Slide hierboven',
        '.navigate-down': 'Slide hieronder'
      };
      for (const [selector, label] of Object.entries(labels)) {
        for (const el of document.querySelectorAll(selector)) {
          el.setAttribute('aria-label', label);
        }
      }

      const hervatten = document.querySelector('.resume-button');
      if (hervatten) {
        hervatten.textContent = 'Presentatie hervatten';
      }
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
