import React, { useState, useEffect } from 'react';

/**
 * IntroOfferCard — Section 10 (Premium Offer Box with optional live countdown)
 */
export default function IntroOfferCard({ onOpenModal }) {
  const [offer, setOffer] = useState({
    active: true,
    showCountdown: false,
    endDate: null,
  });

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    let isMounted = true;
    const apiUrl = import.meta.env.VITE_API_URL || '';

    async function fetchOffer() {
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
          if (isMounted) setOffer(JSON.parse(saved));
        }
      } catch (e) {}
    }
    fetchOffer();
    return () => { isMounted = false; };
  }, []);

  // Countdown timer logic
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

  if (!offer.active) return null;

  return (
    <section className="section-intro-offer content-container" id="intro-offer">
      <div className="glass-card glass-card-gold intro-offer-card">
        <span className="intro-offer-pill">✨ INTRODUCTORY OFFER</span>

        <div className="intro-offer-header">
          <div className="intro-offer-title-wrap">
            <h2 className="intro-offer-title">YOUR FIRST 5 MINUTES</h2>
            <p className="intro-offer-sub">ONE-ON-ONE GUIDANCE</p>
          </div>
          <div className="intro-offer-price-badge">
            <span className="price-zero">₹0</span>
          </div>
        </div>

        <div className="intro-offer-features">
          <div className="feature-item"><span>✓</span> Verified expert</div>
          <div className="feature-item"><span>✓</span> Private conversation</div>
          <div className="feature-item"><span>✓</span> Chat / Call / Video</div>
          <div className="feature-item"><span>✓</span> No commitment</div>
        </div>

        {offer.showCountdown && offer.endDate && (
          <div className="intro-countdown-wrap">
            <span className="countdown-label">Offer ends in:</span>
            <span className="countdown-digits">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        )}

        <button
          className="btn-primary btn-gold intro-offer-btn"
          onClick={() => onOpenModal('Intro Offer Box')}
        >
          START MY FREE 5 MINUTES →
        </button>

        <p className="intro-offer-footer-note">
          Available while introductory sessions remain today.
        </p>
      </div>
    </section>
  );
}
