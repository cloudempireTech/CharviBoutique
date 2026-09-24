(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.site-nav');
  const menuIcon = menuButton?.querySelector('use');

  function closeMenu() {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open menu');
    menuIcon?.setAttribute('href', '#i-menu');
  }
  menuButton?.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menuIcon?.setAttribute('href', isOpen ? '#i-close' : '#i-menu');
  });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (menu?.classList.contains('open') && !event.target.closest('.site-nav, .menu-toggle')) closeMenu();
  });

  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 3, 2) * 85}ms`;
      observer.observe(item);
    });
  }

  if (!reduceMotion) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch') return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-7px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
    const stage = document.querySelector('[data-parallax]');
    if (stage && window.matchMedia('(min-width: 951px)').matches) {
      let frame = 0;
      window.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch') return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const x = (event.clientX / innerWidth - .5) * 12;
          const y = (event.clientY / innerHeight - .5) * 9;
          stage.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
        });
      }, { passive: true });
    }
    document.querySelectorAll('a[href$="/"], a[href$=".html"]').forEach(a => {
      if (a.origin !== location.origin || a.pathname === location.pathname || a.hasAttribute('download')) return;
      a.addEventListener('click', event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        document.querySelector('.page-transition')?.classList.add('active');
        setTimeout(() => { location.href = a.href; }, 470);
      });
    });
  }

  const counter = document.querySelector('.counter[data-count]');
  if (counter && !reduceMotion && 'IntersectionObserver' in window) {
    const target = Number(counter.dataset.count);
    const countObserver = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      countObserver.disconnect();
      const start = performance.now();
      const from = target - 16;
      function tick(now) {
        const t = Math.min((now - start) / 900, 1);
        counter.textContent = Math.round(from + (target - from) * (1 - (1 - t) ** 3));
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
    countObserver.observe(counter);
  }

  const lightbox = document.querySelector('.lightbox');
  document.querySelectorAll('[data-lightbox]').forEach(button => {
    button.addEventListener('click', () => {
      const img = button.querySelector('img');
      if (!img || !lightbox) return;
      lightbox.querySelector('img').src = img.src;
      lightbox.querySelector('img').alt = img.alt;
      lightbox.querySelector('p').textContent = button.querySelector('span')?.textContent?.replace('↗', '').trim() || '';
      lightbox.showModal();
    });
  });
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

  document.querySelector('#enquiry-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    const interest = form.elements.interest.value;
    const message = form.elements.message.value.trim();
    const text = `Hello Charvi Boutique, my name is ${name}. I'm interested in ${interest}. ${message}`;
    const url = `https://wa.me/919831132890?text=${encodeURIComponent(text)}`;
    form.querySelector('.form-status').textContent = 'Opening WhatsApp with your message…';
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) location.href = url;
  });
})();
