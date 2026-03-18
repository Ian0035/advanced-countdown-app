import {
  calculateRemainingTime,
  getClosestCountdown,
  isExpired,
} from '../utils/countdownUtils';
import type { Countdown } from '../types/countdown';

describe('countdownUtils', () => {
  test('calculateRemainingTime returns expected breakdown', () => {
    const now = new Date('2026-01-01T00:00:00Z');
    const target = new Date('2026-01-01T00:01:40Z');

    const remaining = calculateRemainingTime(target, now);

    expect(remaining.totalSeconds).toBe(100);
    expect(remaining.minutes).toBe(1);
    expect(remaining.seconds).toBe(40);
  });

  test('isExpired detects expired targets', () => {
    const now = new Date('2026-01-01T00:00:00Z');
    const target = new Date('2025-12-31T23:59:00Z');
    expect(isExpired(target, now)).toBe(true);
  });

  test('getClosestCountdown returns nearest unexpired countdown', () => {
    const now = new Date('2026-01-01T00:00:00Z');
    const countdowns: Countdown[] = [
      {
        id: 'a',
        name: 'Countdown A',
        startDate: now,
        targetDate: new Date('2026-01-01T00:05:00Z'),
      },
      {
        id: 'b',
        name: 'Countdown B',
        startDate: now,
        targetDate: new Date('2026-01-01T00:02:00Z'),
      },
    ];

    const closest = getClosestCountdown(countdowns, now);

    expect(closest?.id).toBe('b');
  });

  test('getClosestCountdown returns null when none are active', () => {
    const now = new Date('2026-01-01T00:00:00Z');
    const countdowns: Countdown[] = [
      {
        id: 'a',
        name: 'Countdown A',
        startDate: now,
        targetDate: new Date('2025-12-31T23:00:00Z'),
      },
    ];

    expect(getClosestCountdown(countdowns, now)).toBeNull();
  });
});
