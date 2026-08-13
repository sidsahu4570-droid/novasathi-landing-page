import React from 'react';

/**
 * RiskReversal — Section 6 ("Try it without the pressure.")
 * Lowers customer hesitation with 4 clear risk-reversal guarantees.
 */
const points = [
  {
    icon: '✨',
    title: '₹0 TO START',
    desc: 'Your first 5 minutes are free.',
  },
  {
    icon: '🔒',
    title: 'PRIVATE',
    desc: 'Your conversation stays confidential.',
  },
  {
    icon: '🌱',
    title: 'NO COMMITMENT',
    desc: 'Continue only if you find it useful.',
  },
  {
    icon: '📱',
    title: 'YOUR CHOICE',
    desc: 'Chat, call or video.',
  },
];

export default function RiskReversal() {
  return (
    <section className="section-risk-reversal content-container" id="risk-reversal">
      <h2 className="section-title">Try it without the pressure.</h2>

      <div className="risk-grid">
        {points.map((pt, i) => (
          <div key={i} className="glass-card risk-card">
            <span className="risk-icon">{pt.icon}</span>
            <h3 className="risk-title">{pt.title}</h3>
            <p className="risk-desc">{pt.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
