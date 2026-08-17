import React from 'react';

/**
 * WhatYouGet — Section 4 (Value Anchoring Block)
 * Clear value checklist communicating what the customer receives in their free 5-minute session.
 */
const questions = [
  { icon: '💼', text: 'Should I change my career?' },
  { icon: '💍', text: 'What does my birth chart indicate about marriage?' },
  { icon: '📈', text: 'Is this a favourable period for my business?' },
  { icon: '🔮', text: 'What does my current planetary period mean?' },
  { icon: '❤️', text: 'What should I understand about my relationship?' },
  { icon: '🧭', text: 'What does my chart suggest about my next phase of life?' },
];

export default function WhatYouGet({ onOpenModal }) {
  return (
    <section className="section-what-you-get content-container" id="questions-ask">
      <h2 className="section-title">WHAT CAN YOU ASK DURING YOUR CONSULTATION?</h2>
      <p className="section-subtitle" style={{ marginBottom: '24px' }}>
        Bring your questions. Your consultation starts with your birth chart.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {questions.map((q, i) => (
          <div
            key={i}
            className="glass-card"
            style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '14px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.25s ease' }}
            onClick={() => onOpenModal('Astrology Question')}
          >
            <span style={{ fontSize: '1.6rem' }}>{q.icon}</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#E2D9F8' }}>"{q.text}"</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <p style={{ fontSize: '0.88rem', color: '#E2D9F8', opacity: 0.8, fontStyle: 'italic' }}>
          * Consultations offer personalized observations based on birth details. We do not make absolute predictions or guaranteed claims.
        </p>
      </div>
    </section>
  );
}
