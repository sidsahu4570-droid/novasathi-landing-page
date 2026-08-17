import React from 'react';

/**
 * ExpertProfiles — Section 4 ("Find someone who understands.") Requirement 13
 * Expert trust cards displaying verified profile credentials, actionable status, and direct CTA.
 */
const experts = [
  {
    id: 1,
    name: 'Pandit Sharma',
    category: 'Vedic Astrology & Birth Chart',
    rating: 4.9,
    experience: '12+ years exp',
    languages: 'English, Hindi',
    specialties: 'Love • Career • Marriage Chart',
    status: 'AVAILABLE NOW',
    subStatus: 'Online',
    avatar: '🧙‍♂️',
    topic: 'Future & Astrology',
  },
  {
    id: 2,
    name: 'Acharya Tanvi Varma',
    category: 'Kundu & Relationship Compatibility',
    rating: 4.95,
    experience: '8+ years exp',
    languages: 'English, Hindi',
    specialties: 'Compatibility • Marriage • Periods',
    status: 'AVAILABLE NOW',
    subStatus: 'Online',
    avatar: '🔮',
    topic: 'Love & Relationships',
  },
  {
    id: 3,
    name: 'Astro Rajesh K.',
    category: 'KP Astrology & Business Transit',
    rating: 4.88,
    experience: '10+ years exp',
    languages: 'English, Hindi, Gujarati',
    specialties: 'Job • Business Growth • Decisions',
    status: 'AVAILABLE NOW',
    subStatus: 'Online',
    avatar: '⭐',
    topic: 'Career & Business',
  },
];

export default function ExpertProfiles({ onOpenModal }) {
  return (
    <section className="section-experts content-container" id="experts">
      <h2 className="section-title">SPEAK DIRECTLY WITH AN ASTROLOGER</h2>
      <p className="section-subtitle">
        Choose an astrologer and discuss the questions that matter most to you.
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
              <p style={{ fontSize: '0.82rem', color: '#E2D9F8', opacity: 0.8, margin: '4px 0' }}>🗣️ {exp.languages}</p>
              <p className="expert-specialties">{exp.specialties}</p>
            </div>

            <button
              className="btn-primary btn-gold expert-cta"
              onClick={() => onOpenModal(exp.topic)}
            >
              TALK TO THIS ASTROLOGER →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
