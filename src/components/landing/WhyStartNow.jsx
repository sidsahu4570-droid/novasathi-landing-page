import React from 'react';
import useTenMinTimer from '../../utils/useTenMinTimer';

/**
 * WhyStartNow — Premium Urgency Card (Requirement 6) with 10-minute decreasing timer
 */
export default function WhyStartNow({ onOpenModal }) {
  const { formatted: timerFormatted } = useTenMinTimer();

  const points = [
    {
      icon: '🟢',
      title: 'EXPERTS ARE AVAILABLE NOW',
      desc: 'Connect immediately while verified experts are available online.',
    },
    {
      icon: '🔥',
      title: 'LIMITED FREE INTRODUCTORY SESSIONS',
      desc: 'Only a limited number of free first sessions are available today.',
    },
    {
      icon: '⏳',
      title: "TODAY'S INTRODUCTORY OFFER",
      desc: `Your free 5-minute introductory session closes in ${timerFormatted}.`,
    },
  ];

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
