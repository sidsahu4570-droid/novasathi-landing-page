import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Check, Plus, Minus, Send, CheckCircle, AlertCircle, ChevronDown, Lock, ShieldCheck, Clock, HeartHandshake } from 'lucide-react'
import axios from 'axios'

const services = [
  'Vedic Astrology',
  'Tarot Reading',
  'Numerology',
  'Vastu',
  'Dil Ki Baat',
  'General Inquiry',
]

const defaultFaqs = [
  { question: "What exactly is NovaSathi?", answer: "NovaSathi connects you with verified astrologers, tarot readers, numerologists, Vastu consultants, and peer counselors for 24/7 private guidance." },
  { question: "How does the free 5-minute consultation work?", answer: "Your first 5 minutes with any expert are completely free. No credit card or payment required to start chatting or calling." },
  { question: "Are the experts genuinely verified?", answer: "Yes. Every practitioner undergoes background verification and has ratings/reviews from real users visible on their profile." },
  { question: "Is my privacy truly protected?", answer: "Absolutely. End-to-end phone masking hides your real number. 'Dil Ki Baat' uses system-generated anonymous IDs so your identity stays private." },
  { question: "What is 'Dil Ki Baat'?", answer: "'Dil Ki Baat' provides a completely anonymous, judgment-free space to speak with compassionate peer listeners about what is on your heart." },
  { question: "How much does a session cost after the free trial?", answer: "Rates vary by expert and are displayed on their profile. You are shown the exact per-minute/session cost before unlocking. Zero hidden fees." },
]

