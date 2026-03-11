'use strict';

/* ══════════════════════════════════════
   ADVOCATE SUDHAKAR. V  —  script.js
   ══════════════════════════════════════
   TO ACTIVATE WHATSAPP:
   Replace 91XXXXXXXXXX with your number
   Example: India +91 98765 43210
            → use  919876543210
   ══════════════════════════════════════ */

var WA_NUMBER = '919986460192';   // <-- CHANGE THIS TO YOUR NUMBER

/* ─────────────────────────────────────
   1. PRELOADER
───────────────────────────────────── */
(function () {
  var preloader = document.getElementById('preloader');
  var bar       = document.getElementById('preloader-progress');
  if (!preloader || !bar) return;

  document.body.style.overflow = 'hidden';
  var pct = 0;
  var iv  = setInterval(function () {
    pct += Math.random() * 18 + 4;
    if (pct >= 100) {
      pct = 100;
      clearInterval(iv);
      setTimeout(function () {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        startScrollReveal();
        startCounters();
      }, 400);
    }
    bar.style.width = pct + '%';
  }, 60);
})();

/* ─────────────────────────────────────
   2. CUSTOM CURSOR
───────────────────────────────────── */
(function () {
  var cur = document.getElementById('cursor');
  var fol = document.getElementById('cursor-follower');
  if (!cur || !fol || 'ontouchstart' in window) {
    if (cur) cur.style.display = 'none';
    if (fol) fol.style.display = 'none';
    return;
  }
  var mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });
  (function loop() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    fol.style.left = fx + 'px';
    fol.style.top  = fy + 'px';
    requestAnimationFrame(loop);
  })();
})();

/* ─────────────────────────────────────
   3. NAVBAR — scroll + mobile toggle
───────────────────────────────────── */
(function () {
  var navbar  = document.getElementById('navbar');
  var toggle  = document.getElementById('nav-toggle');
  var menu    = document.getElementById('nav-menu');
  var links   = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    var cur = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 130) cur = s.id;
    });
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  }, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      var sp   = toggle.querySelectorAll('span');
      if (open) {
        sp[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        sp[1].style.opacity   = '0';
        sp[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        sp.forEach(function (s) { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    links.forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.querySelectorAll('span').forEach(function (s) {
          s.style.transform = ''; s.style.opacity = '';
        });
      });
    });
  }
})();

/* ─────────────────────────────────────
   4. HERO PARTICLES
───────────────────────────────────── */
(function () {
  var container = document.getElementById('particles');
  if (!container) return;
  for (var i = 0; i < 28; i++) {
    var p = document.createElement('div');
    p.className = 'hero-particle';
    p.style.left              = (Math.random() * 100) + '%';
    p.style.top               = (40 + Math.random() * 50) + '%';
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay    = (Math.random() * 8) + 's';
    p.style.width             = (Math.random() > 0.7 ? 3 : 2) + 'px';
    p.style.height            = p.style.width;
    container.appendChild(p);
  }
})();

/* ─────────────────────────────────────
   5. SCROLL REVEAL
───────────────────────────────────── */
function startScrollReveal() {
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length || !window.IntersectionObserver) {
    els.forEach(function (el) { el.classList.add('revealed'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var siblings = Array.from(
        entry.target.parentElement.querySelectorAll('[data-reveal]')
      );
      var idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 0.1) + 's';
      entry.target.classList.add('revealed');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { obs.observe(el); });
}

/* ─────────────────────────────────────
   6. COUNTER ANIMATION
───────────────────────────────────── */
function startCounters() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length || !window.IntersectionObserver) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el     = entry.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      var start  = performance.now();
      var dur    = 1800;
      (function tick(now) {
        var prog  = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - prog, 3);
        el.textContent = Math.round(eased * target);
        if (prog < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      })(start);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(function (c) { obs.observe(c); });
}

