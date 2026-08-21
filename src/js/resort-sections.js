/**
 * Resort/section interaction tracking on the homepage: fires once per section
 * per pageload when 50% visible, consent-aware via window.trackEvent.
 * No-ops when no tracked sections exist or IntersectionObserver is missing.
 */
(function () {
  'use strict';

  var sections = document.querySelectorAll('#status, #about, #levels');
  if (!sections.length || !('IntersectionObserver' in window)) return;

  var seen = Object.create(null);
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        if (seen[id]) return;
        seen[id] = true;
        observer.unobserve(entry.target);
        if (window.trackEvent) {
          window.trackEvent('Resort Section View', { section_id: id, page: '/' });
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
