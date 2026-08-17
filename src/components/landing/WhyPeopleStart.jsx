import React from 'react';

/**
 * WhyPeopleStart — Section 6 (Emotional Identification)
 * Creates instant customer recognition before the consultation offer.
 */
const situations = [
  {
    icon: '❓',
    title: '"I NEED CLARITY ON MY CAREER OR LOVE LIFE."',
    desc: 'Standing at a crossroads in love, career, or life decisions and seeking guidance based on your birth chart.',
  },
  {
    icon: '🔮',
    title: '"I WANT TO UNDERSTAND MY PLANETARY PERIODS."',
    desc: 'Exploring what your current planetary transit means for your finances, relationships and personal growth.',
  },
  {
    icon: '🧭',
    title: '"I WANT AN ASTROLOGICAL PERSPECTIVE."',
    desc: 'A private one-on-one conversation with a verified astrologer who analyzes your birth details.',
  },
];

export default function WhyPeopleStart() {
  return (
    <section className="section-why-start content-container" id="why-people-start">
      <h2 className="section-title">
        WHY PEOPLE GET AN ASTROLOGY CONSULTATION
      </h2>
      <p className="section-subtitle">
        Understand your path with personalized birth chart insights.
      </p>

      <div className="why-start-grid">
        {situations.map((item, idx) => (
          <div key={idx} className="glass-card why-start-card">
            <span className="why-start-icon">{item.icon}</span>
            <h3 className="why-start-title">{item.title}</h3>
            <p className="why-start-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
