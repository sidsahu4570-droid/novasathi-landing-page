import React from 'react';

/**
 * Navbar — Transparent Glassmorphic Header with Circular Logo
 * Displays the official NovaSathi circular logo image, navigation links,
 * and the primary "Talk to an Expert — FREE" CTA button.
 */
export default function Navbar({ onOpenModal }) {
  return (
    <header className="navbar" role="banner">
      <div className="content-container navbar-inner">
        {/* Circular Logo */}
        <a href="#" className="logo-link">
          <img src="/logo.jpg" alt="NovaSathi Logo" className="logo-img-circle" />
          <span>NovaSathi</span>
        </a>


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
