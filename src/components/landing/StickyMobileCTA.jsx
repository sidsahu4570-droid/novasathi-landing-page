import React, { useState, useEffect } from 'react';

/**
 * StickyMobileCTA — Non-intrusive floating CTA bar at bottom of mobile screen.
 */
export default function StickyMobileCTA({ onOpenModal }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 200px
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-mobile-bar">
      <div className="sticky-mobile-inner">
        <div className="sticky-mobile-info">
          <span className="sticky-badge">✨ 5 MIN FREE</span>
          <span className="sticky-sub">₹0 to start • Private</span>
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
