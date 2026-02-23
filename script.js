/* =========================================================
   病みかわ♡センセーション — Global Script
   ========================================================= */

(function() {

  // ── Today date ──
  const todayEls = document.querySelectorAll('.js-today');
  if (todayEls.length) {
    const d = new Date();
    const s = `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
    todayEls.forEach(el => el.textContent = s);
  }

  // ── Year ──
  const yearEls = document.querySelectorAll('#year');
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  // ── Custom cursor ──
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (cursor && ring) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      setTimeout(() => {
        ring.style.left = e.clientX + 'px';
        ring.style.top  = e.clientY + 'px';
      }, 75);
    });
    document.querySelectorAll('a, button, .btn, .memberCard, .card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
    });
  }

  // ── Click burst ──
  document.addEventListener('click', e => {
    const colors = ['#ff4fa3','#c400ff','#ffffff','#ff007f','#ffd6f0'];
    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div');
      const angle = (i / 10) * Math.PI * 2;
      const dist  = 35 + Math.random() * 35;
      el.style.cssText = `
        position:fixed;left:${e.clientX}px;top:${e.clientY}px;
        width:5px;height:5px;border-radius:50%;pointer-events:none;
        z-index:9997;background:${colors[i%colors.length]};
        transition:all .55s ease;
      `;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = `translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px) scale(0)`;
        el.style.opacity = '0';
      });
      setTimeout(() => el.remove(), 600);
    }
  });

  // ── Glitter canvas ──
  const canvas = document.getElementById('glitter-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H;
    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#ff4fa3','#c400ff','#ffe0f5','#ffffff','#ff007f','#ffd6f0'];
    const particles = Array.from({length: 110}, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      size: Math.random() * 2.2 + .4,
      vx: (Math.random() - .5) * .25,
      vy: Math.random() * .28 + .04,
      alpha: Math.random(),
      da: (Math.random() - .5) * .011,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    function tick() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.alpha += p.da;
        if (p.alpha <= 0 || p.alpha >= 1) p.da *= -1;
        if (p.y > H) { p.y = -5; p.x = Math.random() * W; }
        if (p.x < 0 || p.x > W) p.x = Math.random() * W;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(tick);
    }
    tick();
  }

  // ── Floating petals (hero) ──
  const hero = document.querySelector('.hero');
  if (hero) {
    const emojis = ['🌸','✨','💜','🖤','💫','🌙','⭐','💕','🫧','🩷'];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = emojis[i % emojis.length];
      p.style.left = Math.random() * 100 + '%';
      p.style.fontSize = (.75 + Math.random() * 1.1) + 'rem';
      p.style.animationDuration = (9 + Math.random() * 12) + 's';
      p.style.animationDelay = '-' + (Math.random() * 16) + 's';
      hero.appendChild(p);
    }
  }

  // ── Scroll header ──
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.setAttribute('data-scrolled', window.scrollY > 40 ? 'true' : 'false');
    }, { passive: true });
  }

  // ── Nav toggle ──
  const toggleBtn = document.querySelector('.nav__toggle');
  const navMenu   = document.querySelector('.nav__menu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', open);
    });
  }

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: .1 });
    revealEls.forEach(el => obs.observe(el));
  }

})();
