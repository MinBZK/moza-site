(function () {
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      let targetTheme = 'light';

      if (!currentTheme) {
        targetTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
      } else {
        targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      }

      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
    });
  }

  // Secondary nav toggle (for alternative_nav)
  const menuToggle = document.querySelector('.nav-menu-toggle');
  const menuBar = document.getElementById('secondary-nav');
  if (menuToggle && menuBar) {
    menuToggle.addEventListener('click', function() {
      const expanded = menuBar.hidden;
      menuBar.hidden = !expanded;
      this.setAttribute('aria-expanded', expanded);
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !menuBar.hidden) {
        menuBar.hidden = true;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }

  // Sidebar toggle (mobile)
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebarContent = document.getElementById('sidebar-nav-content');
  if (sidebarToggle && sidebarContent) {
    sidebarToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    });
  }

  // Sluit mobiele menu's bij resize naar desktop
  const desktopBreakpoint = 900;
  let wasDesktop = window.innerWidth >= desktopBreakpoint;

  window.addEventListener('resize', () => {
    const isDesktop = window.innerWidth >= desktopBreakpoint;

    // Alleen actie bij overgang mobiel → desktop
    if (isDesktop && !wasDesktop) {
      document.querySelectorAll('.toggle[aria-expanded="true"], .sidebar-toggle[aria-expanded="true"]').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        if (btn.classList.contains('toggle')) {
          btn.setAttribute('aria-label', 'Menu openen');
        }
      });
    }

    wasDesktop = isDesktop;
  });
});
