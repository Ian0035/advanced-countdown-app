import { useEffect, useRef } from 'react';
import { useCountdownStore } from '../countdownStore';

export const useCountdownTimer = () => {
  const tick = useCountdownStore((state) => state.tick);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    tick();
    const id = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(id);
  }, [tick]);
};
