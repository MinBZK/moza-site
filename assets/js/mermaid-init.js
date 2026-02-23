(function () {
  var sources = document.querySelectorAll('pre.mermaid');
  var original = [];
  sources.forEach(function (el) { original.push(el.textContent); });

  mermaid.registerIconPacks([
    {
      name: 'tabler',
      loader: function () {
        return fetch('{{ .iconsUrl }}')
          .then(function (r) { return r.json(); });
      },
    },
  ]);

  var probe = document.createElement('div');
  probe.style.display = 'none';
  document.body.appendChild(probe);

  function resolveToken(name) {
    probe.style.color = 'var(' + name + ')';
    var rgb = getComputedStyle(probe).color;
    var m = rgb.match(/(\d+)/g);
    return '#' + m.slice(0, 3).map(function (v) {
      return ('0' + parseInt(v).toString(16)).slice(-2);
    }).join('');
  }

  function isDark() {
    var theme = document.documentElement.getAttribute('data-theme');
    if (theme) return theme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function render() {
    sources.forEach(function (el, i) {
      el.textContent = original[i];
      el.removeAttribute('data-processed');
    });
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeCSS: '.flowchartTitleText { font-weight: bold; font-size: 1.4em; }',
      themeVariables: {
        darkMode: isDark(),
        primaryColor: resolveToken('--color-bg-info'),
        primaryTextColor: resolveToken('--color-text'),
        primaryBorderColor: resolveToken('--color-primary'),
        lineColor: resolveToken('--color-primary'),
        secondaryColor: resolveToken('--color-bg-muted'),
        tertiaryColor: resolveToken('--color-bg-light'),
        edgeLabelBackground: resolveToken('--color-bg-muted'),
        fontFamily: getComputedStyle(document.documentElement)
          .getPropertyValue('--font-sans').trim(),
      },
    });
    mermaid.run({ nodes: sources });
  }

  render();

  var renderTimer;
  new MutationObserver(function () {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(render, 50);
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
})();
