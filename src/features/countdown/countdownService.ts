import { createCountdown } from '../../services/api';
import type { Countdown } from '../../types/countdown';

const buildId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const createCountdownFromDate = async (
  startDate: Date,
  name: string
): Promise<Countdown> => {
  const targetDate = await createCountdown(startDate);
  return {
    id: buildId(),
    name,
    startDate,
    targetDate,
  };
};
