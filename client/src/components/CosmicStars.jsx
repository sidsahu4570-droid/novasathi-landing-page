import React from 'react'

const STARS_DATA = [
  // Top Region Stars
  { cx: '4%', cy: '6%', r: 1.2, fill: '#6D4AFF', op: 0.7, pulse: true },
  { cx: '12%', cy: '14%', r: 2.2, fill: '#C89B3C', op: 0.85, glow: true },
  { cx: '24%', cy: '8%', r: 1.0, fill: '#8B5CF6', op: 0.6 },
  { cx: '34%', cy: '18%', r: 1.6, fill: '#6D4AFF', op: 0.75 },
  { cx: '44%', cy: '7%', r: 2.5, fill: '#C89B3C', op: 0.9, glow: true, pulse: true },
  { cx: '54%', cy: '22%', r: 1.1, fill: '#4A29C7', op: 0.55 },
  { cx: '64%', cy: '9%', r: 1.8, fill: '#8B5CF6', op: 0.8 },
  { cx: '74%', cy: '16%', r: 2.8, fill: '#C89B3C', op: 0.95, glow: true },
  { cx: '84%', cy: '11%', r: 1.4, fill: '#6D4AFF', op: 0.75 },
  { cx: '94%', cy: '20%', r: 1.0, fill: '#8B5CF6', op: 0.6 },
  { cx: '18%', cy: '25%', r: 1.5, fill: '#6D4AFF', op: 0.6 },
  { cx: '28%', cy: '30%', r: 2.0, fill: '#C89B3C', op: 0.8, pulse: true },

  // Middle Region Stars
  { cx: '6%', cy: '36%', r: 2.0, fill: '#C89B3C', op: 0.8, glow: true },
  { cx: '16%', cy: '44%', r: 1.2, fill: '#6D4AFF', op: 0.6 },
  { cx: '28%', cy: '38%', r: 2.4, fill: '#8B5CF6', op: 0.85, glow: true, pulse: true },
  { cx: '38%', cy: '48%', r: 1.0, fill: '#4A29C7', op: 0.5 },
  { cx: '48%', cy: '35%', r: 1.8, fill: '#C89B3C', op: 0.75 },
  { cx: '58%', cy: '46%', r: 2.2, fill: '#6D4AFF', op: 0.9, glow: true },
  { cx: '68%', cy: '39%', r: 1.2, fill: '#8B5CF6', op: 0.6 },
  { cx: '78%', cy: '49%', r: 2.6, fill: '#C89B3C', op: 0.85, glow: true, pulse: true },
  { cx: '88%', cy: '37%', r: 1.5, fill: '#6D4AFF', op: 0.7 },
  { cx: '96%', cy: '45%', r: 1.8, fill: '#8B5CF6', op: 0.8 },

  // Lower Region Stars
  { cx: '8%', cy: '62%', r: 2.2, fill: '#C89B3C', op: 0.85, glow: true, pulse: true },
  { cx: '18%', cy: '76%', r: 1.2, fill: '#6D4AFF', op: 0.65 },
  { cx: '28%', cy: '68%', r: 1.6, fill: '#8B5CF6', op: 0.75 },
  { cx: '38%', cy: '82%', r: 2.4, fill: '#C89B3C', op: 0.9, glow: true },
  { cx: '48%', cy: '70%', r: 1.0, fill: '#4A29C7', op: 0.5 },
  { cx: '58%', cy: '88%', r: 1.8, fill: '#6D4AFF', op: 0.8 },
  { cx: '68%', cy: '64%', r: 2.2, fill: '#8B5CF6', op: 0.85, glow: true, pulse: true },
  { cx: '78%', cy: '78%', r: 1.4, fill: '#C89B3C', op: 0.75 },
  { cx: '88%', cy: '92%', r: 2.8, fill: '#6D4AFF', op: 0.9, glow: true },
  { cx: '95%', cy: '74%', r: 1.2, fill: '#8B5CF6', op: 0.6 },
]

export default function CosmicStars() {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <defs>
        <filter id="starPulseGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {STARS_DATA.map((star, i) => (
        <circle
          key={i}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill={star.fill}
          opacity={star.op}
          filter={star.glow ? 'url(#starPulseGlow)' : undefined}
          style={star.pulse ? { animation: `starTwinkle ${4 + (i % 5)}s ease-in-out infinite ${i * 0.4}s` } : undefined}
        />
      ))}

      <style>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </svg>
  )
}
