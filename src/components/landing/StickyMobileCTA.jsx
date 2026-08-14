import React, { useState, useEffect } from 'react';
import useTenMinTimer from '../../utils/useTenMinTimer';

/**
 * StickyBottomBar — Desktop & Mobile Sticky Bottom Action Bar (Requirement 10)
 */
export default function StickyMobileCTA({ onOpenModal }) {
  const { formattedHms, formatted } = useTenMinTimer();
  const [visible, setVisible] = useState(false);
  const [remaining, setRemaining] = useState(12);

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
            if (isMounted && data.remainingSlots !== undefined) {
              setRemaining(data.remainingSlots);
            }
          }
        }
      } catch (e) {}
    }
    loadOffer();
    return () => { isMounted = false; };
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-bottom-action-bar">
      <div className="sticky-bottom-inner content-container">
        {/* Desktop View */}
        <div className="sticky-desktop-content">
          <div className="sticky-desktop-info">
            <span className="sticky-fire-badge">
              🔥 {remaining > 0 ? `${remaining} FREE SESSIONS LEFT TODAY` : 'SESSIONS FULL TODAY'}
            </span>
            <span className="sticky-divider">•</span>
            <span className="sticky-timer-text">
              ⏳ <strong>{formattedHms}</strong>
            </span>
          </div>
          <button
            className="btn-primary btn-gold sticky-action-btn"
            onClick={() => onOpenModal('Sticky Bottom Bar')}
          >
            START MY FREE 5 MINUTES →
          </button>
        </div>

        {/* Mobile View */}
        <div className="sticky-mobile-content">
          <div className="sticky-mobile-info">
            <span className="sticky-badge">
              🔥 {remaining > 0 ? `${remaining} FREE SESSIONS LEFT` : 'SESSIONS FULL'}
            </span>
            <span className="sticky-sub">⏳ Closes in {formatted}</span>
          </div>
          <button
            className="btn-primary btn-gold sticky-mobile-btn"
            onClick={() => onOpenModal('Sticky Mobile Bar')}
          >
            START NOW →
          </button>
        </div>
      </div>
    </div>
  );
}
