import React from 'react';

/**
 * WhatYouGet — Section 4 (Value Anchoring Block)
 * Clear value checklist communicating what the customer receives in their free 5-minute session.
 */
const items = [
  'One-on-one conversation',
  'A verified expert',
  'Your specific question',
  'Private & confidential',
  'Chat, call or video',
  'No commitment to continue',
];

export default function WhatYouGet({ onOpenModal }) {
  return (
    <section className="section-what-you-get content-container" id="what-you-get">
      <div className="glass-card value-card">
        <h2 className="value-title">Your first 5 minutes give you a real starting point.</h2>
        <p className="value-sub">Experience genuine guidance with zero upfront cost.</p>

        <div className="value-checklist">
          {items.map((item, i) => (
            <div key={i} className="value-check-item">
              <span className="value-check-icon">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="value-anchor-price">
          <span className="price-tag">Start at ₹0</span>
          <button className="btn-primary btn-gold" onClick={() => onOpenModal('Value Block')}>
            START MY FREE 5 MINUTES →
          </button>
        </div>
      </div>
    </section>
  );
}
