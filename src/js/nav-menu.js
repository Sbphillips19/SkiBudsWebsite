/**
 * Mobile navigation disclosure: open/close, focus management, focus trap,
 * Escape and outside-click close. No-ops when nav elements are absent.
 */
(function () {
  'use strict';

  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  var lastFocusedElement = null;

  if (!toggle || !menu) return;

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('nav__menu--open');
    document.body.classList.add('nav-open');
    lastFocusedElement = document.activeElement;
    // Focus first focusable element in menu
    var firstFocusable = menu.querySelector(
      'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) firstFocusable.focus();
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('nav__menu--open');
    document.body.classList.remove('nav-open');
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Focus trap for mobile menu
  menu.addEventListener('keydown', function (e) {
    if (!menu.classList.contains('nav__menu--open')) return;

    var focusableElements = menu.querySelectorAll(
      'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    var firstElement = focusableElements[0];
    var lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('nav__menu--open')) {
      closeMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (
      menu.classList.contains('nav__menu--open') &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeMenu();
    }
  });
})();
