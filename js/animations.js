/* Sơ đồ hệ thống kết nối (tương tác) */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  if (!$('#tiers')) return;
  const info = {
    gd: 'Giao dịch ghi lại dòng tiền thực tế: thu nhập, chi tiêu, chuyển tiền và các giao dịch nợ.',
    vi: 'Ví cho biết tiền đang ở đâu: tiền mặt, ngân hàng, ví điện tử.',
    quy: 'Quỹ cho biết tiền được dành để làm gì: khẩn cấp, du lịch, học tập.',
    ns: 'Ngân sách đặt giới hạn theo thời gian, và cho thấy quyết định mới đẩy bạn gần giới hạn đến đâu.',
    tt: 'Trạng thái tài chính tổng hợp số dư, dòng tiền, quỹ, ngân sách, nợ, mục tiêu và sự kiện sắp tới — không chỉ là tổng số dư.',
    mt: 'Mục tiêu là trạng thái bạn muốn đạt được, ví dụ tiết kiệm 100 triệu hay mua laptop.',
    no: 'Khoản nợ là một mối quan hệ tài chính: bạn vay hoặc cho vay, kèm trả nợ, lãi và điều chỉnh.',
    kh: 'Kế hoạch theo dõi quá trình hướng tới một hay nhiều mục tiêu. Đây không phải danh sách việc cần làm.',
    lich: 'Lịch đặt mọi sự kiện có ý nghĩa tài chính lên một dòng thời gian.'
  };
  const tiers = $('#tiers'), detail = $('#detail');
  const show = k => { detail.textContent = info[k]; tiers.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.k === k)); };
  tiers.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(b.dataset.k); });
  show('gd');
})();
