import React from 'react';

/**
 * Navbar — Transparent Glassmorphic Header
 * Compact header sitting over the cosmic background with logo, navigation links,
 * and the primary "Talk to an Expert — FREE" call-to-action button.
 */
export default function Navbar({ onOpenModal }) {
  return (
    <header className="navbar" role="banner">
      <div className="content-container navbar-inner">
        {/* Logo */}
        <a href="#" className="logo-link">
          <span className="logo-sparkle">✦</span>
          <span>NovaSathi</span>
        </a>

        {/* Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <a href="#how-it-works" className="nav-link">How It Works</a>
            </li>
            <li>
              <a href="#problem-selector" className="nav-link">Explore Guidance</a>
            </li>
            <li>
              <a href="#testimonials" className="nav-link">Why NovaSathi</a>
            </li>
          </ul>
        </nav>

        {/* Primary CTA */}
        <button
          onClick={() => onOpenModal('General')}
          className="btn-primary nav-cta"
        >
          Talk to an Expert — FREE
        </button>
      </div>
    </header>
  );
}
