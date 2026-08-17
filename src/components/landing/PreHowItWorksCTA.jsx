import React from 'react';
import { useDemoAvailability } from '../../context/DemoAvailabilityContext';

/**
 * PreHowItWorksCTA — Urgent conversion action interrupt placed immediately before How It Works.
 */
export default function PreHowItWorksCTA({ onOpenModal }) {
  const { introductorySessionsRemaining } = useDemoAvailability();

  return (
    <section className="section-pre-how-cta content-container">
      <div className="glass-card glass-card-gold pre-how-card">
        {/* Urgency Badge */}
        <div className="pre-how-badge-wrap">
          <span className="pre-how-badge">🔥 INTRODUCTORY SESSIONS AVAILABLE TODAY</span>
        </div>

        {/* Main Heading */}
        <h2 className="pre-how-headline">
          Still Worried About What Comes Next?
        </h2>

        {/* Short Supporting Text */}
        <p className="pre-how-subtext">
          Get personalized astrology guidance for your career, love life, business or future while today's introductory consultations are available.
        </p>

        {/* Primary CTA Button */}
        <div className="pre-how-btn-wrap">
          <button
            onClick={() => onOpenModal('Pre How It Works CTA')}
            className="btn-primary btn-gold pre-how-btn"
          >
            🔥 START MY CONSULTATION NOW →
          </button>
        </div>

        {/* Availability Line */}
        <p className="pre-how-availability-note">
          Only a limited number of introductory consultations are available today ({introductorySessionsRemaining} remaining).
        </p>
      </div>
    </section>
  );
}
