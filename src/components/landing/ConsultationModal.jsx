import React, { useState, useEffect } from 'react';

/**
 * ConsultationModal — Action-Oriented Low-Friction Consultation Trigger
 * Section 12 specification: "Your free 5 minutes are ready."
 */
export default function ConsultationModal({ isOpen, onClose, defaultTopic }) {
  const [selectedTopic, setSelectedTopic] = useState(defaultTopic || 'Love & Relationships');
  const [medium, setMedium] = useState('Chat');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (defaultTopic) setSelectedTopic(defaultTopic);
  }, [defaultTopic]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhone('');
      setPhoneError('');
      setStatus('idle');
      setErrorMsg('');
      setMedium('Chat');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const topics = [
    'Love & Relationships',
    'Career & Money',
    'Future & Astrology',
    'Tarot & Numerology',
    'Vastu & Life Energy',
    'Someone to Talk To',
  ];

  const validatePhone = (value) => {
    const clean = value.replace(/\D/g, '');
    if (!clean) return 'Phone number is required.';
    if (clean.length !== 10) return 'Enter a valid 10-digit mobile number.';
    if (!/^[6-9]/.test(clean)) return 'Mobile number must start with 6, 7, 8, or 9.';
    return '';
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validatePhone(phone);
    if (err) {
      setPhoneError(err);
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: selectedTopic, mode: medium, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Network error. Please check your connection and try again.');
    }
  };

  const modeMessages = {
    Chat: 'Our advisor will send you a message shortly.',
    Call: `We'll call you on +91 ${phone} within minutes.`,
    Video: `We'll send a video link to your number +91 ${phone}.`,
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {status === 'success' ? (
          /* ── SUCCESS STATE ── */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✅</div>
            <h3 className="modal-title" style={{ color: 'var(--color-warm-gold)', marginBottom: '10px' }}>
              Your 5 Free Minutes Are Ready!
            </h3>
            <p className="modal-sub" style={{ marginBottom: '8px' }}>
              {modeMessages[medium]}
            </p>
            <p style={{ fontSize: '0.82rem', color: 'rgba(248,244,234,0.55)', marginBottom: '24px' }}>
              Topic: <strong style={{ color: 'rgba(248,244,234,0.85)' }}>{selectedTopic}</strong>
            </p>
            <button
              onClick={onClose}
              className="btn-primary btn-gold"
              style={{ width: '100%', fontSize: '1rem', padding: '12px' }}
            >
              Close
            </button>
          </div>
        ) : (
          /* ── FORM STATE ── */
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/logo.jpg" alt="NovaSathi Logo" className="logo-img-circle" style={{ width: '38px', height: '38px' }} />
                <div>
                  <h3 className="modal-title" style={{ fontSize: '1.35rem', marginBottom: '1px' }}>
                    Your free 5 minutes are ready.
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-warm-gold)' }}>
                    NovaSathi — Safe & Private Guidance
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#6bcf7f', background: 'rgba(107, 207, 127, 0.12)', padding: '3px 10px', borderRadius: '12px', marginBottom: '16px' }}>
              🟢 Experts available now
            </div>

            {status === 'error' && (
              <div style={{
                background: 'rgba(255,80,80,0.12)',
                border: '1px solid rgba(255,80,80,0.35)',
                borderRadius: '8px',
                padding: '10px 14px',
                marginBottom: '16px',
                fontSize: '0.85rem',
                color: '#ff7070',
              }}>
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Topic Selector */}
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-lavender)', marginBottom: '8px', fontWeight: '600' }}>
                What would you like clarity about?
              </label>
              <div className="modal-topic-select">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`modal-topic-btn ${selectedTopic === t ? 'selected' : ''}`}
                    onClick={() => setSelectedTopic(t)}
                    disabled={status === 'loading'}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Mode Selector */}
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-lavender)', marginBottom: '8px', fontWeight: '600' }}>
                Choose how you'd like to connect:
              </label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
                {['Chat', 'Call', 'Video'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`modal-topic-btn ${medium === m ? 'selected' : ''}`}
                    style={{ flex: 1, textAlign: 'center' }}
                    onClick={() => setMedium(m)}
                    disabled={status === 'loading'}
                  >
                    {m === 'Chat' ? '💬 Chat' : m === 'Call' ? '📞 Call' : '📹 Video'}
                  </button>
                ))}
              </div>

              {/* Phone Number Input */}
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-lavender)', marginBottom: '6px', fontWeight: '600' }}>
                Your Mobile Number:
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${phoneError ? 'rgba(255,80,80,0.6)' : 'rgba(196,166,255,0.25)'}`,
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: phoneError ? '6px' : '18px',
                transition: 'border-color 0.2s',
              }}>
                <span style={{
                  padding: '12px 12px 12px 14px',
                  fontSize: '0.95rem',
                  color: 'rgba(248,244,234,0.6)',
                  borderRight: '1px solid rgba(196,166,255,0.2)',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                }}>
                  🇮🇳 +91
                </span>
                <input
                  id="consultation-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="Enter 10-digit number"
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={status === 'loading'}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '12px 14px',
                    fontSize: '1rem',
                    color: '#fff',
                    fontFamily: 'inherit',
                    letterSpacing: '0.5px',
                  }}
                />
              </div>
              {phoneError && (
                <p style={{ fontSize: '0.78rem', color: '#ff7070', marginBottom: '16px', marginTop: '-2px' }}>
                  ⚠ {phoneError}
                </p>
              )}

              {/* Submit Button */}
              <button
                id="consultation-submit-btn"
                type="submit"
                className="btn-primary btn-gold"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  fontSize: '1.08rem',
                  padding: '14px',
                  opacity: status === 'loading' ? 0.7 : 1,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontWeight: '700',
                }}
              >
                {status === 'loading' ? 'Connecting...' : 'CONNECT NOW — 5 MIN FREE →'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'rgba(248, 244, 234, 0.65)', marginTop: '12px' }}>
                ₹0 to start • Private • No commitment
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
