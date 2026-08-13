import React from 'react';

/**
 * Hero — Restructured High-Converting Hero Section
 * Primary headline: "When your mind won't stop asking 'What should I do?' Start there."
 * Immediate free 5-minute offer + trust strip.
 */
export default function Hero({ onOpenModal }) {
  return (
    <section className="hero-section content-container" aria-label="Hero Introduction">
      {/* Low-Risk Highlight Pill */}
      <div className="hero-offer-badge">
        <span>✨</span> YOUR FIRST 5 MINUTES ARE FREE
      </div>

      {/* Main Customer-Focused Headline */}
      <h1 className="hero-headline">
        When your mind won't stop asking <br className="hero-br-desktop" />
        <span className="hero-headline-quote">"What should I do?"</span> Start there.
      </h1>

      {/* Supporting Copy */}
      <p className="hero-subheading">
        Private guidance for love, career, relationships and life's difficult decisions — from someone who understands.
      </p>

      {/* CTA Button Group */}
      <div className="hero-cta-group">
        <button
          onClick={() => onOpenModal('Hero')}
          className="btn-primary btn-gold"
        >
          START MY FREE 5 MINUTES →
        </button>

        <a href="#how-it-works" className="btn-secondary">
          SEE HOW IT WORKS →
        </a>
      </div>

      {/* Supporting Microcopy */}
      <p className="hero-microcopy">
        ₹0 to start • Private conversation • No commitment
      </p>

      {/* Hero Trust Strip */}
      <div className="hero-trust-badges">
        <div className="hero-trust-item">
          <span>🔒</span> Private & Secure
        </div>
        <div className="hero-trust-item">
          <span>✓</span> Verified Experts
        </div>
        <div className="hero-trust-item">
          <span>🟢</span> Available Now
        </div>
        <div className="hero-trust-item">
          <span>✨</span> ₹0 to Start
        </div>
      </div>
    </section>
  );
}
