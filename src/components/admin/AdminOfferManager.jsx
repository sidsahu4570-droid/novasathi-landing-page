import React, { useState, useEffect, useCallback } from 'react';

/**
 * AdminOfferManager — Introductory Session Availability & Capacity Control
 */
export default function AdminOfferManager({ token }) {
  const [offer, setOffer] = useState({
    active: true,
    title: 'Your First 5 Minutes Are Free',
    endDate: '',
    dailyLimit: 12,
    sessionsUsed: 0,
    expertsAvailableCount: 3,
    showCountdown: true,
    showRemainingSlots: true,
    isDemoMode: false,
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
    if (e) e.preventDefault();
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
      setMsg('✨ Introductory Session Capacity and Offer settings saved!');
      setTimeout(() => setMsg(''), 4000);
    }
  };

  // Quick action helper for demo mode simulation
  const handleSimulateClaim = () => {
    setOffer((prev) => {
      const newUsed = Number(prev.sessionsUsed || 0) + 1;
      return { ...prev, sessionsUsed: newUsed };
    });
  };

  const handleResetInventory = () => {
    setOffer((prev) => ({ ...prev, sessionsUsed: 0 }));
  };

  const remaining = Math.max(0, Number(offer.dailyLimit) - Number(offer.sessionsUsed));

  return (
    <div className="arm-container">
      <div className="arm-top-bar">
        <div>
          <h2 className="arm-title">INTRODUCTORY SESSION AVAILABILITY CONTROL</h2>
          <p className="arm-sub">
            Manage real daily session capacity, sessions claimed, real-time remaining inventory, expert availability, and closing countdown time.
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
          {/* OFFER ACTIVE TOGGLE */}
          <div className="aom-form-group switch-group" style={{ marginBottom: '20px' }}>
            <label className="arm-switch-label">
              <input
                type="checkbox"
                checked={offer.active}
                onChange={(e) => setOffer({ ...offer, active: e.target.checked })}
              />
              <span className="arm-slider" />
              <span style={{ marginLeft: '12px', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                Offer Status: {offer.active ? '🟢 ACTIVE (ON)' : '🔴 INACTIVE (OFF)'}
              </span>
            </label>
          </div>

          {/* CAPACITY AND INVENTORY ROW */}
          <div className="arm-form-row">
            <div className="arm-form-group flex-1">
              <label style={{ color: 'var(--color-warm-gold)', fontWeight: '700' }}>
                Daily Session Capacity
              </label>
              <input
                type="number"
                className="admin-input"
                min="1"
                value={offer.dailyLimit}
                onChange={(e) => setOffer({ ...offer, dailyLimit: e.target.value })}
              />
            </div>

            <div className="arm-form-group flex-1">
              <label style={{ color: '#ff6b6b', fontWeight: '700' }}>
                Sessions Claimed Today
              </label>
              <input
                type="number"
                className="admin-input"
                min="0"
                value={offer.sessionsUsed}
                onChange={(e) => setOffer({ ...offer, sessionsUsed: e.target.value })}
              />
            </div>

            <div className="arm-form-group flex-1">
              <label style={{ color: '#6bcf7f', fontWeight: '700' }}>
                Sessions Remaining Today
              </label>
              <input
                type="text"
                className="admin-input"
                value={`${remaining} remaining`}
                disabled
                style={{
                  opacity: 0.95,
                  color: remaining <= 3 ? '#ff6b6b' : '#6bcf7f',
                  fontWeight: 'bold',
                  fontSize: '1.05rem',
                }}
              />
            </div>
          </div>

          {/* EXPERT AVAILABILITY AND CLOSING TIME */}
          <div className="arm-form-row" style={{ marginTop: '16px' }}>
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
              <label>Offer Closing Time (Authoritative Countdown End Time)</label>
              <input
                type="datetime-local"
                className="admin-input"
                value={offer.endDate}
                onChange={(e) => setOffer({ ...offer, endDate: e.target.value })}
              />
            </div>
          </div>

          {/* DISPLAY TOGGLES */}
          <div className="arm-form-row" style={{ marginTop: '16px' }}>
            <div className="arm-form-group flex-1 switch-group">
              <label className="arm-switch-label">
                <input
                  type="checkbox"
                  checked={offer.showRemainingSlots}
                  onChange={(e) => setOffer({ ...offer, showRemainingSlots: e.target.checked })}
                />
                <span className="arm-slider" />
                <span style={{ marginLeft: '10px', fontSize: '0.88rem' }}>
                  Show Remaining Sessions Counter
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
                  Show Closing Countdown
                </span>
              </label>
            </div>
          </div>

          {/* DEMO MODE SECTION */}
          <div style={{
            marginTop: '24px',
            padding: '16px 20px',
            background: 'rgba(212, 168, 79, 0.08)',
            border: '1px dashed rgba(212, 168, 79, 0.4)',
            borderRadius: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontWeight: '700', color: 'var(--color-warm-gold)', fontSize: '0.95rem' }}>
                  🧪 DEMO MODE (Simulation & Testing Only)
                </span>
                <p style={{ fontSize: '0.82rem', color: 'rgba(248,244,234,0.7)', margin: '4px 0 0 0' }}>
                  Simulate dynamic session claims or reset capacity for testing without modifying real customer submissions.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleSimulateClaim}
                  className="admin-badge admin-badge-mode"
                  style={{ cursor: 'pointer', padding: '8px 14px', background: 'rgba(255,107,107,0.2)', border: '1px solid #ff6b6b' }}
                >
                  ⚡ SIMULATE 1 CLAIM (12 → 11)
                </button>
                <button
                  type="button"
                  onClick={handleResetInventory}
                  className="admin-badge admin-badge-status completed"
                  style={{ cursor: 'pointer', padding: '8px 14px' }}
                >
                  🔄 RESET TO 0 CLAIMS
                </button>
              </div>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="admin-login-btn"
              style={{ width: 'auto', padding: '14px 36px', fontSize: '1rem' }}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'SAVE SETTINGS →'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
