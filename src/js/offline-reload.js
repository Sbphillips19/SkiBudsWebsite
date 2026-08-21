/**
 * Offline page: auto-retry reload when the connection restores.
 * No-op elsewhere (page-scoped include).
 */
(function () {
  'use strict';

  window.addEventListener('online', function () {
    window.location.reload();
  });
})();
