import React, { useState, useEffect } from 'react';
import useTenMinTimer from '../../utils/useTenMinTimer';

/**
 * IntroOfferCard — Section 10 (Premium Offer Box with 10-minute decreasing countdown)
 */
export default function IntroOfferCard({ onOpenModal }) {
  const { formatted: timerFormatted } = useTenMinTimer();
  const [offer, setOffer] = useState({
    active: true,
    showCountdown: true,
  });

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

        {offer.showCountdown && (
          <div className="intro-countdown-wrap">
            <span className="countdown-label">Offer closes in:</span>
            <span className="countdown-digits">{timerFormatted}</span>
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
