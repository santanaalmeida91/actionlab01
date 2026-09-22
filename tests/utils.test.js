import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatDuration, sum, shortSha, examStatusLabel } from '../src/utils.js';

test('sum adds two numbers correctly', () => {
  assert.equal(sum(2, 3), 5);
  assert.equal(sum(-1, 1), 0);
});

test('formatDuration breaks down milliseconds correctly', () => {
  const oneDayOneHour = (24 + 1) * 60 * 60 * 1000;
  const result = formatDuration(oneDayOneHour);
  assert.equal(result.days, 1);
  assert.equal(result.hours, 1);
  assert.equal(result.minutes, 0);
  assert.equal(result.seconds, 0);
});

test('formatDuration clamps negative durations to zero', () => {
  const result = formatDuration(-5000);
  assert.equal(result.days, 0);
  assert.equal(result.hours, 0);
  assert.equal(result.minutes, 0);
  assert.equal(result.seconds, 0);
});

test('shortSha truncates to 7 characters', () => {
  assert.equal(shortSha('a1b2c3d4e5f6g7h8'), 'a1b2c3d');
  assert.equal(shortSha(''), '');
});

test('examStatusLabel reflects urgency', () => {
  assert.equal(examStatusLabel(10), 'IN PROGRESS');
  assert.equal(examStatusLabel(4), 'FINAL SPRINT');
  assert.equal(examStatusLabel(1), 'FINAL HOURS');
  assert.equal(examStatusLabel(0), 'EXAM DAY');
  assert.equal(examStatusLabel(-2), 'EXAM DAY');
});

// 🧪 TRY THIS: change the assertion below to something wrong (e.g. `6` instead
// of `5`) and push to a branch — the "Build & Test" job in ci-cd.yml should
// fail, and the deploy job should never run because it `needs: test`.
test('sanity check you can intentionally break for practice', () => {
  assert.equal(sum(2, 3), 5);
});
