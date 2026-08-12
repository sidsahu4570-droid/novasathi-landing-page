import React from 'react';
import CosmicBackground from './components/cosmic/CosmicBackground';

/**
 * NovaSathi Landing Page - Phase 1 Root Application
 * Displays ONLY the living psychological celestial background environment.
 * Zero UI elements, text, or buttons as instructed for Phase 1.
 */
export default function App() {
  return (
    <main style={{ minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <CosmicBackground />
    </main>
  );
}
