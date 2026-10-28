/* Điều hướng và menu mobile */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const toggle = $('.nav-toggle'), menu = $('#menu');
  const setMenu = open => { menu.classList.toggle('open', open); toggle.setAttribute('aria-expanded', open); };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });
})();