/* ─────────────────────────────────────
   7. TESTIMONIALS SLIDER
───────────────────────────────────── */
(function () {
  var track   = document.getElementById('testimonials-track');
  var prevBtn = document.getElementById('tc-prev');
  var nextBtn = document.getElementById('tc-next');
  var dotsW   = document.getElementById('tc-dots');
  if (!track) return;

  var cards   = track.querySelectorAll('.testimonial-card');
  var total   = cards.length;
  var current = 0;
  var timer;

  cards.forEach(function (_, i) {
    var dot = document.createElement('div');
    dot.className = 'tc-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function () { goTo(i); reset(); });
    dotsW.appendChild(dot);
  });

  function goTo(idx) {
    current = ((idx % total) + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsW.querySelectorAll('.tc-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }
  function reset() {
    clearInterval(timer);
    timer = setInterval(function () { goTo(current + 1); }, 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); reset(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); reset(); });

  var ts = null;
  track.addEventListener('touchstart', function (e) { ts = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    if (ts === null) return;
    var diff = ts - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    ts = null; reset();
  });

  reset();
})();

/* ─────────────────────────────────────
   8. SMOOTH SCROLL
───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  });
});

/* ─────────────────────────────────────
   9. BACK TO TOP
───────────────────────────────────── */
(function () {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ─────────────────────────────────────
   10. CONTACT FORM → WHATSAPP
   ─────────────────────────────────────
   When client fills the form and clicks
   "Open WhatsApp & Send", WhatsApp opens
   on their device with the message
   already typed — they just tap Send.
   You receive it on your WhatsApp phone.
───────────────────────────────────── */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameEl    = document.getElementById('wa-name');
    var phoneEl   = document.getElementById('wa-phone');
    var matterEl  = document.getElementById('wa-matter');
    var messageEl = document.getElementById('wa-message');

    /* -- Validation -- */
    var valid = true;
    [nameEl, phoneEl, matterEl, messageEl].forEach(function (field) {
      if (!field) return;
      var val = field.tagName === 'SELECT' ? field.value : field.value.trim();
      if (!val) {
        field.style.borderColor = '#ff6b6b';
        field.style.boxShadow   = '0 0 0 3px rgba(255,107,107,0.2)';
        valid = false;
        field.addEventListener('change', function () {
          field.style.borderColor = '';
          field.style.boxShadow   = '';
        }, { once: true });
        field.addEventListener('input', function () {
          field.style.borderColor = '';
          field.style.boxShadow   = '';
        }, { once: true });
      }
    });

    if (!valid) {
      showToast('Please fill in all required fields.');
      return;
    }

    var name    = nameEl.value.trim();
    var phone   = phoneEl.value.trim();
    var matter  = matterEl.value;
    var message = messageEl.value.trim();

    /* -- Build WhatsApp message -- */
    var text =
      'Hello Advocate Sudhakar. V,' +
      '\n\nI would like to consult you regarding a legal matter.' +
      '\n\n*Enquiry Details*' +
      '\n──────────────────' +
      '\n*Name:* ' + name +
      '\n*Phone:* ' + phone +
      '\n*Matter:* ' + matter +
      '\n*Description:* ' + message +
      '\n──────────────────' +
      '\n_Sent from your portfolio website_';

    var waURL = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);

    /* -- Open WhatsApp -- */
    window.open(waURL, '_blank');

    form.reset();
    showToast('WhatsApp is opening — tap Send to deliver your enquiry!');
  });
})();

/* ─────────────────────────────────────
   11. TOAST NOTIFICATION
───────────────────────────────────── */
function showToast(msg) {
  var t = document.getElementById('toast-msg');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast-msg';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function () { t.classList.remove('show'); }, 4000);
}

/* ─────────────────────────────────────
   12. CARD TILT EFFECT
───────────────────────────────────── */
document.querySelectorAll('.practice-card, .why-card, .case-card').forEach(function (card) {
  card.addEventListener('mousemove', function (e) {
    var r  = card.getBoundingClientRect();
    var tx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * 3;
    var ty = ((r.width  / 2 - (e.clientX - r.left)) / (r.width  / 2)) * 3;
    card.style.transform = 'perspective(800px) rotateX(' + tx + 'deg) rotateY(' + ty + 'deg) translateY(-4px)';
  });
  card.addEventListener('mouseleave', function () { card.style.transform = ''; });
});

/* ─────────────────────────────────────
   13. ACTIVE NAV LINK STYLE
───────────────────────────────────── */
(function () {
  var s = document.createElement('style');
  s.textContent = '.nav-link.active{color:var(--gold)!important}.nav-link.active::after{left:.9rem!important;right:.9rem!important}';
  document.head.appendChild(s);
})();
