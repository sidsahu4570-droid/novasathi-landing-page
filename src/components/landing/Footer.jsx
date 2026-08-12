import React from 'react';

/**
 * Footer — Minimalist Footer
 * Compact closing bar with logo, tagline, and essential privacy/legal links.
 */
export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="content-container footer-inner">
        <div className="footer-left">
          <a href="#" className="logo-link" style={{ fontSize: '1.2rem' }}>
            <span className="logo-sparkle">✦</span>
            <span>NovaSathi</span>
          </a>
          <span className="footer-tagline">The right path. The right companion.</span>
        </div>

        <ul className="footer-links">
          <li><a href="#" className="footer-link">About</a></li>
          <li><a href="#faq" className="footer-link">FAQ</a></li>
          <li><a href="#" className="footer-link">Privacy Policy</a></li>
          <li><a href="#" className="footer-link">Terms of Service</a></li>
          <li><a href="#" className="footer-link">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
