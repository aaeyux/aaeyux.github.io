/* ============================================================
   SAKSHAM PORTFOLIO — JAVASCRIPT
   ============================================================ */

// ── PAGE LOADER ─────────────────────────────────────────────
(function () {
  const loader = document.getElementById('loader');
  const pct    = document.getElementById('loader-pct');
  let count = 0;
  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 8) + 3;
    if (count >= 100) {
      count = 100;
      clearInterval(interval);
      setTimeout(() => loader.classList.add('hidden'), 300);
    }
    if (pct) pct.textContent = count + '%';
  }, 60);
})();


// ── YouTube IFrame API global callback (used only if IFrame API is loaded) ──
// Background now uses a plain <iframe> — no API needed.


// ── NAVBAR ──────────────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('nav-drawer');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else                      navbar.classList.remove('scrolled');

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    const link   = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (link) {
      if (window.scrollY >= top && window.scrollY < bottom) link.classList.add('active');
      else link.classList.remove('active');
    }
  });
}, { passive: true });

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
});

drawer?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// ── SCROLL REVEAL ───────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));


// ── VIDEO FILTER TABS ───────────────────────────────────────
const videoFilters = document.querySelectorAll('#video-filters .filter-btn');
const videoCards   = document.querySelectorAll('.video-card');

videoFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    videoFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    videoCards.forEach(card => {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});


// ── VIDEO MODAL ─────────────────────────────────────────────
const videoModal = document.getElementById('video-modal');
const modalFrame = document.getElementById('modal-frame');

document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    const videoId = card.dataset.videoid;
    if (!videoId) return;
    modalFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeVideoModal() {
  videoModal.classList.remove('open');
  modalFrame.src = '';
  document.body.style.overflow = '';
}

document.getElementById('video-modal-close')?.addEventListener('click', closeVideoModal);
videoModal?.addEventListener('click', e => { if (e.target === videoModal) closeVideoModal(); });


// ── PHOTO FILTERS ────────────────────────────────────────────
const photoFilters = document.querySelectorAll('#photo-filters .filter-btn');
const photoItems   = document.querySelectorAll('.photo-item');

photoFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    photoFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    photoItems.forEach(item => {
      if (cat === 'all' || item.dataset.category === cat) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});


// ── PHOTO LIGHTBOX ───────────────────────────────────────────
const lightbox     = document.getElementById('photo-lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxCap  = document.getElementById('lightbox-caption');
let currentPhotoIdx = 0;
const photoList = [];

document.querySelectorAll('.photo-item').forEach((item, idx) => {
  const img = item.querySelector('img');
  const cap = item.dataset.caption || '';
  photoList.push({ src: img.src, caption: cap });

  item.addEventListener('click', () => {
    currentPhotoIdx = idx;
    openLightbox(idx);
  });
});

function openLightbox(idx) {
  lightboxImg.src  = photoList[idx].src;
  lightboxCap.textContent = photoList[idx].caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

function prevPhoto() {
  currentPhotoIdx = (currentPhotoIdx - 1 + photoList.length) % photoList.length;
  openLightbox(currentPhotoIdx);
}

function nextPhoto() {
  currentPhotoIdx = (currentPhotoIdx + 1) % photoList.length;
  openLightbox(currentPhotoIdx);
}

document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev')?.addEventListener('click', prevPhoto);
document.getElementById('lightbox-next')?.addEventListener('click', nextPhoto);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (lightbox?.classList.contains('open')) {
    if (e.key === 'ArrowLeft')  prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'Escape')     closeLightbox();
  }
  if (videoModal?.classList.contains('open')) {
    if (e.key === 'Escape') closeVideoModal();
  }
});


// ── PARALLAX HERO ──────────────────────────────────────────────
const heroBg = document.getElementById('yt-bg-wrapper');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const y = window.scrollY;
  // Subtle downward parallax on the wrapper
  heroBg.style.transform = `translateY(${y * 0.3}px)`;
}, { passive: true });


// ── ANIMATED COUNTER ─────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));


// ── MAGNETIC BUTTON EFFECT ───────────────────────────────────
document.querySelectorAll('.btn--primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});


// ── CURSOR GLOW ──────────────────────────────────────────────
const cursor = document.getElementById('cursor-glow');
if (cursor) {
  let mx = 0, my = 0;
  let cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('a, button, .video-card, .photo-item, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
}


// ── CONTACT FORM ─────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn  = contactForm.querySelector('[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  // Compose mailto
  const name    = contactForm.querySelector('#f-name')?.value;
  const email   = contactForm.querySelector('#f-email')?.value;
  const subject = contactForm.querySelector('#f-subject')?.value || 'Portfolio Enquiry';
  const message = contactForm.querySelector('#f-message')?.value;
  const mailto  = `mailto:hello@saksham.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailto;
  setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1500);
});
