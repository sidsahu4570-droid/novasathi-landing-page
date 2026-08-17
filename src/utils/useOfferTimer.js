import { useState, useEffect } from 'react';

/**
 * Custom Hook: useOfferTimer
 * Maintains an active 10-minute decreasing countdown timer (MM Minutes : SS Seconds, e.g. "09 : 58").
 * Ensures duration starts at 10 minutes (600s) and decrements live every second.
 * Persisted per visitor session in sessionStorage.
 */
export default function useOfferTimer(endDateParam) {
  const getTargetTime = () => {
    // 1. If authoritative future endDate is provided by admin
    if (endDateParam) {
      const parsed = new Date(endDateParam).getTime();
      if (!isNaN(parsed) && parsed > Date.now()) {
        return parsed;
      }
    }

    // 2. Per-session 10-minute countdown target
    let target = sessionStorage.getItem('ns_intro_10m_target');
    if (!target || Number(target) <= Date.now()) {
      target = String(Date.now() + 10 * 60 * 1000); // 10 minutes from now
      sessionStorage.setItem('ns_intro_10m_target', target);
    }

    return Number(target);
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
