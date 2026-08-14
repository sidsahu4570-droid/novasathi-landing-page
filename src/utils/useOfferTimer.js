import { useState, useEffect } from 'react';

/**
 * Custom Hook: useOfferTimer
 * Maintains a strict 10-minute decreasing countdown timer (00 Hours : MM Minutes : SS Seconds, e.g. "00 : 09 : 58").
 * Ensures hours is ALWAYS "00" and duration is 10 minutes maximum.
 * Synchronized per visitor session via sessionStorage target.
 */
export default function useOfferTimer(endDate) {
  const getInitialTarget = () => {
    let target = sessionStorage.getItem('ns_offer_10m_target');
    if (!target) {
      target = Date.now() + 10 * 60 * 1000; // 10 minutes from now
      sessionStorage.setItem('ns_offer_10m_target', target);
    }
    const diff = Math.max(0, Math.floor((Number(target) - Date.now()) / 1000));
    return diff > 0 ? diff : 600;
  };

  const [secondsLeft, setSecondsLeft] = useState(getInitialTarget);

  useEffect(() => {
    const interval = setInterval(() => {
      let target = sessionStorage.getItem('ns_offer_10m_target');
      if (!target) {
        target = Date.now() + 10 * 60 * 1000;
        sessionStorage.setItem('ns_offer_10m_target', target);
      }

      let diff = Math.floor((Number(target) - Date.now()) / 1000);

      if (diff <= 0) {
        // Reset 10 minutes when expired
        const newTarget = Date.now() + 10 * 60 * 1000;
        sessionStorage.setItem('ns_offer_10m_target', newTarget);
        diff = 600;
      }

      setSecondsLeft(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
