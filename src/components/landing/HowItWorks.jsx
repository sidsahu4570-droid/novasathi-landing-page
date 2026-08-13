import React from 'react';

/**
 * HowItWorks — Section 3 ("What happens in your first 5 minutes?")
 * Exactly 3 compact, low-friction steps.
 */
export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: "TELL US WHAT'S ON YOUR MIND",
      desc: "Choose what you're dealing with — love, career, astrology, relationships or emotional guidance.",
    },
    {
      num: '02',
      title: 'CHOOSE SOMEONE WHO UNDERSTANDS',
      desc: 'Connect with a verified expert through private chat, call or video.',
    },
    {
      num: '03',
      title: 'START WITH 5 FREE MINUTES',
      desc: 'Try the experience with zero commitment. Continue only if you want to.',
    },
  ];

  return (
    <section id="how-it-works" className="section-how-it-works content-container">
      <h2 className="section-title">What happens in your first 5 minutes?</h2>
      <p className="section-subtitle">
        Getting clarity is simple, private, and risk-free.
      </p>

      <div className="steps-container">
        {steps.map((step) => (
          <div key={step.num} className="glass-card step-card">
            <div className="step-number">{step.num}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
