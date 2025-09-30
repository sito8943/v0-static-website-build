// script.js
// Minimal, accessible mobile nav toggle with ARIA updates
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  if (!toggle || !nav) return;

  function setExpanded(expanded) {
    toggle.setAttribute('aria-expanded', String(expanded));
    nav.classList.toggle('is-open', expanded);
  }

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!expanded);
  });

  // Close on Escape when open
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setExpanded(false);
      toggle.focus();
    }
  });

  // Ensure correct state on resize (nav always visible on desktop)
  const mq = window.matchMedia('(min-width: 48rem)');
  function handleMQ(e) {
    if (e.matches) {
      // Desktop: ensure nav visible and aria state reset
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }
  mq.addEventListener ? mq.addEventListener('change', handleMQ) : mq.addListener(handleMQ);
})();
