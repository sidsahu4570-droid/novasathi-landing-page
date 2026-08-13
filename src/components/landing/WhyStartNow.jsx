import React from 'react';

/**
 * WhyStartNow — Section 9 ("Why start now?")
 * Conversion block specifically designed to eliminate procrastination and delay.
 */
const reasons = [
  {
    icon: '✨',
    title: 'FIRST 5 MINUTES ARE FREE',
    desc: 'Experience NovaSathi before deciding whether you want more.',
  },
  {
    icon: '🟢',
    title: 'EXPERTS AVAILABLE',
    desc: 'Connect with verified experts ready to help.',
  },
  {
    icon: '🔒',
    title: 'PRIVATE',
    desc: 'Your conversation is completely confidential.',
  },
  {
    icon: '↩',
    title: 'NO COMMITMENT',
    desc: 'Continue only if you find it useful.',
  },
];

export default function WhyStartNow({ onOpenModal }) {
  return (
    <section className="section-why-start-now content-container" id="why-start-now">
      <h2 className="section-title">Why start now?</h2>

      <div className="why-now-grid">
        {reasons.map((r, i) => (
          <div key={i} className="glass-card why-now-card">
            <span className="why-now-icon">{r.icon}</span>
            <h3 className="why-now-title">{r.title}</h3>
            <p className="why-now-desc">{r.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button className="btn-primary btn-gold" onClick={() => onOpenModal('Why Start Now')}>
          START MY FREE 5 MINUTES →
        </button>
      </div>
    </section>
  );
}
