// Terug-knop op rapportage-pagina's: navigeert terug via history.back() als
// er een same-origin referrer is, anders naar de MOZa-site root.
document.addEventListener('DOMContentLoaded', () => {
  const back = document.getElementById('moza-nav');
  if (!back) return;
  const sameOriginRef = document.referrer && document.referrer.startsWith(location.origin);
  back.textContent = sameOriginRef ? '← Terug' : '← Naar MOZa site';
  back.addEventListener('click', () => {
    if (sameOriginRef) history.back();
    else location.href = '/';
  });
});
