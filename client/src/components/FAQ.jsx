import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Plus, Minus } from 'lucide-react'
import axios from 'axios'
import { selectServiceAndScroll } from '../utils/navigation'

const defaultFaqs = [
  { question: "What exactly is NovaSathi?", answer: "NovaSathi is an online platform that connects you with verified astrologers, tarot readers, numerologists, Vastu consultants, and emotional wellness counselors. It's designed to give you personalised spiritual guidance and emotional support — privately, conveniently, and 24/7.", category: 'general' },
  { question: "How does the free 5-minute consultation work?", answer: "When you connect with any expert, the first 5 minutes are completely free. No payment, no credit card. You simply start chatting or calling. After 5 minutes, if you'd like to continue, you'll be prompted to unlock the session with a payment.", category: 'services' },
  { question: "Are the experts genuinely verified?", answer: "Yes. Every practitioner on NovaSathi undergoes a verification process before they're listed on the platform. Additionally, every expert has ratings and reviews from real users visible on their profile — so you can check their track record before connecting.", category: 'general' },
  { question: "Is my privacy truly protected?", answer: "Absolutely. NovaSathi uses end-to-end phone masking, which means the expert never sees your real phone number. For 'Dil Ki Baat' emotional wellness sessions, you're identified by a system-generated anonymous ID, not your real identity. Your personal data is never shared.", category: 'privacy' },
  { question: "What is 'Dil Ki Baat'?", answer: "'Dil Ki Baat' (meaning 'Words from the Heart') is NovaSathi's unique emotional wellness service. It provides a completely anonymous, judgment-free space where you can speak to a compassionate peer listener about what's weighing on your heart. It's not therapy or a crisis helpline — it's a safe, human space to be heard.", category: 'services' },
  { question: "How much does a session cost after the free trial?", answer: "Pricing varies by expert and their experience level. You'll see each expert's per-minute or per-session rate on their profile before you connect. After your free 5 minutes, you'll be clearly shown the cost before unlocking. There are no hidden charges.", category: 'pricing' },
  { question: "Do I need to download an app?", answer: "No app download needed! NovaSathi is a Progressive Web App (PWA). You can access it directly from your browser and optionally install it to your home screen in one tap — just like an app, but without going through an app store.", category: 'process' },
  { question: "Is it available in Hindi or regional languages?", answer: "Many experts on NovaSathi offer consultations in Hindi and regional Indian languages. You can check an expert's language of consultation on their profile before connecting.", category: 'process' },
  { question: "Can I choose which expert I want to talk to?", answer: "Yes. You browse a full directory of experts, filtered by category (astrology, tarot, etc.), rating, availability, and speciality. You select the expert who feels right, and connect directly with them.", category: 'process' },
  { question: "What if NovaSathi is not right for me?", answer: "Since the first 5 minutes are completely free, there's no financial risk to trying. If you don't feel the session is for you, simply don't unlock the paid continuation. You only pay when you actively choose to.", category: 'pricing' },
  { question: "Is NovaSathi a substitute for professional therapy or medical advice?", answer: "No. NovaSathi is for spiritual guidance and peer emotional support only. It is not a substitute for certified professional medical, psychological, or legal advice. If you're experiencing a mental health crisis, please contact emergency services or a certified mental health professional.", category: 'support' },
  { question: "How do I get started?", answer: "Simply visit NovaSathi, browse the expert directory, select an expert whose profile resonates with you, and start your free 5-minute consultation. No registration barrier, no payment required to start.", category: 'general' },
]

const FAQItem = ({ faq, index, inView }) => {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05 }}
      className={`faq-item ${open ? 'open' : ''}`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>{faq.question}</span>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: open ? 'var(--purple-subtle)' : 'rgba(255,255,255,0.05)', border: `1px solid ${open ? 'var(--border-purple)' : 'var(--border-default)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.25s ease' }}>
          {open ? <Minus size={14} color="var(--purple-500)" /> : <Plus size={14} color="var(--text-secondary)" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div style={{ padding: '0 24px 20px', paddingTop: '0' }}>
              <div style={{ height: '1px', background: 'var(--border-purple)', marginBottom: '14px' }} />
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
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
      <div className="ns-container" style={{ maxWidth: '820px' }}>

        <motion.div
          style={{ textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ns-label" style={{ marginBottom: '20px' }}>
            ❓ FAQ
          </div>
          <h2 className="section-headline" style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>
            <span className="gradient-text">Frequently asked</span> questions
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Everything you need to know before your first session.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          className="ns-card-purple"
          style={{ marginTop: '48px', textAlign: 'center', padding: '28px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Still have a question that's not answered here?
          </p>
          <button
            type="button"
            onClick={() => selectServiceAndScroll('General Inquiry')}
            className="btn-secondary"
          >
            Ask Us Directly →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
