import React from 'react';
import { useDemoAvailability } from '../../context/DemoAvailabilityContext';

/**
 * Navbar — Glassmorphic Header with Header Urgency Badge and "TALK TO AN EXPERT" Action Button
 */
export default function Navbar({ onOpenModal }) {
  const { demoSessionsRemaining } = useDemoAvailability();

  return (
    <header className="navbar" role="banner">
      <div className="content-container navbar-inner">
        {/* Circular Logo */}
        <a href="#" className="logo-link">
          <img src="/logo.jpg" alt="NovaSathi Logo" className="logo-img-circle" />
          <span>NovaSathi</span>
        </a>

        {/* Header Urgency & Action Button */}
        <div className="nav-urgency-action-wrap">
          <span className="nav-urgency-badge">
            ✨ ASTROLOGY CONSULTATION
          </span>
          <button
            onClick={() => onOpenModal('Navbar')}
            className="btn-primary nav-cta"
          >
            TALK TO AN ASTROLOGER →
          </button>
        </div>
      </div>
    </header>
  );
}
