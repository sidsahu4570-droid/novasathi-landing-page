import React, { useState } from 'react';
import CosmicBackground from './components/cosmic/CosmicBackground';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import ProblemSelector from './components/landing/ProblemSelector';
import HowItWorks from './components/landing/HowItWorks';
import ExpertProfiles from './components/landing/ExpertProfiles';
import VideoTestimonials from './components/landing/VideoTestimonials';
import RiskReversal from './components/landing/RiskReversal';
import PricingTransparency from './components/landing/PricingTransparency';
import FinalCTA from './components/landing/FinalCTA';
import MicroFAQ from './components/landing/MicroFAQ';
import Footer from './components/landing/Footer';
import ConsultationModal from './components/landing/ConsultationModal';
import AdminPanel from './components/admin/AdminPanel';

function checkIsAdminRoute() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return path.startsWith('/admin') || hash.includes('admin') || search.includes('admin');
}

/**
 * NovaSathi Root Application
 * Restructured into a high-converting 2-scroll consultation funnel.
 */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('Love & Relationships');
  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdminRoute);

  // Listen for live URL/hash changes for admin route
  React.useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(checkIsAdminRoute());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  if (isAdminRoute) {
    return <AdminPanel />;
  }

  const handleOpenModal = (topic) => {
    if (topic && topic !== 'Hero' && topic !== 'General' && topic !== 'Final CTA') {
      setModalTopic(topic);
    } else {
      setModalTopic('Love & Relationships');
    }
    setModalOpen(true);
  };

  return (
    <main style={{ minHeight: '100vh', width: '100%', maxWidth: '100%', position: 'relative', overflowX: 'hidden' }}>
      {/* Living Celestial Background (Preserved Intact) */}
      <CosmicBackground />

      {/* High-Converting 2-Scroll Consultation Funnel Overlay */}
      <div className="landing-overlay">
        <Navbar onOpenModal={handleOpenModal} />
        <Hero onOpenModal={handleOpenModal} />
        <ProblemSelector onOpenModal={handleOpenModal} />
        <HowItWorks />
        <ExpertProfiles onOpenModal={handleOpenModal} />
        <VideoTestimonials onOpenModal={handleOpenModal} />
        <RiskReversal />
        <PricingTransparency />
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
