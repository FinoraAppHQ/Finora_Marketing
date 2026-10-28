/* Dữ liệu bảng giá — chỉ cần sửa PLANS và ROWS. Nội dung hiện tại là minh họa, chưa phải chính sách chính thức. */
(() => {
  'use strict';
  const PLANS = [
    { name: 'Finora Free', desc: 'Dành cho nhu cầu quản lý tài chính cơ bản.', price: '0 ₫', features: ['Quản lý giao dịch', 'Ví', 'Danh mục', 'Báo cáo cơ bản', 'Mục tiêu cơ bản'], cta: 'Bắt đầu miễn phí', app: true },
    { name: 'Finora Plus', desc: 'Dành cho người muốn kiểm soát tài chính sâu hơn.', price: 'Sắp công bố', features: ['Ngân sách, quỹ, kế hoạch', 'Phân tích tác động', 'Mô phỏng quyết định (giới hạn)', 'Báo cáo nâng cao'], cta: 'Sắp ra mắt', soon: true, featured: true },
    { name: 'Finora Pro', desc: 'Khả năng phân tích và automation nâng cao.', price: 'Sắp công bố', features: ['Mọi tính năng của Plus', 'Mô phỏng quyết định đầy đủ', 'Tích hợp không giới hạn', 'Automation'], cta: 'Sắp ra mắt', soon: true }
  ];
  const ROWS = [
    ['Giao dịch', true, true, true], ['Ví', true, true, true], ['Ngân sách', false, true, true], ['Quỹ', false, true, true],
    ['Mục tiêu', 'Cơ bản', true, true], ['Kế hoạch', false, true, true], ['Phân tích tác động', false, true, true],
    ['Mô phỏng quyết định', false, 'Giới hạn', true], ['Báo cáo nâng cao', false, true, true], ['Tích hợp', false, 'Giới hạn', true], ['Automation', false, false, true]
  ];
  const cell = v => v === true ? '<span aria-label="Có">✓</span>' : v === false ? '<span aria-label="Không có" class="no">—</span>' : v;
  const plans = document.getElementById('plans'), table = document.getElementById('compare');
  if (plans) plans.innerHTML = PLANS.map(p => `<article class="plan${p.featured ? ' featured' : ''}"><h3>${p.name}</h3><p>${p.desc}</p><strong class="price">${p.price}</strong><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>${p.soon ? `<button class="btn btn-ghost" disabled>${p.cta}</button>` : `<a class="btn" href="#" data-app-link>${p.cta}</a>`}</article>`).join('');
  if (table) table.innerHTML = `<thead><tr><th scope="col">Tính năng</th>${PLANS.map(p => `<th scope="col">${p.name.replace('Finora ', '')}</th>`).join('')}</tr></thead><tbody>${ROWS.map(r => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map(v => `<td>${cell(v)}</td>`).join('')}</tr>`).join('')}</tbody>`;
})();
