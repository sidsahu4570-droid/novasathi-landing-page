import React from 'react';
import NebulaLayer from './NebulaLayer';
import StarField from './StarField';
import OrbitLayer from './OrbitLayer';
import ZodiacSystem from './ZodiacSystem';
import ConstellationLayer from './ConstellationLayer';
import PlanetLayer from './PlanetLayer';
import MoonPhaseLayer from './MoonPhaseLayer';

/**
 * CosmicBackground — Master Environment Coordinator
 * Combines all 5 psychological zones into a unified, living celestial universe.
 * Zones:
 * - Zone 1: Unknown (Mystery - Outer deep violet/indigo environment)
 * - Zone 2: Possibility (Opening - Layered blue/lavender nebulae)
 * - Zone 3: Discovery (Focus Area - Orbit arcs, constellations, zodiac dial)
 * - Zone 4: Clarity (Future Content Safe Zone - Luminous soft atmosphere center)
 * - Zone 5: Destiny (Journey - Planets, lower orbits, moon phases)
 */
export default function CosmicBackground() {
  return (
    <div className="cosmic-container" role="presentation">
      {/* Layer 1: Multi-Gradient Procedural Nebulae */}
      <NebulaLayer />

      {/* Layer 2: Star Field & Anchor Stars */}
      <StarField />

      {/* Layer 3: Sweeping Orbital Arcs */}
      <OrbitLayer />

      {/* Layer 4: Astronomical Zodiac Astrolabe Ring */}
      <ZodiacSystem />

      {/* Layer 5: Geometric Constellation Groups */}
      <ConstellationLayer />

      {/* Layer 6: Abstract CSS/SVG Planets */}
      <PlanetLayer />

      {/* Layer 7: Lunar Cycle Moon Phase Array */}
      <MoonPhaseLayer />

      {/* Zone 4: Clarity Safe Area for future landing page hero content */}
      <div className="clarity-safe-zone" aria-hidden="true" />
    </div>
  );
}
