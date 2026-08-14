import React, { useState, useEffect } from 'react';
import useTenMinTimer from '../../utils/useTenMinTimer';

/**
 * Hero — Upgraded Immediate-Action Urgency & Availability Section
 * 10-Minute Decreasing Timer ("10:00" -> "09:59" -> "09:58"...)
 */
export default function Hero({ onOpenModal }) {
  const { formatted: timerFormatted } = useTenMinTimer();
  const [offer, setOffer] = useState({
    active: true,
    title: 'YOUR FIRST 5 MINUTES ARE FREE',
    remainingSlots: 12,
    expertsAvailableCount: 3,
    showRemainingSlots: true,
    showCountdown: true,
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

  const remaining = offer.remainingSlots;
  const expertsCount = offer.expertsAvailableCount || 3;
  const isLowSlots = remaining <= 5 && remaining > 0;
  const isFull = remaining <= 0;

  const scrollToExperts = (e) => {
    e.preventDefault();
    const el = document.getElementById('experts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section content-container" aria-label="Hero Introduction">
      {/* ── Top Urgency & Live Availability Stack ── */}
      <div className="hero-urgency-stack">
        {/* 1. Live Availability Badge (Scrolls to Experts) */}
        <a href="#experts" onClick={scrollToExperts} className="hero-live-badge">
          <span className="pulse-dot">🟢</span>
          <span>
            <strong>EXPERTS AVAILABLE NOW</strong> — {expertsCount} verified experts are currently available
          </span>
        </a>

        {/* 2. Real Session Remaining Urgency Badge */}
        {offer.active && offer.showRemainingSlots && (
          <div className={`hero-sessions-badge ${isLowSlots ? 'low-slots' : ''}`}>
            <span>🔥</span>
            {isFull ? (
              <strong>FREE INTRODUCTORY SESSIONS ARE FULL TODAY</strong>
            ) : (
              <span>
                {isLowSlots ? 'ONLY' : ''} <span className="hero-slots-num">{remaining}</span> FREE INTRODUCTORY SESSIONS LEFT TODAY
              </span>
            )}
          </div>
        )}

        {/* 3. 10-Minute Decreasing Countdown Timer */}
        {offer.active && offer.showCountdown && (
          <div className="hero-countdown-badge">
            <span>⏳</span> FREE SESSIONS CLOSE IN{' '}
            <strong className="hero-timer-digits">{timerFormatted}</strong>
          </div>
        )}
      </div>

      {/* ── Main Action-Oriented Headline ── */}
      <h1 className="hero-headline">
        Still thinking about the same question? <br className="hero-br-desktop" />
        <span className="hero-headline-accent">Talk to someone who understands — today.</span>
      </h1>

      {/* Supporting Copy */}
      <p className="hero-subheading">
        Get private guidance from a verified expert about love, career, relationships, astrology or life's difficult decisions.
      </p>

      {/* ── Dominant Primary CTA ── */}
      <div className="hero-cta-group">
        <button
          onClick={() => onOpenModal('Hero')}
          className="btn-primary btn-gold hero-primary-btn"
          disabled={isFull}
        >
          {isFull ? 'DAILY FREE SESSIONS FULL — BOOK CONSULTATION →' : 'START MY FREE 5 MINUTES →'}
        </button>
      </div>

      {/* Sub-CTA Urgency Microcopy */}
      <div className="hero-cta-micro-stack">
        {offer.active && !isFull && (
          <div className="micro-urgency-row">
            <span>🔥 {remaining} free sessions remaining today</span>
            <span>•</span>
            <span>⏳ Offer closes in {timerFormatted}</span>
          </div>
        )}
        <p className="hero-microcopy">
          ₹0 to start • Private • No commitment
        </p>
      </div>
    </section>
  );
}
