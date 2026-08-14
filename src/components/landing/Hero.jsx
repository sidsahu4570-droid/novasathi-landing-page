import React, { useState, useEffect } from 'react';

/**
 * Hero — Action-Oriented Hero Section
 * Immediately communicates: Problem → 5 Free Mins → Available Experts → Immediate CTA.
 */
export default function Hero({ onOpenModal }) {
  const [offer, setOffer] = useState({
    active: true,
    title: 'YOUR FIRST 5 MINUTES ARE FREE',
    remainingSlots: 12,
    showRemainingSlots: true,
    showCountdown: false,
    endDate: null,
    urgencyMessage: 'Limited introductory sessions available today',
  });

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

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

  // Countdown timer calculation if configured by Admin
  useEffect(() => {
    if (!offer.showCountdown || !offer.endDate) return;

    const timer = setInterval(() => {
      const diff = new Date(offer.endDate) - new Date();
      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [offer.showCountdown, offer.endDate]);

  return (
    <section className="hero-section content-container" aria-label="Hero Introduction">
      {/* 1. Top-of-Hero High-Visibility Urgency Strip */}
      <div className="hero-urgency-strip">
        <span className="urgency-strip-item live">
          <span className="pulse-dot">🟢</span> EXPERTS AVAILABLE NOW
        </span>
        <span className="urgency-strip-divider">•</span>
        <span className="urgency-strip-item free">
          ✨ YOUR FIRST 5 MINUTES ARE FREE
        </span>
        {offer.showCountdown && offer.endDate && (
          <>
            <span className="urgency-strip-divider">•</span>
            <span className="urgency-strip-item timer">
              ⏳ ENDS IN {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </>
        )}
      </div>

      {/* 2. Main Hero Headline */}
      <h1 className="hero-headline">
        What's the one thing <br className="hero-br-desktop" />
        you can't stop thinking about?
        <span className="hero-headline-sub">Get clarity now.</span>
      </h1>

      {/* Supporting Line */}
      <p className="hero-subheading">
        Don't spend another night overthinking it alone.
      </p>

      {/* 3. Dominant Offer Card Box */}
      <div className="hero-dominant-offer">
        <div className="hero-offer-badge">
          <span>✨</span> YOUR FIRST 5 MINUTES ARE FREE
        </div>
        <p className="hero-offer-text">
          Talk privately with a verified expert about what's on your mind.
        </p>
      </div>

      {/* 4. Primary CTA Button Group */}
      <div className="hero-cta-group">
        <button
          onClick={() => onOpenModal('Hero')}
          className="btn-primary btn-gold hero-action-btn"
        >
          START MY FREE 5 MINUTES →
        </button>
      </div>

      {/* Microcopy below CTA */}
      <p className="hero-microcopy">
        ₹0 to start • No commitment • Private conversation
      </p>

      {/* 5. Immediate Availability & Mental Path */}
      <div className="hero-availability-box">
        <div className="availability-tag">
          <span className="pulse-dot">🟢</span> Experts available now
        </div>
        <div className="mental-path-text">
          Choose your topic → choose your expert → start talking.
        </div>
      </div>

      {/* 6. Loss Aversion Micro-Message */}
      <p className="hero-loss-aversion">
        Whatever is on your mind, you can start with it now. <br />
        <span>Don't keep guessing when you can get another perspective.</span>
      </p>

      {/* 7. Active Campaign Banner (If active in Admin) */}
      {offer.active && (
        <div className="hero-campaign-banner">
          <span className="campaign-chip">🔥 INTRODUCTORY OFFER ACTIVE</span>
          <span className="campaign-note">Your first 5 minutes are currently FREE.</span>
        </div>
      )}

      {/* 9. Micro Social Proof */}
      <div className="hero-social-proof">
        <span className="proof-stars">★★★★★</span>
        <span className="proof-text">"People are already finding clarity through NovaSathi."</span>
      </div>
    </section>
  );
}
