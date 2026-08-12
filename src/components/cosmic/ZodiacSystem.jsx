import React from 'react';

/**
 * ZodiacSystem — Sophisticated Ancient Astronomical Dial
 * SVG representation of an astrolabe / celestial dial with 12 geometric zodiac sectors,
 * concentric rings, tick marks, and subtle astronomical glyphs.
 * Low opacity (0.08 - 0.16), placed slightly off-center.
 */
export default function ZodiacSystem() {
  // 12 Geometric SVG path definitions for Zodiac Glyphs (No Emoji!)
  const zodiacGlyphs = [
    // 0: Aries (Ram Horns)
    "M -6,-4 C -6,-9 -1,-9 0,-4 C 1,-9 6,-9 6,-4 M 0,-4 L 0,8",
    // 1: Taurus (Bull Head & Horns)
    "M -6,-6 C -6,-10 6,-10 6,-6 M 0,-4 A 5,5 0 1,1 0.01,-4",
    // 2: Gemini (Pillars / Twins)
    "M -7,-7 L 7,-7 M -7,7 L 7,7 M -3,-7 L -3,7 M 3,-7 L 3,7",
    // 3: Cancer (Crab Claws)
    "M -4,-3 A 4,4 0 1,1 4,-3 M 4,3 A 4,4 0 1,1 -4,3",
    // 4: Leo (Mane & Tail Loop)
    "M -5,4 A 3,3 0 1,1 -2,1 C 0,-4 6,-4 4,2 C 3,6 7,8 7,4",
    // 5: Virgo (Maiden M & Loop)
    "M -7,-4 L -7,6 M -7,-1 C -7,-6 -2,-6 -2,-1 L -2,6 M -2,-1 C -2,-6 3,-6 3,-1 L 3,6 C 3,9 7,9 6,4",
    // 6: Libra (Scales / Horizon)
    "M -8,5 L 8,5 M -8,0 L -3,0 A 4,4 0 0,1 3,0 L 8,0",
    // 7: Scorpio (Scorpion Tail Arrow)
    "M -7,-4 L -7,5 M -7,0 C -7,-5 -2,-5 -2,0 L -2,5 M -2,0 C -2,-5 3,-5 3,0 L 3,5 L 7,2 M 7,5 L 3,5",
    // 8: Sagittarius (Archer Arrow)
    "M -6,6 L 6,-6 M 1,-6 L 6,-6 L 6,-1 M -3,0 L 3,6",
    // 9: Capricorn (Goat Horn & Fish Tail)
    "M -6,-6 L -2,2 C 1,5 4,1 2,-2 C 0,-5 -5,0 -1,6 C 1,9 5,8 5,5",
    // 10: Aquarius (Water Waves)
    "M -7,-3 L -4,-6 L -1,-3 L 2,-6 L 5,-3 L 7,-5 M -7,3 L -4,0 L -1,3 L 2,0 L 5,3 L 7,1",
    // 11: Pisces (Fishes tied together)
    "M -6,-7 C 0,-2 0,2 -6,7 M 6,-7 C 0,-2 0,2 6,7 M -7,0 L 7,0"
  ];

  const radius = 260;

  return (
    <div className="cosmic-layer" aria-hidden="true">
      <svg
        className="orbit-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="zodiac-dial-container" style={{ opacity: 0.14 }}>
          {/* Outer Ring & Degree Ticks */}
          <circle cx="930" cy="410" r={radius + 30} className="orbit-line-solid" strokeWidth="1.2" />
          <circle cx="930" cy="410" r={radius + 20} className="orbit-line" strokeDasharray="2 4" />
          <circle cx="930" cy="410" r={radius} className="orbit-line-solid" />
          <circle cx="930" cy="410" r={radius - 40} className="orbit-line" strokeDasharray="1 3" />
          <circle cx="930" cy="410" r={radius - 80} className="orbit-line-solid" />

          {/* 12 Sector Radial Rays & Glyphs */}
          {zodiacGlyphs.map((glyphPath, i) => {
            const angleDeg = i * 30;
            const angleRad = (angleDeg * Math.PI) / 180;
            
            // Ray endpoints
            const x1 = 930 + (radius - 80) * Math.cos(angleRad);
            const y1 = 410 + (radius - 80) * Math.sin(angleRad);
            const x2 = 930 + (radius + 30) * Math.cos(angleRad);
            const y2 = 410 + (radius + 30) * Math.sin(angleRad);

            // Glyph center placement (middle ring)
            const glyphRadius = radius - 20;
            const glyphAngleRad = ((angleDeg + 15) * Math.PI) / 180;
            const gx = 930 + glyphRadius * Math.cos(glyphAngleRad);
            const gy = 410 + glyphRadius * Math.sin(glyphAngleRad);

            return (
              <g key={`zodiac-${i}`}>
                {/* Sector Ray */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--color-lavender)"
                  strokeWidth="0.6"
                  opacity="0.7"
                />

                {/* Sub-degree tick mark */}
                <line
                  x1={930 + (radius + 15) * Math.cos(angleRad + 0.15)}
                  y1={410 + (radius + 15) * Math.sin(angleRad + 0.15)}
                  x2={930 + (radius + 25) * Math.cos(angleRad + 0.15)}
                  y2={410 + (radius + 25) * Math.sin(angleRad + 0.15)}
                  stroke="var(--color-warm-gold)"
                  strokeWidth="0.5"
                  opacity="0.8"
                />

                {/* Glyph Container */}
                <g transform={`translate(${gx}, ${gy}) scale(0.85)`}>
                  <path
                    d={glyphPath}
                    fill="none"
                    stroke="var(--color-soft-cream)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            );
          })}

          {/* Inner Astrolabe Geometry */}
          <polygon
            points={`
              ${930 + 170 * Math.cos(0)},${410 + 170 * Math.sin(0)}
              ${930 + 170 * Math.cos(2*Math.PI/3)},${410 + 170 * Math.sin(2*Math.PI/3)}
              ${930 + 170 * Math.cos(4*Math.PI/3)},${410 + 170 * Math.sin(4*Math.PI/3)}
            `}
            fill="none"
            stroke="var(--color-warm-gold)"
            strokeWidth="0.6"
            opacity="0.6"
          />
          <polygon
            points={`
              ${930 + 170 * Math.cos(Math.PI/3)},${410 + 170 * Math.sin(Math.PI/3)}
              ${930 + 170 * Math.cos(Math.PI)},${410 + 170 * Math.sin(Math.PI)}
              ${930 + 170 * Math.cos(5*Math.PI/3)},${410 + 170 * Math.sin(5*Math.PI/3)}
            `}
            fill="none"
            stroke="var(--color-warm-gold)"
            strokeWidth="0.6"
            opacity="0.6"
          />
          
          {/* Center Hub */}
          <circle cx="930" cy="410" r="8" fill="none" stroke="var(--color-warm-gold)" strokeWidth="1" />
          <circle cx="930" cy="410" r="2" fill="var(--color-soft-cream)" />
        </g>
      </svg>
    </div>
  );
}
