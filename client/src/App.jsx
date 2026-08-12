import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PainPoints from './components/PainPoints'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import SocialProof from './components/SocialProof'
import PricingAndFAQ from './components/PricingAndFAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
  return (
    <div style={{ backgroundColor: '#05060f', color: '#f8fafc' }}>
      <Navbar />
      <main>
        {/* Section 1: Header + Hero */}
        <Hero />

        {/* Section 2: Problem + Solution */}
        <PainPoints />

        {/* Section 3: Services Grid */}
        <Features />

        {/* Section 4: Benefits + How It Works */}
        <HowItWorks />

        {/* Section 5: Trust + Testimonials */}
        <SocialProof />

        {/* Section 6: Get Started + Pricing + FAQ */}
        <PricingAndFAQ />

        {/* Section 7: Final CTA Banner */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
