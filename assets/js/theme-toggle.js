(function () {
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

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
});
