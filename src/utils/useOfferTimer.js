import { useState, useEffect } from 'react';

/**
 * Custom Hook: useOfferTimer
 * Accepts authoritative endDate from backend (e.g. Admin closing time: "2026-08-14T23:59:59.999Z")
 * Calculates real remaining time (Hours, Minutes, Seconds) until that exact timestamp.
 * Every visitor sees the EXACT same remaining countdown time.
 */
export default function useOfferTimer(endDate) {
  const calculateTimeLeft = () => {
    if (!endDate) {
      // Default to end of current day if missing
      const fallbackEnd = new Date();
      fallbackEnd.setHours(23, 59, 59, 999);
      const diff = Math.max(0, fallbackEnd.getTime() - Date.now());
      return { diff, isExpired: diff <= 0 };
    }

    const targetTime = new Date(endDate).getTime();
    const diff = Math.max(0, targetTime - Date.now());
    return { diff, isExpired: diff <= 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const state = calculateTimeLeft();
      setTimeLeft(state);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const totalSecs = Math.floor(timeLeft.diff / 1000);
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  const hrsStr = String(hrs).padStart(2, '0');
  const minsStr = String(mins).padStart(2, '0');
  const secsStr = String(secs).padStart(2, '0');

  const formattedMs = `${minsStr}:${secsStr}`;
  const formattedHms = `${hrsStr}:${minsStr}:${secsStr}`;

  return {
    hours: hrs,
    minutes: mins,
    seconds: secs,
    hoursStr: hrsStr,
    minutesStr: minsStr,
    secondsStr: secsStr,
    formattedMs,
    formattedHms,
    isExpired: timeLeft.isExpired,
  };
}
