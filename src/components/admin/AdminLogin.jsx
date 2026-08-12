import React, { useState } from 'react';
import './admin.css';

/**
 * AdminLogin — Protected login page for NovaSathi admin access.
 * Calls POST /api/admin/login, stores Bearer token in localStorage.
 */
export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials. Please try again.');
      }

      // Store token and notify parent
      localStorage.setItem('ns_admin_token', data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-root admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <img src="/logo.jpg" alt="NovaSathi" />
          <div>
            <p className="admin-login-title">NovaSathi</p>
            <p className="admin-login-sub">Admin Panel</p>
          </div>
        </div>

        {error && <div className="admin-error-box">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-input-group">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              className="admin-input"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-input-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              className="admin-input"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading || !username || !password}
          >
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}
