import React from 'react';

/**
 * NebulaLayer — Procedural Atmospheric Clouds
 * Creates depth across 5 psychological zones using interlocking radial gradients,
 * CSS blurs, and organic floating keyframe animations.
 */
export default function NebulaLayer() {
  return (
    <div className="cosmic-layer nebula-container" aria-hidden="true">
      {/* Zone 1: Unknown / Mystery (Upper-Left Deep Violet Glow) */}
      <div className="nebula-cloud nebula-cloud-1" />

      {/* Zone 2: Possibility (Upper-Right Soft Blue & Pink Atmosphere) */}
      <div className="nebula-cloud nebula-cloud-2" />

      {/* Zone 3 & 4: Discovery & Clarity (Central Soft Lavender & Cream Luminous Center) */}
      <div className="nebula-cloud nebula-cloud-center" />

      {/* Strategic Gold Atmosphere Point */}
      <div className="nebula-cloud nebula-cloud-gold-accent" />

      {/* Zone 5: Destiny / Journey (Lower Deep Indigo & Soft Pink Nebulae) */}
      <div className="nebula-cloud nebula-cloud-3" />
      <div className="nebula-cloud nebula-cloud-4" />
    </div>
  );
}
