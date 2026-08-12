import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Plus, Minus } from 'lucide-react'
import axios from 'axios'
import { selectServiceAndScroll } from '../utils/navigation'

const defaultFaqs = [
  { question: "What exactly is NovaSathi?", answer: "NovaSathi connects you with verified astrologers, tarot readers, numerologists, Vastu consultants, and peer counselors for 24/7 private guidance." },
  { question: "How does the free 5-minute consultation work?", answer: "Your first 5 minutes with any expert are completely free. No credit card or payment required to start chatting or calling." },
  { question: "Are the experts genuinely verified?", answer: "Yes. Every practitioner undergoes background verification and has ratings/reviews from real users visible on their profile." },
  { question: "Is my privacy truly protected?", answer: "Absolutely. End-to-end phone masking hides your real number. 'Dil Ki Baat' uses system-generated anonymous IDs so your identity stays private." },
  { question: "What is 'Dil Ki Baat'?", answer: "'Dil Ki Baat' provides a completely anonymous, judgment-free space to speak with compassionate peer listeners about what is on your heart." },
  { question: "How much does a session cost after the free trial?", answer: "Rates vary by expert and are displayed on their profile. You are shown the exact per-minute/session cost before unlocking. Zero hidden fees." },
  { question: "Do I need to download an app?", answer: "No download needed! NovaSathi is a Progressive Web App (PWA) accessible directly from any browser or home screen." },
  { question: "Is NovaSathi substitute for professional therapy?", answer: "No. NovaSathi is for spiritual guidance & peer support. It is not a substitute for certified medical, psychological, or legal crisis therapy." },
]

const FAQItem = ({ faq, index, inView }) => {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04 }}
      className={`faq-item ${open ? 'open' : ''}`}
      style={{ marginBottom: '6px' }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ width: '100%', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', minHeight: '46px' }}
      >
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{faq.question}</span>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: open ? 'var(--purple-subtle)' : 'rgba(255,255,255,0.05)', border: `1px solid ${open ? 'var(--border-purple)' : 'var(--border-default)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.25s ease' }}>
          {open ? <Minus size={12} color="var(--purple-500)" /> : <Plus size={12} color="var(--text-secondary)" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div style={{ padding: '0 14px 12px', paddingTop: '0' }}>
              <div style={{ height: '1px', background: 'var(--border-purple)', marginBottom: '8px', opacity: 0.5 }} />
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [faqs, setFaqs] = useState(defaultFaqs)

  useEffect(() => {
    axios.get('/api/faqs').then(res => {
      if (res.data.data?.length > 0) setFaqs(res.data.data)
    }).catch(() => {})
  }, [])

  return (
    <section
      id="faq"
      ref={ref}
      className="ns-section bg-glow-purple"
    >
      <div className="ns-container" style={{ maxWidth: '780px' }}>

        <motion.div
          style={{ textAlign: 'center', marginBottom: '14px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="ns-label" style={{ marginBottom: '6px' }}>
            ❓ Frequently Asked Questions
          </div>
          <h2 className="section-headline" style={{ marginBottom: '4px', color: 'var(--text-primary)' }}>
            Got questions? <span className="gradient-text">We've got answers</span>
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.4 }}>
            Everything you need to know about starting your free 5-minute session.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} inView={inView} />
          ))}
        </div>

        {/* Still have questions banner */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '16px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Still have questions?{' '}
            <button
              type="button"
              onClick={() => selectServiceAndScroll('General Inquiry')}
              style={{ background: 'none', border: 'none', color: 'var(--purple-500)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
            >
              Ask our team directly →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
