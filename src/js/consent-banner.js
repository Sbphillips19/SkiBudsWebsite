/**
 * Cookie consent banner. Renders only when no decision has been recorded;
 * Accept/Decline write the analytics_consent cookie (Secure, SameSite=Lax).
 * Accept loads analytics in place — no full page reload.
 */
(function () {
  'use strict';

  if (!window.getConsent()) {
    var banner = document.createElement('div');
    banner.id = 'cookie-consent';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.style.cssText =
      'position:fixed;bottom:0;left:0;right:0;background:var(--surface);border-top:1px solid var(--line);padding:1.5rem;z-index:1000;box-shadow:0 -4px 20px rgba(0,0,0,0.1);';
    banner.innerHTML = `
      <div style="max-width:1120px;margin:0 auto;display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;">
        <p style="margin:0;flex:1;min-width:250px;">We value your privacy. We use analytics to improve your experience. <a href="/privacy" style="color:var(--blue);">Learn more</a>.</p>
        <div style="display:flex;gap:0.75rem;">
          <button id="accept-analytics" class="btn" style="font-size:0.875rem;">Accept</button>
          <button id="decline-analytics" class="btn btn--quiet" style="font-size:0.875rem;">Decline</button>
        </div>
      </div>`;
    document.body.appendChild(banner);

    document.getElementById('accept-analytics').addEventListener('click', function () {
      document.cookie = 'analytics_consent=true;path=/;max-age=31536000;SameSite=Lax;Secure';
      banner.remove();
      // Load analytics in place — no full page reload
      if (window.loadPlausible) window.loadPlausible();
    });

    document.getElementById('decline-analytics').addEventListener('click', function () {
      document.cookie = 'analytics_consent=false;path=/;max-age=31536000;SameSite=Lax;Secure';
      banner.remove();
    });
  }
})();