const CustomDropdown = ({ value, onChange, options, placeholder = 'Select a service...' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const handleSelect = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          padding: '10px 14px',
          backgroundColor: '#101018',
          border: isOpen ? '1px solid var(--purple-500)' : '1px solid #252535',
          borderRadius: '10px',
          color: value ? '#F5F3FF' : '#777383',
          fontFamily: 'inherit',
          fontSize: '13.5px',
          cursor: 'pointer',
          outline: 'none',
          textAlign: 'left',
        }}
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          size={16}
          color="var(--purple-500)"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', flexShrink: 0 }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 100,
              backgroundColor: '#101018',
              border: '1px solid var(--purple-border)',
              borderRadius: '12px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.9)',
              overflow: 'hidden',
              padding: '4px',
            }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: value === opt ? 'rgba(109, 74, 255, 0.20)' : 'transparent',
                  color: value === opt ? '#F5F3FF' : '#A7A3B5',
                  fontSize: '13px',
                  fontWeight: value === opt ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ width: 14, color: '#B79CFF', fontWeight: 700 }}>{value === opt ? '✓' : ''}</span>
                <span>{opt}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PricingAndFAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [faqs] = useState(defaultFaqs)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const handleSelectService = (e) => {
      if (e.detail?.service) {
        setForm(prev => ({ ...prev, service: e.detail.service }))
      }
    }
    window.addEventListener('novasathi:select_service', handleSelectService)
    return () => window.removeEventListener('novasathi:select_service', handleSelectService)
  }, [])

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email) {
      setStatus('error')
      setErrorMsg('Please fill in your name, phone, and email.')
      return
    }
    setStatus('loading')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', phone: '', email: '', service: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err?.response?.data?.message || 'Something went wrong.')
    }
  }

  return (
    <section
      id="pricing"
      ref={ref}
      className="ns-section"
      style={{ position: 'relative', background: 'transparent' }}
    >
      <div id="contact" style={{ position: 'absolute', top: 0 }} />
      <div id="faq" style={{ position: 'absolute', top: 0 }} />
      <div id="objections" style={{ position: 'absolute', top: 0 }} />

      <div className="ns-container">

        <motion.div
          style={{ textAlign: 'center', marginBottom: '16px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="ns-label" style={{ marginBottom: '6px', background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.25)', color: '#F5F3FF' }}>
            💳 Pricing & Start Consultation
          </div>
          <h2 className="section-headline" style={{ marginBottom: '4px', color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Transparent pricing, <span style={{ background: 'linear-gradient(135deg, #c084fc 0%, #fbbf24 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>instant 5-minute free trial</span>
          </h2>
          <p style={{ fontSize: '13.5px', color: 'rgba(245, 245, 247, 0.85)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.4 }}>
            Fill in your details below to start your free consultation or check FAQs.
          </p>
        </motion.div>

        {/* Side-by-Side 2-Column Grid on Desktop */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '20px', alignItems: 'start' }} className="pricing-faq-grid">

          {/* Left Column — Form + Pricing Plans */}
          <div>
            <div className="ns-card-purple" style={{ padding: '18px 16px', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Start Free Consultation 🌟
              </h3>

              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '16px 10px' }}>
                  <CheckCircle size={36} color="var(--green-active)" style={{ margin: '0 auto 8px' }} />
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>Message Sent!</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    Our team will contact you shortly. Visit NovaSathi to start your free trial now.
                  </p>
                  <a href="https://novasathi.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '13px', padding: '8px 18px' }}>
                    Visit NovaSathi →
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {status === 'error' && (
                    <div style={{ padding: '8px 12px', background: 'rgba(255,35,87,0.08)', border: '1px solid rgba(255,35,87,0.25)', borderRadius: '8px', fontSize: '12.5px', color: '#ff2357' }}>
                      {errorMsg}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Your Name *</label>
                      <input name="name" className="ns-input" placeholder="Rahul Sharma" value={form.name} onChange={handleChange} required style={{ padding: '9px 12px', fontSize: '13.5px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Phone Number *</label>
                      <input name="phone" className="ns-input" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required style={{ padding: '9px 12px', fontSize: '13.5px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Email Address *</label>
                      <input name="email" type="email" className="ns-input" placeholder="rahul@email.com" value={form.email} onChange={handleChange} required style={{ padding: '9px 12px', fontSize: '13.5px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>I'm interested in</label>
                      <CustomDropdown
                        value={form.service}
                        onChange={(selectedService) => setForm(prev => ({ ...prev, service: selectedService }))}
                        options={services}
                        placeholder="Select a service..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={status === 'loading'}
                    style={{ width: '100%', justifyContent: 'center', fontSize: '13.5px', padding: '10px', marginTop: '4px' }}
                  >
                    {status === 'loading' ? 'Sending...' : 'Get Started — It\'s Free ⚡'}
                  </button>
                </form>
              )}
            </div>

            {/* Compact Pricing Pill Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }} className="plans-grid">
              <div className="ns-card" style={{ padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--green-active)' }}>FREE TRIAL</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)' }}>5 Mins Free</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>No credit card required</div>
              </div>
              <div className="pricing-popular" style={{ padding: '10px 12px', textAlign: 'center', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--purple-500)' }}>PER SESSION</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Pay per minute</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Varies by expert</div>
              </div>
              <div className="ns-card" style={{ padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--amber-500)' }}>DIL KI BAAT</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Anonymous</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Peer wellness support</div>
              </div>
            </div>
          </div>

          {/* Right Column — FAQ Accordion + Trust Row */}
          <div>
            <div className="ns-card" style={{ padding: '16px 14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                Frequently Asked Questions ❓
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx
                  return (
                    <div key={idx} className="faq-item" style={{ border: '1px solid var(--border-default)', borderRadius: '8px', overflow: 'hidden' }}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        style={{ width: '100%', padding: '9px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', minHeight: '44px' }}
                      >
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{faq.question}</span>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: isOpen ? 'var(--purple-subtle)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {isOpen ? <Minus size={11} color="var(--purple-500)" /> : <Plus size={11} color="var(--text-secondary)" />}
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                          >
                            <div style={{ padding: '0 12px 10px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* Guarantees Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '12px' }}>
                {[
                  { icon: <Lock size={12} color="var(--purple-500)" />, label: '100% Anonymous' },
                  { icon: <ShieldCheck size={12} color="var(--purple-500)" />, label: 'Verified Experts' },
                  { icon: <Clock size={12} color="var(--purple-500)" />, label: '24/7 Access' },
                  { icon: <HeartHandshake size={12} color="var(--purple-500)" />, label: 'Zero Subscription' },
                ].map((g, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 8px', background: 'rgba(172,75,255,0.06)', borderRadius: '6px', border: '1px solid var(--border-purple)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {g.icon}
                    <span>{g.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-faq-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .plans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
