import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PainPoints from './components/PainPoints'
import Transformation from './components/Transformation'
import Features from './components/Features'
import Benefits from './components/Benefits'
import HowItWorks from './components/HowItWorks'
import WhyNovaSathi from './components/WhyNovaSathi'
import SocialProof from './components/SocialProof'
import ProductShowcase from './components/ProductShowcase'
import Pricing from './components/Pricing'
import Objections from './components/Objections'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'


function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#05060f', color: '#f8fafc' }}>
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Transformation />
        <Features />
        <Benefits />
        <HowItWorks />
        <WhyNovaSathi />
        <SocialProof />
        <ProductShowcase />
        <Pricing />
        <Objections />
        <FAQ />
        <FinalCTA />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
