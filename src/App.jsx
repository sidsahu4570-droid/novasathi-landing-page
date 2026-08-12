import React, { useState } from 'react';
import CosmicBackground from './components/cosmic/CosmicBackground';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import ProblemSelector from './components/landing/ProblemSelector';
import HowItWorks from './components/landing/HowItWorks';
import TrustStrip from './components/landing/TrustStrip';
import Testimonials from './components/landing/Testimonials';
import FinalCTA from './components/landing/FinalCTA';
import MicroFAQ from './components/landing/MicroFAQ';
import Footer from './components/landing/Footer';
import ConsultationModal from './components/landing/ConsultationModal';

/**
 * NovaSathi Landing Page Root Application
 * Integrates the intact living Cosmic Background (z-index: 0)
 * with the compact high-conversion landing page overlay (z-index: 10).
 */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('Love & Relationships');

  const handleOpenModal = (topic) => {
    if (topic && topic !== 'Hero' && topic !== 'General' && topic !== 'Final CTA') {
      setModalTopic(topic);
    } else {
      setModalTopic('Love & Relationships');
    }
    setModalOpen(true);
  };

  return (
    <main style={{ minHeight: '100vh', width: '100vw', position: 'relative', overflowX: 'hidden' }}>
      {/* Living Celestial Background (Preserved Intact) */}
      <CosmicBackground />

      {/* Compact High-Conversion Overlay */}
      <div className="landing-overlay">
        <Navbar onOpenModal={handleOpenModal} />
        <Hero onOpenModal={handleOpenModal} />
        <ProblemSelector onOpenModal={handleOpenModal} />
        <HowItWorks />
        <TrustStrip />
        <Testimonials />
        <FinalCTA onOpenModal={handleOpenModal} />
        <MicroFAQ />
        <Footer />
      </div>

      {/* Interactive Free 5-Minute Session Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTopic={modalTopic}
      />
    </main>
  );
}
