import React from 'react';

/**
 * HowItWorks — Section 3 ("What happens in your first 5 minutes?")
 * Exactly 3 compact, low-friction steps.
 */
export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: '📅',
      title: 'SHARE YOUR BIRTH DETAILS',
      desc: 'Provide your birth date, exact birth time and birthplace.',
    },
    {
      num: '02',
      icon: '🔮',
      title: 'YOUR BIRTH CHART IS STUDIED',
      desc: 'The astrologer examines the relevant planetary positions and periods in your chart.',
    },
    {
      num: '03',
      icon: '💬',
      title: 'ASK YOUR QUESTIONS',
      desc: 'Discuss the areas of life that are important to you — career, business, relationships, marriage, finances or other decisions.',
    },
    {
      num: '04',
      icon: '✨',
      title: 'GET PERSONALIZED GUIDANCE',
      desc: 'Your astrologer explains the relevant observations from your chart in simple, understandable language.',
    },
  ];

  return (
    <section id="how-it-works" className="section-how-it-works content-container">
      <h2 className="section-title">HOW YOUR ASTROLOGY CONSULTATION WORKS</h2>
      <p className="section-subtitle">
        Your consultation is based on your personal birth details and the questions that matter to you.
      </p>

      <div className="steps-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {steps.map((step) => (
          <div key={step.num} className="glass-card step-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div className="step-number" style={{ color: 'var(--color-warm-gold)', fontWeight: 800, fontSize: '1.4rem' }}>{step.num}</div>
              <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
            </div>
            <h3 className="step-title" style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px' }}>{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
