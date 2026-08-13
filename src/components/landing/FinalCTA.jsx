import React from 'react';

/**
 * FinalCTA — Section 8 (Final Emotional CTA Block)
 * Primary headline: "You don't have to figure everything out alone."
 * Connects directly to ConsultationModal.
 */
export default function FinalCTA({ onOpenModal }) {
  return (
    <section className="section-final-cta content-container" id="final-cta">
      <div className="glass-card glass-card-gold final-cta-card">
        <h2 className="final-cta-headline">
          You don't have to figure everything out alone.
        </h2>

        <p className="final-cta-sub">
          Whatever is on your mind — start there.
        </p>

        <div className="final-cta-offer">
          ✨ 5 MINUTES ARE ON US
        </div>

        <button
          onClick={() => onOpenModal('Final CTA')}
          className="btn-primary btn-gold final-cta-btn"
        >
          START MY FREE CONSULTATION →
        </button>

        <p className="final-cta-microcopy">
          ₹0 to start • Private & secure • Chat, call or video
        </p>

        <div className="final-cta-topics-bar">
          <span>Love</span> • <span>Career</span> • <span>Relationships</span> • <span>Astrology</span> • <span>Tarot</span> • <span>Someone to Talk To</span>
        </div>
      </div>
    </section>
  );
}
