import React from 'react';

/**
 * ProblemSelector — Section 3 (Personal Identification Cards)
 * 6 compact interactive glass cards allowing visitors to identify what is on their mind
 * and immediately launch a targeted 5-minute consultation modal.
 */
export default function ProblemSelector({ onOpenModal }) {
  const problemCards = [
    {
      id: 'love',
      icon: '❤️',
      title: 'Love & Relationships',
      desc: 'Understand compatibility, relationships and emotional situations.',
      cta: 'Explore Love →',
      topic: 'Love & Relationships'
    },
    {
      id: 'career',
      icon: '💼',
      title: 'Career & Money',
      desc: "Get perspective when you're unsure about your next move.",
      cta: 'Find Career Clarity →',
      topic: 'Career & Money'
    },
    {
      id: 'astrology',
      icon: '🔮',
      title: 'Future & Astrology',
      desc: 'Explore your birth chart, timing and personal guidance.',
      cta: 'Discover Your Path →',
      topic: 'Future & Astrology'
    },
    {
      id: 'tarot',
      icon: '🃏',
      title: 'Tarot & Numerology',
      desc: 'Look at your situation from another perspective.',
      cta: 'Explore Guidance →',
      topic: 'Tarot & Numerology'
    },
    {
      id: 'vastu',
      icon: '🏠',
      title: 'Vastu & Life Energy',
      desc: 'Bring more alignment to your space and everyday life.',
      cta: 'Explore Vastu →',
      topic: 'Vastu & Life Energy'
    },
    {
      id: 'support',
      icon: '💜',
      title: 'Someone to Talk To',
      desc: 'Talk privately with someone who listens without judgment.',
      cta: 'Talk Privately →',
      topic: 'Someone to Talk To'
    }
  ];

  return (
    <section id="problem-selector" className="section-problem-selector content-container">
      <h2 className="section-title">What are you looking for clarity about?</h2>
      <p className="section-subtitle">
        Start with what's on your mind. We'll help you find the right kind of guidance.
      </p>

      <div className="problem-grid">
        {problemCards.map((card) => (
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
              <span>{card.cta}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
