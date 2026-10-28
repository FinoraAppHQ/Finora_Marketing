/* Khởi tạo chung: liên kết "Bắt đầu ngay" tới Finora Web App */
(() => {
  'use strict';
  const url = (window.FINORA_CONFIG || {}).appUrl;
  const links = document.querySelectorAll('[data-app-link]');
  let toast;
  const notify = msg => {
    if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); document.body.appendChild(toast); }
    toast.textContent = msg; toast.classList.add('on');
    clearTimeout(notify.t); notify.t = setTimeout(() => toast.classList.remove('on'), 4000);
  };
  links.forEach(a => {
    if (url) { a.href = url; return; }
    a.href = '#';
    a.addEventListener('click', e => { e.preventDefault(); notify('Finora Web App sắp mở. Địa chỉ ứng dụng chưa được cấu hình.'); });
  });
})();
