/**
 * BleacherBeds - Main JavaScript
 * Minimal, performance-focused interactions
 */

(function () {
  'use strict';

  // Mobile Navigation Toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open');
    });

    // Close menu on link click (mobile)
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  // FAQ Accordion
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var dt = item.querySelector('dt');
    if (!dt) return;

    dt.setAttribute('role', 'button');
    dt.setAttribute('tabindex', '0');

    function toggle() {
      var isOpen = item.classList.contains('is-open');

      // Close all other items
      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('is-open');
      }
    }

    dt.addEventListener('click', toggle);
    dt.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Open first FAQ item by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('is-open');
  }
})();
