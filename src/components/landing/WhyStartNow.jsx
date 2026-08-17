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
      title: 'ASTROLOGERS AVAILABLE ONLINE',
      desc: 'Speak directly with experienced astrologers about your career, relationships and future.',
    },
    {
      icon: '✨',
      title: 'PERSONALIZED BIRTH CHART',
      desc: 'Guidance calculated from your birth date, exact birth time and birthplace.',
    },
    {
      icon: '🔒',
      title: 'PRIVATE & CONFIDENTIAL',
      desc: 'Discuss your personal questions in a 100% secure, one-on-one consultation.',
    },
  ];

  return (
    <section className="section-why-start-now content-container" id="why-start-now">
      <div className="glass-card glass-card-gold why-now-card-box">
        <h2 className="why-now-box-title">WHY GET AN ASTROLOGY CONSULTATION?</h2>

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
            START MY CONSULTATION →
          </button>
        </div>
      </div>
    </section>
  );
}
