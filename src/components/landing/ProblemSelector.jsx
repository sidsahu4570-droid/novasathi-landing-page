import React from 'react';

/**
 * ProblemSelector — Section 5 ("What keeps coming back to your mind?")
 * 6 psychological entry point cards connecting directly to ConsultationModal with topic pre-selected.
 */
export default function ProblemSelector({ onOpenModal }) {
  const choices = [
    {
      id: 'love',
      icon: '❤️',
      title: 'LOVE & RELATIONSHIPS',
      desc: 'Questions about compatibility, relationships, marriage and important decisions.',
      cta: 'Explore →',
      topic: 'Love & Relationships',
    },
    {
      id: 'career',
      icon: '💼',
      title: 'CAREER & BUSINESS',
      desc: 'Explore career direction, business decisions and professional opportunities.',
      cta: 'Explore →',
      topic: 'Career & Business',
    },
    {
      id: 'finance',
      icon: '💰',
      title: 'FINANCE & GROWTH',
      desc: 'Explore the planetary periods relevant to your financial concerns and goals.',
      cta: 'Explore →',
      topic: 'Finance & Growth',
    },
    {
      id: 'marriage',
      icon: '💍',
      title: 'MARRIAGE & FAMILY',
      desc: 'Questions about marriage, relationships and important family matters.',
      cta: 'Explore →',
      topic: 'Marriage & Family',
    },
    {
      id: 'future',
      icon: '🔮',
      title: 'FUTURE & ASTROLOGY',
      desc: 'Explore your birth chart, planetary positions and relevant upcoming periods.',
      cta: 'Explore →',
      topic: 'Future & Astrology',
    },
    {
      id: 'decisions',
      icon: '🧭',
      title: 'LIFE DECISIONS',
      desc: "Get an astrology-based perspective when you're considering an important decision.",
      cta: 'Explore →',
      topic: 'Life Decisions',
    },
  ];

  return (
    <section id="problem-selector" className="section-problem-selector content-container">
      <h2 className="section-title">WHAT'S ON YOUR MIND RIGHT NOW?</h2>
      <p className="section-subtitle">
        Choose the area of life you'd like to understand better through your birth chart.
      </p>

      <div className="problem-grid">
        {choices.map((card) => (
          <div
            key={card.id}
            className="glass-card problem-card"
            onClick={() => onOpenModal(card.topic)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenModal(card.topic)}
          >
            <div>
              <div className="problem-icon-title">
                <span className="problem-icon">{card.icon}</span>
                <h3 className="problem-card-title">{card.title}</h3>
              </div>
              <p className="problem-card-desc">{card.desc}</p>
            </div>

            <div className="problem-card-cta">
              <span style={{ color: 'var(--color-warm-gold)', fontWeight: 700 }}>{card.cta}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
