import React, { createContext, useContext, useState, useEffect } from 'react';

const DemoAvailabilityContext = createContext({
  demoSessionsRemaining: 12,
  demoCapacity: 50,
  demoPercent: 24,
});

export function DemoAvailabilityProvider({ children }) {
  const [demoSessionsRemaining, setDemoSessionsRemaining] = useState(12);
  const demoCapacity = 50;

  useEffect(() => {
    console.log("Demo availability started: 12");

    const t1 = setTimeout(() => {
      setDemoSessionsRemaining(11);
      console.log("Demo availability changed: 11");
    }, 30000); // 30s from load -> 11

    const t2 = setTimeout(() => {
      setDemoSessionsRemaining(10);
      console.log("Demo availability changed: 10");
    }, 60000); // 60s from load -> 10

    const t3 = setTimeout(() => {
      setDemoSessionsRemaining(9);
      console.log("Demo availability changed: 9");
    }, 120000); // 120s from load -> 9

    const t4 = setTimeout(() => {
      setDemoSessionsRemaining(8);
      console.log("Demo availability changed: 8");
    }, 240000); // 240s from load -> 8

    const t5 = setTimeout(() => {
      setDemoSessionsRemaining(7);
      console.log("Demo availability changed: 7");
    }, 390000); // 390s (6m 30s) from load -> 7 (stops permanently)

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const demoPercent = Math.round((demoSessionsRemaining / demoCapacity) * 100);

  return (
    <DemoAvailabilityContext.Provider
      value={{
        demoSessionsRemaining,
        demoCapacity,
        demoPercent,
      }}
    >
      {children}
    </DemoAvailabilityContext.Provider>
  );
}

export function useDemoAvailability() {
  return useContext(DemoAvailabilityContext);
}
