import React, { useState, useEffect, useCallback, useRef } from 'react';
import AdminLogin from './AdminLogin';
import AdminReviewsManager from './AdminReviewsManager';
import './admin.css';

const STATUS_LABELS = {
  pending: '🟡 Pending',
  called: '🔵 Called',
  connected: '🟣 Connected',
  no_answer: '🔴 No Answer',
  completed: '🟢 Completed',
  cancelled: '⚫ Cancelled',
};

const STATUS_ACTIONS = [
  { key: 'called', label: '📞 Mark Called', cls: 'action-called' },
  { key: 'connected', label: '🔗 Connected', cls: 'action-connected' },
  { key: 'no_answer', label: '📵 No Answer', cls: 'action-no_answer' },
  { key: 'completed', label: '✅ Completed', cls: 'action-completed' },
  { key: 'cancelled', label: '✕ Cancel', cls: 'action-cancelled' },
];

const POLL_INTERVAL = 15000; // 15 seconds

function formatTime(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// ── Individual Request Card ─────────────────────────────────────────────────
function RequestCard({ item, token, onStatusUpdate }) {
  const [notes, setNotes] = useState(item.adminNotes || '');
  const [savedNotes, setSavedNotes] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);

  const authHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === item.status) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/consultations/${item._id}/status`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        onStatusUpdate(item._id, data.consultation);
      }
    } catch (err) {
      console.error('Status update error:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/consultations/${item._id}/notes`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ adminNotes: notes }),
      });
      if (res.ok) {
        setSavedNotes(true);
        setTimeout(() => setSavedNotes(false), 2000);
      }
    } catch (err) {
      console.error('Notes save error:', err);
    } finally {
      setSavingNotes(false);
    }
  };

  return (
    <div className={`admin-request-card status-${item.status}`}>
      {/* Top Row */}
      <div className="admin-request-top">
        <div>
          <a
            href={`tel:+91${item.phone}`}
            className="admin-request-phone"
            title="Click to call"
          >
            📞 +91 {item.phone}
          </a>
          <div className="admin-request-meta">
            <span className="admin-badge admin-badge-topic">{item.topic}</span>
            <span className="admin-badge admin-badge-mode">
              {item.mode === 'Chat' ? '💬' : item.mode === 'Call' ? '📞' : '📹'} {item.mode}
            </span>
            <span className={`admin-badge admin-badge-status ${item.status}`}>
              {STATUS_LABELS[item.status] || item.status}
            </span>
          </div>
        </div>
        <span className="admin-request-time">{formatTime(item.createdAt)}</span>
      </div>

      {/* Status Action Buttons */}
      <div className="admin-actions">
        {STATUS_ACTIONS.map((action) => (
          <button
            key={action.key}
            className={`admin-action-btn ${action.cls}`}
            onClick={() => handleStatusChange(action.key)}
            disabled={updatingStatus || item.status === action.key}
            title={`Mark as ${action.key}`}
          >
            {updatingStatus && item.status !== action.key ? '...' : action.label}
          </button>
        ))}
      </div>

      {/* Admin Notes */}
      <div className="admin-notes-area">
        <textarea
          className="admin-notes-input"
          placeholder="Add internal notes (e.g. — tried twice, no response)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={1}
          maxLength={500}
        />
        <button
          className={`admin-save-notes-btn ${savedNotes ? 'saved' : ''}`}
          onClick={handleSaveNotes}
          disabled={savingNotes}
        >
          {savedNotes ? '✓ Saved' : savingNotes ? '...' : 'Save Note'}
        </button>
      </div>
    </div>
  );
}

