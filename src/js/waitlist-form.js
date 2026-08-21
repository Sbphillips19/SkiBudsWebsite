/**
 * Homepage waitlist form: validation, Buttondown POST, status messaging, and
 * funnel events (Waitlist Intent / Signup / Error). No-ops when no waitlist
 * form is present.
 */
(function () {
  'use strict';

  var form = document.querySelector('.waitlist-form');
  var emailInput = document.getElementById('email-input');
  var status = document.querySelector('.form-status');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var email = emailInput.value.trim();
    if (!email || !email.includes('@')) {
      status.textContent = 'Please enter a valid email.';
      status.style.color = '#fff';
      return;
    }
    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';
    status.textContent = '';
    if (window.trackEvent) window.trackEvent('Waitlist Intent', { page: '/' });
    try {
      var response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, tags: ['ski-buds-waitlist'] }),
      });
      if (response.ok) {
        status.textContent = "You're on the list! 🎿";
        status.style.color = '#fff';
        emailInput.value = '';
        if (window.trackEvent) window.trackEvent('Waitlist Signup', { page: '/' });
      } else {
        var err = await response.json().catch(function () {
          return {};
        });
        status.textContent = err.error || 'Something went wrong. Try again.';
        status.style.color = '#fff';
        if (window.trackEvent) {
          window.trackEvent('Waitlist Error', { stage: 'api_' + response.status, page: '/' });
        }
      }
    } catch (err) {
      status.textContent = 'Network error. Please try again.';
      status.style.color = '#fff';
      if (window.trackEvent) window.trackEvent('Waitlist Error', { stage: 'network', page: '/' });
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Join waitlist';
    }
  });
})();
