/**
 * Content engagement tracking for blog posts: fires once when the reader
 * scrolls past 50% of the article, consent-aware via window.trackEvent.
 * No-ops when no blog post article is present.
 */
(function () {
  'use strict';

  var article = document.querySelector('.blog-post');
  if (!article) return;

  var sent = false;
  function check() {
    if (sent) return;
    var rect = article.getBoundingClientRect();
    if (rect.top + rect.height * 0.5 <= (window.innerHeight || document.documentElement.clientHeight)) {
      sent = true;
      window.removeEventListener('scroll', check);
      if (window.trackEvent) {
        window.trackEvent('Content Engaged', { page: location.pathname });
      }
    }
  }
  window.addEventListener('scroll', check, { passive: true });
  check();
})();
