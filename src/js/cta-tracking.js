/**
 * Sitewide funnel-event delegation. Fires only when consent was granted and
 * Plausible loaded (window.trackEvent no-ops otherwise).
 */
(function () {
  'use strict';

  // Contact actions sitewide: mailto links, once per pageload
  var contactSent = false;
  document.addEventListener(
    'click',
    function (e) {
      if (contactSent) return;
      var target = e.target;
      var link = target && target.closest ? target.closest('a[href^="mailto:"]') : null;
      if (link) {
        contactSent = true;
        if (window.trackEvent) window.trackEvent('Contact Click', { page: location.pathname });
      }
    },
    true
  );

  // Generic CTA hook: elements carrying data-track-cta fire 'App CTA Click' once per element.
  // Tag app/download/launch CTAs with data-track-cta="<label>"; no store links exist pre-launch.
  document.addEventListener('click', function (e) {
    var target = e.target;
    var el = target && target.closest ? target.closest('[data-track-cta]') : null;
    if (!el || el.dataset.ctaTracked) return;
    el.dataset.ctaTracked = '1';
    if (window.trackEvent)
      window.trackEvent('App CTA Click', {
        cta_label: el.dataset.trackCta,
        page: location.pathname,
      });
  });
})();
