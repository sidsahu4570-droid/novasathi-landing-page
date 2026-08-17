import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STARTING_SESSIONS = 12;
const TOTAL_SESSION_CAPACITY = 100;
const MIN_SESSIONS_FLOOR = 7;

/**
 * Exact Sequential Countdown Intervals (in seconds):
 * Step 0 (12 -> 11): Wait 30s from initial page open
 * Step 1 (11 -> 10): Wait 60s from the exact moment 11 appeared
 * Step 2 (10 -> 9) : Wait 90s (1m 30s) from the exact moment 10 appeared
 * Step 3 (9  -> 8) : Wait 120s (2m 00s) from the exact moment 9 appeared
 * Step 4 (8  -> 7) : Wait 150s (2m 30s) from the exact moment 8 appeared
 * Step 5 (7 STOP)  : Permanent stop at 7
 */
const STEP_INTERVALS = [30, 60, 90, 120, 150];
const STORAGE_KEY = 'novaSathiSessionCountdown';

function getOrInitCountdownState() {
  if (typeof window === 'undefined') {
    return {
      currentSessionsRemaining: STARTING_SESSIONS,
      currentStep: 0,
      lastTransitionTimestamp: Date.now(),
    };
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (
        typeof parsed.currentSessionsRemaining === 'number' &&
        typeof parsed.currentStep === 'number' &&
        typeof parsed.lastTransitionTimestamp === 'number'
      ) {
        return parsed;
      }
    } catch (e) {}
  }

  const initial = {
    currentSessionsRemaining: STARTING_SESSIONS,
    currentStep: 0,
    lastTransitionTimestamp: Date.now(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {}
  return initial;
}

function computeUpdatedState(prevState) {
  let { currentSessionsRemaining, currentStep, lastTransitionTimestamp } = prevState;
  const now = Date.now();
  let changed = false;

  while (currentStep < STEP_INTERVALS.length && currentSessionsRemaining > MIN_SESSIONS_FLOOR) {
    const stepDurationMs = STEP_INTERVALS[currentStep] * 1000;
    const timeSpentInStep = now - lastTransitionTimestamp;

    if (timeSpentInStep >= stepDurationMs) {
      currentSessionsRemaining -= 1;
      lastTransitionTimestamp += stepDurationMs;
      currentStep += 1;
      changed = true;
    } else {
      break;
    }
  }

  if (currentSessionsRemaining < MIN_SESSIONS_FLOOR) {
    currentSessionsRemaining = MIN_SESSIONS_FLOOR;
  }

  const newState = {
    currentSessionsRemaining,
    currentStep,
    lastTransitionTimestamp,
  };

  if (changed && typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {}
  }

  return newState;
}

const DemoAvailabilityContext = createContext({
  currentSessionsRemaining: 12,
  introductorySessionsRemaining: 12,
  demoSessionsRemaining: 12,
  startingSessions: 12,
  STARTING_SESSIONS: 12,
  totalCapacity: 100,
  TOTAL_SESSION_CAPACITY: 100,
  availabilityPercentage: 12,
  availabilityText: '12 of 100 sessions remaining today',
  progressWidth: 12,
  expertsAvailableCount: 3,
  showAvailabilityUrgency: true,
  showIntroductorySessionCount: true,
  startingCount: 12,
  decrementSessions: () => {},
});

export function DemoAvailabilityProvider({ children }) {
  const [adminConfig, setAdminConfig] = useState({
    expertsAvailableCount: 3,
    showAvailabilityUrgency: true,
    showIntroductorySessionCount: true,
  });

  const [countdownState, setCountdownState] = useState(getOrInitCountdownState);

  // Sync state tick function
  const tickCountdown = useCallback(() => {
    setCountdownState((prev) => computeUpdatedState(prev));
  }, []);

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
          expertsAvailableCount: parsed.expertsAvailableCount ?? 3,
          showAvailabilityUrgency: parsed.showRemainingSlots ?? true,
          showIntroductorySessionCount: parsed.showRemainingSlots ?? true,
        });
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchAdminConfig();
  }, []);

  useEffect(() => {
    tickCountdown();
    // High-resolution interval check (every 500ms) to ensure exact transitions on step completion
    const interval = setInterval(tickCountdown, 500);

    // Multi-tab synchronization via window storage event
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setCountdownState(computeUpdatedState(parsed));
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [tickCountdown]);

  const decrementSessions = () => {
    setCountdownState((prev) => {
      const nextCount = Math.max(MIN_SESSIONS_FLOOR, prev.currentSessionsRemaining - 1);
      const nextStep = Math.min(STEP_INTERVALS.length, prev.currentStep + 1);
      const updated = {
        currentSessionsRemaining: nextCount,
        currentStep: nextStep,
        lastTransitionTimestamp: Date.now(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const currentCount = countdownState.currentSessionsRemaining;
  const availabilityPercentage = currentCount; // e.g. 12 -> 12%, 11 -> 11%, 10 -> 10%, 9 -> 9%, 8 -> 8%, 7 -> 7%
  const availabilityText = `${currentCount} of ${TOTAL_SESSION_CAPACITY} sessions remaining today`;
  const progressWidth = availabilityPercentage;

  return (
    <DemoAvailabilityContext.Provider
      value={{
        currentSessionsRemaining: currentCount,
        introductorySessionsRemaining: currentCount,
        demoSessionsRemaining: currentCount,
        startingSessions: STARTING_SESSIONS,
        STARTING_SESSIONS,
        totalCapacity: TOTAL_SESSION_CAPACITY,
        TOTAL_SESSION_CAPACITY,
        availabilityPercentage,
        availabilityText,
        progressWidth,
        expertsAvailableCount: adminConfig.expertsAvailableCount,
        showAvailabilityUrgency: adminConfig.showAvailabilityUrgency,
        showIntroductorySessionCount: adminConfig.showIntroductorySessionCount,
        startingCount: STARTING_SESSIONS,
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
