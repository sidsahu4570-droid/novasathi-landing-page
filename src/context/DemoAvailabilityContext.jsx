import React, { createContext, useContext, useState, useEffect } from 'react';

const DemoAvailabilityContext = createContext({
  introductorySessionsRemaining: 12,
  expertsAvailableCount: 3,
  showAvailabilityUrgency: true,
  showIntroductorySessionCount: true,
  startingCount: 12,
  decrementSessions: () => {},
});

/**
 * Milestone Decrement Function
 * Calculates how many session milestone steps have passed based on cumulative elapsed seconds since page open:
 * 0s-29s  : 0 steps (e.g. 12)
 * 30s-59s : 1 step  (e.g. 11)
 * 60s-119s: 2 steps (e.g. 10)
 * 120s-179s: 3 steps (e.g. 9)
 * 180s-209s: 4 steps (e.g. 8)
 * >=210s   : 5 steps (e.g. 7 - STOPS permanently at step 5)
 */
function getMilestoneSteps(elapsedSec) {
  if (elapsedSec < 30) return 0;
  if (elapsedSec < 60) return 1;
  if (elapsedSec < 120) return 2;
  if (elapsedSec < 180) return 3;
  if (elapsedSec < 210) return 4;
  return 5;
}

export function DemoAvailabilityProvider({ children }) {
  const [adminConfig, setAdminConfig] = useState({
    startingCount: 12,
    expertsAvailableCount: 3,
    showAvailabilityUrgency: true,
    showIntroductorySessionCount: true,
  });

  const [currentSessionsRemaining, setCurrentSessionsRemaining] = useState(12);

  // Initialize or read visitor start timestamp from localStorage
  const getVisitorStartTime = () => {
    let saved = localStorage.getItem('novaSathiIntroStartTime');
    if (!saved) {
      saved = String(Date.now());
      localStorage.setItem('novaSathiIntroStartTime', saved);
    }
    return Number(saved);
  };

  // Fetch admin settings from backend or localStorage fallback
  const fetchAdminConfig = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    try {
      const res = await fetch(`${apiUrl}/api/offer`).catch(() => null);
      if (res && res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          setAdminConfig({
            startingCount: data.dailyLimit ?? 12,
            expertsAvailableCount: data.expertsAvailableCount ?? 3,
            showAvailabilityUrgency: data.showRemainingSlots ?? true,
            showIntroductorySessionCount: data.showRemainingSlots ?? true,
          });
          return;
        }
      }

      const saved = localStorage.getItem('ns_offer_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setAdminConfig({
          startingCount: parsed.dailyLimit ?? 12,
          expertsAvailableCount: parsed.expertsAvailableCount ?? 3,
          showAvailabilityUrgency: parsed.showRemainingSlots ?? true,
          showIntroductorySessionCount: parsed.showRemainingSlots ?? true,
        });
      }
    } catch (e) {}
  };

  // Calculate current session count based on elapsed time from visitor start
  const updateSessionCount = () => {
    const startTime = getVisitorStartTime();
    const elapsedSec = Math.max(0, Math.floor((Date.now() - startTime) / 1000));
    const stepsPassed = getMilestoneSteps(elapsedSec);
    const start = adminConfig.startingCount || 12;
    const minFloor = Math.max(0, start - 5);
    const calculatedCount = Math.max(minFloor, start - stepsPassed);

    setCurrentSessionsRemaining(calculatedCount);
    localStorage.setItem('novaSathiSessionCount', String(calculatedCount));
  };

  useEffect(() => {
    fetchAdminConfig();
  }, []);

  useEffect(() => {
    updateSessionCount();
    const interval = setInterval(updateSessionCount, 1000); // Check every second for exact milestone transitions
    return () => clearInterval(interval);
  }, [adminConfig.startingCount]);

  const decrementSessions = () => {
    setCurrentSessionsRemaining((prev) => Math.max(0, prev - 1));
  };

  return (
    <DemoAvailabilityContext.Provider
      value={{
        introductorySessionsRemaining: currentSessionsRemaining,
        expertsAvailableCount: adminConfig.expertsAvailableCount,
        showAvailabilityUrgency: adminConfig.showAvailabilityUrgency,
        showIntroductorySessionCount: adminConfig.showIntroductorySessionCount,
        startingCount: adminConfig.startingCount,
        decrementSessions,
      }}
    >
      {children}
    </DemoAvailabilityContext.Provider>
  );
}

export function useDemoAvailability() {
  return useContext(DemoAvailabilityContext);
}
