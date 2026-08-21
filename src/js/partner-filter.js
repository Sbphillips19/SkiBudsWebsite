/**
 * Partners page category filter buttons. No-ops when no filter buttons exist.
 */
(function () {
  'use strict';

  var buttons = document.querySelectorAll('.partner-filter-btn');
  var cards = document.querySelectorAll('.partner');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = this.dataset.filter;

      // Update button states
      buttons.forEach(function (b) {
        b.classList.toggle('partner-filter-btn--active', b === btn);
        b.classList.toggle('btn', b === btn);
        b.classList.toggle('btn--quiet', b !== btn);
        b.setAttribute('aria-pressed', b === btn);
      });

      // Filter cards
      cards.forEach(function (card) {
        var category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();
