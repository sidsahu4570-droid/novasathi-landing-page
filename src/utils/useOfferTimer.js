import { useState, useEffect } from 'react';

/**
 * Custom Hook: useOfferTimer
 * Maintains a strict 10-minute decreasing countdown timer (00 Hours : MM Minutes : SS Seconds, e.g. "00 : 09 : 58").
 * Ensures hours is ALWAYS "00" and duration is 10 minutes maximum.
 * Synchronized per visitor session via sessionStorage target.
 */
export default function useOfferTimer(endDateParam) {
  const getTargetTime = () => {
    if (endDateParam) {
      const parsed = new Date(endDateParam).getTime();
      if (!isNaN(parsed)) return parsed;
    }

    let saved = localStorage.getItem('novaSathiIntroStartTime');
    if (!saved) {
      saved = String(Date.now());
      localStorage.setItem('novaSathiIntroStartTime', saved);
    }
    // 10 minutes (600 seconds) target from initial visit
    return Number(saved) + 10 * 60 * 1000;
  };

  const calculateDiff = () => {
    const target = getTargetTime();
    const diffSec = Math.max(0, Math.floor((target - Date.now()) / 1000));
    return diffSec;
  };

  const [secondsLeft, setSecondsLeft] = useState(calculateDiff);

  useEffect(() => {
    setSecondsLeft(calculateDiff());
    const interval = setInterval(() => {
      const diff = calculateDiff();
      setSecondsLeft(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDateParam]);

  const hrs = 0;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  const hrsStr = '00';
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
    isExpired: secondsLeft <= 0,
  };
}
