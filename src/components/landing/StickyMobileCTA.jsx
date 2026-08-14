import React, { useState, useEffect } from 'react';

/**
 * StickyMobileCTA — Requirement 11
 * Mobile sticky bottom bar displaying remaining sessions and immediate CTA.
 */
export default function StickyMobileCTA({ onOpenModal }) {
  const [visible, setVisible] = useState(false);
  const [remaining, setRemaining] = useState(12);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
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
    <div className="sticky-mobile-bar">
      <div className="sticky-mobile-inner">
        <div className="sticky-mobile-info">
          <span className="sticky-badge">🔥 5 MINUTES FREE</span>
          <span className="sticky-sub">{remaining > 0 ? `${remaining} sessions left today` : 'Free introductory session'}</span>
        </div>
        <button
          className="btn-primary btn-gold sticky-mobile-btn"
          onClick={() => onOpenModal('Sticky Mobile Bar')}
        >
          START NOW →
        </button>
      </div>
    </div>
  );
}
