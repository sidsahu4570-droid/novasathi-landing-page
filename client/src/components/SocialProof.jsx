import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Star, ShieldCheck } from 'lucide-react'
import axios from 'axios'
import { selectServiceAndScroll } from '../utils/navigation'

const placeholderTestimonials = [
  { name: 'Ananya Sharma', rating: 5, review: 'NovaSathi gave me exact career direction when I was feeling stuck. The astrologer was incredibly accurate!', service: 'Vedic Astrology' },
  { name: 'Rohan Verma', rating: 5, review: 'Dil Ki Baat was a lifesaver. Being able to share what I was going through anonymously gave me complete peace of mind.', service: 'Dil Ki Baat' },
  { name: 'Pooja Mehta', rating: 5, review: 'The tarot reading was spot-on. Simple, honest, and the 5-minute free trial let me test it with zero pressure.', service: 'Tarot Reading' },
]

const verifiedExperts = [
  { name: 'Acharya Ankit', role: 'Vedic Astrology', exp: '12+ yrs', rating: '4.9 ⭐' },
  { name: 'Meera Kapoor', role: 'Tarot Reading', exp: '8+ yrs', rating: '4.8 ⭐' },
  { name: 'Counselor Priya', role: 'Dil Ki Baat', exp: '6+ yrs', rating: '5.0 ⭐' },
  { name: 'Pt. Ramesh', role: 'Numerology & Vastu', exp: '15+ yrs', rating: '4.9 ⭐' },
]

export default function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [testimonials, setTestimonials] = useState(placeholderTestimonials)

  useEffect(() => {
    axios.get('/api/testimonials').then(res => {
      if (res.data.data?.length > 0) setTestimonials(res.data.data.slice(0, 3))
    }).catch(() => {})
  }, [])

  return (
    <section
      id="reviews"
      ref={ref}
      className="ns-section bg-glow-amber"
      style={{ position: 'relative' }}
    >
      <div id="showcase" style={{ position: 'absolute', top: 0 }} />

      <div className="ns-container">

        <motion.div
          style={{ textAlign: 'center', marginBottom: '14px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="ns-label-amber" style={{ marginBottom: '4px' }}>
            💬 Trust & Real Reviews
          </div>
          <h2 className="section-headline" style={{ marginBottom: '4px', color: 'var(--text-primary)' }}>
            Trusted by thousands for <span style={{ color: 'var(--amber-500)' }}>real direction</span>
          </h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'var(--amber-subtle)', border: '1px solid var(--border-amber)', borderRadius: '50px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#f99c00" color="#f99c00" />)}
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>4.9/5 Rating</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>· 150+ Verified Practitioners</span>
          </div>
        </motion.div>

        {/* Expert Roster Quick Preview Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginBottom: '12px' }}>
          {verifiedExperts.map((exp, idx) => (
            <div
              key={idx}
              className="ns-card"
              role="button"
              tabIndex={0}
              onClick={() => selectServiceAndScroll(exp.role)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll(exp.role) }}
              style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{exp.name}</div>
                <div style={{ fontSize: '10.5px', color: 'var(--purple-500)' }}>{exp.role} ({exp.exp})</div>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#f99c00' }}>{exp.rating}</div>
            </div>
          ))}
        </div>

        {/* Testimonials 3-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="ns-card"
              role="button"
              tabIndex={0}
              onClick={() => selectServiceAndScroll(t.service)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll(t.service) }}
              style={{ padding: '12px 14px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={11} fill="#f99c00" color="#f99c00" />)}
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--purple-500)', fontWeight: 600, padding: '2px 6px', background: 'var(--purple-subtle)', borderRadius: '8px' }}>{t.service}</span>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: '8px', fontStyle: 'italic' }}>
                  "{t.review}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 24, height: 24, background: 'linear-gradient(135deg, var(--purple-500), var(--amber-500))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                  {t.name?.[0] || '?'}
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: '10px', color: 'var(--green-active)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <ShieldCheck size={10} /> Verified Consultation
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
