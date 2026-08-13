import React from 'react';

/**
 * WhyPeopleStart — Section 6 (Emotional Identification)
 * Creates instant customer recognition before the consultation offer.
 */
const situations = [
  {
    icon: '❓',
    title: '"I DON\'T KNOW WHAT TO DO."',
    desc: 'Standing at a crossroads in love, career, or life decisions without clarity on the next move.',
  },
  {
    icon: '🌀',
    title: '"I KEEP OVERTHINKING THE SAME QUESTION."',
    desc: 'Replaying the same scenario over and over late at night hoping for perspective.',
  },
  {
    icon: '💡',
    title: '"I JUST WANT ANOTHER PERSPECTIVE."',
    desc: 'A safe, unbiased conversation with someone who listens without judging.',
  },
];

export default function WhyPeopleStart() {
  return (
    <section className="section-why-start content-container" id="why-people-start">
      <h2 className="section-title">
        People don't come here because they have everything figured out.
      </h2>
      <p className="section-subtitle">
        That's where NovaSathi starts.
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
