import React, { useState, useEffect } from 'react';
import useTenMinTimer from '../../utils/useTenMinTimer';

/**
 * FinalCTA — Requirement 18
 * High-Converting Final Urgency Box ("STILL THINKING ABOUT IT?")
 */
export default function FinalCTA({ onOpenModal }) {
  const { formattedHms } = useTenMinTimer();
  const [offer, setOffer] = useState({
    active: true,
    remainingSlots: 12,
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
  const isFull = remaining <= 0;

  return (
    <section className="section-final-cta content-container">
      <div className="glass-card glass-card-gold final-cta-card">
        <h2 className="final-cta-headline">STILL THINKING ABOUT IT?</h2>

        <p className="final-cta-sub" style={{ color: 'var(--color-warm-gold)', fontWeight: '700', fontSize: '1.15rem' }}>
          {isFull ? 'TODAY\'S FREE SESSIONS ARE FULL' : '🔥 FREE SESSIONS ARE STILL AVAILABLE TODAY'}
        </p>

        {!isFull && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyIn: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '20px',
          }}>
            <span>🔥 {remaining} sessions remaining</span>
            <span>•</span>
            <span>⏳ {formattedHms}</span>
          </div>
        )}

        <button
          onClick={() => onOpenModal('Final CTA')}
          className="btn-primary btn-gold final-cta-btn"
          disabled={isFull}
        >
          {isFull ? 'VIEW AVAILABLE OPTIONS →' : 'START MY FREE 5 MINUTES →'}
        </button>

        <p className="final-cta-microcopy">
          ₹0 to start • Private • No commitment
        </p>
      </div>
    </section>
  );
}
