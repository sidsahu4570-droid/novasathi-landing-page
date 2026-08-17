import React, { useState, useEffect } from 'react';
import useOfferTimer from '../../utils/useOfferTimer';
import { useDemoAvailability } from '../../context/DemoAvailabilityContext';

/**
 * FinalCTA — Requirement 18
 */
export default function FinalCTA({ onOpenModal }) {
  return (
    <section className="section-final-cta content-container">
      <div className="glass-card glass-card-gold final-cta-card" style={{ textAlign: 'center', padding: '36px 24px', borderRadius: '24px' }}>
        <h2 className="final-cta-headline">READY TO EXPLORE YOUR BIRTH CHART?</h2>

        <p className="final-cta-sub" style={{ color: '#E2D9F8', opacity: 0.95, fontSize: '1.1rem', maxWidth: '600px', margin: '12px auto 24px auto', lineHeight: 1.5 }}>
          Share your birth details and speak with an astrologer about the questions that matter to you.
        </p>

        <button
          onClick={() => onOpenModal('Final CTA Astrology')}
          className="btn-primary btn-gold final-cta-btn"
          style={{ padding: '16px 36px', fontSize: '1.1rem', fontWeight: 800 }}
        >
          START MY ASTROLOGY CONSULTATION →
        </button>

        <p className="final-cta-microcopy" style={{ marginTop: '16px', fontSize: '0.88rem', color: '#E2D9F8', opacity: 0.8 }}>
          Private & Confidential · Personalized Guidance · One-on-One Consultation
        </p>
      </div>
    </section>
  );
}
