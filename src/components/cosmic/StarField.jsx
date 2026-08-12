import React, { useMemo } from 'react';

/**
 * StarField — Multi-Tiered Celestial Star Hierarchy
 * - Tier 1: ~180 Tiny background stars (low opacity, subtle twinkle)
 * - Tier 2: ~45 Medium stars (soft glowing nodes)
 * - Tier 3: 7 Anchor Stars with 4-point gold/cream SVG lens flares
 */
export default function StarField() {
  // Deterministic seed generation for consistent star placements
  const backgroundStars = useMemo(() => {
    const stars = [];
    // Pseudo-random deterministic generator
    let seed = 42;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 180; i++) {
      const cx = (random() * 100).toFixed(2);
      const cy = (random() * 100).toFixed(2);
      const r = (random() * 1.1 + 0.4).toFixed(2);
      const opacity = (random() * 0.45 + 0.15).toFixed(2);
      const delay = (random() * 8).toFixed(1);
      const duration = (random() * 5 + 4).toFixed(1);
      stars.push({ id: `bg-${i}`, cx: `${cx}%`, cy: `${cy}%`, r, opacity, delay, duration });
    }
    return stars;
  }, []);

  const mediumStars = useMemo(() => {
    const stars = [];
    let seed = 108;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 45; i++) {
      const cx = (random() * 96 + 2).toFixed(2);
      const cy = (random() * 96 + 2).toFixed(2);
      // Avoid excessive density directly in center (Zone 4 content safe zone: 35%-65% X, 35%-65% Y)
      if (parseFloat(cx) > 38 && parseFloat(cx) < 62 && parseFloat(cy) > 38 && parseFloat(cy) < 62) {
        if (random() > 0.3) continue; // Keep center quiet
      }
      const r = (random() * 1.2 + 1.2).toFixed(2);
      const delay = (random() * 6).toFixed(1);
      stars.push({ id: `med-${i}`, cx: `${cx}%`, cy: `${cy}%`, r, delay });
    }
    return stars;
  }, []);

  // 7 Strategic Anchor Stars with lens flares (Wisdom / Attention Anchors)
  const anchorStars = [
    { id: 'anchor-1', x: '18%', y: '16%', color: '#D4A84F', size: 3.5, label: 'Vega' },
    { id: 'anchor-2', x: '82%', y: '22%', color: '#F8F4EA', size: 4, label: 'Capella' },
    { id: 'anchor-3', x: '76%', y: '68%', color: '#D4A84F', size: 3.2, label: 'Spica' },
    { id: 'anchor-4', x: '22%', y: '78%', color: '#C8B8F4', size: 3.8, label: 'Sirius' },
    { id: 'anchor-5', x: '35%', y: '28%', color: '#F8F4EA', size: 3.0, label: 'Polaris' },
    { id: 'anchor-6', x: '68%', y: '32%', color: '#D4A84F', size: 3.4, label: 'Antares' },
    { id: 'anchor-7', x: '50%', y: '88%', color: '#7189D8', size: 3.6, label: 'Regulus' },
  ];

  return (
    <div className="cosmic-layer" aria-hidden="true">
      <svg className="star-field-svg">
        <defs>
          <filter id="anchor-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tier 1: Background Stars */}
        <g className="star-bg">
          {backgroundStars.map((star) => (
            <circle
              key={star.id}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#FFFFFF"
              opacity={star.opacity}
              style={{
                animation: `twinkleBg ${star.duration}s ease-in-out ${star.delay}s infinite alternate`
              }}
            />
          ))}
        </g>

        {/* Tier 2: Medium Stars */}
        <g>
          {mediumStars.map((star) => (
            <circle
              key={star.id}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#C8B8F4"
              opacity="0.75"
              style={{
                animation: `pulseNode 5s ease-in-out ${star.delay}s infinite alternate`
              }}
            />
          ))}
        </g>

        {/* Tier 3: 7 Anchor Stars with 4-Point SVG Flare */}
        <g>
          {anchorStars.map((anchor) => (
            <g key={anchor.id} transform={`translate(0, 0)`} className="star-anchor">
              {/* Soft Radial Glow backdrop */}
              <circle
                cx={anchor.x}
                cy={anchor.y}
                r={anchor.size * 5}
                fill={anchor.color}
                opacity="0.18"
                filter="url(#anchor-glow)"
              />
              
              {/* Horizontal Lens Flare */}
              <line
                x1={`calc(${anchor.x} - ${anchor.size * 6}px)`}
                y1={anchor.y}
                x2={`calc(${anchor.x} + ${anchor.size * 6}px)`}
                y2={anchor.y}
                stroke={anchor.color}
                strokeWidth="0.8"
                opacity="0.6"
              />
              
              {/* Vertical Lens Flare */}
              <line
                x1={anchor.x}
                y1={`calc(${anchor.y} - ${anchor.size * 6}px)`}
                x2={anchor.x}
                y2={`calc(${anchor.y} + ${anchor.size * 6}px)`}
                stroke={anchor.color}
                strokeWidth="0.8"
                opacity="0.6"
              />

              {/* Core Star Node */}
              <circle
                cx={anchor.x}
                cy={anchor.y}
                r={anchor.size}
                fill="#FFFFFF"
                filter="url(#anchor-glow)"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
