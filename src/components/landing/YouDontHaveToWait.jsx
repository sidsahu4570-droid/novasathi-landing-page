import React, { useState, useEffect } from 'react';
import useTenMinTimer from '../../utils/useTenMinTimer';

/**
 * YouDontHaveToWait — Requirement 12
 * High-converting mid-page section reinforcing immediate expert availability and session limits.
 */
export default function YouDontHaveToWait({ onOpenModal }) {
  const { formattedHms } = useTenMinTimer();
  const [offer, setOffer] = useState({
    remainingSlots: 12,
    expertsAvailableCount: 3,
  });

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

  const remaining = offer.remainingSlots;
  const expertsCount = offer.expertsAvailableCount || 3;

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
            <span><strong>{remaining} free introductory sessions</strong> remaining today</span>
          </div>

          <div className="wait-status-item">
            <span>⏳</span>
            <span>Today's introductory window closes in <strong>{formattedHms}</strong></span>
          </div>
        </div>

        <button
          className="btn-primary btn-gold wait-cta-btn"
          onClick={() => onOpenModal('You Dont Have To Wait')}
        >
          TALK TO AN EXPERT NOW →
        </button>
      </div>
    </section>
  );
}
