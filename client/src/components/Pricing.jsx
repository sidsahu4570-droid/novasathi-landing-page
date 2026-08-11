import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import axios from 'axios'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

const defaultPlans = [
  {
    name: 'Free Trial',
    tagline: 'Try before you decide',
    service: 'General Inquiry',
    pricePerMin: 0,
    description: 'Perfect for getting a feel of the platform and connecting with an expert for the first time.',
    features: [
      '5 minutes free with any expert',
      'Access to all expert categories',
      'Chat or call consultation',
      'Phone masking protected',
      'No payment required',
    ],
    isPopular: false,
    cta: 'Start Free Now',
    order: 0,
  },
  {
    name: 'Per Session',
    tagline: 'Most popular choice',
    service: 'Vedic Astrology',
    pricePerMin: null,
    description: 'Unlock deeper guidance after your free trial. Pay only for the time you use — no subscription.',
    features: [
      'Continue after free 5 minutes',
      'Pay only what you use',
      'Pricing varies by expert',
      'Instant payment, instant access',
      'Rate & review after session',
      '100% private throughout',
    ],
    isPopular: true,
    cta: 'Explore Experts',
    order: 1,
  },
  {
    name: 'Dil Ki Baat',
    tagline: 'Emotional wellness support',
    service: 'Dil Ki Baat',
    pricePerMin: null,
    description: "Anonymous peer listening for when you need to be heard — not judged. A unique emotional support service.",
    features: [
      'Completely anonymous sessions',
      'System-generated ID protects you',
      'Trained compassionate listeners',
      'Available 24/7',
      'Not a crisis helpline (guidance only)',
    ],
    isPopular: false,
    cta: 'Talk to Someone',
    order: 2,
  },
]

const PlanCard = ({ plan, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: index * 0.15 }}
    className={plan.isPopular ? 'pricing-popular' : 'ns-card'}
    role="button"
    tabIndex={0}
    onClick={() => selectServiceAndScroll(plan.service || plan.name)}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll(plan.service || plan.name) }}
    style={{
      position: 'relative',
      padding: '22px 20px',
      borderRadius: '16px',
      cursor: 'pointer',
      transform: plan.isPopular ? 'scale(1.02)' : 'scale(1)',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
    }}
  >
    {plan.isPopular && (
      <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '3px 14px', background: 'linear-gradient(135deg, var(--purple-500), var(--purple-600))', borderRadius: '50px', fontSize: '10px', fontWeight: 700, color: 'white', letterSpacing: '0.06em', whiteSpace: 'nowrap', boxShadow: '0 4px 16px var(--purple-glow)' }}>
        ✨ MOST POPULAR
      </div>
    )}

    <div>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '10.5px', fontWeight: 700, color: plan.isPopular ? 'var(--purple-500)' : 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>{plan.tagline}</div>
        <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{plan.name}</h3>
        
        <div style={{ marginBottom: '10px' }}>
          {plan.pricePerMin === 0 ? (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '34px', fontWeight: 900, color: 'var(--green-active)' }}>FREE</span>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--purple-500)' }}>Pay-per-session</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Pricing varies by expert level</div>
            </div>
          )}
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{plan.description}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        {plan.features.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <div style={{ width: 18, height: 18, background: plan.isPopular ? 'var(--purple-subtle)' : 'rgba(0,187,127,0.12)', border: `1px solid ${plan.isPopular ? 'var(--border-purple)' : 'rgba(0,187,127,0.25)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
              <Check size={11} color={plan.isPopular ? 'var(--purple-500)' : 'var(--green-active)'} strokeWidth={3} />
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{f}</span>
          </div>
        ))}
      </div>
    </div>

    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        selectServiceAndScroll(plan.service || plan.name)
      }}
      className={plan.isPopular ? 'btn-primary' : 'btn-secondary'}
      style={{ display: 'block', textAlign: 'center', width: '100%' }}
    >
      {plan.cta}
    </button>
  </motion.div>
)

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [plans, setPlans] = useState(defaultPlans)

  useEffect(() => {
    axios.get('/api/plans').then(res => {
      if (res.data.data?.length > 0) setPlans(res.data.data)
    }).catch(() => {})
  }, [])

  return (
    <section
      id="pricing"
      ref={ref}
      className="ns-section bg-glow-purple"
    >
      <div className="ns-container">

        <motion.div
          style={{ textAlign: 'center', marginBottom: '72px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ns-label" style={{ marginBottom: '20px' }}>
            💰 Pricing
          </div>
          <h2 className="section-headline" style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>
            Simple, transparent,{' '}
            <span className="gradient-text">zero-risk pricing</span>
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Start completely free. Pay only for the guidance you choose to receive. No subscriptions, no hidden fees.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
          {plans.map((plan, i) => (
            <PlanCard key={i} plan={plan} index={i} inView={inView} />
          ))}
        </div>

        <motion.button
          type="button"
          onClick={() => scrollToSection('faq')}
          style={{
            width: '100%',
            marginTop: '48px',
            textAlign: 'center',
            padding: '24px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: '14px',
            cursor: 'pointer',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            🔒 <strong style={{ color: 'var(--text-primary)' }}>Guidance disclaimer:</strong> NovaSathi services are for spiritual guidance and emotional support only. Read our FAQs to learn more →
          </p>
        </motion.button>
      </div>
    </section>
  )
}
