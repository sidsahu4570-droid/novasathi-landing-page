import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ShieldCheck, Clock, Lock, Sparkles } from 'lucide-react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

const keyBenefits = [
  { icon: <Lock size={16} color="var(--purple-500)" />, title: '100% Anonymous', desc: 'Phone masking protects your number.' },
  { icon: <ShieldCheck size={16} color="var(--purple-500)" />, title: 'Verified Experts', desc: 'Strict background checks.' },
  { icon: <Sparkles size={16} color="var(--purple-500)" />, title: '5-Min Free Trial', desc: 'Try before paying anything.' },
  { icon: <Clock size={16} color="var(--purple-500)" />, title: '24/7 Available', desc: 'Connect in seconds, anytime.' },
]

const steps = [
  { number: '01', emoji: '📲', title: 'Browse Experts', desc: 'Browse verified astrologers & counselors.' },
  { number: '02', emoji: '💬', title: 'Free 5-Min Trial', desc: 'Chat 5 min free — no credit card needed.' },
  { number: '03', emoji: '🔓', title: 'Unlock Guidance', desc: 'Pay per session — zero subscriptions.' },
  { number: '04', emoji: '🌟', title: 'Get Results', desc: 'Walk away with real answers & peace.' },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="ns-section"
      style={{ position: 'relative', background: 'transparent' }}
    >
      <div id="benefits" style={{ position: 'absolute', top: 0 }} />
      <div id="why-novasathi" style={{ position: 'absolute', top: 0 }} />

      <div className="ns-container">

        <motion.div
          style={{ textAlign: 'center', marginBottom: '16px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="ns-label" style={{ marginBottom: '6px', background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.25)', color: '#F5F3FF' }}>
            ⚡ Why Choose NovaSathi & How It Works
          </div>
          <h2 className="section-headline" style={{ marginBottom: '4px', color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Guidance made <span style={{ background: 'linear-gradient(135deg, #c084fc 0%, #fbbf24 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>simple, private & fast</span>
          </h2>
          <p style={{ fontSize: '13.5px', color: 'rgba(245, 245, 247, 0.85)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.4 }}>
            Four key benefits paired with a simple 2-minute process.
          </p>
        </motion.div>

        {/* Top — 4 Benefits Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px', marginBottom: '14px' }}>
          {keyBenefits.map((b, i) => (
            <div
              key={i}
              className="ns-card"
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection('pricing')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection('pricing') }}
              style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <div style={{ padding: '6px', background: 'var(--purple-subtle)', borderRadius: '8px', border: '1px solid var(--border-purple)', flexShrink: 0 }}>
                {b.icon}
              </div>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{b.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom — 4 Steps Horizontal Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px' }}>
          {steps.map((s, i) => (
            <div
              key={i}
              className="ns-card-purple"
              role="button"
              tabIndex={0}
              onClick={() => selectServiceAndScroll('General Inquiry')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll('General Inquiry') }}
              style={{ padding: '12px 14px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--purple-500)', padding: '2px 6px', background: 'var(--purple-subtle)', borderRadius: '4px', border: '1px solid var(--border-purple)' }}>
                    STEP {s.number}
                  </span>
                  <span style={{ fontSize: '18px' }}>{s.emoji}</span>
                </div>
                <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px' }}>{s.title}</h3>
                <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.35, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
