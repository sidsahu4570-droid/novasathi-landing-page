import React, { useState, useEffect } from 'react';
import useOfferTimer from '../../utils/useOfferTimer';
import { useDemoAvailability } from '../../context/DemoAvailabilityContext';

/**
 * StickyBottomBar — Desktop & Mobile Sticky Bottom Action Bar
 */
export default function StickyMobileCTA({ onOpenModal }) {
  const { demoSessionsRemaining } = useDemoAvailability();
  const [visible, setVisible] = useState(false);
  const [offer, setOffer] = useState({
    endDate: null,
    active: true,
  });

  const { formattedHms, formattedMs, isExpired } = useOfferTimer(offer.endDate);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          }
        }
      } catch (e) {}
    }
    loadOffer();
    return () => { isMounted = false; };
  }, []);

  if (!visible) return null;

  const isDisabled = demoSessionsRemaining <= 0 || isExpired || !offer.active;

  return (
    <div className="sticky-bottom-action-bar">
      <div className="sticky-bottom-inner content-container">
        {/* Desktop View */}
        <div className="sticky-desktop-content">
          <div className="sticky-desktop-info">
            <span className="sticky-fire-badge">
              ✨ PERSONAL ASTROLOGY CONSULTATION
            </span>
            <span className="sticky-divider">•</span>
            <span className="sticky-timer-text">
              🔒 Private & Confidential
            </span>
          </div>
          <button
            className="btn-primary btn-gold sticky-action-btn"
            onClick={() => onOpenModal('Sticky Bottom Bar')}
          >
            START MY CONSULTATION →
          </button>
        </div>

        {/* Mobile View */}
        <div className="sticky-mobile-content">
          <div className="sticky-mobile-info">
            <span className="sticky-badge">
              ✨ ASTROLOGY CONSULTATION
            </span>
            <span className="sticky-sub">
              🔒 Private Birth Chart Guidance
            </span>
          </div>
          <button
            className="btn-primary btn-gold sticky-mobile-btn"
            onClick={() => onOpenModal('Sticky Mobile Bar')}
          >
            GET GUIDANCE →
          </button>
        </div>
      </div>
    </div>
  );
}
