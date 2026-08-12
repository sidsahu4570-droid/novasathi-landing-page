import React from 'react';

/**
 * PlanetLayer — Abstract Celestial Bodies
 * - Planet 1: Ringed Violet Planet (Top-Right Edge)
 * - Planet 2: Soft Indigo/Blue Atmosphere Sphere (Top-Left Edge)
 * - Planet 3: Celestial Moon Orb (Bottom-Right Edge)
 * Built with pure CSS gradients, SVG orbital rings, and keyframe floating physics.
 */
export default function PlanetLayer() {
  return (
    <div className="cosmic-layer" aria-hidden="true">
      {/* 1. Ringed Planet (Top-Right Zone) */}
      <div className="planet-container planet-ringed">
        <div className="planet-ring" />
        <div className="planet-sphere-violet" />
      </div>

      {/* 2. Soft Violet Atmosphere Planet (Top-Left Zone) */}
      <div className="planet-container planet-orb-left" />

      {/* 3. Small Celestial Moon Orb (Bottom-Right Zone) */}
      <div className="planet-container planet-moon-bottom" />
    </div>
  );
}
