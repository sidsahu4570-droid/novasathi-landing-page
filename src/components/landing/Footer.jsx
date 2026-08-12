import React from 'react';

/**
 * Footer — Minimalist Footer with Circular Logo
 * Compact closing bar with official circular logo image, tagline, and legal links.
 */
export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="content-container footer-inner">
        <div className="footer-left">
          <a href="#" className="logo-link" style={{ fontSize: '1.2rem' }}>
            <img src="/logo.jpg" alt="NovaSathi Logo" className="logo-img-circle" style={{ width: '30px', height: '30px' }} />
            <span>NovaSathi</span>
          </a>
          <span className="footer-tagline">The right path. The right companion.</span>
        </div>

        <ul className="footer-links">
          <li><a href="https://novasathi.com/about" target="_blank" rel="noopener noreferrer" className="footer-link">About</a></li>
          <li><a href="#faq" className="footer-link">FAQ</a></li>
          <li><a href="https://novasathi.com/privacy" target="_blank" rel="noopener noreferrer" className="footer-link">Privacy Policy</a></li>
          <li><a href="https://novasathi.com/terms" target="_blank" rel="noopener noreferrer" className="footer-link">Terms of Service</a></li>
          <li><a href="#" className="footer-link">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
