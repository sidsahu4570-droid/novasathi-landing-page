import React from 'react'

// 5-8 Special Glowing Anchor Stars (Level 3)
const SPECIAL_STARS = [
  { cx: '12%', cy: '14%', r: 3.2, fill: '#D2A84A' },
  { cx: '82%', cy: '18%', r: 3.4, fill: '#6650B8' },
  { cx: '24%', cy: '44%', r: 2.8, fill: '#D2A84A' },
  { cx: '88%', cy: '54%', r: 3.0, fill: '#8D73E8' },
  { cx: '14%', cy: '78%', r: 3.2, fill: '#D2A84A' },
  { cx: '78%', cy: '88%', r: 2.8, fill: '#6650B8' },
]

// 20-30 Medium Stars (Level 2)
const MEDIUM_STARS = [
  { cx: '6%', cy: '8%', r: 2.0, fill: '#8D73E8', op: 0.45 },
  { cx: '32%', cy: '14%', r: 1.8, fill: '#6650B8', op: 0.50 },
  { cx: '62%', cy: '10%', r: 2.2, fill: '#D2A84A', op: 0.42 },
  { cx: '92%', cy: '24%', r: 1.8, fill: '#8D73E8', op: 0.48 },
  { cx: '8%', cy: '34%', r: 2.0, fill: '#6650B8', op: 0.40 },
  { cx: '36%', cy: '48%', r: 2.2, fill: '#D2A84A', op: 0.45 },
  { cx: '66%', cy: '38%', r: 1.8, fill: '#8D73E8', op: 0.48 },
  { cx: '94%', cy: '62%', r: 2.0, fill: '#6650B8', op: 0.42 },
  { cx: '24%', cy: '84%', r: 2.2, fill: '#D2A84A', op: 0.46 },
  { cx: '64%', cy: '78%', r: 1.8, fill: '#8D73E8', op: 0.45 },
  { cx: '84%', cy: '92%', r: 2.0, fill: '#6650B8', op: 0.48 },
]

// 120-150 Tiny Stars (Level 1)
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

export default function StarField() {
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
        <filter id="anchorPulseGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Tiny Background Stars */}
      {TINY_STARS.map((s, i) => (
        <circle key={`t-${i}`} cx={s.cx} cy={s.cy} r={s.r} fill="#8D73E8" opacity={0.22} />
      ))}

      {/* Medium Stars */}
      {MEDIUM_STARS.map((s, i) => (
        <circle key={`m-${i}`} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} opacity={s.op} />
      ))}

      {/* Special Anchor Stars with Twinkle & Cross Sparkle */}
      {SPECIAL_STARS.map((s, i) => (
        <g key={`b-${i}`} style={{ animation: `starPulseSlow ${6 + (i % 4)}s ease-in-out infinite ${i * 0.8}s` }}>
          <circle cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} filter="url(#anchorPulseGlow)" opacity={0.85} />
        </g>
      ))}

      <style>{`
        @keyframes starPulseSlow {
          0%, 100% { opacity: 0.4; transform: scale(0.92); }
          50% { opacity: 0.95; transform: scale(1.15); }
        }
      `}</style>
    </svg>
  )
}
