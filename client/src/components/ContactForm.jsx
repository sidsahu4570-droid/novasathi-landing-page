import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import axios from 'axios'

const services = [
  'Vedic Astrology',
  'Tarot Reading',
  'Numerology',
  'Vastu',
  'Dil Ki Baat',
  'General Inquiry',
]

export default function ContactForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

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
      setErrorMsg(err?.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="ns-section bg-alt"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="ns-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }} className="contact-grid">

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="ns-label" style={{ marginBottom: '20px' }}>
              📩 Get in Touch
            </div>
            <h2 className="section-headline" style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>
              Ready to start?{' '}
              <span className="gradient-text">Reach out.</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '40px' }}>
              Fill out this form and our team will get back to you shortly to help you get started with the right expert for your needs.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { icon: '🌐', title: 'Website', val: 'novasathi.com', href: 'https://novasathi.com/' },
                { icon: '💬', title: 'Platform Support', val: 'Available on novasathi.com', href: 'https://novasathi.com/' },
                { icon: '🕐', title: 'Support Hours', val: '24/7 — experts always available', href: null },
                { icon: '🔒', title: 'Privacy', val: '100% secure and anonymous', href: '#faq' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--purple-500)', marginBottom: '2px' }}>{item.title}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onClick={(e) => {
                          if (item.href.startsWith('#')) {
                            e.preventDefault()
                            document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                        style={{
                          fontSize: '15px',
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          fontWeight: 500,
                          transition: 'all 0.2s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--purple-500)'; e.currentTarget.style.textDecoration = 'underline' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.textDecoration = 'none' }}
                      >
                        {item.val} {item.href.startsWith('http') ? '↗' : ''}
                      </a>
                    ) : (
                      <div style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>{item.val}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="ns-card-purple" style={{ padding: '36px' }}>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '40px 20px' }}
                >
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>✨</div>
                  <CheckCircle size={48} color="var(--green-active)" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Message Received!</h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Thank you for reaching out. Our team will get back to you very soon. 
                    In the meantime, you can visit NovaSathi and start your free 5-minute consultation right now.
                  </p>
                  <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="btn-secondary"
                    >
                      Send Another
                    </button>
                    <a href="https://novasathi.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Visit NovaSathi →
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px' }}>
                    Start Your Journey 🌟
                  </h3>

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', background: 'rgba(255,35,87,0.08)', border: '1px solid rgba(255,35,87,0.25)', borderRadius: '10px', marginBottom: '20px' }}
                    >
                      <AlertCircle size={16} color="#ff2357" />
                      <span style={{ fontSize: '14px', color: '#ff2357' }}>{errorMsg}</span>
                    </motion.div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Your Name *</label>
                        <input name="name" className="ns-input" placeholder="Rahul Sharma" value={form.name} onChange={handleChange} required />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Phone Number *</label>
                        <input name="phone" className="ns-input" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Email Address *</label>
                      <input name="email" type="email" className="ns-input" placeholder="rahul@email.com" value={form.email} onChange={handleChange} required />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>I'm interested in</label>
                      <select name="service" className="ns-input" value={form.service} onChange={handleChange}>
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Your Message (Optional)</label>
                      <textarea
                        name="message"
                        className="ns-input"
                        placeholder="Tell us a bit about what you're looking for guidance on..."
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        style={{ resize: 'vertical', minHeight: '90px' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={status === 'loading'}
                      style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '15px', marginTop: '8px', opacity: status === 'loading' ? 0.7 : 1 }}
                    >
                      {status === 'loading' ? (
                        <>
                          <span style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
                          Sending...
                        </>
                      ) : (
                        <> <Send size={16} /> Get Started — It's Free </>
                      )}
                    </button>

                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                      🔒 Your information is 100% private. We never share your details with anyone.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
