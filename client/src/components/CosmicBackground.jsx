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
          LAYER 1 & 2 — REALISTIC NEBULA CLOUDS & DEEP COSMIC SPACE
          ============================================================ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 12%, rgba(109, 74, 255, 0.22) 0%, transparent 45%),
            radial-gradient(ellipse at 85% 18%, rgba(200, 155, 60, 0.18) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 45%, rgba(183, 156, 255, 0.18) 0%, transparent 50%),
            radial-gradient(ellipse at 15% 72%, rgba(200, 155, 60, 0.14) 0%, transparent 40%),
            radial-gradient(ellipse at 85% 85%, rgba(109, 74, 255, 0.20) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 90%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
          `,
          opacity: 0.95,
        }}
      />

      {/* ============================================================
          LAYER 3 — DENSE STAR FIELD (Programmatic SVG Star Grid)
          ============================================================ */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.90,
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

        {/* 1px, 1.5px, 2px & 3px Twinkling Stars */}
        {[
          { cx: '5%', cy: '8%', r: 1.2, fill: '#6D4AFF', op: 0.75 },
          { cx: '12%', cy: '15%', r: 2.2, fill: '#C89B3C', op: 0.9, glow: true },
          { cx: '22%', cy: '6%', r: 1.0, fill: '#8B5CF6', op: 0.6 },
          { cx: '32%', cy: '20%', r: 1.6, fill: '#6D4AFF', op: 0.8 },
          { cx: '42%', cy: '10%', r: 2.5, fill: '#C89B3C', op: 0.95, glow: true },
          { cx: '52%', cy: '24%', r: 1.1, fill: '#4A29C7', op: 0.55 },
          { cx: '62%', cy: '8%', r: 1.8, fill: '#8B5CF6', op: 0.8 },
          { cx: '72%', cy: '18%', r: 2.8, fill: '#C89B3C', op: 0.95, glow: true },
          { cx: '82%', cy: '12%', r: 1.4, fill: '#6D4AFF', op: 0.75 },
          { cx: '92%', cy: '22%', r: 1.0, fill: '#8B5CF6', op: 0.6 },

          /* Middle Viewport Stars */
          { cx: '4%', cy: '38%', r: 2.0, fill: '#C89B3C', op: 0.85, glow: true },
          { cx: '15%', cy: '48%', r: 1.2, fill: '#6D4AFF', op: 0.65 },
          { cx: '26%', cy: '34%', r: 2.4, fill: '#8B5CF6', op: 0.9, glow: true },
          { cx: '36%', cy: '44%', r: 1.0, fill: '#4A29C7', op: 0.5 },
          { cx: '46%', cy: '54%', r: 1.8, fill: '#C89B3C', op: 0.8 },
          { cx: '56%', cy: '32%', r: 2.2, fill: '#6D4AFF', op: 0.95, glow: true },
          { cx: '66%', cy: '42%', r: 1.2, fill: '#8B5CF6', op: 0.6 },
          { cx: '76%', cy: '52%', r: 2.6, fill: '#C89B3C', op: 0.9, glow: true },
          { cx: '86%', cy: '36%', r: 1.5, fill: '#6D4AFF', op: 0.75 },
          { cx: '95%', cy: '46%', r: 1.8, fill: '#8B5CF6', op: 0.8 },

          /* Lower Viewport Stars */
          { cx: '8%', cy: '68%', r: 2.2, fill: '#C89B3C', op: 0.9, glow: true },
          { cx: '18%', cy: '82%', r: 1.2, fill: '#6D4AFF', op: 0.65 },
          { cx: '28%', cy: '64%', r: 1.6, fill: '#8B5CF6', op: 0.75 },
          { cx: '38%', cy: '78%', r: 2.4, fill: '#C89B3C', op: 0.9, glow: true },
          { cx: '48%', cy: '72%', r: 1.0, fill: '#4A29C7', op: 0.5 },
          { cx: '58%', cy: '85%', r: 1.8, fill: '#6D4AFF', op: 0.85 },
          { cx: '68%', cy: '62%', r: 2.2, fill: '#8B5CF6', op: 0.85, glow: true },
          { cx: '78%', cy: '76%', r: 1.4, fill: '#C89B3C', op: 0.8 },
          { cx: '88%', cy: '90%', r: 2.8, fill: '#6D4AFF', op: 0.95, glow: true },
          { cx: '96%', cy: '66%', r: 1.2, fill: '#8B5CF6', op: 0.6 },
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
          LAYER 4 — CONSTELLATIONS (Line-art astronomy patterns)
          ============================================================ */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.28,
        }}
      >
        {/* Constellation 1 — Top Left */}
        <g stroke="#6D4AFF" strokeWidth="0.8" fill="none">
          <polyline points="40,50 65,70 85,45 115,75 140,55" strokeDasharray="2 2" />
          <circle cx="40" cy="50" r="2.5" fill="#6D4AFF" />
          <circle cx="65" cy="70" r="2" fill="#C89B3C" />
          <circle cx="85" cy="45" r="2.5" fill="#6D4AFF" />
          <circle cx="115" cy="75" r="2" fill="#6D4AFF" />
          <circle cx="140" cy="55" r="2.5" fill="#C89B3C" />
        </g>

        {/* Constellation 2 — Top Right */}
        <g stroke="#C89B3C" strokeWidth="0.8" fill="none" transform="translate(850, 50)">
          <polyline points="0,40 30,35 60,45 90,50 110,30 140,25 130,55 90,50" strokeDasharray="2 2" />
          <circle cx="0" cy="40" r="2" fill="#6D4AFF" />
          <circle cx="30" cy="35" r="2" fill="#C89B3C" />
          <circle cx="60" cy="45" r="2" fill="#6D4AFF" />
          <circle cx="90" cy="50" r="2.5" fill="#C89B3C" />
          <circle cx="110" cy="30" r="2" fill="#6D4AFF" />
          <circle cx="140" cy="25" r="2" fill="#C89B3C" />
          <circle cx="130" cy="55" r="2.5" fill="#6D4AFF" />
        </g>

        {/* Constellation 3 — Bottom Left */}
        <g stroke="#6D4AFF" strokeWidth="0.8" fill="none" transform="translate(50, 480)">
          <line x1="20" y1="20" x2="80" y2="25" strokeDasharray="2 2" />
          <line x1="80" y1="25" x2="70" y2="85" strokeDasharray="2 2" />
          <line x1="70" y1="85" x2="10" y2="80" strokeDasharray="2 2" />
          <line x1="10" y1="80" x2="20" y2="20" strokeDasharray="2 2" />
          <line x1="30" y1="52" x2="60" y2="52" stroke="#C89B3C" strokeWidth="1" />
          <circle cx="30" cy="52" r="2" fill="#C89B3C" />
          <circle cx="45" cy="52" r="2" fill="#6D4AFF" />
          <circle cx="60" cy="52" r="2" fill="#C89B3C" />
          <circle cx="20" cy="20" r="2.5" fill="#6D4AFF" />
          <circle cx="80" cy="25" r="2.5" fill="#6D4AFF" />
          <circle cx="70" cy="85" r="2.5" fill="#C89B3C" />
          <circle cx="10" cy="80" r="2.5" fill="#6D4AFF" />
        </g>
      </svg>

      {/* ============================================================
          LAYER 5 — ZODIAC WHEELS & CELESTIAL CIRCLES
          ============================================================ */}
      {/* Hero Zodiac Wheel */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '560px',
          height: '560px',
          opacity: 0.14,
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

      {/* Footer Celestial Circle */}
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-100px',
          width: '500px',
          height: '500px',
          opacity: 0.12,
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
          LAYER 6 — REALISTIC EDGE PLANETS (Saturn, Gas Giant & Crescent Moon)
          ============================================================ */}
      {/* Top Right Saturn Ringed Planet */}
      <div
        style={{
          position: 'absolute',
          top: '6%',
          right: '4%',
          width: '52px',
          height: '52px',
          opacity: 0.88,
        }}
      >
        <svg viewBox="0 0 60 60" width="100%" height="100%">
          <circle cx="30" cy="30" r="15" fill="url(#saturnGrad)" />
          <ellipse cx="30" cy="30" rx="28" ry="7" stroke="rgba(200, 155, 60, 0.75)" strokeWidth="2.2" fill="none" transform="rotate(-20, 30, 30)" />
          <defs>
            <radialGradient id="saturnGrad" cx="35%" cy="35%" r="65%">
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
          top: '46%',
          left: '2%',
          width: '40px',
          height: '40px',
          opacity: 0.80,
        }}
      >
        <svg viewBox="0 0 40 40" width="100%" height="100%">
          <path d="M 22 4 A 14 14 0 1 0 36 28 A 12 12 0 1 1 22 4 Z" fill="url(#moonGrad)" />
          <defs>
            <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C89B3C" />
              <stop offset="100%" stopColor="#6D4AFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Middle Right Purple Gas Giant */}
      <div
        style={{
          position: 'absolute',
          top: '65%',
          right: '3%',
          width: '38px',
          height: '38px',
          opacity: 0.80,
        }}
      >
        <svg viewBox="0 0 40 40" width="100%" height="100%">
          <circle cx="20" cy="20" r="16" fill="url(#gasGiantGrad)" />
          <defs>
            <radialGradient id="gasGiantGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#B79CFF" />
              <stop offset="70%" stopColor="#6D4AFF" />
              <stop offset="100%" stopColor="#171044" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* ============================================================
          LAYER 7 — ORBIT LINES (Elliptical Celestial Strokes)
          ============================================================ */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.14,
        }}
      >
        <ellipse cx="50%" cy="28%" rx="620" ry="230" stroke="#6D4AFF" strokeWidth="1" fill="none" strokeDasharray="6 4" transform="rotate(-12, 620, 280)" />
        <ellipse cx="50%" cy="72%" rx="720" ry="270" stroke="#C89B3C" strokeWidth="0.8" fill="none" strokeDasharray="4 4" transform="rotate(8, 720, 720)" />
      </svg>

      {/* ============================================================
          LAYER 8 — SHOOTING STAR PARTICLES
          ============================================================ */}
      <div
        style={{
          position: 'absolute',
          top: '16%',
          left: '58%',
          width: '130px',
          height: '1.5px',
          background: 'linear-gradient(90deg, rgba(200, 155, 60, 0.9), transparent)',
          transform: 'rotate(-35deg)',
          opacity: 0.7,
          boxShadow: '0 0 10px rgba(200, 155, 60, 0.7)',
          animation: 'shooting-star 7s linear infinite',
        }}
      />

      <style>{`
        @keyframes shooting-star {
          0% { transform: translate(0, 0) rotate(-35deg); opacity: 0; }
          10% { opacity: 0.85; }
          20% { transform: translate(-240px, 160px) rotate(-35deg); opacity: 0; }
          100% { transform: translate(-240px, 160px) rotate(-35deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
