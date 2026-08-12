import React from 'react';

/**
 * HowItWorks — Section 4 (3-Step Clear Progression)
 * Lowers cognitive effort by explaining the exact 3 steps to start.
 */
export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: "Tell us what's on your mind",
      desc: "Choose what you're dealing with from love, career, astrology, or emotional guidance."
    },
    {
      num: '02',
      title: "Choose someone who understands",
      desc: "Connect with a verified expert through private chat, call or video."
    },
    {
      num: '03',
      title: "Start with 5 FREE minutes",
      desc: "Try the experience first with zero commitment. Continue only if you want to."
    }
  ];

  return (
    <section id="how-it-works" className="section-how-it-works content-container">
      <h2 className="section-title">You don't have to figure everything out alone.</h2>
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
