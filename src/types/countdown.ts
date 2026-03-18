export type Countdown = {
  id: string;
  name: string;
  startDate: Date;
  targetDate: Date;
};

export type RemainingTime = {
  totalSeconds: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
