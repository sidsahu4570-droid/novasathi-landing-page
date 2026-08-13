import React, { useState, useEffect } from 'react';

/**
 * Hero — Upgraded Psychological Conversion Hero Section
 * Main headline: "Some answers are easier when you don't have to figure them out alone."
 * Live availability badge + real offer urgency integration.
 */
export default function Hero({ onOpenModal }) {
  const [offer, setOffer] = useState({
    active: true,
    title: 'YOUR FIRST 5 MINUTES ARE FREE',
    remainingSlots: 12,
    showRemainingSlots: true,
    urgencyMessage: 'Limited introductory sessions available today',
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
            return;
          }
        }
        // Fallback to local storage on static Vercel
        const saved = localStorage.getItem('ns_offer_settings');
        if (saved) {
          const parsed = JSON.parse(saved);
          const rem = Math.max(0, Number(parsed.dailyLimit) - Number(parsed.sessionsUsed));
          if (isMounted) setOffer({ ...parsed, remainingSlots: rem });
        }
      } catch (e) {}
    }
    loadOffer();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="hero-section content-container" aria-label="Hero Introduction">
      {/* Offer Pill with optional live remaining session badge */}
      <div className="hero-offer-badge">
        <span>✨</span> {offer.title || 'YOUR FIRST 5 MINUTES ARE FREE'}
        {offer.active && offer.showRemainingSlots && offer.remainingSlots > 0 && (
          <span className="hero-remaining-chip">
            🔥 {offer.remainingSlots} sessions left today
          </span>
        )}
      </div>

      {/* Main Emotional Headline */}
      <h1 className="hero-headline">
        Some answers are easier <br className="hero-br-desktop" />
        when you don't have to figure them out alone.
      </h1>

      {/* Subheadline */}
      <p className="hero-subheading">
        Get private guidance for love, career, relationships, astrology and difficult decisions — from someone who understands.
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

      {/* Microcopy */}
      <p className="hero-microcopy">
        ₹0 to start • Private conversation • No commitment
      </p>

      {/* Hero Live Availability & Trust Strip */}
      <div className="hero-trust-badges">
        <div className="hero-trust-item live-indicator">
          <span className="pulse-dot">🟢</span> EXPERTS AVAILABLE NOW
        </div>
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
