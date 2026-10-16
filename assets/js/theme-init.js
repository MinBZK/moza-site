(function () {
  var theme = null;
  try {
    theme = localStorage.getItem('theme');
  } catch (e) {}
  if (theme) {
    document.documentElement.setAttribute('data-scheme', theme);
  }
})();
