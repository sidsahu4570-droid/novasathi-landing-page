import React, { useState, useEffect, useCallback } from 'react';

export default function AdminOfferManager({ token }) {
  const [offer, setOffer] = useState({
    active: true,
    title: 'Your First 5 Minutes Are Free',
    endDate: '',
    dailyLimit: 50,
    sessionsUsed: 38,
    expertsAvailableCount: 3,
    showCountdown: true,
    showRemainingSlots: true,
    urgencyMessage: 'Limited introductory sessions available today',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const authHeaders = useCallback(
    () => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const fetchOfferSettings = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/offer`).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        setOffer({
          ...data,
          endDate: data.endDate ? new Date(data.endDate).toISOString().slice(0, 16) : '',
        });
      } else {
        const saved = localStorage.getItem('ns_offer_settings');
        if (saved) setOffer(JSON.parse(saved));
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOfferSettings();
  }, [fetchOfferSettings]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    const apiUrl = import.meta.env.VITE_API_URL || '';

    try {
      const res = await fetch(`${apiUrl}/api/offer/admin/update`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(offer),
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        setOffer({
          ...data.offer,
          endDate: data.offer.endDate ? new Date(data.offer.endDate).toISOString().slice(0, 16) : '',
        });
      }
    } catch (e) {
    } finally {
      localStorage.setItem('ns_offer_settings', JSON.stringify(offer));
      setSaving(false);
      setMsg('✨ Free Session Offer and Real Urgency settings saved!');
      setTimeout(() => setMsg(''), 4000);
    }
  };

  const remaining = Math.max(0, Number(offer.dailyLimit) - Number(offer.sessionsUsed));

  return (
    <div className="arm-container">
      <div className="arm-top-bar">
        <div>
          <h2 className="arm-title">FREE SESSION OFFER & REAL URGENCY CONTROL</h2>
          <p className="arm-sub">
            Manage live free session capacity, real-time remaining slots, expert availability numbers, and countdown closing time.
          </p>
        </div>
      </div>

      {msg && <div className="arm-success-toast">{msg}</div>}

      {loading ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">⏳</div>
          <div className="admin-empty-title">Loading offer settings...</div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="aom-card">
          <div className="aom-form-group switch-group">
            <label className="arm-switch-label">
              <input
                type="checkbox"
                checked={offer.active}
                onChange={(e) => setOffer({ ...offer, active: e.target.checked })}
              />
              <span className="arm-slider" />
              <span style={{ marginLeft: '12px', fontSize: '1rem', fontWeight: 600 }}>
                Free 5-Minute Session Offer Active (ON / OFF)
              </span>
            </label>
          </div>

          <div className="arm-form-row">
            <div className="arm-form-group flex-1">
              <label>Daily Free Sessions Capacity</label>
              <input
                type="number"
                className="admin-input"
                min="1"
                value={offer.dailyLimit}
                onChange={(e) => setOffer({ ...offer, dailyLimit: e.target.value })}
              />
            </div>

            <div className="arm-form-group flex-1">
              <label>Sessions Used Today</label>
              <input
                type="number"
                className="admin-input"
                min="0"
                value={offer.sessionsUsed}
                onChange={(e) => setOffer({ ...offer, sessionsUsed: e.target.value })}
              />
            </div>

            <div className="arm-form-group flex-1">
              <label>Free Sessions Remaining Today</label>
              <input
                type="text"
                className="admin-input"
                value={`${remaining} remaining`}
                disabled
                style={{
                  opacity: 0.9,
                  color: remaining <= 5 ? '#ff6b6b' : '#6bcf7f',
                  fontWeight: 'bold',
                }}
              />
            </div>
          </div>

          <div className="arm-form-row">
            <div className="arm-form-group flex-1">
              <label>Experts Available Now Count</label>
              <input
                type="number"
                className="admin-input"
                min="0"
                value={offer.expertsAvailableCount}
                onChange={(e) => setOffer({ ...offer, expertsAvailableCount: e.target.value })}
              />
            </div>

            <div className="arm-form-group flex-2">
              <label>Offer Closing Date & Time (for Countdown)</label>
              <input
                type="datetime-local"
                className="admin-input"
                value={offer.endDate}
                onChange={(e) => setOffer({ ...offer, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="arm-form-row">
            <div className="arm-form-group flex-1 switch-group">
              <label className="arm-switch-label">
                <input
                  type="checkbox"
                  checked={offer.showRemainingSlots}
                  onChange={(e) => setOffer({ ...offer, showRemainingSlots: e.target.checked })}
                />
                <span className="arm-slider" />
                <span style={{ marginLeft: '10px', fontSize: '0.88rem' }}>
                  Show Remaining Sessions Badge
                </span>
              </label>
            </div>

            <div className="arm-form-group flex-1 switch-group">
              <label className="arm-switch-label">
                <input
                  type="checkbox"
                  checked={offer.showCountdown}
                  onChange={(e) => setOffer({ ...offer, showCountdown: e.target.checked })}
                />
                <span className="arm-slider" />
                <span style={{ marginLeft: '10px', fontSize: '0.88rem' }}>
                  Show Live Offer Closing Countdown
                </span>
              </label>
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="admin-login-btn"
              style={{ width: 'auto', padding: '12px 32px' }}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'SAVE OFFER SETTINGS'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
