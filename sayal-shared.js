/* Sayal shared: language engine + mobile drawer + QR. Used by all subpages. */
(function () {
  'use strict';
      const i18nPage = {
        en: {
          brand: 'Sayal',
          qar_icon: 'QAR',
          pill_left_title: '100,000 QAR',
          pill_left_sub: 'Free Practice Portfolio',
          pill_right_title: 'AAPL • NVDA • GOOGL',
          pill_right_sub: 'U.S. Stocks Priced in QAR',
          pill_home: 'Home',
          pill_search: 'Search',
          pill_googl: 'GOOGL',
          pill_spin: '3D Spin',
          bento_badge: 'Simple by nature',
          badge_practice: 'Practice Mode',
          badge_free: 'Free Practice',
          badge_qar: 'In Qatari Riyals',
          badge_bilingual: 'Arabic & English',
          badge_goals: 'Your Goals',
          badge_start: 'Start Trading',
          eyebrow_faq: 'FAQs',
          eyebrow_contact: 'Say Hello',
          ph_name: 'Your name',
          ph_email: 'you@example.com',
          ph_message: 'How can we help?',
          sticky_dl: 'Get Sayal free',
          sticky_cta: 'Download',
          nav_app: 'App',
          nav_faq: 'Questions',
          nav_contact: 'Contact',
          nav_download: 'Get the App',
          hero_pill: '100,000 QAR Practice Cash',
          hero_title: 'Invest in the<br />stocks you love.',
          hero_subtitle: "Start with 100,000 QAR practice cash. Start trading whenever you're ready.",
          bento_heading: 'Everything you need.<br />Nothing in your way.',
          card1_title: 'Practice with 100,000 QAR',
          card1_desc: 'Test your ideas on real market movement before putting in a single Riyal.',
          card2_title: 'Priced in Qatari Riyals',
          card2_desc: 'See every stock, ETF, and gain in QAR or USD, in both Arabic and English.',
          card3_title: 'Set a goal. Watch it grow.',
          card3_desc: 'Build your personal targets and start trading live whenever you feel ready.',
          faq_heading: 'Simple answers.',
          faq_q1: 'How do I start trading on Sayal?',
          faq_a1: "Download Sayal from the App Store or Google Play. You start immediately with 100,000 QAR in practice cash, and you can switch to live trading in the stocks you love whenever you're ready.",
          faq_q2: 'Are prices shown in Qatari Riyals (QAR)?',
          faq_a2: 'Yes. Every U.S. stock, ETF, and balance is displayed natively in Qatari Riyals (QAR) or USD, so you always know what your portfolio is worth at home.',
          faq_q3: 'Is Practice Mode completely free?',
          faq_a3: 'Yes. Practice Mode gives you 100,000 QAR in virtual funds to buy and sell real U.S. stocks and ETFs with zero financial risk.',
          faq_q4: 'Is Sayal available in both English and Arabic?',
          faq_a4: 'Yes. Sayal is built with full support for both English and Arabic—you can switch languages anytime with a single tap inside the app.',
          contact_heading: 'Have a question?',
          contact_sub: "Send us a message and we'll get right back to you.",
          label_name: 'Name',
          label_email: 'Email',
          label_message: 'Message',
          btn_send: 'Send Message',
          footer_disclaimer: 'Investing involves risk, including the possible loss of the money you invest. Past performance does not guarantee future results. Practice mode uses virtual funds only.'
        },
        ar: {
          brand: 'سيال',
          qar_icon: 'ر.ق',
          pill_left_title: '١٠٠,٠٠٠ ر.ق',
          pill_left_sub: 'محفظة تدريبية مجانية',
          pill_right_title: 'AAPL • NVDA • GOOGL',
          pill_right_sub: 'الأسهم الأمريكية بالريال القطري',
          pill_home: 'الرئيسية',
          pill_search: 'البحث',
          pill_googl: 'سهم جوجل',
          pill_spin: 'دوران ثلاثي',
          bento_badge: 'بسيط بطبيعته',
          badge_practice: 'وضع التدريب',
          badge_free: 'تدرّب مجاناً',
          badge_qar: 'بالريال القطري',
          badge_bilingual: 'عربي وإنجليزي',
          badge_goals: 'أهدافك المالية',
          badge_start: 'ابدأ التداول',
          eyebrow_faq: 'الأسئلة الشائعة',
          eyebrow_contact: 'تواصل معنا',
          ph_name: 'الاسم الكامل',
          ph_email: 'بريدك الإلكتروني',
          ph_message: 'كيف يمكننا مساعدتك؟',
          sticky_dl: 'حمّل سيال مجاناً',
          sticky_cta: 'تحميل',
          nav_app: 'التطبيق',
          nav_faq: 'الأسئلة',
          nav_contact: 'تواصل معنا',
          nav_download: 'حمّل التطبيق',
          hero_pill: '١٠٠,٠٠٠ ر.ق رصيد تدريبي مجاني',
          hero_title: 'استثمر في الأسهم<br />التي تحبها.',
          hero_subtitle: 'ابدأ برصيد تدريبي قدره ١٠٠,٠٠٠ ريال قطري، وابدأ التداول الحقيقي متى ما كنت مستعداً.',
          bento_heading: 'كل ما تحتاجه للاستثمار.<br />بأبسط صورة ممكنة.',
          card1_title: 'تدرّب بمبلغ ١٠٠,٠٠٠ ر.ق',
          card1_desc: 'جرّب استراتيجيتك بأسعار السوق الحقيقية وبدون أي مخاطرة مالية.',
          card2_title: 'جميع الأسعار بالريال القطري',
          card2_desc: 'تابع جميع الأسهم وصناديق المؤشرات والأرباح بالريال القطري أو الدولار.',
          card3_title: 'حدّد هدفك وتابع نموّه',
          card3_desc: 'ضع أهدافك المالية الشخصية وابدأ التداول الفعلي في أي وقت.',
          faq_heading: 'إجابات واضحة ومختصرة.',
          faq_q1: 'كيف أبدأ التداول في تطبيق سيال؟',
          faq_a1: 'حمّل تطبيق سيال من آب ستور أو جوجل بلاي. ستحصل فوراً على ١٠٠,٠٠٠ ريال قطري في وضع التدريب، ويمكنك البدء بالتداول الفعلي في أي وقت.',
          faq_q2: 'هل تظهر أسعار الأسهم بالريال القطري؟',
          faq_a2: 'نعم، جميع أسعار الأسهم الأمريكية وصناديق المؤشرات والرصيد الإجمالي تظهر مباشرة بالريال القطري أو الدولار الأمريكي.',
          faq_q3: 'هل وضع التدريب مجاني بالكامل؟',
          faq_a3: 'نعم، يمنحك وضع التدريب ١٠٠,٠٠٠ ريال قطري افتراضية لتجربة البيع والشراء بأسعار السوق الحقيقية دون أي التزام.',
          faq_q4: 'هل التطبيق متوفر باللغتين العربية والإنجليزية؟',
          faq_a4: 'نعم، يدعم سيال اللغتين العربية والإنجليزية بالكامل وبضغطة زر واحدة داخل التطبيق.',
          contact_heading: 'لديك سؤال أو استفسار؟',
          contact_sub: 'أرسل لنا رسالة وسيتواصل معك فريقنا في أقرب وقت.',
          label_name: 'الاسم',
          label_email: 'البريد الإلكتروني',
          label_message: 'الرسالة',
          btn_send: 'إرسال الرسالة',
          footer_disclaimer: 'ينطوي الاستثمار على مخاطر، بما في ذلك احتمال خسارة رأس المال المستثمر. الأداء السابق لا يضمن النتائج المستقبلية. وضع التدريب يستخدم أموالاً افتراضية فقط.'
        }
      }
  var langBtn = document.getElementById('global-lang-btn');
  var langLabel = document.getElementById('global-lang-label');
  var currentLang = 'en';

  function applyLang(lang) {
    currentLang = lang === 'ar' ? 'ar' : 'en';
    var d = i18nPage[currentLang];
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    if (langLabel) langLabel.textContent = currentLang === 'en' ? 'AR' : 'EN';
    if (langBtn) langBtn.setAttribute('aria-label', currentLang === 'en' ? 'Switch to Arabic' : 'Switch to English');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (d[k] !== undefined) el.innerHTML = d[k];
    });

    var ph = { name: 'ph_name', email: 'ph_email', message: 'ph_message' };
    Object.keys(ph).forEach(function (id) {
      var el = document.getElementById(id);
      if (el && d[ph[id]]) el.setAttribute('placeholder', d[ph[id]]);
    });

    try { localStorage.setItem('sayal_lang', currentLang); } catch (e) {}
  }

  var saved = 'en';
  try { saved = localStorage.getItem('sayal_lang') || 'en'; } catch (e) {}
  applyLang(saved === 'ar' ? 'ar' : 'en');

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      applyLang(currentLang === 'en' ? 'ar' : 'en');
    });
  }

  var btn = document.getElementById('mobile-menu-btn');
  var drawer = document.getElementById('mobile-drawer');
  if (btn && drawer) {
    btn.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('drawer-open', open);
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('drawer-open');
      });
    });
  }

  var qt = document.getElementById('qr-target');
  if (qt && typeof window.qrcode === 'function') {
    try {
      var qr = window.qrcode(0, 'M');
      qr.addData('https://sayal.qa/download/');
      qr.make();
      qt.innerHTML = qr.createSvgTag({ cellSize: 3, margin: 0, scalable: true });
      var svg = qt.querySelector('svg');
      if (svg) { svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%'); }
    } catch (e) { qt.style.display = 'none'; }
  }
})();

/* Sticky mobile download bar: reveal after the user scrolls past the hero */
(function () {
  'use strict';
  var bar = document.getElementById('sticky-dl');
  if (!bar) return;
  var onScroll = function () {
    var past = window.scrollY > (window.innerHeight * 0.55);
    var footer = document.querySelector('.site-footer');
    var atFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight - 30 : false;
    bar.classList.toggle('show', past && !atFooter);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
