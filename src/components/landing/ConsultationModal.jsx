import React, { useState, useEffect } from 'react';
import useTenMinTimer from '../../utils/useTenMinTimer';

/**
 * ConsultationModal — Requirements 12, 13, 14
 * High-converting urgency modal with 10-minute decreasing timer, contact fields, and confirmation flow.
 */
export default function ConsultationModal({ isOpen, onClose, defaultTopic }) {
  const { formatted: timerFormatted } = useTenMinTimer();
  const [selectedTopic, setSelectedTopic] = useState(defaultTopic || 'Love & Relationships');
  const [medium, setMedium] = useState('Chat');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [remaining, setRemaining] = useState(12);

  useEffect(() => {
    if (defaultTopic) setSelectedTopic(defaultTopic);
  }, [defaultTopic]);

  // Load offer settings & remaining slots
  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    const apiUrl = import.meta.env.VITE_API_URL || '';

    async function loadOffer() {
      try {
        const res = await fetch(`${apiUrl}/api/offer`).catch(() => null);
        if (res && res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            if (isMounted && data.remainingSlots !== undefined) {
              setRemaining(data.remainingSlots);
            }
          }
        }
      } catch (e) {}
    }
    loadOffer();
    return () => { isMounted = false; };
  }, [isOpen]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setWhatsapp('');
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
        body: JSON.stringify({
          topic: selectedTopic,
          mode: medium,
          phone,
          name,
          whatsapp,
        }),
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

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* ── Top Modal Urgency Banner (10-Min Decreasing Timer) ── */}
        <div className="modal-urgency-banner">
          <div className="modal-urgency-title">🔥 FREE INTRODUCTORY SESSION</div>
          <div className="modal-urgency-sub">
            <span>🔥 {remaining} free sessions remaining today</span> •{' '}
            <span>⏳ Offer closes in {timerFormatted}</span>
          </div>
        </div>

        {status === 'success' ? (
          /* ── REQUIREMENT 13: CONFIRMATION SCREEN ── */
          <div style={{ textAlign: 'left', padding: '16px 4px' }}>
            <h3 className="modal-title" style={{ color: '#6bcf7f', marginBottom: '4px', fontSize: '1.4rem' }}>
              Your free session request has been sent.
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(248,244,234,0.85)', marginBottom: '18px' }}>
              Looking for an available expert for you...
            </p>

            <div className="modal-confirm-checklist">
              <div className="confirm-check-item">
                <span className="pulse-dot">🟢</span>
                <span>Request received</span>
              </div>
              <div className="confirm-check-item">
                <span className="check-icon">✓</span>
                <span>Topic selected: <strong>{selectedTopic}</strong></span>
              </div>
              <div className="confirm-check-item">
                <span className="check-icon">✓</span>
                <span>Preferred connection method selected: <strong>{medium}</strong></span>
              </div>
              <div className="confirm-check-item">
                <span className="check-icon">✓</span>
                <span>Free introductory session reserved for <strong>+91 {phone}</strong></span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-primary btn-gold"
              style={{ width: '100%', fontSize: '1rem', padding: '12px', marginTop: '16px' }}
            >
              DONE
            </button>
          </div>
        ) : (
          /* ── FORM STATE ── */
          <>
            <p className="modal-sub" style={{ marginTop: '12px' }}>
              What would you like help with?
            </p>

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
              {/* 1. Topic Selector */}
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-lavender)', marginBottom: '8px', fontWeight: '600' }}>
                1. Select Topic:
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

              {/* 2. Mode Selector */}
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-lavender)', marginBottom: '8px', fontWeight: '600' }}>
                2. How would you like to connect?
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

              {/* 3. Customer Information */}
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-lavender)', marginBottom: '6px', fontWeight: '600' }}>
                3. Where can our expert reach you?
              </label>

              {/* Optional Name */}
              <input
                type="text"
                placeholder="Your Name (Optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === 'loading'}
                className="modal-text-input"
                style={{ marginBottom: '10px' }}
              />

              {/* Required Phone Number */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${phoneError ? 'rgba(255,80,80,0.6)' : 'rgba(196,166,255,0.25)'}`,
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: phoneError ? '6px' : '10px',
              }}>
                <span style={{
                  padding: '12px 14px',
                  fontSize: '0.92rem',
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
                  placeholder="Enter 10-digit mobile number *"
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={status === 'loading'}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '12px 14px',
                    fontSize: '0.95rem',
                    color: '#fff',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
              {phoneError && (
                <p style={{ fontSize: '0.78rem', color: '#ff7070', marginBottom: '12px' }}>
                  ⚠ {phoneError}
                </p>
              )}

              {/* Optional WhatsApp Number */}
              <input
                type="tel"
                placeholder="WhatsApp Number (Optional)"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                disabled={status === 'loading'}
                className="modal-text-input"
                style={{ marginBottom: '18px' }}
              />

              {/* Submit Button */}
              <button
                id="consultation-submit-btn"
                type="submit"
                className="btn-primary btn-gold"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  fontSize: '1.05rem',
                  padding: '14px',
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? 'Sending Request...' : 'REQUEST MY FREE SESSION →'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(248, 244, 234, 0.7)', marginTop: '12px' }}>
                ₹0 to start • Private • No commitment
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
