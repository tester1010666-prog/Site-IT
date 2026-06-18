const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');

    formMessage.textContent = `${name}, спасибо. Мы подготовим ответ по вашему проекту в ближайшее время.`;
    form.reset();
  });
}

if (!prefersReducedMotion) {
  document.body.classList.add('js-animate');
  const revealTargets = [];
  const registeredElements = new Set();
  const sectionTargets = document.querySelectorAll('.trust, .section');

  const registerRevealGroup = (selector, effect) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element, index) => {
      if (registeredElements.has(element)) {
        return;
      }

      registeredElements.add(element);
      element.classList.add('reveal', `reveal-${effect}`);
      element.style.setProperty('--reveal-order', `${index}`);
      revealTargets.push(element);
    });
  };

  registerRevealGroup('.trust-shell', 'up');
  registerRevealGroup('.trust-row span', 'scale');
  registerRevealGroup('.section-heading', 'left');
  registerRevealGroup('.overview-layout .overview-card:nth-child(1)', 'left');
  registerRevealGroup('.overview-layout .overview-card:nth-child(2)', 'right');
  registerRevealGroup('.service-grid .service-card', 'up');
  registerRevealGroup('.approach-grid .principle-card:nth-child(odd)', 'left');
  registerRevealGroup('.approach-grid .principle-card:nth-child(even)', 'right');
  registerRevealGroup('.cases-summary', 'right');
  registerRevealGroup('.cases-grid .case-card', 'scale');
  registerRevealGroup('.engagement-panel', 'scale');
  registerRevealGroup('.engagement-points article', 'up');
  registerRevealGroup('.contact-card', 'scale');
  registerRevealGroup('.contact-points div', 'up');
  registerRevealGroup('.contact-form', 'right');
  registerRevealGroup('.footer-brand', 'left');
  registerRevealGroup('.footer-links', 'right');

  sectionTargets.forEach((section, index) => {
    section.classList.add('section-observe');
    section.style.setProperty('--section-order', `${index % 2}`);
  });

  const markVisible = (target) => {
    target.classList.add('is-visible');
  };

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach(markVisible);
    sectionTargets.forEach(markVisible);
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          markVisible(entry.target);
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    revealTargets.forEach((element) => {
      revealObserver.observe(element);
    });

    sectionTargets.forEach((section) => {
      revealObserver.observe(section);
    });
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
