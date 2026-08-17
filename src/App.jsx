import React, { useState } from 'react';
import CosmicBackground from './components/cosmic/CosmicBackground';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import WhyPeopleStart from './components/landing/WhyPeopleStart';
import ProblemSelector from './components/landing/ProblemSelector';
import YouDontHaveToWait from './components/landing/YouDontHaveToWait';
import HowItWorks from './components/landing/HowItWorks';
import ExpertProfiles from './components/landing/ExpertProfiles';
import VideoTestimonials from './components/landing/VideoTestimonials';
import WhatYouGet from './components/landing/WhatYouGet';
import BirthDetailsRequired from './components/landing/BirthDetailsRequired';
import WhyStartNow from './components/landing/WhyStartNow';
import RiskReversal from './components/landing/RiskReversal';
import IntroOfferCard from './components/landing/IntroOfferCard';
import FinalCTA from './components/landing/FinalCTA';
import MicroFAQ from './components/landing/MicroFAQ';
import Footer from './components/landing/Footer';
import StickyMobileCTA from './components/landing/StickyMobileCTA';
import ConsultationModal from './components/landing/ConsultationModal';
import AdminPanel from './components/admin/AdminPanel';
import { DemoAvailabilityProvider } from './context/DemoAvailabilityContext';

function checkIsAdminRoute() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return path.startsWith('/admin') || hash.includes('admin') || search.includes('admin');
}

/**
 * NovaSathi Root Application
 * Premium Personal Astrology Consultation Platform
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
    if (topic && topic !== 'Hero' && topic !== 'General' && topic !== 'Final CTA' && topic !== 'Value Block' && topic !== 'Why Start Now' && topic !== 'Intro Offer Box' && topic !== 'Sticky Mobile Bar' && topic !== 'Act Now Strip' && topic !== 'Hero Urgency Box' && topic !== 'You Dont Have To Wait') {
      setModalTopic(topic);
    } else {
      setModalTopic('Love & Relationships');
    }
    setModalOpen(true);
  };

  return (
    <DemoAvailabilityProvider>
      <main style={{ minHeight: '100vh', width: '100%', maxWidth: '100%', position: 'relative', overflowX: 'hidden' }}>
        {/* Living Celestial Background (Preserved Intact) */}
        <CosmicBackground />

        {/* Personal Astrology Consultation Overlay */}
        <div className="landing-overlay">
          <Navbar onOpenModal={handleOpenModal} />
          <Hero onOpenModal={handleOpenModal} />
          <WhyPeopleStart />
          <ProblemSelector onOpenModal={handleOpenModal} />
          <YouDontHaveToWait onOpenModal={handleOpenModal} />
          <HowItWorks />
          <ExpertProfiles onOpenModal={handleOpenModal} />
          <VideoTestimonials onOpenModal={handleOpenModal} />
          <WhatYouGet onOpenModal={handleOpenModal} />
          <BirthDetailsRequired onOpenModal={handleOpenModal} />
          <WhyStartNow onOpenModal={handleOpenModal} />
          <RiskReversal />
          <IntroOfferCard onOpenModal={handleOpenModal} />
          <FinalCTA onOpenModal={handleOpenModal} />
          <MicroFAQ />
          <Footer />
        </div>

        {/* Desktop & Mobile Sticky Bottom Action Bar */}
        <StickyMobileCTA onOpenModal={handleOpenModal} />

        {/* Interactive Free 5-Minute Session Modal */}
        <ConsultationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          defaultTopic={modalTopic}
        />
      </main>
    </DemoAvailabilityProvider>
  );
}
