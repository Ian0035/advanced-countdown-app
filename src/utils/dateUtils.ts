import type { RemainingTime } from '../types/countdown';

const pad2 = (value: number) => value.toString().padStart(2, '0');

export const formatRemainingTime = (time: RemainingTime): string => {
  const base = `${pad2(time.hours)}:${pad2(time.minutes)}:${pad2(
    time.seconds
  )}`;
  if (time.days <= 0) return base;
  return `${time.days}d ${base}`;
};

export const formatRemainingTimeNoSeconds = (
  time: RemainingTime
): string => {
  const base = `${pad2(time.hours)}:${pad2(time.minutes)}`;
  if (time.days <= 0) return base;
  return `${time.days}d ${base}`;
};

export const formatDateTimeNoSeconds = (value: Date): string =>
  value.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
