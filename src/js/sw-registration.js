/**
 * Service worker registration with hourly update checks.
 */
(function () {
  'use strict';

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      try {
        navigator.serviceWorker
          .register('/sw.js')
          .then(function (registration) {
            // Check for updates periodically
            setInterval(
              function () {
                registration.update();
              },
              60 * 60 * 1000
            ); // Every hour
          })
          .catch(function (registrationError) {
            console.warn('SW registration failed: ', registrationError);
          });
      } catch (e) {
        console.warn('Service worker unavailable:', e);
      }
    });
  }
})();
