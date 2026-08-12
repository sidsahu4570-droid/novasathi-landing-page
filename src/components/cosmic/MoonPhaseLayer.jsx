import React from 'react';

/**
 * MoonPhaseLayer — Sequential Lunar Cycle
 * Displays 7 SVG moon phases (New Moon to Waning Crescent) with delicate gold & lavender rim glows.
 * Positioned subtly in Zone 5 (lower destiny zone).
 */
export default function MoonPhaseLayer() {
  const phases = [
    { id: 'new', label: 'New Moon', type: 'new' },
    { id: 'wax-crescent', label: 'Waxing Crescent', type: 'wax-crescent' },
    { id: 'first-quarter', label: 'First Quarter', type: 'first-quarter' },
    { id: 'full', label: 'Full Moon', type: 'full' },
    { id: 'third-quarter', label: 'Third Quarter', type: 'third-quarter' },
    { id: 'wan-crescent', label: 'Waning Crescent', type: 'wan-crescent' }
  ];

  return (
    <div className="cosmic-layer" aria-hidden="true">
      <div className="moon-phase-wrapper">
        {phases.map((phase) => (
          <svg key={phase.id} className="moon-phase-item" viewBox="0 0 32 32">
            <defs>
              <radialGradient id={`moon-glow-${phase.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F8F4EA" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#C8B8F4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6D4AFF" stopOpacity="0.1" />
              </radialGradient>
            </defs>

            {/* Dark Moon Base */}
            <circle cx="16" cy="16" r="13" fill="#1C1635" stroke="rgba(200, 184, 244, 0.3)" strokeWidth="0.8" />

            {/* Illuminated Phase Graphics */}
            {phase.type === 'new' && (
              <circle cx="16" cy="16" r="13" fill="none" stroke="var(--color-warm-gold)" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.5" />
            )}

            {phase.type === 'wax-crescent' && (
              <path d="M 16 3 A 13 13 0 0 1 16 29 A 9 13 0 0 0 16 3 Z" fill="url(#moon-glow-wax-crescent)" />
            )}

            {phase.type === 'first-quarter' && (
              <path d="M 16 3 A 13 13 0 0 1 16 29 Z" fill="url(#moon-glow-first-quarter)" />
            )}

            {phase.type === 'full' && (
              <circle cx="16" cy="16" r="13" fill="url(#moon-glow-full)" />
            )}

            {phase.type === 'third-quarter' && (
              <path d="M 16 3 A 13 13 0 0 0 16 29 Z" fill="url(#moon-glow-third-quarter)" />
            )}

            {phase.type === 'wan-crescent' && (
              <path d="M 16 3 A 13 13 0 0 0 16 29 A 9 13 0 0 1 16 3 Z" fill="url(#moon-glow-wan-crescent)" />
            )}
          </svg>
        ))}
      </div>
    </div>
  );
}
