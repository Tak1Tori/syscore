const menu = document.querySelector('#section-menu');
const toggle = document.querySelector('.menu-toggle');
let closingTimer;
function openMenu() { clearTimeout(closingTimer); menu.showModal(); document.body.classList.add('menu-open'); toggle.setAttribute('aria-expanded', 'true'); requestAnimationFrame(() => menu.classList.add('is-open')); }
function closeMenu() { menu.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); closingTimer = setTimeout(() => menu.close(), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350); }
toggle.addEventListener('click', openMenu);
document.querySelector('.menu-close').addEventListener('click', closeMenu);
menu.addEventListener('cancel', e => { e.preventDefault(); closeMenu() });
menu.addEventListener('click', e => { if (e.target === menu) closeMenu() });
menu.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => { const target = document.querySelector(a.hash); closeMenu(); setTimeout(() => { if (target) { target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); history.replaceState(null, '', a.hash) } }, 360) }));
const brandDialog = document.querySelector('#brand-dialog');
const brandOpen = document.querySelector('#brand-open');
function closeBrand() { brandDialog.close(); document.body.classList.remove('menu-open'); }
brandOpen.addEventListener('click', () => { brandDialog.showModal(); document.body.classList.add('menu-open') });
document.querySelector('#brand-close').addEventListener('click', closeBrand);
brandDialog.addEventListener('cancel', () => document.body.classList.remove('menu-open'));
brandDialog.addEventListener('click', e => { const r = brandDialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeBrand() });
document.querySelector('#year').textContent = new Date().getFullYear();
// A single open service keeps the list compact, including older browsers.
document.querySelectorAll('.service').forEach(item => item.addEventListener('toggle', () => { if (item.open) document.querySelectorAll('.service').forEach(other => { if (other !== item) other.open = false }) }));
// Navigation and content remain fully usable if motion is unavailable.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) { const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } }) }, { threshold: .06 }); document.querySelectorAll('.section-heading,.about-main,.education-grid').forEach(el => { el.classList.add('reveal'); observer.observe(el) }) }
