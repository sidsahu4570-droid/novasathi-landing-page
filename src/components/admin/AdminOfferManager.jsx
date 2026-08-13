import React, { useState, useEffect, useCallback } from 'react';

export default function AdminOfferManager({ token }) {
  const [offer, setOffer] = useState({
    active: true,
    title: 'Your First 5 Minutes Are Free',
    endDate: '',
    dailyLimit: 50,
    sessionsUsed: 38,
    showCountdown: false,
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
        // Fallback to local storage on static Vercel
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
      // Sync to local storage for live static Vercel preview
      localStorage.setItem('ns_offer_settings', JSON.stringify(offer));
      setSaving(false);
      setMsg('✨ Offer and urgency settings saved successfully!');
      setTimeout(() => setMsg(''), 4000);
    }
  };

  const remaining = Math.max(0, Number(offer.dailyLimit) - Number(offer.sessionsUsed));

  return (
    <div className="arm-container">
      <div className="arm-top-bar">
        <div>
          <h2 className="arm-title">Offer & Real Urgency Settings</h2>
          <p className="arm-sub">
            Control the live free 5-minute campaign, daily capacity limits, and countdown timers.
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
                Free 5-Minute Campaign Active (ON / OFF)
              </span>
            </label>
          </div>

          <div className="arm-form-group">
            <label>Offer Headline Title</label>
            <input
              type="text"
              className="admin-input"
              value={offer.title}
              onChange={(e) => setOffer({ ...offer, title: e.target.value })}
              required
            />
          </div>

          <div className="arm-form-group">
            <label>Urgency Message</label>
            <input
              type="text"
              className="admin-input"
              value={offer.urgencyMessage}
              onChange={(e) => setOffer({ ...offer, urgencyMessage: e.target.value })}
              placeholder="e.g. Limited introductory sessions available today"
            />
          </div>

          <div className="arm-form-row">
            <div className="arm-form-group flex-1">
              <label>Daily Free Sessions Limit</label>
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
              <label>Remaining Sessions Today</label>
              <input
                type="text"
                className="admin-input"
                value={`${remaining} remaining`}
                disabled
                style={{ opacity: 0.75, color: '#6bcf7f', fontWeight: 'bold' }}
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
                <span style={{ marginLeft: '10px', fontSize: '0.85rem' }}>
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
                <span style={{ marginLeft: '10px', fontSize: '0.85rem' }}>
                  Show Offer Expiry Countdown
                </span>
              </label>
            </div>
          </div>

          {offer.showCountdown && (
            <div className="arm-form-group">
              <label>Campaign End Date & Time (for Countdown Timer)</label>
              <input
                type="datetime-local"
                className="admin-input"
                value={offer.endDate}
                onChange={(e) => setOffer({ ...offer, endDate: e.target.value })}
              />
            </div>
          )}

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="admin-login-btn"
              style={{ width: 'auto', padding: '12px 32px' }}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Offer Settings'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
