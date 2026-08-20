(function () {
  'use strict';

  /* ---------- Theme toggle: default to light, no storage ---------- */
  var themeToggle = document.querySelector('[data-theme-toggle]');
  var root = document.documentElement;
  var theme = 'light';
  root.setAttribute('data-theme', theme);

  function paintToggleIcon() {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    themeToggle.innerHTML =
      theme === 'dark'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  paintToggleIcon();
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      paintToggleIcon();
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  var hamburgerIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
  var closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      menuToggle.innerHTML = isOpen ? closeIcon : hamburgerIcon;
    });
    mobileMenu.querySelectorAll('[data-menu-link]').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = hamburgerIcon;
      });
    });
  }

  /* ---------- Header hide-on-scroll ---------- */
  var header = document.querySelector('[data-header]');
  var lastScroll = window.scrollY;
  window.addEventListener(
    'scroll',
    function () {
      var current = window.scrollY;
      if (!header) return;
      header.classList.toggle('is-scrolled', current > 8);
      if (current > lastScroll && current > 120) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
      lastScroll = current;
    },
    { passive: true }
  );

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Profit counter animation (setInterval – works on all devices) ---------- */
  function animateProfitCounter() {
    var counter = document.getElementById('profit-counter');
    if (!counter) return;

    // Only run once
    if (counter.dataset.animated === 'true') return;
    counter.dataset.animated = 'true';

    var target = 18.4;
    var current = 0;
    var duration = 1800; // ms
    var interval = 20; // ms per step
    var steps = duration / interval;
    var increment = target / steps;

    var timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      // Show the full "18.4%" with the percent sign
      counter.textContent = current.toFixed(1) + '%';
    }, interval);
  }

  // Use IntersectionObserver to start counter when hero becomes visible
  var heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateProfitCounter();
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    revealObserver.observe(heroVisual);
  } else if (heroVisual) {
    // Fallback: run immediately
    animateProfitCounter();
  }

  /* ---------- Contact form (Formspree) ---------- */
  var form = document.getElementById('interest-form');
  var statusEl = document.querySelector('[data-form-status]');
  var successEl = document.querySelector('[data-form-success]');
  var submitLabel = document.querySelector('[data-submit-label]');

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = 'form-status is-visible ' + type;
  }

  function clearErrors() {
    if (!form) return;
    form.querySelectorAll('.form-row').forEach(function (row) {
      row.classList.remove('has-error');
    });
  }

  function validate() {
    var valid = true;
    var name = form.querySelector('#name');
    var email = form.querySelector('#email');
    if (!name.value.trim()) {
      name.closest('.form-row').classList.add('has-error');
      valid = false;
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.closest('.form-row').classList.add('has-error');
      valid = false;
    }
    return valid;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      var honeypot = form.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) {
        return;
      }

      if (!validate()) {
        setStatus('Please fill in the required fields above.', 'error');
        return;
      }

      var submitBtn = form.querySelector('.form-submit');
      submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Sending…';

      var formData = new FormData(form);
      var data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message') || ''
      };

      fetch('https://formspree.io/f/xwleypvo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(function () {
          submitBtn.disabled = false;
          if (submitLabel) submitLabel.textContent = 'Send message';
          form.style.display = 'none';
          if (successEl) successEl.classList.add('is-visible');
        })
        .catch(function () {
          submitBtn.disabled = false;
          if (submitLabel) submitLabel.textContent = 'Send message';
          setStatus('Something went wrong. Please try again.', 'error');
        });
    });
  }

  /* ---------- Lucide icons (if present) ---------- */
  if (window.lucide) {
    window.lucide.createIcons();
  }
})();
