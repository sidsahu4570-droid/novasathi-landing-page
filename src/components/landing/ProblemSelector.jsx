import React from 'react';

/**
 * ProblemSelector — Section 2 ("What's on your mind right now?")
 * 6 compact interactive choices connecting directly to ConsultationModal with topic pre-selected.
 */
export default function ProblemSelector({ onOpenModal }) {
  const choices = [
    {
      id: 'love',
      icon: '❤️',
      title: 'Love & Relationships',
      desc: 'Understand compatibility, emotions and what comes next.',
      cta: 'Explore Love →',
      topic: 'Love & Relationships',
    },
    {
      id: 'career',
      icon: '💼',
      title: 'Career & Money',
      desc: 'Get another perspective before making your next move.',
      cta: 'Find Career Clarity →',
      topic: 'Career & Money',
    },
    {
      id: 'astrology',
      icon: '🔮',
      title: 'Future & Astrology',
      desc: 'Explore your birth chart, timing and personal guidance.',
      cta: 'Discover Your Path →',
      topic: 'Future & Astrology',
    },
    {
      id: 'tarot',
      icon: '🃏',
      title: 'Tarot & Numerology',
      desc: 'Look at your situation from another perspective.',
      cta: 'Explore Guidance →',
      topic: 'Tarot & Numerology',
    },
    {
      id: 'vastu',
      icon: '🏠',
      title: 'Vastu & Life Energy',
      desc: 'Bring more alignment to your space and everyday life.',
      cta: 'Explore Vastu →',
      topic: 'Vastu & Life Energy',
    },
    {
      id: 'support',
      icon: '💜',
      title: 'Someone to Talk To',
      desc: "Sometimes you don't need an answer. You need someone who listens.",
      cta: 'Talk Privately →',
      topic: 'Someone to Talk To',
    },
  ];

  return (
    <section id="problem-selector" className="section-problem-selector content-container">
      <h2 className="section-title">What's on your mind right now?</h2>
      <p className="section-subtitle">
        Start with what's bothering you. We'll help you find the right kind of guidance.
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
              <span>{card.cta}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
