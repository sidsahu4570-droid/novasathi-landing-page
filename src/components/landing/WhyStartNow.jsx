import React from 'react';

/**
 * WhyStartNow — Premium Urgency Card (Requirement 6)
 */
const points = [
  {
    icon: '🟢',
    title: 'EXPERTS ARE AVAILABLE',
    desc: 'Connect while verified experts are available.',
  },
  {
    icon: '🔥',
    title: 'LIMITED FREE INTRODUCTORY SESSIONS',
    desc: 'Only a limited number of free first sessions are available today.',
  },
  {
    icon: '⏳',
    title: "TODAY'S OFFER",
    desc: 'Your free introductory session is available until the configured closing time.',
  },
];

export default function WhyStartNow({ onOpenModal }) {
  return (
    <section className="section-why-start-now content-container" id="why-start-now">
      <div className="glass-card glass-card-gold why-now-card-box">
        <h2 className="why-now-box-title">WHY START NOW?</h2>

        <div className="why-now-points-grid">
          {points.map((p, i) => (
            <div key={i} className="why-now-point-item">
              <span className="why-now-point-icon">{p.icon}</span>
              <div>
                <h3 className="why-now-point-title">{p.title}</h3>
                <p className="why-now-point-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="why-now-box-cta">
          <button className="btn-primary btn-gold" onClick={() => onOpenModal('Why Start Now')}>
            START MY FREE 5 MINUTES →
          </button>
        </div>
      </div>
    </section>
  );
}
