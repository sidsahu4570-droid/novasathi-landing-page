import React, { useState, useEffect } from 'react';
import useOfferTimer from '../../utils/useOfferTimer';
import { useDemoAvailability } from '../../context/DemoAvailabilityContext';

/**
 * Hero — Psychological Action-Oriented Urgency & Immediate Consultation Funnel First Viewport
 * Powered by Roboto Condensed Typography System
 */
export default function Hero({ onOpenModal }) {
  const { demoSessionsRemaining, demoCapacity, demoPercent } = useDemoAvailability();

  const [offer, setOffer] = useState({
    active: true,
    title: 'YOUR FIRST 5 MINUTES ARE FREE',
    expertsAvailableCount: 3,
    showCountdown: true,
    endDate: null,
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
      } catch (e) {}
    }
    loadOffer();
    return () => { isMounted = false; };
  }, []);

  const { hoursStr, minutesStr, secondsStr, formattedHms, isExpired } = useOfferTimer(offer.endDate);

  const expertsCount = offer.expertsAvailableCount || 3;
  const isFull = demoSessionsRemaining <= 0;
  const isDisabled = isFull || isExpired || !offer.active;

  // Inventory-based urgency header text
  let bannerText = '🔥 LIMITED INTRODUCTORY SESSIONS AVAILABLE TODAY';
  if (!offer.active || isExpired) {
    bannerText = "TODAY'S INTRODUCTORY SESSIONS ARE CLOSED";
  } else if (demoSessionsRemaining <= 0) {
    bannerText = "TODAY'S FREE INTRODUCTORY SESSIONS ARE FULL";
  } else if (demoSessionsRemaining <= 4) {
    bannerText = `🔥 ONLY ${demoSessionsRemaining} FREE SESSIONS LEFT TODAY`;
  } else if (demoSessionsRemaining <= 9) {
    bannerText = `🔥 ONLY ${demoSessionsRemaining} FREE SESSIONS LEFT TODAY`;
  }

  const scrollToExperts = (e) => {
    e.preventDefault();
    const el = document.getElementById('experts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section content-container" aria-label="Hero Introduction">
      {/* ── 1. Top Urgency Badge / Category Badge ── */}
      <div className="hero-top-banner-wrap">
        <span className="hero-top-urgency-banner">✨ PERSONAL ASTROLOGY CONSULTATION</span>
      </div>

      {/* ── 2. Hero Headline & Copy ── */}
      <h1 className="hero-headline">
        HAVE QUESTIONS ABOUT YOUR CAREER, LOVE, BUSINESS OR FUTURE?
      </h1>

      <p className="hero-subheading">
        Get personalized astrology guidance based on your birth date, exact birth time and birthplace — and explore the questions that matter most to you.
      </p>

      {/* ── 3. Primary & Secondary Hero CTAs ── */}
      <div className="hero-cta-group" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', margin: '20px 0 24px 0' }}>
        <button
          onClick={() => onOpenModal('Hero Astrology Consultation')}
          className="btn-primary btn-gold"
          style={{ padding: '16px 28px', fontSize: '1.1rem', fontWeight: 800 }}
        >
          GET MY ASTROLOGY CONSULTATION →
        </button>
        <a
          href="#how-it-works"
          className="btn-secondary"
          style={{ padding: '16px 24px', fontSize: '1.05rem', textDecoration: 'none', color: '#E2D9F8', border: '1px solid rgba(226, 217, 248, 0.4)', borderRadius: '99px', display: 'inline-flex', alignItems: 'center' }}
        >
          SEE HOW IT WORKS →
        </a>
      </div>

      {/* ── 4. Trust Line ── */}
      <div className="hero-trust-line" style={{ textAlign: 'center', fontSize: '0.92rem', color: '#E2D9F8', opacity: 0.9, marginBottom: '28px', letterSpacing: '0.02em' }}>
        🔒 Private & Confidential &nbsp;·&nbsp; ✨ Personalized Birth Chart &nbsp;·&nbsp; 👤 One-on-One Consultation
      </div>

      {/* ── 5. Available Astrologers Signal ── */}
      <div className="hero-available-signal-wrap">
        <a href="#experts" onClick={scrollToExperts} className="hero-live-badge">
          <span className="pulse-dot">🟢</span>
          <span>
            <strong>ASTROLOGERS AVAILABLE NOW</strong> — {expertsCount} verified astrologers online
          </span>
        </a>
      </div>

      {/* ── 6. MAIN CONSULTATION & CAPACITY CARD ── */}
      <div className="hero-urgency-card-container">
        <div className="hero-urgency-card glass-card glass-card-gold">
          <div className="hero-urgency-card-header">
            <span>✨ INTRODUCTORY ASTROLOGY CONSULTATION</span>
          </div>

          {/* LARGE REMAINING NUMBER */}
          <div className="hero-giant-number-box">
            <span className="hero-giant-number">{demoSessionsRemaining}</span>
            <div className="hero-giant-label">
              {isFull ? (
                <span className="label-bold-800">CONSULTATIONS REMAINING TODAY</span>
              ) : (
                <>
                  <span className="label-bold-800">INTRODUCTORY CONSULTATIONS</span>{' '}
                  <span className="label-bold-700">LEFT TODAY</span>
                </>
              )}
            </div>
          </div>

          {/* VISUAL AVAILABILITY BAR */}
          <div className="hero-progress-wrap">
            <div className="hero-progress-header">
              <span>TODAY'S CONSULTATION AVAILABILITY</span>
              <span className="hero-progress-pct">{demoPercent}% remaining</span>
            </div>
            <div className="hero-progress-bar-track">
              <div
                className="hero-progress-bar-fill"
                style={{ width: `${demoPercent}%` }}
              ></div>
            </div>
            <div className="hero-progress-sub">
              {demoSessionsRemaining} of {demoCapacity} sessions remaining today
            </div>
          </div>

          {/* TIMER */}
          {offer.showCountdown && (
            <div className="hero-countdown-container">
              <div className="hero-countdown-title">
                {isExpired ? "TODAY'S INTRODUCTORY WINDOW CLOSED" : "⏳ TODAY'S INTRODUCTORY WINDOW CLOSES IN"}
              </div>
              <div className="hero-timer-boxes-row">
                <div className="timer-box">
                  <span className="timer-box-num">{minutesStr}</span>
                  <span className="timer-box-label">Minutes</span>
                </div>
                <span className="timer-sep">:</span>
                <div className="timer-box">
                  <span className="timer-box-num">{secondsStr}</span>
                  <span className="timer-box-label">Seconds</span>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => onOpenModal('Hero Urgency Box')}
            className="btn-primary btn-gold hero-urgency-card-btn"
            disabled={isDisabled}
          >
            {isExpired
              ? "TODAY'S INTRODUCTORY CONSULTATIONS ARE CLOSED"
              : isFull
              ? "TODAY'S CONSULTATIONS ARE FULL"
              : 'GET MY ASTROLOGY CONSULTATION →'}
          </button>

          {/* Microcopy below button */}
          <div className="hero-card-micro-info">
            <div className="micro-info-line">
              <span>🔒 Private & Confidential</span>
              <span>•</span>
              <span>✨ Birth Chart Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
