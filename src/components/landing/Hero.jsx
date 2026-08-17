import React, { useState, useEffect } from 'react';
import useOfferTimer from '../../utils/useOfferTimer';
import { useDemoAvailability } from '../../context/DemoAvailabilityContext';

/**
 * Hero — Psychological Action-Oriented Urgency & Immediate Consultation Funnel First Viewport
 * Powered by Roboto Condensed Typography System
 */
export default function Hero({ onOpenModal }) {
  const {
    introductorySessionsRemaining,
    availabilityPercentage,
    availabilityText,
    expertsAvailableCount,
    showAvailabilityUrgency,
    showIntroductorySessionCount,
  } = useDemoAvailability();

  const [offer, setOffer] = useState({
    active: true,
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

  const { minutesStr, secondsStr, isExpired } = useOfferTimer(offer.endDate);

  const scrollToExperts = (e) => {
    e.preventDefault();
    const el = document.getElementById('experts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const hasAvailableExperts = expertsAvailableCount > 0;
  const isFull = introductorySessionsRemaining <= 0;
  const isDisabled = isFull || isExpired || !offer.active;

  return (
    <section className="hero-section content-container" aria-label="Hero Introduction">
      {/* ── 1. GREEN IMMEDIATE AVAILABILITY PILL (Topmost signal) ── */}
      {showAvailabilityUrgency && (
        <div className="hero-top-banner-wrap" style={{ marginBottom: '12px' }}>
          <a
            href="#experts"
            onClick={scrollToExperts}
            className="hero-green-availability-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(107, 207, 127, 0.14)',
              border: '1px solid rgba(107, 207, 127, 0.45)',
              color: '#6bcf7f',
              padding: '6px 16px',
              borderRadius: '99px',
              fontSize: '0.84rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              boxShadow: '0 0 12px rgba(107, 207, 127, 0.2)',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100vw - 32px)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {hasAvailableExperts ? (
              <>
                <span className="pulse-dot">🟢</span>
                <span>ASTROLOGERS AVAILABLE NOW · {expertsAvailableCount} VERIFIED EXPERTS ONLINE</span>
              </>
            ) : (
              <>
                <span>⚪</span>
                <span>NO EXPERTS AVAILABLE RIGHT NOW · CHECK BACK SOON</span>
              </>
            )}
          </a>
        </div>
      )}

      {/* ── 2. INTRODUCTORY ASTROLOGY CONSULTATION URGENCY CARD WITH REAL TIMER ── */}
      {showIntroductorySessionCount && (
        <div className="hero-urgency-card-container" style={{ margin: '12px 0 24px 0' }}>
          <div className="hero-urgency-card glass-card glass-card-gold">
            <div className="hero-urgency-card-header">
              <span>🔥 INTRODUCTORY ASTROLOGY CONSULTATION</span>
            </div>

            {/* DYNAMIC SESSIONS REMAINING NUMBER */}
            <div className="hero-giant-number-box">
              <span className="hero-giant-number">{introductorySessionsRemaining}</span>
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

            {/* AVAILABILITY / PROGRESS BAR */}
            <div className="hero-progress-wrap">
              <div className="hero-progress-header">
                <span>TODAY'S CONSULTATION AVAILABILITY</span>
                <span className="hero-progress-pct">{availabilityPercentage}% remaining</span>
              </div>
              <div className="hero-progress-bar-track">
                <div
                  className="hero-progress-bar-fill"
                  style={{ width: `${availabilityPercentage}%` }}
                ></div>
              </div>
              <div className="hero-progress-sub">
                {availabilityText}
              </div>
            </div>

            {/* REAL-TIME 2-BOX COUNTDOWN TIMER */}
            {(offer.showCountdown ?? true) && (
              <div className="hero-countdown-container" style={{ marginTop: '16px', marginBottom: '20px' }}>
                <div className="hero-countdown-title">
                  {isExpired ? "INTRODUCTORY WINDOW CLOSED" : "⌛ TODAY'S INTRODUCTORY WINDOW CLOSES IN"}
                </div>
                <div className="hero-timer-boxes-row">
                  <div className="timer-box">
                    <span className="timer-box-num">{minutesStr}</span>
                    <span className="timer-box-label">MINUTES</span>
                  </div>
                  <span className="timer-sep">:</span>
                  <div className="timer-box">
                    <span className="timer-box-num">{secondsStr}</span>
                    <span className="timer-box-label">SECONDS</span>
                  </div>
                </div>
              </div>
            )}

            {/* CARD CTA BUTTON */}
            <button
              onClick={() => onOpenModal('Hero Urgency Box')}
              className="btn-primary btn-gold hero-urgency-card-btn"
              disabled={isDisabled}
            >
              {isExpired
                ? "INTRODUCTORY WINDOW CLOSED"
                : isFull
                ? "TODAY'S CONSULTATIONS ARE FULL"
                : 'GET MY ASTROLOGY CONSULTATION →'}
            </button>
          </div>
        </div>
      )}

      {/* ── 3. CATEGORY PILL ── */}
      <div className="hero-top-banner-wrap" style={{ marginBottom: '16px' }}>
        <span className="hero-top-urgency-banner">✨ PERSONAL ASTROLOGY CONSULTATION</span>
      </div>

      {/* ── 4. HERO HEADLINE & COPY ── */}
      <h1 className="hero-headline">
        HAVE QUESTIONS ABOUT YOUR CAREER, LOVE, BUSINESS OR FUTURE?
      </h1>

      {/* Immediate sub-headline urgency line */}
      <p
        style={{
          fontSize: 'clamp(0.98rem, 3.8vw, 1.15rem)',
          fontWeight: 700,
          color: 'var(--color-warm-gold)',
          marginBottom: '10px',
          padding: '0 8px',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
          lineHeight: 1.4,
        }}
      >
        Don't keep putting the question off. Speak with an astrologer while introductory sessions are available today.
      </p>

      <p className="hero-subheading">
        Get personalized astrology guidance based on your birth date, exact birth time and birthplace — and explore the questions that matter most to you.
      </p>

      {/* ── 5. PRIMARY & SECONDARY HERO CTAS ── */}
      <div
        className="hero-cta-group"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          margin: '20px 0 24px 0',
        }}
      >
        <button
          onClick={() => onOpenModal('Hero Astrology Consultation')}
          className="btn-primary btn-gold"
          disabled={isDisabled}
          style={{
            padding: '16px 32px',
            fontSize: 'clamp(0.98rem, 4.2vw, 1.15rem)',
            fontWeight: 900,
            whiteSpace: 'nowrap',
            opacity: isDisabled ? 0.7 : 1,
          }}
        >
          {isExpired ? 'INTRODUCTORY WINDOW CLOSED' : '🔥 START MY CONSULTATION NOW →'}
        </button>

        {/* CTA Microcopy line */}
        <span
          style={{
            fontSize: '0.82rem',
            color: '#E2D9F8',
            opacity: 0.85,
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          Introductory sessions available today · Subject to availability
        </span>

        <a
          href="#how-it-works"
          className="btn-secondary"
          style={{
            marginTop: '8px',
            padding: '12px 24px',
            fontSize: '0.98rem',
            textDecoration: 'none',
            color: '#E2D9F8',
            border: '1px solid rgba(226, 217, 248, 0.35)',
            borderRadius: '99px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          SEE HOW IT WORKS →
        </a>
      </div>

      {/* ── 6. COMPACT REAL-TIME STATUS ROW ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '99px',
          padding: '8px 20px',
          margin: '0 auto 20px auto',
          maxWidth: 'fit-content',
          fontSize: '0.86rem',
          color: '#E2D9F8',
          boxSizing: 'border-box',
        }}
      >
        <span>🟢 <strong>{expertsAvailableCount}</strong> Experts Online</span>
        <span>•</span>
        <span>🔥 <strong>{introductorySessionsRemaining}</strong> Introductory Sessions</span>
        <span>•</span>
        <span>🔒 Private Consultation</span>
      </div>

      {/* ── 7. TRUST LINE ── */}
      <div
        className="hero-trust-line"
        style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#E2D9F8',
          opacity: 0.9,
          marginBottom: '20px',
          letterSpacing: '0.02em',
        }}
      >
        🔒 Private & Confidential &nbsp;·&nbsp; ✨ Personalized Birth Chart &nbsp;·&nbsp; 👤 One-on-One Consultation
      </div>

      {/* ── 8. ACT NOW MICRO-COPY ── */}
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <p style={{ fontSize: '0.88rem', color: '#E2D9F8', opacity: 0.75, fontStyle: 'italic' }}>
          Have a question you've been putting off? Start with your birth chart today.
        </p>
      </div>
    </section>
  );
}
