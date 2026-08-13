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
      desc: '"Should I stay, move on, or say what I really feel?"',
      cta: 'Explore Love →',
      topic: 'Love & Relationships',
    },
    {
      id: 'career',
      icon: '💼',
      title: 'CAREER & MONEY',
      desc: '"Am I making the right move with my career or money?"',
      cta: 'Find Career Clarity →',
      topic: 'Career & Money',
    },
    {
      id: 'astrology',
      icon: '🔮',
      title: 'FUTURE & ASTROLOGY',
      desc: '"What does my chart say about the phase I\'m going through?"',
      cta: 'Discover Your Path →',
      topic: 'Future & Astrology',
    },
    {
      id: 'tarot',
      icon: '🃏',
      title: 'TAROT & NUMEROLOGY',
      desc: '"What perspective am I missing?"',
      cta: 'Explore Guidance →',
      topic: 'Tarot & Numerology',
    },
    {
      id: 'vastu',
      icon: '🏠',
      title: 'VASTU & LIFE ENERGY',
      desc: '"Could my surroundings be affecting my peace and progress?"',
      cta: 'Explore Vastu →',
      topic: 'Vastu & Life Energy',
    },
    {
      id: 'support',
      icon: '💜',
      title: 'SOMEONE TO TALK TO',
      desc: '"I don\'t need advice. I just need someone who listens."',
      cta: 'Talk Privately →',
      topic: 'Someone to Talk To',
    },
  ];

  return (
    <section id="problem-selector" className="section-problem-selector content-container">
      <h2 className="section-title">What keeps coming back to your mind?</h2>
      <p className="section-subtitle">
        Sometimes you already know the question. You just need someone to help you see it clearly.
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
