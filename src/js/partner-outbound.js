/**
 * Partner outbound click tracking: delegated listener, once per link per
 * pageload, no preventDefault. Fires only when window.trackEvent exists
 * (consent-aware via consent-core.js). No-ops off the partners page.
 */
(function () {
  'use strict';

  document.addEventListener('click', function (e) {
    var target = e.target;
    var link =
      target && target.closest ? target.closest('.partner a[target="_blank"]') : null;
    if (!link || link.dataset.outboundTracked) return;
    link.dataset.outboundTracked = '1';
    var card = link.closest('.partner');
    var heading = card ? card.querySelector('h3') : null;
    var name = heading ? heading.textContent.trim() : '';
    if (window.trackEvent) {
      window.trackEvent('Partner Outbound', { partner_name: name, page: '/affiliates' });
    }
  });
})();
