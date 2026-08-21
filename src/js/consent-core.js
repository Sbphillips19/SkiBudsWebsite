/**
 * Consent core — single source of truth for analytics consent state and the
 * Plausible loader. Loaded first; every other script depends on these globals.
 * No-op until consent is granted: declined users generate zero network calls.
 */
(function () {
  'use strict';

  // Exact cookie-token match (no prefix collisions)
  window.getConsent = function () {
    var row = document.cookie.split('; ').find(function (r) {
      return r.indexOf('analytics_consent=') === 0;
    });
    return row ? row.split('=')[1] : null;
  };

  // Load Plausible and expose the queue; safe to call repeatedly
  window.loadPlausible = function () {
    if (document.querySelector('script[src*="plausible.io"]')) return;
    var script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = 'skibudsapp.com';
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
  };

  // Reusable funnel-event helper. No-op until Plausible is loaded (i.e. consent granted);
  // every tracked interaction funnels through here so declined users generate zero calls.
  window.trackEvent = function (name, props) {
    if (typeof window.plausible === 'function') {
      window.plausible(name, { props: props || {} });
    }
  };

  if (window.getConsent() === 'true') {
    window.loadPlausible();
  }
})();
