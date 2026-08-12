import React, { useState } from 'react';
import CosmicBackground from './components/cosmic/CosmicBackground';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import ProblemSelector from './components/landing/ProblemSelector';
import HowItWorks from './components/landing/HowItWorks';
import TrustStrip from './components/landing/TrustStrip';
import Testimonials from './components/landing/Testimonials';
import VideoTestimonials from './components/landing/VideoTestimonials';
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
 * Routes /admin or #admin to the admin panel; all other paths show the landing page.
 */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('Love & Relationships');
  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdminRoute);

  // Listen for live URL/hash changes
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
        <VideoTestimonials onOpenModal={handleOpenModal} />
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
