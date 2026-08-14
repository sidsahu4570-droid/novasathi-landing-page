import React, { useState, useEffect } from 'react';
import useOfferTimer from '../../utils/useOfferTimer';
import { useDemoAvailability } from '../../context/DemoAvailabilityContext';

/**
 * YouDontHaveToWait — Requirement 12
 */
export default function YouDontHaveToWait({ onOpenModal }) {
  const { demoSessionsRemaining } = useDemoAvailability();

  const [offer, setOffer] = useState({
    expertsAvailableCount: 3,
    endDate: null,
    active: true,
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

  const expertsCount = offer.expertsAvailableCount || 3;
  const isDisabled = demoSessionsRemaining <= 0 || isExpired || !offer.active;

  return (
    <section className="section-you-dont-wait content-container" id="available-now-section">
      <div className="glass-card glass-card-gold you-dont-wait-box">
        <span className="wait-badge">⚡ IMMEDIATE ACTION</span>

        <h2 className="wait-title">YOU DON'T HAVE TO WAIT.</h2>
        <p className="wait-sub">Verified experts are available right now.</p>

        <div className="wait-status-list">
          <div className="wait-status-item">
            <span className="pulse-dot">🟢</span>
            <span><strong>{expertsCount} experts</strong> available right now</span>
          </div>

          <div className="wait-status-item">
            <span>🔥</span>
            <span><strong>{demoSessionsRemaining} free introductory sessions</strong> remaining today</span>
          </div>

          <div className="wait-status-item">
            <span>⏳</span>
            <span>
              {isExpired ? 'Today\'s introductory window is closed' : `Today's introductory window closes in ${formattedHms}`}
            </span>
          </div>
        </div>

        <button
          className="btn-primary btn-gold wait-cta-btn"
          onClick={() => onOpenModal('You Dont Have To Wait')}
          disabled={isDisabled}
        >
          {isDisabled ? 'TODAY\'S OFFER CLOSED' : 'TALK TO AN EXPERT NOW →'}
        </button>
      </div>
    </section>
  );
}
