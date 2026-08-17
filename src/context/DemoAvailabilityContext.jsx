import React, { createContext, useContext, useState, useEffect } from 'react';

const STARTING_SESSIONS = 12;

const DemoAvailabilityContext = createContext({
  currentSessionsRemaining: 12,
  introductorySessionsRemaining: 12,
  startingSessions: 12,
  STARTING_SESSIONS: 12,
  availabilityPercentage: 100,
  availabilityText: '12 of 12 sessions remaining today',
  progressWidth: 100,
  expertsAvailableCount: 3,
  showAvailabilityUrgency: true,
  showIntroductorySessionCount: true,
  startingCount: 12,
  decrementSessions: () => {},
});

/**
 * Milestone Decrement Function
 * 0s-29s   : 12
 * 30s-59s  : 11
 * 60s-119s : 10
 * 120s-179s: 9
 * 180s-209s: 8
 * >=210s   : 7 (never decreases below 7)
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
    startingCount: STARTING_SESSIONS,
    expertsAvailableCount: 3,
    showAvailabilityUrgency: true,
    showIntroductorySessionCount: true,
  });

  const [currentSessionsRemaining, setCurrentSessionsRemaining] = useState(STARTING_SESSIONS);

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
          const limit = (data.dailyLimit && data.dailyLimit !== 50) ? data.dailyLimit : STARTING_SESSIONS;
          setAdminConfig({
            startingCount: limit,
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
        const limit = (parsed.dailyLimit && parsed.dailyLimit !== 50) ? parsed.dailyLimit : STARTING_SESSIONS;
        setAdminConfig({
          startingCount: limit,
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
    const start = (adminConfig.startingCount && adminConfig.startingCount !== 50) ? adminConfig.startingCount : STARTING_SESSIONS;
    const minFloor = Math.max(7, start - 5);
    const calculatedCount = Math.max(minFloor, start - stepsPassed);

    setCurrentSessionsRemaining(calculatedCount);
    localStorage.setItem('novaSathiSessionCount', String(calculatedCount));
  };

  useEffect(() => {
    fetchAdminConfig();
  }, []);

  useEffect(() => {
    updateSessionCount();
    const interval = setInterval(updateSessionCount, 1000);
    return () => clearInterval(interval);
  }, [adminConfig.startingCount]);

  const decrementSessions = () => {
    setCurrentSessionsRemaining((prev) => Math.max(7, prev - 1));
  };

  const startingSessions = (adminConfig.startingCount && adminConfig.startingCount !== 50) ? adminConfig.startingCount : STARTING_SESSIONS;
  const rawPct = (currentSessionsRemaining / startingSessions) * 100;
  const availabilityPercentage = rawPct % 1 === 0 ? rawPct : Number(rawPct.toFixed(1));
  const availabilityText = `${currentSessionsRemaining} of ${startingSessions} sessions remaining today`;
  const progressWidth = availabilityPercentage;

  return (
    <DemoAvailabilityContext.Provider
      value={{
        currentSessionsRemaining,
        introductorySessionsRemaining: currentSessionsRemaining,
        startingSessions,
        STARTING_SESSIONS: startingSessions,
        availabilityPercentage,
        availabilityText,
        progressWidth,
        expertsAvailableCount: adminConfig.expertsAvailableCount,
        showAvailabilityUrgency: adminConfig.showAvailabilityUrgency,
        showIntroductorySessionCount: adminConfig.showIntroductorySessionCount,
        startingCount: startingSessions,
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
