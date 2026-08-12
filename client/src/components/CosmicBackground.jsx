import React from 'react'

export default function CosmicBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#FAF8FF',
      }}
    >
      {/* ============================================================
          LAYER 1 — NEBULA / GALAXY CLOUDS (Radial Gradient Overlays)
          ============================================================ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 15% 15%, rgba(145, 95, 255, 0.18) 0%, transparent 45%),
            radial-gradient(ellipse at 85% 20%, rgba(100, 140, 255, 0.15) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, rgba(210, 120, 220, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 75%, rgba(200, 155, 60, 0.10) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 85%, rgba(120, 90, 240, 0.16) 0%, transparent 45%)
          `,
          opacity: 0.9,
        }}
      />

      {/* ============================================================
          LAYER 2 — STAR FIELD (Programmatic SVG Stars)
          ============================================================ */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.85,
        }}
      >
        <defs>
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1px & 2px Tiny Twinkling Stars */}
        {[
          { cx: '8%', cy: '12%', r: 1.2, fill: '#6D4AFF', op: 0.7 },
          { cx: '18%', cy: '8%', r: 2.0, fill: '#C89B3C', op: 0.85, glow: true },
          { cx: '28%', cy: '22%', r: 1.0, fill: '#8B5CF6', op: 0.6 },
          { cx: '38%', cy: '14%', r: 1.5, fill: '#6D4AFF', op: 0.75 },
          { cx: '48%', cy: '6%', r: 2.2, fill: '#C89B3C', op: 0.9, glow: true },
          { cx: '58%', cy: '18%', r: 1.1, fill: '#4A29C7', op: 0.5 },
          { cx: '68%', cy: '10%', r: 1.8, fill: '#8B5CF6', op: 0.8 },
          { cx: '78%', cy: '25%', r: 2.5, fill: '#C89B3C', op: 0.95, glow: true },
          { cx: '88%', cy: '15%', r: 1.3, fill: '#6D4AFF', op: 0.7 },
          { cx: '94%', cy: '5%', r: 1.0, fill: '#8B5CF6', op: 0.6 },

          /* Middle Section Stars */
          { cx: '5%', cy: '42%', r: 1.8, fill: '#C89B3C', op: 0.8 },
          { cx: '14%', cy: '52%', r: 1.0, fill: '#6D4AFF', op: 0.6 },
          { cx: '25%', cy: '38%', r: 2.2, fill: '#8B5CF6', op: 0.85, glow: true },
          { cx: '35%', cy: '48%', r: 1.2, fill: '#4A29C7', op: 0.55 },
          { cx: '45%', cy: '58%', r: 1.6, fill: '#C89B3C', op: 0.75 },
          { cx: '55%', cy: '35%', r: 2.0, fill: '#6D4AFF', op: 0.9, glow: true },
          { cx: '65%', cy: '45%', r: 1.0, fill: '#8B5CF6', op: 0.6 },
          { cx: '75%', cy: '55%', r: 2.4, fill: '#C89B3C', op: 0.85, glow: true },
          { cx: '85%', cy: '40%', r: 1.4, fill: '#6D4AFF', op: 0.7 },
          { cx: '92%', cy: '50%', r: 1.8, fill: '#8B5CF6', op: 0.8 },

          /* Lower Section Stars */
          { cx: '10%', cy: '72%', r: 2.0, fill: '#C89B3C', op: 0.85, glow: true },
          { cx: '22%', cy: '85%', r: 1.2, fill: '#6D4AFF', op: 0.6 },
          { cx: '32%', cy: '68%', r: 1.5, fill: '#8B5CF6', op: 0.7 },
          { cx: '42%', cy: '82%', r: 2.2, fill: '#C89B3C', op: 0.9, glow: true },
          { cx: '52%', cy: '75%', r: 1.0, fill: '#4A29C7', op: 0.5 },
          { cx: '62%', cy: '88%', r: 1.7, fill: '#6D4AFF', op: 0.8 },
          { cx: '72%', cy: '65%', r: 2.0, fill: '#8B5CF6', op: 0.85 },
          { cx: '82%', cy: '78%', r: 1.3, fill: '#C89B3C', op: 0.75 },
          { cx: '90%', cy: '92%', r: 2.5, fill: '#6D4AFF', op: 0.9, glow: true },
        ].map((star, i) => (
          <circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill={star.fill}
            opacity={star.op}
            filter={star.glow ? 'url(#starGlow)' : undefined}
          />
        ))}
      </svg>

      {/* ============================================================
          LAYER 3 — CONSTELLATIONS (Line-art astronomy patterns)
          ============================================================ */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.25,
        }}
      >
        {/* Constellation 1 — Top Left (Cassiopeia inspired) */}
        <g stroke="var(--purple-500)" strokeWidth="0.75" fill="none">
          <polyline points="40,50 65,70 85,45 115,75 140,55" strokeDasharray="2 2" />
          <circle cx="40" cy="50" r="2.5" fill="var(--purple-500)" />
          <circle cx="65" cy="70" r="2" fill="var(--amber-500)" />
          <circle cx="85" cy="45" r="2.5" fill="var(--purple-500)" />
          <circle cx="115" cy="75" r="2" fill="var(--purple-500)" />
          <circle cx="140" cy="55" r="2.5" fill="var(--amber-500)" />
        </g>

        {/* Constellation 2 — Top Right (Ursa Major inspired) */}
        <g stroke="var(--amber-500)" strokeWidth="0.75" fill="none" transform="translate(850, 60)">
          <polyline points="0,40 30,35 60,45 90,50 110,30 140,25 130,55 90,50" strokeDasharray="2 2" />
          <circle cx="0" cy="40" r="2" fill="var(--purple-500)" />
          <circle cx="30" cy="35" r="2" fill="var(--amber-500)" />
          <circle cx="60" cy="45" r="2" fill="var(--purple-500)" />
          <circle cx="90" cy="50" r="2.5" fill="var(--amber-500)" />
          <circle cx="110" cy="30" r="2" fill="var(--purple-500)" />
          <circle cx="140" cy="25" r="2" fill="var(--amber-500)" />
          <circle cx="130" cy="55" r="2.5" fill="var(--purple-500)" />
        </g>

        {/* Constellation 3 — Bottom Left (Orion inspired) */}
        <g stroke="var(--purple-500)" strokeWidth="0.75" fill="none" transform="translate(60, 500)">
          <line x1="20" y1="20" x2="80" y2="25" strokeDasharray="2 2" />
          <line x1="80" y1="25" x2="70" y2="85" strokeDasharray="2 2" />
          <line x1="70" y1="85" x2="10" y2="80" strokeDasharray="2 2" />
          <line x1="10" y1="80" x2="20" y2="20" strokeDasharray="2 2" />
          {/* Belt */}
          <line x1="30" y1="52" x2="60" y2="52" stroke="var(--amber-500)" strokeWidth="1" />
          <circle cx="30" cy="52" r="2" fill="var(--amber-500)" />
          <circle cx="45" cy="52" r="2" fill="var(--purple-500)" />
          <circle cx="60" cy="52" r="2" fill="var(--amber-500)" />
          <circle cx="20" cy="20" r="2.5" fill="var(--purple-500)" />
          <circle cx="80" cy="25" r="2.5" fill="var(--purple-500)" />
          <circle cx="70" cy="85" r="2.5" fill="var(--amber-500)" />
          <circle cx="10" cy="80" r="2.5" fill="var(--purple-500)" />
        </g>
      </svg>

      {/* ============================================================
          LAYER 4 — ZODIAC WHEELS & CELESTIAL CIRCLES
          ============================================================ */}
      {/* Top Hero Zodiac Wheel */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '560px',
          height: '560px',
          opacity: 0.12,
          pointerEvents: 'none',
          animation: 'spin-slow 75s linear infinite',
        }}
      >
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          <circle cx="100" cy="100" r="95" stroke="#6D4AFF" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="82" stroke="#C89B3C" strokeWidth="0.6" fill="none" />
          <circle cx="100" cy="100" r="65" stroke="#6D4AFF" strokeWidth="0.6" fill="none" strokeDasharray="2 2" />
          <circle cx="100" cy="100" r="45" stroke="#C89B3C" strokeWidth="0.4" fill="none" />
          <text x="100" y="14" fill="#6D4AFF" fontSize="7.5" textAnchor="middle" fontWeight="bold">
            ♈  ♉  ♊  ♋  ♌  ♍  ♎  ♏  ♐  ♑  ♒  ♓
          </text>
        </svg>
      </div>

      {/* Bottom Footer Celestial Circle */}
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-100px',
          width: '500px',
          height: '500px',
          opacity: 0.10,
          pointerEvents: 'none',
          animation: 'spin-slow 90s linear infinite reverse',
        }}
      >
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          <circle cx="100" cy="100" r="95" stroke="#C89B3C" strokeWidth="0.8" fill="none" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="75" stroke="#6D4AFF" strokeWidth="0.6" fill="none" />
          <text x="100" y="16" fill="#C89B3C" fontSize="7" textAnchor="middle" fontWeight="bold">
            ✨ ASTROLOGY · COSMOS · NOVASATHI · GUIDANCE ✨
          </text>
        </svg>
      </div>

      {/* ============================================================
          LAYER 5 — PLANETS (Saturn & Celestial Moon)
          ============================================================ */}
      {/* Top Right Ringed Saturn Planet */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '5%',
          width: '44px',
          height: '44px',
          opacity: 0.85,
        }}
      >
        <svg viewBox="0 0 60 60" width="100%" height="100%">
          {/* Planet Body */}
          <circle cx="30" cy="30" r="14" fill="url(#saturnGradient)" />
          {/* Ring */}
          <ellipse cx="30" cy="30" rx="26" ry="6" stroke="rgba(200, 155, 60, 0.7)" strokeWidth="2" fill="none" transform="rotate(-20, 30, 30)" />
          <defs>
            <radialGradient id="saturnGradient" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#D6B56A" />
              <stop offset="60%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#4A29C7" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Middle Left Celestial Crescent Moon */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: '3%',
          width: '36px',
          height: '36px',
          opacity: 0.75,
        }}
      >
        <svg viewBox="0 0 40 40" width="100%" height="100%">
          <path d="M 22 4 A 14 14 0 1 0 36 28 A 12 12 0 1 1 22 4 Z" fill="url(#moonGradient)" />
          <defs>
            <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C89B3C" />
              <stop offset="100%" stopColor="#6D4AFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ============================================================
          LAYER 6 — ORBIT LINES (Elliptical Celestial System Strokes)
          ============================================================ */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.12,
        }}
      >
        <ellipse cx="50%" cy="30%" rx="600" ry="220" stroke="#6D4AFF" strokeWidth="1" fill="none" strokeDasharray="6 4" transform="rotate(-12, 600, 300)" />
        <ellipse cx="50%" cy="70%" rx="700" ry="260" stroke="#C89B3C" strokeWidth="0.8" fill="none" strokeDasharray="4 4" transform="rotate(8, 600, 700)" />
      </svg>

      {/* ============================================================
          LAYER 7 — SHOOTING STAR ANIMATED PARTICLES
          ============================================================ */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '60%',
          width: '120px',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(200, 155, 60, 0.8), transparent)',
          transform: 'rotate(-35deg)',
          opacity: 0.6,
          boxShadow: '0 0 8px rgba(200, 155, 60, 0.6)',
          animation: 'shooting-star 8s linear infinite',
        }}
      />

      <style>{`
        @keyframes shooting-star {
          0% { transform: translate(0, 0) rotate(-35deg); opacity: 0; }
          10% { opacity: 0.8; }
          20% { transform: translate(-220px, 150px) rotate(-35deg); opacity: 0; }
          100% { transform: translate(-220px, 150px) rotate(-35deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
