import React from 'react';

/**
 * BirthDetailsRequired — Section 7 ("WHAT YOU'LL NEED")
 * Visual preparation checklist for personal astrology consultation.
 */
export default function BirthDetailsRequired({ onOpenModal }) {
  const items = [
    {
      icon: '📅',
      title: 'BIRTH DATE',
      desc: 'Your exact date of birth.',
    },
    {
      icon: '🕐',
      title: 'EXACT BIRTH TIME',
      desc: 'Your most accurate birth time helps create a more precise birth chart.',
    },
    {
      icon: '📍',
      title: 'BIRTHPLACE',
      desc: 'Your city/place of birth.',
    },
  ];

  return (
    <section className="section-birth-details content-container" id="birth-details">
      <h2 className="section-title">WHAT YOU'LL NEED</h2>
      <p className="section-subtitle" style={{ marginBottom: '24px' }}>
        Have these details ready before your consultation.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        {items.map((item, i) => (
          <div key={i} className="glass-card" style={{ padding: '24px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-warm-gold)', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ fontSize: '0.96rem', color: '#E2D9F8', opacity: 0.9, lineHeight: 1.45 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          className="btn-primary btn-gold"
          onClick={() => onOpenModal('Birth Details Ready')}
          style={{ padding: '15px 32px', fontSize: '1.08rem', fontWeight: 800 }}
        >
          START MY ASTROLOGY CONSULTATION →
        </button>
      </div>
    </section>
  );
}
