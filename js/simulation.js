/* Mô phỏng tác động quyết định */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  if (!$('#amount')) return;
  const fmt = n => Math.round(n).toLocaleString('vi-VN') + ' ₫';
  const S = { balance: 50e6, budgetLimit: 71.4e6, budgetSpent: 58.5e6, goalTarget: 25e6, goalSaved: 16.25e6, obligations: 7.5e6 };
  const range = $('#amount'), out = $('#amount-out'), impacts = $('#impacts'), result = $('#result'), decision = $('#decision');
  const presets = document.querySelectorAll('.presets button');
  let name = 'Mua MacBook';

  function render() {
    const a = +range.value, left = S.balance - a, free = left - S.obligations;
    const budBefore = Math.round(S.budgetSpent / S.budgetLimit * 100), budAfter = Math.round((S.budgetSpent + a) / S.budgetLimit * 100);
    const goalAfter = Math.min(100, (S.goalSaved + a) / S.goalTarget * 100), delay = Math.round(a / 1.19e6);
    out.textContent = fmt(a);
    decision.textContent = `${name} — ${fmt(a)}`;
    const items = [
      ['Số dư', `<s>${fmt(S.balance)}</s> → ${fmt(left)}`, 'Số tiền còn lại sau quyết định.', left < S.obligations ? 'bad' : ''],
      ['Ngân sách tháng', `<s>${budBefore}%</s> → ${budAfter}%`, budAfter > 100 ? `Vượt hạn mức ${budAfter - 100}%.` : 'Vẫn trong hạn mức.', budAfter > 100 ? 'hot' : ''],
      ['Quỹ khẩn cấp', 'Không thay đổi', 'Quyết định này không lấy từ quỹ.', ''],
      ['Mục tiêu: Mua laptop', `<s>65%</s> → ${goalAfter >= 100 ? 'Hoàn thành' : Math.round(goalAfter) + '%'}`, goalAfter >= 100 ? 'Mục tiêu đạt sớm hơn dự kiến.' : 'Tiến độ tăng thêm.', ''],
      ['Kế hoạch du lịch Nhật', delay ? `Có thể chậm ${delay} ngày` : 'Không đổi', 'Do còn ít tiền hơn để dành cho kế hoạch.', delay > 14 ? 'hot' : ''],
      ['Nghĩa vụ sắp tới', '2 khoản thanh toán', `Tiền nhà và khoản vay, tổng ${fmt(S.obligations)}. ${left >= S.obligations ? 'Số dư vẫn đủ trang trải.' : 'Số dư không đủ trang trải.'}`, left < S.obligations ? 'bad' : '']
    ];
    impacts.innerHTML = items.map((x, i) => `<li style="--i:${i}" class="${x[3]}"><h3>${x[0]}</h3><div class="vals">${x[1]}</div><p>${x[2]}</p></li>`).join('');
    const state = free < 0 ? 'Căng thẳng' : free < 10e6 ? 'Cần chú ý' : 'Ổn định';
    result.innerHTML = `<strong>Trạng thái tài chính sau quyết định: ${state}</strong><p>Sau khi trừ các khoản sắp đến hạn, bạn còn khoảng ${fmt(Math.max(free, 0))}${free < 0 ? ` (thiếu ${fmt(-free)})` : ''}. Quyết định là của bạn.</p>`;
  }
  function run() {
    impacts.classList.remove('on'); result.classList.remove('on');
    render();
    requestAnimationFrame(() => requestAnimationFrame(() => { impacts.classList.add('on'); result.classList.add('on'); }));
  }
  range.addEventListener('input', () => {
    presets.forEach(b => b.setAttribute('aria-pressed', false));
    name = 'Khoản chi tùy chọn'; render(); impacts.classList.add('on'); result.classList.add('on');
  });
  $('#run').addEventListener('click', run);
  presets.forEach(b => b.addEventListener('click', () => {
    presets.forEach(x => x.setAttribute('aria-pressed', x === b));
    name = b.dataset.name; range.value = b.dataset.amount; run();
  }));
  render();
  new IntersectionObserver((en, ob) => { if (en[0].isIntersecting) { run(); ob.disconnect(); } }, { threshold: .3 }).observe($('#mo-phong'));
})();
