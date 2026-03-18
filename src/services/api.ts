import { addMinutes } from 'date-fns';

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const createCountdown = async (date: Date): Promise<Date> => {
  await delay(1000);
  return addMinutes(date, 2);
};
