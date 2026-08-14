import React, { useState, useEffect } from 'react';
import useOfferTimer from '../../utils/useOfferTimer';
import { useDemoAvailability } from '../../context/DemoAvailabilityContext';

/**
 * WhyStartNow — Premium Urgency Card (Requirement 6)
 */
export default function WhyStartNow({ onOpenModal }) {
  const { demoSessionsRemaining } = useDemoAvailability();

  const [offer, setOffer] = useState({
    endDate: null,
  });

  const { formattedHms, isExpired } = useOfferTimer(offer.endDate);

  useEffect(() => {
    let isMounted = true;
    const apiUrl = import.meta.env.VITE_API_URL || '';
    async function loadOffer() {
      try {
        const res = await fetch(`${apiUrl}/api/offer`).catch(() => null);
        if (res && res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            if (isMounted) setOffer(data);
          }
        }
      } catch (e) {}
    }
    loadOffer();
    return () => { isMounted = false; };
  }, []);

  const points = [
    {
      icon: '🟢',
      title: 'EXPERTS ARE AVAILABLE NOW',
      desc: 'Connect immediately while verified experts are available online.',
    },
    {
      icon: '🔥',
      title: 'LIMITED FREE INTRODUCTORY SESSIONS',
      desc: `${demoSessionsRemaining} free introductory sessions remain available today.`,
    },
    {
      icon: '⏳',
      title: "TODAY'S INTRODUCTORY OFFER",
      desc: isExpired
        ? "Today's free introductory session window has closed."
        : `Your free introductory session window closes in ${formattedHms}.`,
    },
  ];

  return (
    <section className="section-why-start-now content-container" id="why-start-now">
      <div className="glass-card glass-card-gold why-now-card-box">
        <h2 className="why-now-box-title">WHY START NOW?</h2>

        <div className="why-now-points-grid">
          {points.map((p, i) => (
            <div key={i} className="why-now-point-item">
              <span className="why-now-point-icon">{p.icon}</span>
              <div>
                <h3 className="why-now-point-title">{p.title}</h3>
                <p className="why-now-point-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="why-now-box-cta">
          <button className="btn-primary btn-gold" onClick={() => onOpenModal('Why Start Now')}>
            START MY FREE 5 MINUTES →
          </button>
        </div>
      </div>
    </section>
  );
}
