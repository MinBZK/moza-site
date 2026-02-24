(function () {
  var sources = document.querySelectorAll('pre.mermaid');
  var original = [];
  var fontStyleCache;
  var renderGeneration = 0;
  sources.forEach(function (el) { original.push(el.textContent); });

  mermaid.registerIconPacks([
    {
      name: 'tabler',
      loader: function () {
        return fetch('{{ .iconsUrl }}')
          .then(function (r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
          })
          .catch(function () { return {}; });
      },
    },
  ]);

  var probe = document.createElement('div');
  probe.style.display = 'none';
  probe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(probe);

  function resolveToken(name) {
    probe.style.color = 'var(' + name + ')';
    var rgb = getComputedStyle(probe).color;
    var m = rgb.match(/(\d+)/g);
    if (!m || m.length < 3) return '#000000';
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
    var thisGeneration = ++renderGeneration;
    var containers = document.querySelectorAll('.mermaid-container');

    if (!sources[0] || !sources[0].hasAttribute('data-processed')) {
      containers.forEach(function (c) { c.style.visibility = 'hidden'; });
    }

    sources.forEach(function (el, i) {
      el.style.transition = '';
      el.textContent = original[i];
      el.removeAttribute('data-processed');
    });
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
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
    mermaid.run({ nodes: sources }).then(function () {
      if (thisGeneration !== renderGeneration) return;
      containers.forEach(function (c) {
        c.style.visibility = '';
        c.style.colorScheme = '';
      });
      sources.forEach(function (el) {
        var svg = el.querySelector('svg');
        if (svg && !svg.getAttribute('role')) svg.setAttribute('role', 'img');
      });
      requestAnimationFrame(function () {
        if (thisGeneration !== renderGeneration) return;
        sources.forEach(function (el) { el.style.opacity = ''; });
      });
      bindDownloadButtons();
    }).catch(function () {
      if (thisGeneration !== renderGeneration) return;
      containers.forEach(function (c) {
        c.style.visibility = '';
        c.style.colorScheme = '';
      });
      sources.forEach(function (el) { el.style.opacity = ''; });
    });
  }

  function bindDownloadButtons() {
    var buttons = document.querySelectorAll('.mermaid-download');
    buttons.forEach(function (btn, i) {
      var fresh = btn.cloneNode(true);
      btn.parentNode.replaceChild(fresh, btn);
      fresh.addEventListener('click', function () {
        downloadDiagram(fresh, i);
      });
    });
  }

  function embedFonts() {
    if (fontStyleCache !== undefined) return Promise.resolve(fontStyleCache);
    var faces = [];
    for (var i = 0; i < document.styleSheets.length; i++) {
      var rules;
      try { rules = document.styleSheets[i].cssRules; } catch (e) { continue; }
      for (var j = 0; j < rules.length; j++) {
        try {
          if (rules[j].type !== CSSRule.FONT_FACE_RULE) continue;
          var family = rules[j].style.getPropertyValue('font-family').replace(/"/g, '');
          if (family !== 'RO-Sans') continue;
          var src = rules[j].style.getPropertyValue('src');
          var match = src.match(/url\("?([^")\s]+)"?\)/);
          if (match) faces.push({
            url: match[1],
            weight: rules[j].style.getPropertyValue('font-weight'),
            style: rules[j].style.getPropertyValue('font-style'),
          });
        } catch (e) { continue; }
      }
    }
    if (!faces.length) { fontStyleCache = ''; return Promise.resolve(''); }
    return Promise.all(faces.map(function (face) {
      return fetch(face.url).then(function (r) { return r.arrayBuffer(); }).then(function (buf) {
        var binary = '';
        var bytes = new Uint8Array(buf);
        for (var k = 0; k < bytes.length; k++) binary += String.fromCharCode(bytes[k]);
        return '@font-face{font-family:"RO-Sans";src:url("data:font/woff;base64,'
          + btoa(binary) + '") format("woff");font-weight:' + face.weight
          + ';font-style:' + face.style + '}';
      }).catch(function () { return ''; });
    })).then(function (rules) {
      fontStyleCache = rules.join('');
      return fontStyleCache;
    });
  }

  function downloadDiagram(btn, index) {
    var container = btn.closest('.mermaid-container');
    var svg = container.querySelector('pre.mermaid svg');
    if (!svg) return;

    embedFonts().then(function (fontCSS) {
      var svgClone = svg.cloneNode(true);
      svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      if (fontCSS) {
        var styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        styleEl.textContent = fontCSS;
        svgClone.insertBefore(styleEl, svgClone.firstChild);
      }

      var vb = svg.viewBox.baseVal;
      var pad = 20;
      var w = vb.width + pad * 2;
      var h = vb.height + pad * 2;
      svgClone.setAttribute('viewBox',
        (vb.x - pad) + ' ' + (vb.y - pad) + ' ' + w + ' ' + h);
      svgClone.setAttribute('width', w);
      svgClone.setAttribute('height', h);
      svgClone.style.cssText = '';

      var xml = new XMLSerializer().serializeToString(svgClone);

      var bgMuted = resolveToken('--color-bg-muted');
      var bgPage = resolveToken('--color-bg-page');
      xml = xml.split(bgMuted).join(bgPage);
      var svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);

      var img = new Image();
      img.onerror = function () {};
      img.onload = function () {
        var scale = 3;
        var canvas = document.createElement('canvas');
        canvas.width = w * scale;
        canvas.height = h * scale;
        var ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);

        ctx.fillStyle = resolveToken('--color-bg-page');
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        canvas.toBlob(function (pngBlob) {
          if (!pngBlob) return;
          var url = URL.createObjectURL(pngBlob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'diagram-' + (index + 1) + '.png';
          a.click();
          setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
        }, 'image/png');
      };
      img.src = svgUrl;
    });
  }

  render();

  var renderTimer;
  function onThemeChange() {
    var oldScheme = isDark() ? 'light' : 'dark';
    document.querySelectorAll('.mermaid-container').forEach(function (c) {
      c.style.colorScheme = oldScheme;
    });
    sources.forEach(function (el) {
      el.style.transition = 'none';
      el.style.opacity = '0';
    });
    clearTimeout(renderTimer);
    renderTimer = setTimeout(render, 50);
  }

  new MutationObserver(onThemeChange).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
})();
