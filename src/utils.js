// Pure, easily-testable functions. Kept separate from script.js (DOM code)
// on purpose — this is what tests/utils.test.js exercises in CI.

/**
 * Breaks a millisecond duration into days/hours/minutes/seconds.
 * @param {number} ms - non-negative duration in milliseconds
 * @returns {{days:number, hours:number, minutes:number, seconds:number}}
 */
export function formatDuration(ms) {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

/**
 * Adds two numbers. Trivial on purpose — used as the "obviously correct"
 * baseline test so you have something safe to break/fix while practicing.
 */
export function sum(a, b) {
  return a + b;
}

/**
 * Returns a short (7-char) commit SHA given a full one.
 * @param {string} sha
 */
export function shortSha(sha) {
  if (typeof sha !== 'string') return '';
  return sha.slice(0, 7);
}

/**
 * Picks a status label based on how many days remain.
 * @param {number} daysRemaining
 */
export function examStatusLabel(daysRemaining) {
  if (daysRemaining <= 0) return 'EXAM DAY';
  if (daysRemaining <= 1) return 'FINAL HOURS';
  if (daysRemaining <= 4) return 'FINAL SPRINT';
  return 'IN PROGRESS';
}
