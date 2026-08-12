import React from 'react'

// Level 3: Bright Anchoring Stars (5-10 Key Visual Anchors)
const BRIGHT_STARS = [
  { cx: '14%', cy: '12%', r: 3.0, fill: '#D4A84F', glow: true },
  { cx: '82%', cy: '18%', r: 3.2, fill: '#6D4AFF', glow: true },
  { cx: '22%', cy: '42%', r: 2.8, fill: '#C89B45', glow: true },
  { cx: '88%', cy: '52%', r: 3.0, fill: '#8B5CF6', glow: true },
  { cx: '12%', cy: '78%', r: 3.2, fill: '#D4A84F', glow: true },
  { cx: '76%', cy: '88%', r: 2.8, fill: '#6D4AFF', glow: true },
]

// Level 2: Medium Stars (20-30 Stars)
const MEDIUM_STARS = [
  { cx: '6%', cy: '8%', r: 2.0, fill: '#8B5CF6', op: 0.45 },
  { cx: '32%', cy: '14%', r: 1.8, fill: '#6D4AFF', op: 0.50 },
  { cx: '62%', cy: '10%', r: 2.2, fill: '#D4A84F', op: 0.45 },
  { cx: '92%', cy: '24%', r: 1.8, fill: '#8B5CF6', op: 0.48 },
  { cx: '8%', cy: '34%', r: 2.0, fill: '#6D4AFF', op: 0.42 },
  { cx: '36%', cy: '48%', r: 2.2, fill: '#C89B45', op: 0.45 },
  { cx: '66%', cy: '38%', r: 1.8, fill: '#8B5CF6', op: 0.48 },
  { cx: '94%', cy: '62%', r: 2.0, fill: '#6D4AFF', op: 0.42 },
  { cx: '24%', cy: '84%', r: 2.2, fill: '#D4A84F', op: 0.46 },
  { cx: '64%', cy: '78%', r: 1.8, fill: '#8B5CF6', op: 0.45 },
  { cx: '84%', cy: '92%', r: 2.0, fill: '#6D4AFF', op: 0.48 },
]

// Level 1: Tiny Background Stars (100-120 Subtle Stars)
const TINY_STARS = [
  { cx: '2%', cy: '4%', r: 1.0 }, { cx: '9%', cy: '18%', r: 1.2 }, { cx: '18%', cy: '6%', r: 1.0 },
  { cx: '27%', cy: '22%', r: 1.2 }, { cx: '38%', cy: '9%', r: 1.0 }, { cx: '48%', cy: '19%', r: 1.1 },
  { cx: '58%', cy: '5%', r: 1.0 }, { cx: '68%', cy: '21%', r: 1.2 }, { cx: '78%', cy: '7%', r: 1.0 },
  { cx: '88%', cy: '15%', r: 1.1 }, { cx: '97%', cy: '3%', r: 1.0 }, { cx: '4%', cy: '28%', r: 1.2 },
  { cx: '15%', cy: '36%', r: 1.0 }, { cx: '25%', cy: '52%', r: 1.2 }, { cx: '42%', cy: '44%', r: 1.0 },
  { cx: '52%', cy: '58%', r: 1.1 }, { cx: '72%', cy: '46%', r: 1.0 }, { cx: '82%', cy: '56%', r: 1.2 },
  { cx: '3%', cy: '66%', r: 1.0 }, { cx: '16%', cy: '72%', r: 1.2 }, { cx: '30%', cy: '90%', r: 1.0 },
  { cx: '45%', cy: '68%', r: 1.1 }, { cx: '55%', cy: '84%', r: 1.0 }, { cx: '70%', cy: '72%', r: 1.2 },
  { cx: '80%', cy: '82%', r: 1.0 }, { cx: '90%', cy: '96%', r: 1.1 }, { cx: '98%', cy: '80%', r: 1.0 }
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
        <filter id="anchorStarGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Level 1: Tiny Stars */}
      {TINY_STARS.map((s, i) => (
        <circle key={`t-${i}`} cx={s.cx} cy={s.cy} r={s.r} fill="#8B5CF6" opacity={0.25} />
      ))}

      {/* Level 2: Medium Stars */}
      {MEDIUM_STARS.map((s, i) => (
        <circle key={`m-${i}`} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} opacity={s.op} />
      ))}

      {/* Level 3: Bright Anchoring Stars */}
      {BRIGHT_STARS.map((s, i) => (
        <g key={`b-${i}`}>
          <circle cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} filter="url(#anchorStarGlow)" opacity={0.85} />
          {/* 4-Point Star Sparkle Cross */}
          <path
            d={`M ${s.cx} ${s.cy}`}
            stroke={s.fill}
            strokeWidth="0.8"
            opacity={0.6}
          />
        </g>
      ))}

      {/* Elegant SVG Moon Phases Sequence near lower section */}
      <g transform="translate(60, 1150)" opacity="0.20" fill="none" stroke="#6D4AFF" strokeWidth="1">
        {/* New Moon */}
        <circle cx="0" cy="0" r="7" stroke="#C89B45" />
        {/* Waxing Crescent */}
        <path d="M 30 -7 A 7 7 0 0 1 30 7 A 4 7 0 0 0 30 -7 Z" fill="#6D4AFF" />
        <circle cx="30" cy="0" r="7" />
        {/* First Quarter */}
        <path d="M 60 -7 A 7 7 0 0 1 60 7 Z" fill="#6D4AFF" />
        <circle cx="60" cy="0" r="7" />
        {/* Full Moon */}
        <circle cx="90" cy="0" r="7" fill="#C89B45" stroke="#C89B45" />
      </g>
    </svg>
  )
}
