import React from 'react';

/**
 * FinalCTA — Section 14 (Final Emotional & Action-Oriented Decision Block)
 */
export default function FinalCTA({ onOpenModal }) {
  return (
    <section className="section-final-cta content-container" id="final-cta">
      <div className="glass-card glass-card-gold final-cta-card">
        <h2 className="final-cta-headline">
          Whatever is on your mind, start there.
        </h2>

        <p className="final-cta-sub">
          You don't need to know exactly what you need yet. Tell us what's bothering you and we'll help you find the right kind of guidance.
        </p>

        <div className="final-cta-offer">
          ✨ YOUR FIRST 5 MINUTES ARE FREE
        </div>

        <button
          onClick={() => onOpenModal('Final CTA')}
          className="btn-primary btn-gold final-cta-btn"
        >
          START MY FREE CONSULTATION →
        </button>

        <p className="final-cta-microcopy">
          ₹0 to start • Private • No commitment
        </p>
      </div>
    </section>
  );
}
