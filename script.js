import { formatDuration, sum, examStatusLabel } from './src/utils.js';

// 🧪 TRY THIS: change this date, commit via a branch + PR, and watch the
// CI pipeline validate it before a release branch redeploys the site.
const EXAM_DATE = new Date('2026-09-25T09:00:00-03:00');

const els = {
  days: document.getElementById('cd-days'),
  hours: document.getElementById('cd-hours'),
  minutes: document.getElementById('cd-minutes'),
  seconds: document.getElementById('cd-seconds'),
  status: document.getElementById('cd-status'),
};

function tickCountdown() {
  const now = new Date();
  const diff = EXAM_DATE.getTime() - now.getTime();
  const { days, hours, minutes, seconds } = formatDuration(diff);

  if (els.days) els.days.textContent = String(days).padStart(2, '0');
  if (els.hours) els.hours.textContent = String(hours).padStart(2, '0');
  if (els.minutes) els.minutes.textContent = String(minutes).padStart(2, '0');
  if (els.seconds) els.seconds.textContent = String(seconds).padStart(2, '0');
  if (els.status) els.status.textContent = examStatusLabel(days);
}

tickCountdown();
setInterval(tickCountdown, 1000);

// Practice-question counter, backed by the same `sum()` function covered
// by npm test — a small, honest link between the UI and the CI pipeline.
let reps = 0;
const btn = document.getElementById('click-btn');
const counterEl = document.getElementById('click-count');
if (btn && counterEl) {
  btn.addEventListener('click', () => {
    reps = sum(reps, 1);
    counterEl.textContent = String(reps);
  });
}