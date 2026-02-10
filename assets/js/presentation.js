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
      progress: true,
      overview: true,
      hash: true
    }).then(() => {
      // Check logo visibility on initial load
      updateLogoVisibility(Reveal.getCurrentSlide());
    });

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