// ── Admin Panel Root ────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [token, setToken] = useState(() => localStorage.getItem('ns_admin_token') || '');
  const [activeTab, setActiveTab] = useState('consultations'); // 'consultations' | 'reviews'
  const [consultations, setConsultations] = useState([]);
  const [stats, setStats] = useState({ pending: 0, called: 0, connected: 0, no_answer: 0, completed: 0, cancelled: 0 });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [lastFetch, setLastFetch] = useState(null);
  const pollRef = useRef(null);

  const authHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }), [token]);

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const [listRes, statsRes] = await Promise.all([
        fetch(filter !== 'all' ? `/api/consultations?status=${filter}` : '/api/consultations', {
          headers: authHeaders(),
        }),
        fetch('/api/consultations/stats', { headers: authHeaders() }),
      ]);

      if (listRes.status === 401 || listRes.status === 403) {
        handleLogout();
        return;
      }

      if (listRes.ok && (listRes.headers.get('content-type') || '').includes('application/json')) {
        const list = await listRes.json();
        setConsultations(list);
        setLastFetch(new Date());
      }
      if (statsRes.ok && (statsRes.headers.get('content-type') || '').includes('application/json')) {
        const s = await statsRes.json();
        setStats(s);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }, [token, filter, authHeaders]);

  // Initial load + polling
  useEffect(() => {
    if (!token || activeTab !== 'consultations') return;
    setLoading(true);
    fetchData().finally(() => setLoading(false));

    pollRef.current = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(pollRef.current);
  }, [token, filter, activeTab, fetchData]);

  const handleLogin = (newToken) => setToken(newToken);

  const handleLogout = () => {
    localStorage.removeItem('ns_admin_token');
    setToken('');
    clearInterval(pollRef.current);
  };

  const handleStatusUpdate = (id, updated) => {
    setConsultations((prev) =>
      prev.map((c) => (c._id === id ? { ...c, ...updated } : c))
    );
    fetchData();
  };

  if (!token) return <AdminLogin onLogin={handleLogin} />;

  const FILTERS = [
    { key: 'all', label: `All (${Object.values(stats).reduce((a, b) => a + b, 0)})` },
    { key: 'pending', label: `🟡 Pending (${stats.pending})` },
    { key: 'called', label: `🔵 Called (${stats.called})` },
    { key: 'connected', label: `🟣 Connected (${stats.connected})` },
    { key: 'no_answer', label: `🔴 No Answer (${stats.no_answer})` },
    { key: 'completed', label: `🟢 Completed (${stats.completed})` },
  ];

  return (
    <div className="admin-root">
      {/* ── Header ── */}
      <header className="admin-header">
        <div className="admin-header-left">
          <img src="/logo.jpg" alt="NovaSathi" />
          <div>
            <p className="admin-header-title">NovaSathi Admin</p>
            <div className="admin-nav-tabs">
              <button
                className={`admin-nav-tab ${activeTab === 'consultations' ? 'active' : ''}`}
                onClick={() => setActiveTab('consultations')}
              >
                📞 Consultations {stats.pending > 0 && `(${stats.pending})`}
              </button>
              <button
                className={`admin-nav-tab ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                🎥 Review Videos
              </button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {stats.pending > 0 && activeTab === 'consultations' && (
            <span className="admin-new-badge">
              🔔 {stats.pending} Pending
            </span>
          )}
          <button className="admin-logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </header>

      {/* ── Main Section ── */}
      <main className="admin-main">
        {activeTab === 'reviews' ? (
          <AdminReviewsManager token={token} />
        ) : (
          <>
            {/* Stats Bar */}
            <div className="admin-stats-bar">
              {[
                { label: 'Pending', count: stats.pending, color: '#ffd166' },
                { label: 'Called', count: stats.called, color: '#74b9ff' },
                { label: 'Connected', count: stats.connected, color: '#a29bfe' },
                { label: 'No Answer', count: stats.no_answer, color: '#ff6b6b' },
                { label: 'Completed', count: stats.completed, color: '#6bcf7f' },
                { label: 'Cancelled', count: stats.cancelled, color: 'rgba(255,255,255,0.4)' },
              ].map((s) => (
                <div key={s.label} className="admin-stat-card">
                  <div className="admin-stat-count" style={{ color: s.color }}>{s.count}</div>
                  <div className="admin-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filter Tabs */}
            <div className="admin-filter-bar">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`admin-filter-tab ${filter === f.key ? 'active' : ''}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
              <span className="admin-refresh-info">
                {lastFetch ? `Updated ${formatTime(lastFetch.toISOString())}` : 'Loading...'}
              </span>
            </div>

            {/* Request List */}
            {loading ? (
              <div className="admin-empty">
                <div className="admin-empty-icon">⏳</div>
                <div className="admin-empty-title">Loading requests...</div>
              </div>
            ) : consultations.length === 0 ? (
              <div className="admin-empty">
                <div className="admin-empty-icon">🌌</div>
                <div className="admin-empty-title">No consultation requests yet</div>
                <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                  {filter !== 'all'
                    ? `No requests with status "${filter}".`
                    : 'Requests will appear here once users submit from the landing page.'}
                </p>
              </div>
            ) : (
              <div className="admin-requests-list">
                {consultations.map((item) => (
                  <RequestCard
                    key={item._id}
                    item={item}
                    token={token}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

