import React from 'react';

/**
 * FinalCTA — Section 7 (Primary Conversion Card)
 * Visually prominent high-conversion card urging the visitor to take the first low-risk step.
 */
export default function FinalCTA({ onOpenModal }) {
  return (
    <section className="section-final-cta content-container">
      <div className="glass-card glass-card-gold final-cta-card">
        <h2 className="final-cta-headline">
          Whatever is on your mind, start there.
        </h2>

        <p className="final-cta-sub">
          You don't need to know exactly what you need.
          Tell us what's bothering you and find the right kind of guidance.
        </p>

        <div className="final-cta-offer">
          ✨ 5 minutes are on us.
        </div>

        <button
          onClick={() => onOpenModal('Final CTA')}
          className="btn-primary btn-gold"
          style={{ fontSize: '1.15rem', padding: '16px 40px' }}
        >
          Start My Free Consultation →
        </button>

        <p className="hero-microcopy" style={{ marginTop: '18px', marginBottom: 0 }}>
          No commitment • Private & secure • Chat or call
        </p>
      </div>
    </section>
  );
}
