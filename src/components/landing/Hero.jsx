import React from 'react';

/**
 * Hero — Section 2 (Emotional Need + Solution + Low-Risk Offer)
 * Immediately sets the psychological tone, highlighting the free 5-minute initial session
 * and zero-risk commitment.
 */
export default function Hero({ onOpenModal }) {
  return (
    <section className="hero-section content-container" aria-label="Hero Introduction">
      {/* Low-Risk Highlight Pill */}
      <div className="hero-offer-badge">
        <span>✦</span> Your first 5 minutes are FREE
      </div>

      {/* Main Emotional Headline */}
      <h1 className="hero-headline">
        Some Answers You Can't Find Alone.
      </h1>

      {/* Supporting Copy */}
      <p className="hero-subheading">
        Career. Love. Relationships. Decisions.
        <span>Sometimes you just need the right perspective — from someone who understands.</span>
      </p>

      {/* CTA Button Group */}
      <div className="hero-cta-group">
        <button
          onClick={() => onOpenModal('Hero')}
          className="btn-primary btn-gold"
          style={{ fontSize: '1.1rem', padding: '16px 36px' }}
        >
          Start My Free 5 Minutes →
        </button>

        <a href="#how-it-works" className="btn-secondary">
          See How It Works
        </a>
      </div>

      {/* Supporting Microcopy */}
      <p className="hero-microcopy">
        No commitment • No judgment • Private conversations
      </p>

      {/* Trust Badges */}
      <div className="hero-trust-badges">
        <div className="hero-trust-item">
          <span>🔒</span> Private & Secure
        </div>
        <div className="hero-trust-item">
          <span>✓</span> Verified Experts
        </div>
        <div className="hero-trust-item">
          <span>✨</span> ₹0 to Start
        </div>
      </div>
    </section>
  );
}
