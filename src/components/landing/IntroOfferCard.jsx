import React, { useState, useEffect } from 'react';
import useTenMinTimer from '../../utils/useTenMinTimer';

/**
 * IntroOfferCard — Section 10 (Premium Offer Box with 10-minute decreasing countdown)
 */
export default function IntroOfferCard({ onOpenModal }) {
  return (
    <section className="section-intro-offer content-container" id="intro-offer">
      <div className="glass-card glass-card-gold intro-offer-card" style={{ padding: '32px 24px', borderRadius: '24px', textAlign: 'center' }}>
        <span className="intro-offer-pill" style={{ display: 'inline-block', marginBottom: '14px', background: 'rgba(212, 168, 79, 0.2)', border: '1px solid rgba(212, 168, 79, 0.5)', padding: '6px 16px', borderRadius: '99px', color: 'var(--color-warm-gold)', fontSize: '0.88rem', fontWeight: 700 }}>
          ✨ INTRODUCTORY CONSULTATION
        </span>

        <h2 className="section-title" style={{ fontSize: ' clamp(1.4rem, 4vw, 2.0rem)', marginBottom: '12px' }}>
          START WITH AN INTRODUCTORY ASTROLOGY CONSULTATION
        </h2>

        <p style={{ fontSize: '1.05rem', color: '#E2D9F8', opacity: 0.95, maxWidth: '640px', margin: '0 auto 24px auto', lineHeight: 1.5 }}>
          Get a first introduction to your personal astrology consultation and understand how the process works.
        </p>

        <button
          className="btn-primary btn-gold intro-offer-btn"
          onClick={() => onOpenModal('Introductory Consultation')}
          style={{ padding: '16px 36px', fontSize: '1.1rem', fontWeight: 800 }}
        >
          START MY CONSULTATION →
        </button>

        <p className="intro-offer-footer-note" style={{ marginTop: '16px', fontSize: '0.88rem', color: '#E2D9F8', opacity: 0.8 }}>
          🔒 Private & Confidential · Personalized Birth Chart Observations
        </p>
      </div>
    </section>
  );
}
