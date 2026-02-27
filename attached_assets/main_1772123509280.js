/* ============================================================
   OncoGuard AI — SPA Router & Core Logic
   ============================================================ */
const App = {
  currentRoute: '',
  init() {
    window.addEventListener('hashchange', () => this.route());
    window.addEventListener('scroll', () => {
      const nb = document.querySelector('.navbar');
      if (nb) nb.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
    this.route();
  },
  navigate(hash) { window.location.hash = hash; },
  route() {
    const hash = window.location.hash.slice(1) || '/';
    this.currentRoute = hash;
    const app = document.getElementById('app');
    app.classList.add('page-exit');
    setTimeout(() => {
      this.render(hash);
      app.classList.remove('page-exit');
      window.scrollTo(0, 0);
    }, 200);
  },
  render(hash) {
    const app = document.getElementById('app');
    const nav = document.getElementById('main-nav');
    const routes = {
      '/': () => { nav.innerHTML = this.navHTML('home'); return Pages.landing(); },
      '/portal': () => { nav.innerHTML = this.navHTML('portal'); return Pages.portal(); },
      '/login': () => { nav.innerHTML = ''; return Pages.login(); },
      '/screening/step1': () => { nav.innerHTML = ''; return Pages.step1(); },
      '/screening/step2': () => { nav.innerHTML = ''; return Pages.step2(); },
      '/screening/step3': () => { nav.innerHTML = ''; return Pages.step3(); },
      '/screening/step4': () => { nav.innerHTML = ''; return Pages.step4(); },
      '/dashboard': () => { nav.innerHTML = ''; return Pages.dashboard(); },
      '/reports': () => { nav.innerHTML = ''; return Pages.reports(); },
      '/validation': () => { nav.innerHTML = ''; return Pages.validation(); },
      '/add-data': () => { nav.innerHTML = ''; return Pages.addData(); },
    };
    const fn = routes[hash] || routes['/'];
    app.innerHTML = fn();
    this.bindPage(hash);
  },
  navHTML(active) {
    return `<div class="container">
      <span class="nav-logo" onclick="App.navigate('#/')">OncoGuard AI</span>
      <div class="nav-links">
        <a onclick="document.getElementById('features')?.scrollIntoView({behavior:'smooth'})" class="${active==='home'?'active':''}">Features</a>
        <a onclick="document.getElementById('how-it-works')?.scrollIntoView({behavior:'smooth'})">How It Works</a>
        <a onclick="document.getElementById('stats')?.scrollIntoView({behavior:'smooth'})">Stats</a>
      </div>
      <div class="nav-cta"><a class="btn btn-primary btn-sm" onclick="App.navigate('#/portal')">Launch Portal <span class="material-symbols-outlined" style="font-size:16px">arrow_forward</span></a></div>
      <button class="hamburger" onclick="this.classList.toggle('open');document.getElementById('mob-menu').classList.toggle('open')"><span></span><span></span><span></span></button>
    </div>
    <div class="mobile-menu" id="mob-menu">
      <a onclick="App.navigate('#/');this.closest('.mobile-menu').classList.remove('open')">Home</a>
      <a onclick="App.navigate('#/portal');this.closest('.mobile-menu').classList.remove('open')">Launch Portal</a>
    </div>`;
  },
  showToast(msg, type='success') {
    let tc = document.getElementById('toast-c');
    if (!tc) { tc = document.createElement('div'); tc.id='toast-c'; tc.className='toast-container'; tc.innerHTML='<div class="toast-inner"></div>'; document.body.appendChild(tc); }
    tc.className = 'toast-container ' + type;
    tc.querySelector('.toast-inner').innerHTML = `<span class="material-symbols-outlined">${type==='success'?'check_circle':'error'}</span><span>${msg}</span>`;
    tc.classList.add('show');
    setTimeout(() => tc.classList.remove('show'), 3500);
  },
  bindPage(hash) {
    if (hash === '/screening/step1') Bind.step1();
    else if (hash === '/screening/step2') Bind.step2();
    else if (hash === '/screening/step3') Bind.step3();
    else if (hash === '/screening/step4') Bind.step4();
    else if (hash === '/dashboard') Bind.dashboard();
    else if (hash === '/reports') Bind.reports();
    else if (hash === '/validation') Bind.validation();
    else if (hash === '/add-data') Bind.addData();
    else if (hash === '/login') Bind.login();
    // Observe fade-up
    document.querySelectorAll('.fade-up').forEach(el => {
      const obs = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);} }); }, {threshold:0.1});
      obs.observe(el);
    });
    // Counter animation
    document.querySelectorAll('[data-count]').forEach(el => {
      const obs = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting){animateCounter(e.target);obs.unobserve(e.target);} }); }, {threshold:0.5});
      obs.observe(el);
    });
  }
};

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const dur = 1800; const start = performance.now();
  (function update(now) {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(e * target).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(update);
  })(start);
}

function requireAuth() { if (!isAuthenticated()) { App.navigate('#/login'); return false; } return true; }
function pageTop(backHash, title) {
  return `<div class="page-top-bar">
    <button class="page-back" onclick="App.navigate('#${backHash}')"><span class="material-symbols-outlined">arrow_back</span> Back</button>
    <span class="page-title">${title}</span>
    <button class="page-logout" onclick="logout()"><span class="material-symbols-outlined" style="font-size:16px">logout</span></button>
  </div>`;
}
function progressBar(step, total, label) {
  let bars = '';
  for (let i = 1; i <= total; i++) bars += `<div class="progress-step ${i <= step ? (i < step ? 'completed' : 'active') : ''}"></div>`;
  return `<div style="margin-bottom:var(--space-xl)">
    <div class="flex-between" style="margin-bottom:var(--space-sm)">
      <span style="font-size:0.8rem;font-weight:700;color:var(--accent-primary)">${label}</span>
      <span style="font-size:0.8rem;color:var(--text-muted)">${Math.round(step/total*100)}%</span>
    </div>
    <div class="progress-bar-container">${bars}</div>
  </div>`;
}
function bottomNav(active) {
  const items = [
    { hash: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { hash: '/reports', icon: 'analytics', label: 'Reports' },
    { hash: '/validation', icon: 'fact_check', label: 'Validation' },
    { hash: '/add-data', icon: 'add_circle', label: 'Add Data' },
  ];
  return `<nav class="bottom-nav"><div class="container">${items.map(i =>
    `<button class="bottom-nav-item ${active===i.hash?'active':''}" onclick="App.navigate('#${i.hash}')">
      <span class="material-symbols-outlined" ${active===i.hash?'style="font-variation-settings:\'FILL\' 1"':''}>${i.icon}</span>${i.label}
    </button>`).join('')}</div></nav>`;
}

document.addEventListener('DOMContentLoaded', () => App.init());
