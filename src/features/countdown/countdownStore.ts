import { create } from 'zustand';
import type { Countdown } from '../../types/countdown';
import { isExpired } from '../../utils/countdownUtils';

type CountdownState = {
  countdowns: Countdown[];
  now: number;
  toastMessage?: string;
  toastToken?: number;
  addCountdown: (countdown: Countdown) => void;
  removeCountdown: (id: string) => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  tick: (nowOverride?: number) => void;
  reset: () => void;
};

export const useCountdownStore = create<CountdownState>((set) => ({
  countdowns: [],
  now: Date.now(),
  toastMessage: undefined,
  toastToken: undefined,
  addCountdown: (countdown) =>
    set((state) => ({
      countdowns: [...state.countdowns, countdown],
    })),
  removeCountdown: (id) =>
    set((state) => ({
      countdowns: state.countdowns.filter((item) => item.id !== id),
    })),
  showToast: (message) =>
    set(() => ({
      toastMessage: message,
      toastToken: Date.now(),
    })),
  clearToast: () =>
    set(() => ({
      toastMessage: undefined,
      toastToken: undefined,
    })),
  tick: (nowOverride) =>
    set((state) => {
      const now = nowOverride ?? Date.now();
      const countdowns = state.countdowns.filter(
        (item) => !isExpired(item.targetDate, now)
      );
      return { now, countdowns };
    }),
  reset: () => set({ countdowns: [], now: Date.now() }),
}));
