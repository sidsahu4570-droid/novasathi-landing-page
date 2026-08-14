import React from 'react';

/**
 * ExpertProfiles — Section 4 ("Find someone who understands.") Requirement 13
 * Expert trust cards displaying verified profile credentials, actionable status, and direct CTA.
 */
const experts = [
  {
    id: 1,
    name: 'Pandit Sharma',
    category: 'Vedic Astrology',
    rating: 4.9,
    experience: '12+ years exp',
    specialties: 'Love • Career • Marriage',
    status: 'AVAILABLE NOW',
    subStatus: 'Ready to talk',
    avatar: '🧙‍♂️',
    topic: 'Future & Astrology',
  },
  {
    id: 2,
    name: 'Tanvi Varma',
    category: 'Tarot & Relationships',
    rating: 4.95,
    experience: '8+ years exp',
    specialties: 'Emotions • Breakups • Compatibility',
    status: 'AVAILABLE NOW',
    subStatus: 'Ready to talk',
    avatar: '🔮',
    topic: 'Love & Relationships',
  },
  {
    id: 3,
    name: 'Astro Rajesh',
    category: 'Numerology & Career',
    rating: 4.88,
    experience: '10+ years exp',
    specialties: 'Job • Business • Life Decisions',
    status: 'AVAILABLE NOW',
    subStatus: 'Ready to talk',
    avatar: '⭐',
    topic: 'Career & Money',
  },
];

export default function ExpertProfiles({ onOpenModal }) {
  return (
    <section className="section-experts content-container" id="experts">
      <h2 className="section-title">Find someone who understands.</h2>
      <p className="section-subtitle">
        Choose the kind of guidance that feels right for you.
      </p>

      <div className="experts-grid">
        {experts.map((exp) => (
          <div key={exp.id} className="glass-card expert-card">
            <div className="expert-card-top">
              <div className="expert-avatar-wrap">
                <span className="expert-avatar-icon">{exp.avatar}</span>
              </div>
              <div className="expert-badge-wrap">
                <span className="expert-status-badge">
                  🟢 {exp.status} • "{exp.subStatus}"
                </span>
              </div>
            </div>

            <div className="expert-info">
              <h3 className="expert-name">{exp.name}</h3>
              <p className="expert-category">{exp.category}</p>
              <div className="expert-rating">
                <span className="expert-stars">★★★★★</span>
                <span className="expert-score">{exp.rating}</span>
                <span className="expert-exp">• {exp.experience}</span>
              </div>
              <p className="expert-specialties">{exp.specialties}</p>
            </div>

            <button
              className="btn-primary btn-gold expert-cta"
              onClick={() => onOpenModal(exp.topic)}
            >
              TALK TO THIS EXPERT →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
