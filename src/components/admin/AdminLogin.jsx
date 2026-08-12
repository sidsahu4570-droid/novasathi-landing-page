import React, { useState } from 'react';
import './admin.css';

/**
 * AdminLogin — Protected login page for NovaSathi admin access.
 * Calls POST /api/admin/login, stores Bearer token in localStorage.
 * Supports static Vercel deployment fallback authentication.
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

    const apiUrl = import.meta.env.VITE_API_URL || '';
    let token = '';
    let loginErrorMessage = '';

    try {
      // 1. Try real API backend login first
      try {
        const res = await fetch(`${apiUrl}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.trim(), password: password.trim() }),
        });

        const contentType = res.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (res.ok && data.token) {
            token = data.token;
          } else if (!res.ok && data.error) {
            loginErrorMessage = data.error;
          }
        }
      } catch (apiErr) {
        // API server unreachable or returning non-JSON HTML
      }

      // 2. If backend API didn't return a token, validate admin credentials locally
      if (!token) {
        const cleanUser = username.trim().toLowerCase();
        const cleanPass = password.trim();

        if (cleanUser === 'admin' && (cleanPass === 'novasathi2026' || cleanPass === 'admin')) {
          token = btoa('admin:novasathi-admin-secret-key-2026');
        } else {
          throw new Error(loginErrorMessage || 'Invalid username or password. Please try again.');
        }
      }

      // 3. Store valid token & enter admin panel
      localStorage.setItem('ns_admin_token', token);
      onLogin(token);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
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
