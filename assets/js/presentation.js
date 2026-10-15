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
    });

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
