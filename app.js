(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  var hamburgerIcon = '<svg viewBox="0 0 24 24" style="width:22px;height:22px" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
  var closeIcon = '<svg viewBox="0 0 24 24" style="width:22px;height:22px" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
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
  window.addEventListener('scroll', function () {
    var current = window.scrollY;
    if (!header) return;
    header.classList.toggle('is-scrolled', current > 8);
    if (current > lastScroll && current > 120) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }
    lastScroll = current;
  }, { passive: true });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Balance count-up (bento card) ---------- */
  function animateBalance(el) {
    if (!el || el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    var target = parseFloat(el.getAttribute('data-target')) || 0;
    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return;
    }

    var duration = 1900;
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = (target * eased).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Bento micro-interactions ---------- */
  function runBentoMicro(card) {
    if (!card || card.dataset.micro === 'true') return;
    card.dataset.micro = 'true';

    var balance = card.querySelector('[data-balance]');
    if (balance) animateBalance(balance);

    card.querySelectorAll('[data-goal-fill]').forEach(function (fill, i) {
      var to = fill.style.getPropertyValue('--to') || '0%';
      setTimeout(function () { fill.style.width = to; }, 160 + i * 150);
    });

    var line = card.querySelector('[data-spark-line]');
    if (line && !prefersReducedMotion && typeof line.getTotalLength === 'function') {
      var len = line.getTotalLength();
      line.style.strokeDasharray = len;
      line.style.strokeDashoffset = len;
      line.getBoundingClientRect();
      line.style.transition = 'stroke-dashoffset 1.9s cubic-bezier(0.16,1,0.3,1)';
      line.style.strokeDashoffset = '0';
    }

    var area = card.querySelector('[data-spark-area]');
    if (area && !prefersReducedMotion) {
      area.style.opacity = '0';
      area.style.transition = 'opacity 1.2s ease 0.5s';
      area.getBoundingClientRect();
      area.style.opacity = '1';
    }

    card.querySelectorAll('.candle').forEach(function (c, i) {
      if (prefersReducedMotion) return;
      var h = c.style.height;
      c.style.height = '0%';
      c.style.transition = 'height 700ms cubic-bezier(0.16,1,0.3,1) ' + (i * 70) + 'ms';
      c.getBoundingClientRect();
      c.style.height = h;
    });
  }

  var bentoCards = document.querySelectorAll('.bento-card');
  if (bentoCards.length && 'IntersectionObserver' in window) {
    var bentoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runBentoMicro(entry.target);
          bentoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bentoCards.forEach(function (c) { bentoObserver.observe(c); });
  } else {
    bentoCards.forEach(runBentoMicro);
  }

  /* ---------- Bento hover tilt ---------- */
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
        card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
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
    form.querySelectorAll('.form-row').forEach(function (row) { row.classList.remove('has-error'); });
  }
  function validate() {
    var valid = true;
    var name = form.querySelector('#name');
    var email = form.querySelector('#email');
    if (!name.value.trim()) { name.closest('.form-row').classList.add('has-error'); valid = false; }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) { email.closest('.form-row').classList.add('has-error'); valid = false; }
    return valid;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();
      var honeypot = form.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) return;
      if (!validate()) { setStatus('Please fill in the required fields above.', 'error'); return; }

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
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (response) {
          if (response.ok) return response.json();
          throw new Error('Network response was not ok.');
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

  /* ---------- FAQ accordion (smooth height) ---------- */
  document.querySelectorAll('[data-faq]').forEach(function (item) {
    var answer = item.querySelector('.faq-answer');
    var summary = item.querySelector('summary');
    if (!answer || !summary) return;

    if (!item.open) answer.style.height = '0px';

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (prefersReducedMotion) { item.open = !item.open; return; }

      if (item.open) {
        answer.style.height = answer.scrollHeight + 'px';
        answer.getBoundingClientRect();
        answer.style.transition = 'height 320ms cubic-bezier(0.16,1,0.3,1)';
        answer.style.height = '0px';
        var onClose = function () {
          item.open = false;
          answer.removeEventListener('transitionend', onClose);
        };
        answer.addEventListener('transitionend', onClose);
      } else {
        item.open = true;
        answer.style.height = '0px';
        answer.getBoundingClientRect();
        answer.style.transition = 'height 320ms cubic-bezier(0.16,1,0.3,1)';
        answer.style.height = answer.scrollHeight + 'px';
        var onOpen = function () {
          answer.style.height = 'auto';
          answer.removeEventListener('transitionend', onOpen);
        };
        answer.addEventListener('transitionend', onOpen);
      }
    });
  });

  /* ---------- Sticky mobile download bar ---------- */
  var stickyBar = document.querySelector('[data-sticky-download]');
  if (stickyBar) {
    window.addEventListener('scroll', function () {
      var past = window.scrollY > window.innerHeight * 0.6;
      var footer = document.querySelector('.site-footer');
      var atFooter = false;
      if (footer) {
        atFooter = footer.getBoundingClientRect().top < window.innerHeight - 40;
      }
      stickyBar.classList.toggle('is-visible', past && !atFooter);
    }, { passive: true });
  }

  /* ---------- QR code (desktop download badge) ---------- */
  var qrTarget = document.querySelector('[data-qr-target]');
  if (qrTarget && typeof window.qrcode === 'function') {
    try {
      var qr = window.qrcode(0, 'M');
      qr.addData('https://sayal.qa/download/');
      qr.make();
      qrTarget.innerHTML = qr.createSvgTag({ cellSize: 3, margin: 1, scalable: true });
      var svgEl = qrTarget.querySelector('svg');
      if (svgEl) {
        svgEl.setAttribute('width', '72');
        svgEl.setAttribute('height', '72');
      }
    } catch (err) {
      var badge = document.querySelector('[data-qr-badge]');
      if (badge) badge.style.display = 'none';
    }
  } else {
    var qrBadge = document.querySelector('[data-qr-badge]');
    if (qrBadge) qrBadge.style.display = 'none';
  }

  /* ---------- GSAP: hero twirl, parallax, scroll reveals ---------- */
  function initGsap() {
    if (!window.gsap) return;
    var gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    var phone = document.querySelector('[data-phone]');
    var pills = document.querySelectorAll('[data-pill]');

    if (prefersReducedMotion) {
      if (phone) gsap.set(phone, { opacity: 1, rotateY: -8, rotateX: 4, scale: 1 });
      if (pills.length) gsap.set(pills, { opacity: 1 });
      return;
    }

    /* Hero entrance — 3D twirl */
    if (phone) {
      gsap.set(phone, {
        transformPerspective: 1400,
        transformOrigin: '50% 50%',
        rotateY: -185,
        rotateX: 18,
        rotateZ: -10,
        scale: 0.78,
        opacity: 0
      });
      gsap.to(phone, {
        rotateY: -8,
        rotateX: 4,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        duration: 2.1,
        ease: 'expo.out',
        delay: 0.15
      });
    }

    if (pills.length) {
      gsap.set(pills, { opacity: 0, y: 24, scale: 0.9 });
      gsap.to(pills, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.6)',
        stagger: 0.14,
        delay: 1.15
      });

      pills.forEach(function (pill, i) {
        gsap.to(pill, {
          y: i % 2 === 0 ? -10 : 10,
          duration: 2.6 + i * 0.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2 + i * 0.2
        });
      });
    }

    /* Desktop: mouse-driven parallax */
    if (window.matchMedia('(hover: hover) and (min-width: 1025px)').matches) {
      window.addEventListener('mousemove', function (e) {
        var cx = (e.clientX / window.innerWidth - 0.5) * 2;
        var cy = (e.clientY / window.innerHeight - 0.5) * 2;

        pills.forEach(function (pill) {
          var depth = parseFloat(pill.getAttribute('data-depth')) || 20;
          gsap.to(pill, { x: cx * depth, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
        });

        if (phone) {
          gsap.to(phone, {
            rotateY: -8 + cx * 6,
            rotateX: 4 - cy * 4,
            duration: 1.1,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      }, { passive: true });
    }

    if (!window.ScrollTrigger) return;

    /* Mobile: scroll parallax on pills */
    if (window.matchMedia('(max-width: 1024px)').matches && pills.length) {
      pills.forEach(function (pill) {
        var depth = parseFloat(pill.getAttribute('data-depth')) || 20;
        gsap.to(pill, {
          y: depth * 1.6,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
        });
      });
    }

    var bento = document.querySelector('[data-bento]');
    if (bento) {
      gsap.from(bento.children, {
        opacity: 0,
        y: 42,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.11,
        scrollTrigger: { trigger: bento, start: 'top 82%', once: true }
      });
    }

    var stepsEl = document.querySelector('[data-steps]');
    if (stepsEl) {
      gsap.from(stepsEl.children, {
        opacity: 0,
        y: 38,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: { trigger: stepsEl, start: 'top 85%', once: true }
      });
    }

    gsap.utils.toArray('.showcase-phone').forEach(function (el, i) {
      gsap.from(el, {
        opacity: 0,
        y: 54,
        rotateY: i === 0 ? -12 : i === 2 ? 12 : 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });
  }

  if (window.gsap) {
    initGsap();
  } else {
    window.addEventListener('load', initGsap);
  }

  if (window.lucide) { window.lucide.createIcons(); }
})();