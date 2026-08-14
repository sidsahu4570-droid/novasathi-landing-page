import { useState, useEffect } from 'react';

/**
 * Custom Hook: useTenMinTimer
 * Maintains a continuous 10-minute decreasing countdown timer (MM:SS, e.g. "09:58", "09:57").
 * Synchronized via sessionStorage so reloading or navigating keeps the exact decreasing time.
 */
export default function useTenMinTimer() {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    let target = sessionStorage.getItem('ns_10m_target');
    if (!target) {
      target = Date.now() + 10 * 60 * 1000; // 10 minutes from now
      sessionStorage.setItem('ns_10m_target', target);
    }
    const diff = Math.max(0, Math.floor((Number(target) - Date.now()) / 1000));
    return diff > 0 ? diff : 600;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let target = sessionStorage.getItem('ns_10m_target');
      if (!target) {
        target = Date.now() + 10 * 60 * 1000;
        sessionStorage.setItem('ns_10m_target', target);
      }
      let diff = Math.floor((Number(target) - Date.now()) / 1000);

      if (diff <= 0) {
        // Reset 10 minutes when expired
        const newTarget = Date.now() + 10 * 60 * 1000;
        sessionStorage.setItem('ns_10m_target', newTarget);
        diff = 600;
      }

      setSecondsLeft(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return {
    minutes: mins,
    seconds: secs,
    formatted,
  };
}
