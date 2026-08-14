import React, { useState, useEffect } from 'react';

/**
 * Navbar — Transparent Glassmorphic Header with Urgent CTA
 */
export default function Navbar({ onOpenModal }) {
  const [remaining, setRemaining] = useState(12);

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

  return (
    <header className="navbar" role="banner">
      <div className="content-container navbar-inner">
        {/* Circular Logo */}
        <a href="#" className="logo-link">
          <img src="/logo.jpg" alt="NovaSathi Logo" className="logo-img-circle" />
          <span>NovaSathi</span>
        </a>

        {/* Urgent Primary CTA */}
        <button
          onClick={() => onOpenModal('Navbar')}
          className="btn-primary nav-cta"
        >
          {remaining > 0 ? `🔥 ${remaining} FREE SESSIONS LEFT` : '🔥 5 MIN FREE — TALK NOW →'}
        </button>
      </div>
    </header>
  );
}
