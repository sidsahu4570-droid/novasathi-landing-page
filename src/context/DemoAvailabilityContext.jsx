import React, { createContext, useContext, useState, useEffect } from 'react';

const DemoAvailabilityContext = createContext({
  introductorySessionsRemaining: 12,
  expertsAvailableCount: 3,
  showAvailabilityUrgency: true,
  showIntroductorySessionCount: true,
  decrementSessions: () => {},
});

export function DemoAvailabilityProvider({ children }) {
  const [offerState, setOfferState] = useState({
    introductorySessionsRemaining: 12,
    expertsAvailableCount: 3,
    showAvailabilityUrgency: true,
    showIntroductorySessionCount: true,
  });

  const fetchOfferState = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    try {
      const res = await fetch(`${apiUrl}/api/offer`).catch(() => null);
      if (res && res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          const remaining = Math.max(0, (data.dailyLimit ?? 12) - (data.sessionsUsed ?? 0));
          setOfferState({
            introductorySessionsRemaining: remaining,
            expertsAvailableCount: data.expertsAvailableCount ?? 3,
            showAvailabilityUrgency: data.showRemainingSlots ?? true,
            showIntroductorySessionCount: data.showRemainingSlots ?? true,
          });
          return;
        }
      }
      // LocalStorage fallback
      const saved = localStorage.getItem('ns_offer_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        const remaining = Math.max(0, (parsed.dailyLimit ?? 12) - (parsed.sessionsUsed ?? 0));
        setOfferState({
          introductorySessionsRemaining: remaining,
          expertsAvailableCount: parsed.expertsAvailableCount ?? 3,
          showAvailabilityUrgency: parsed.showRemainingSlots ?? true,
          showIntroductorySessionCount: parsed.showRemainingSlots ?? true,
        });
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchOfferState();
    const interval = setInterval(fetchOfferState, 15000); // Polling every 15s to keep real admin state fresh
    return () => clearInterval(interval);
  }, []);

  const decrementSessions = () => {
    setOfferState((prev) => ({
      ...prev,
      introductorySessionsRemaining: Math.max(0, prev.introductorySessionsRemaining - 1),
    }));
  };

  return (
    <DemoAvailabilityContext.Provider
      value={{
        introductorySessionsRemaining: offerState.introductorySessionsRemaining,
        expertsAvailableCount: offerState.expertsAvailableCount,
        showAvailabilityUrgency: offerState.showAvailabilityUrgency,
        showIntroductorySessionCount: offerState.showIntroductorySessionCount,
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
