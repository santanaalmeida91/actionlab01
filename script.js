import { formatDuration, sum, examStatusLabel } from './src/utils.js';

// 🧪 TRY THIS: change this date, commit, push to main, and watch the
// deploy job redeploy the site automatically.
const EXAM_DATE = new Date('2026-09-25T09:00:00-03:00');

function tickCountdown() {
  const now = new Date();
  const diff = EXAM_DATE.getTime() - now.getTime();
  const { days, hours, minutes, seconds } = formatDuration(diff);

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
  document.getElementById('cd-status').textContent = examStatusLabel(days);
}

tickCountdown();
setInterval(tickCountdown, 1000);

// Tiny interactive element, backed by the same `sum()` tested in CI.
let clicks = 0;
const btn = document.getElementById('click-btn');
const counterEl = document.getElementById('click-count');
if (btn) {
  btn.addEventListener('click', () => {
    clicks = sum(clicks, 1);
    counterEl.textContent = String(clicks);
  });
}
