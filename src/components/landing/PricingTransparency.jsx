import React from 'react';

/**
 * PricingTransparency — Section 7 ("What happens after your free 5 minutes?")
 * Transparent continuation explanation ensuring no surprise charges.
 */
export default function PricingTransparency() {
  return (
    <section className="section-pricing-transparency content-container" id="transparency">
      <div className="glass-card pricing-card">
        <span className="pricing-badge">💡 TRANSPARENT EXPERIENCE</span>
        <h2 className="pricing-title">What happens after your free 5 minutes?</h2>
        <p className="pricing-text">
          Your first 5 minutes are free. If you want to continue, you'll see the applicable consultation rate before continuing.
        </p>
        <div className="pricing-highlight">
          <span>✓</span> No surprise charges.
        </div>
      </div>
    </section>
  );
}
