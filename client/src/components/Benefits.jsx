import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

const benefits = [
  { title: 'Get answers on your most important life questions', desc: "Career direction, relationship clarity, financial timing — get insights from experts who've guided thousands." },
  { title: 'Save time — no searching, no vetting, no guessing', desc: "All experts on NovaSathi are verified, rated, and reviewed. You get quality guidance without the exhausting search." },
  { title: 'Your privacy is mathematically guaranteed', desc: "Phone masking, anonymous IDs, encrypted sessions. Your personal information is never shared with any expert." },
  { title: "Try risk-free — first 5 minutes are completely free", desc: "Experience the guidance quality before you pay anything. Start with a free consultation to see if it's right for you." },
  { title: 'Available 24/7 — guidance when you actually need it', desc: "Life doesn't send problems on schedule. Get expert help at 2am or during your lunch break — whenever you need it." },
  { title: 'One platform — all your spiritual needs in one place', desc: "Astrology, tarot, numerology, Vastu, and emotional wellness — everything you need is accessible from one trusted platform." },
]

export default function Benefits() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="benefits"
      ref={ref}
      className="ns-section bg-glow-amber"
    >
      <div className="ns-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="benefits-grid">

          {/* Left — Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative' }}
            className="benefits-visual"
          >
            {/* Main cosmic card */}
            <div className="ns-card-purple" style={{ padding: '40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

              {/* Outer ring */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => scrollToSection('showcase')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection('showcase') }}
                style={{ position: 'relative', margin: '0 auto 28px', width: '200px', height: '200px', cursor: 'pointer' }}
              >
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed var(--border-amber)', animation: 'spin-slow 30s linear infinite reverse' }} />
                <div style={{ position: 'absolute', inset: '16px', borderRadius: '50%', border: '1px dashed var(--border-purple)', animation: 'spin-slow 20s linear infinite' }} />
                <div style={{ position: 'absolute', inset: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(172,75,255,0.15), rgba(249,156,0,0.1))', border: '1px solid var(--border-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px' }}>
                  🌟
                </div>
              </div>

              <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>NovaSathi</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px' }}>Your Spiritual Companion</p>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { value: '150+', label: 'Verified Experts', target: 'showcase' },
                  { value: '24/7', label: 'Availability', target: 'how-it-works' },
                  { value: '5 Min', label: 'Free to Start', target: 'pricing' },
                  { value: '100%', label: 'Private & Secure', target: 'faq' },
                ].map((stat, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToSection(stat.target)}
                    style={{
                      padding: '16px',
                      background: 'var(--purple-subtle)',
                      border: '1px solid var(--border-purple)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--purple-500)', marginBottom: '4px' }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.button
              type="button"
              onClick={() => scrollToSection('pricing')}
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                padding: '10px 16px',
                background: 'linear-gradient(135deg, var(--amber-500), var(--amber-600))',
                borderRadius: '12px',
                boxShadow: '0 8px 24px var(--amber-glow)',
                border: 'none',
                cursor: 'pointer',
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#06070f', letterSpacing: '0.05em' }}>✨ FREE TO START →</div>
            </motion.button>
          </motion.div>

          {/* Right — Benefits list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="ns-label-amber" style={{ marginBottom: '20px' }}>
              💫 What You Get
            </div>
            <h2 className="section-headline" style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>
              Here's what's{' '}
              <span className="gradient-text">in it for you</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: 1.7 }}>
              Every session on NovaSathi is designed to give you real value — not vague predictions, but actionable clarity.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  className="ns-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => selectServiceAndScroll('General Inquiry')}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll('General Inquiry') }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.09 }}
                  style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px', cursor: 'pointer' }}
                >
                  <div style={{ width: 24, height: 24, background: 'linear-gradient(135deg, var(--purple-500), var(--purple-600))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={13} color="white" strokeWidth={3} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>{b.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{b.desc}</div>
                  </div>
                  <ArrowRight size={14} color="var(--purple-500)" style={{ flexShrink: 0, marginTop: '4px' }} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              style={{ marginTop: '36px' }}
            >
              <button
                type="button"
                onClick={() => selectServiceAndScroll('General Inquiry')}
                className="btn-primary"
              >
                Get Started Free <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .benefits-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .benefits-visual { display: none !important; }
        }
      `}</style>
    </section>
  )
}
