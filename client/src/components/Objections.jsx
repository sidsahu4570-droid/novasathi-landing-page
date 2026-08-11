import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { scrollToSection } from '../utils/navigation'

const objections = [
  {
    q: "Is this actually right for me?",
    a: "NovaSathi is for anyone seeking clarity on life's important questions — career direction, relationship decisions, financial timing, or simply someone to listen without judgment. If you've ever thought 'I wish I could talk to someone who truly understands', NovaSathi is for you.",
    icon: '🤔',
    target: 'contact',
  },
  {
    q: "Will my personal information stay private?",
    a: "Absolutely. NovaSathi uses end-to-end phone masking so your real number is never revealed. For Dil Ki Baat sessions, you're identified only by a system-generated anonymous ID. No personal details are ever shared with experts.",
    icon: '🔐',
    target: 'faq',
  },
  {
    q: "How do I know the experts are genuinely qualified?",
    a: "Every expert goes through a verification process before appearing on NovaSathi. They're also rated and reviewed by real users after every session. You can read reviews, check their rating, and see how many sessions they've completed before you connect.",
    icon: '✅',
    target: 'showcase',
  },
  {
    q: "How much does it actually cost?",
    a: "Your first 5 minutes with any expert are completely free — no payment required. After that, if you choose to continue, you unlock the session with a payment. Pricing varies by expert level. You always know what you'll pay before committing.",
    icon: '💰',
    target: 'pricing',
  },
  {
    q: "Is this the same as a random app or chatbot?",
    a: "Not at all. NovaSathi connects you with real, human, verified practitioners — not AI or automated responses. Every consultation is a genuine, personalised conversation with an experienced human expert.",
    icon: '👤',
    target: 'how-it-works',
  },
  {
    q: "What if I need urgent mental health support?",
    a: "NovaSathi is a platform for spiritual guidance and peer emotional support — not a crisis helpline. If you or someone you know is experiencing a mental health emergency, please contact a certified mental health professional or emergency services immediately.",
    icon: '🏥',
    target: 'faq',
  },
]

export default function Objections() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="objections"
      ref={ref}
      className="ns-section bg-alt"
    >
      <div className="ns-container" style={{ maxWidth: '1000px' }}>

        <motion.div
          style={{ textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ns-label" style={{ marginBottom: '20px' }}>
            🛡️ Before You Decide
          </div>
          <h2 className="section-headline" style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>
            Still have{' '}
            <span className="gradient-text">questions?</span>{' '}
            Let us answer them.
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Here are the most common questions people have before starting their first NovaSathi consultation.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }} className="objections-grid">
          {objections.map((o, i) => (
            <motion.div
              key={i}
              className="ns-card"
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection(o.target)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection(o.target) }}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              style={{ padding: '28px 32px', display: 'flex', gap: '16px', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '28px', flexShrink: 0 }}>{o.icon}</div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{o.q}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{o.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .objections-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
