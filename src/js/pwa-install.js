/**
 * PWA install prompt. Shows the banner 30s after beforeinstallprompt unless
 * the user previously dismissed it; tracks pwa_install / pwa_installed.
 */
(function () {
  'use strict';

  var deferredPrompt;
  var installBanner = document.createElement('div');
  installBanner.id = 'pwa-install-banner';
  installBanner.style.cssText =
    'position:fixed;bottom:0;left:0;right:0;background:var(--surface);border-top:1px solid var(--line);padding:1rem 1.5rem;z-index:999;display:none;box-shadow:0 -4px 20px rgba(0,0,0,0.1);';
  installBanner.innerHTML = `
    <div style="max-width:1120px;margin:0 auto;display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;">
      <div style="flex:1;min-width:250px;">
        <strong style="color:var(--text);">Install SkiBuds</strong>
        <p style="margin:0.25rem 0 0;font-size:0.875rem;color:var(--text-muted);">Add to home screen for offline access & faster loads.</p>
      </div>
      <div style="display:flex;gap:0.75rem;">
        <button id="pwa-install-btn" class="btn" style="font-size:0.875rem;">Install</button>
        <button id="pwa-dismiss-btn" class="btn btn--quiet" style="font-size:0.875rem;">Later</button>
      </div>`;
  document.body.appendChild(installBanner);

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;

    // Check if user previously dismissed
    var dismissed = localStorage.getItem('pwa-install-dismissed');
    if (!dismissed) {
      // Show after 30 seconds
      setTimeout(function () {
        installBanner.style.display = 'block';
      }, 30000);
    }
  });

  document.getElementById('pwa-install-btn').addEventListener('click', function () {
    installBanner.style.display = 'none';
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choiceResult) {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA install accepted');
          // Track install event
          if (window.plausible) window.plausible('pwa_install');
        }
        deferredPrompt = null;
      });
    }
  });

  document.getElementById('pwa-dismiss-btn').addEventListener('click', function () {
    installBanner.style.display = 'none';
    localStorage.setItem('pwa-install-dismissed', 'true');
  });

  window.addEventListener('appinstalled', function () {
    installBanner.style.display = 'none';
    console.log('PWA installed');
    if (window.plausible) window.plausible('pwa_installed');
  });
})();
