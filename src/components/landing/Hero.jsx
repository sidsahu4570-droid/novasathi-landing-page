import React, { useState, useEffect } from 'react';
import useTenMinTimer from '../../utils/useTenMinTimer';

/**
 * Hero — Psychological Action-Oriented Urgency & Immediate Consultation Funnel First Viewport
 */
export default function Hero({ onOpenModal }) {
  const { hoursStr, minutesStr, secondsStr, formattedHms } = useTenMinTimer();

  const [offer, setOffer] = useState({
    active: true,
    title: 'YOUR FIRST 5 MINUTES ARE FREE',
    remainingSlots: 12,
    dailyLimit: 20,
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
  const total = offer.dailyLimit || 20;
  const expertsCount = offer.expertsAvailableCount || 3;
  const isFull = remaining <= 0;

  // Calculate real progress percentage from backend data
  const percent = Math.min(100, Math.max(0, Math.round((remaining / total) * 100)));

  // Requirement 17: Inventory-based urgency header text
  let bannerText = '🔥 LIMITED INTRODUCTORY SESSIONS AVAILABLE TODAY';
  if (remaining <= 0) {
    bannerText = "TODAY'S FREE INTRODUCTORY SESSIONS ARE FULL";
  } else if (remaining <= 4) {
    bannerText = `🔥 ONLY ${remaining} FREE SESSIONS LEFT TODAY`;
  } else if (remaining <= 9) {
    bannerText = `🔥 ONLY ${remaining} FREE SESSIONS LEFT TODAY`;
  }

  const scrollToExperts = (e) => {
    e.preventDefault();
    const el = document.getElementById('experts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section content-container" aria-label="Hero Introduction">
      {/* ── 1. Top Urgency Banner ── */}
      <div className="hero-top-banner-wrap">
        <span className="hero-top-urgency-banner">{bannerText}</span>
      </div>

      {/* ── 5. Hero Headline & Copy ── */}
      <h1 className="hero-headline">
        Still thinking about the same question? <br />
        <span className="hero-headline-sub">
          Talk to someone who understands — before today's free sessions fill up.
        </span>
      </h1>

      <p className="hero-subheading">
        Get private guidance from a verified expert about love, career, relationships, astrology or life's difficult decisions.
      </p>

      {/* ── 7. Available Now Signal ── */}
      <div className="hero-available-signal-wrap">
        <a href="#experts" onClick={scrollToExperts} className="hero-live-badge">
          <span className="pulse-dot">🟢</span>
          <span>
            <strong>EXPERTS AVAILABLE NOW</strong> — {expertsCount} verified experts available
          </span>
        </a>
      </div>

      {/* ── 2, 3, 4. MAIN URGENCY COMPONENT (MAIN VISUAL HOOK) ── */}
      <div className="hero-urgency-card-container">
        <div className="hero-urgency-card glass-card glass-card-gold">
          <div className="hero-urgency-card-header">
            <span>🔥 LIMITED TODAY</span>
          </div>

          {/* LARGE REMAINING NUMBER */}
          <div className="hero-giant-number-box">
            <span className="hero-giant-number">{remaining}</span>
            <span className="hero-giant-label">FREE SESSIONS LEFT TODAY</span>
          </div>

          {/* 3. VISUAL AVAILABILITY BAR */}
          <div className="hero-progress-wrap">
            <div className="hero-progress-header">
              <span>FREE SESSION AVAILABILITY</span>
              <span className="hero-progress-pct">{percent}% remaining</span>
            </div>
            <div className="hero-progress-bar-track">
              <div
                className="hero-progress-bar-fill"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <div className="hero-progress-sub">{remaining} of {total} sessions remaining today</div>
          </div>

          {/* 4. REAL COUNTDOWN BOXES */}
          {offer.showCountdown && (
            <div className="hero-countdown-container">
              <div className="hero-countdown-title">
                ⏳ TODAY'S FREE SESSION WINDOW CLOSES IN
              </div>
              <div className="hero-timer-boxes-row">
                <div className="timer-box">
                  <span className="timer-box-num">{hoursStr}</span>
                  <span className="timer-box-label">Hours</span>
                </div>
                <span className="timer-sep">:</span>
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

          {/* 6. CTA DIRECTLY CONNECTED TO URGENCY */}
          <button
            onClick={() => onOpenModal('Hero Urgency Box')}
            className="btn-primary btn-gold hero-urgency-card-btn"
            disabled={isFull}
          >
            {isFull ? 'VIEW AVAILABLE OPTIONS →' : 'START MY FREE 5 MINUTES →'}
          </button>

          {/* Microcopy below button */}
          <div className="hero-card-micro-info">
            <div className="micro-info-line">
              <span>🔥 {remaining} sessions remaining today</span>
              <span>•</span>
              <span>⏳ Closes in {formattedHms}</span>
            </div>
            <div className="micro-info-sub">
              ₹0 to start • Private • No commitment
            </div>
          </div>
        </div>
      </div>

      {/* ── 8. ACT NOW HIGH-CONTRAST STRIP ── */}
      <div className="hero-act-now-strip">
        <div className="act-now-strip-left">
          <span className="act-now-badge">🔥 AVAILABLE RIGHT NOW</span>
          <div className="act-now-text">
            <strong>{remaining} free introductory sessions remain today.</strong>
            <span> ⏳ Today's introductory window closes in {formattedHms}</span>
          </div>
        </div>
        <button
          className="btn-primary btn-gold act-now-btn"
          onClick={() => onOpenModal('Act Now Strip')}
          disabled={isFull}
        >
          {isFull ? 'VIEW OPTIONS →' : 'START NOW →'}
        </button>
      </div>
    </section>
  );
}
