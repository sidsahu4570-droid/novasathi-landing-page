import React, { useState, useEffect } from 'react';

/**
 * ConsultationModal — Low-Friction First Session Trigger
 * Features official circular NovaSathi logo badge and topic selector.
 */
export default function ConsultationModal({ isOpen, onClose, defaultTopic }) {
  const [selectedTopic, setSelectedTopic] = useState(defaultTopic || 'Love & Relationships');
  const [medium, setMedium] = useState('Chat');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultTopic) {
      setSelectedTopic(defaultTopic);
    }
  }, [defaultTopic]);

  if (!isOpen) return null;

  const topics = [
    'Love & Relationships',
    'Career & Money',
    'Future & Astrology',
    'Tarot & Numerology',
    'Vastu & Life Energy',
    'Someone to Talk To'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {!submitted ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <img src="/logo.jpg" alt="NovaSathi Logo" className="logo-img-circle" style={{ width: '40px', height: '40px' }} />
              <div>
                <h3 className="modal-title" style={{ fontSize: '1.4rem', marginBottom: '2px' }}>Start Your Free 5 Minutes</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-warm-gold)' }}>NovaSathi — The Safe Space</span>
              </div>
            </div>
            <p className="modal-sub">
              Choose what's on your mind. We'll connect you to a verified expert instantly.
            </p>

            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-lavender)', marginBottom: '8px', fontWeight: '500' }}>
                Select Topic:
              </label>
              <div className="modal-topic-select">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`modal-topic-btn ${selectedTopic === t ? 'selected' : ''}`}
                    onClick={() => setSelectedTopic(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-lavender)', marginBottom: '8px', fontWeight: '500' }}>
                Preferred Mode:
              </label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                {['Chat', 'Call', 'Video'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`modal-topic-btn ${medium === m ? 'selected' : ''}`}
                    style={{ flex: 1, textAlign: 'center' }}
                    onClick={() => setMedium(m)}
                  >
                    {m === 'Chat' ? '💬 Chat' : m === 'Call' ? '📞 Call' : '📹 Video'}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="btn-primary btn-gold"
                style={{ width: '100%', fontSize: '1.05rem', padding: '14px' }}
              >
                Connect Now (5 Min Free) →
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'rgba(248, 244, 234, 0.6)', marginTop: '14px' }}>
                🔒 100% Confidential • No Commitment Required
              </p>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <img src="/logo.jpg" alt="NovaSathi Logo" className="logo-img-circle" style={{ width: '50px', height: '50px', marginBottom: '14px' }} />
            <h3 className="modal-title" style={{ color: 'var(--color-warm-gold)' }}>Connecting You...</h3>
            <p className="modal-sub">
              Preparing your private 5-minute session for <strong>{selectedTopic}</strong> via <strong>{medium}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
