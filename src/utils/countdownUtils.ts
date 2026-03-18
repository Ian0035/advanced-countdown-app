import type { Countdown, RemainingTime } from '../types/countdown';

const toMs = (value: Date | number) =>
  typeof value === 'number' ? value : value.getTime();

export const calculateRemainingTime = (
  targetDate: Date | number,
  now: Date | number = Date.now()
): RemainingTime => {
  const totalSeconds = Math.max(
    0,
    Math.floor((toMs(targetDate) - toMs(now)) / 1000)
  );

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { totalSeconds, days, hours, minutes, seconds };
};

export const isExpired = (
  targetDate: Date | number,
  now: Date | number = Date.now()
): boolean => toMs(targetDate) <= toMs(now);

export const getClosestCountdown = (
  countdowns: Countdown[],
  now: Date | number = Date.now()
): Countdown | null => {
  if (countdowns.length === 0) return null;

  const nowMs = toMs(now);
  let closest: Countdown | null = null;
  let smallestDelta = Number.POSITIVE_INFINITY;

  for (const countdown of countdowns) {
    const delta = countdown.targetDate.getTime() - nowMs;
    if (delta <= 0) continue;
    if (delta < smallestDelta) {
      smallestDelta = delta;
      closest = countdown;
    }
  }

  return closest;
};
