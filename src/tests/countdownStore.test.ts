import { useCountdownStore } from '../features/countdown/countdownStore';

describe('countdownStore', () => {
  beforeEach(() => {
    useCountdownStore.getState().reset();
  });

  test('addCountdown adds a countdown', () => {
    const countdown = {
      id: '1',
      name: 'Countdown',
      startDate: new Date('2026-01-01T00:00:00Z'),
      targetDate: new Date('2026-01-01T00:02:00Z'),
    };

    useCountdownStore.getState().addCountdown(countdown);

    expect(useCountdownStore.getState().countdowns).toHaveLength(1);
  });

  test('removeCountdown removes a countdown', () => {
    const countdown = {
      id: '1',
      name: 'Countdown',
      startDate: new Date('2026-01-01T00:00:00Z'),
      targetDate: new Date('2026-01-01T00:02:00Z'),
    };

    const store = useCountdownStore.getState();
    store.addCountdown(countdown);
    store.removeCountdown('1');

    expect(useCountdownStore.getState().countdowns).toHaveLength(0);
  });

  test('tick removes expired countdowns and updates now', () => {
    const countdown = {
      id: '1',
      name: 'Countdown',
      startDate: new Date('2026-01-01T00:00:00Z'),
      targetDate: new Date('2026-01-01T00:00:10Z'),
    };

    const store = useCountdownStore.getState();
    store.addCountdown(countdown);
    store.tick(new Date('2026-01-01T00:00:20Z').getTime());

    expect(useCountdownStore.getState().countdowns).toHaveLength(0);
    expect(useCountdownStore.getState().now).toBe(
      new Date('2026-01-01T00:00:20Z').getTime()
    );
  });
});
