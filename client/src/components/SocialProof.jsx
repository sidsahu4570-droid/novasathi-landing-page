import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import axios from 'axios'
import { selectServiceAndScroll } from '../utils/navigation'

const placeholderTestimonials = [
  {
    name: 'Anjali S.',
    location: 'Mumbai',
    service: 'Vedic Astrology',
    rating: 5,
    review: "I was completely lost about my career direction. The Vedic astrology session on NovaSathi gave me so much clarity in just 20 minutes. The guidance was incredibly specific to my situation — not the generic stuff you read online. Truly worth every rupee.",
  },
  {
    name: 'Rahul M.',
    location: 'Bangalore',
    service: 'Dil Ki Baat',
    rating: 5,
    review: "I'd been carrying emotional weight for months but couldn't talk to anyone I knew. Dil Ki Baat gave me a completely private space to open up. The listener was so compassionate and understanding. I felt genuinely heard for the first time in a long while.",
  },
  {
    name: 'Priya K.',
    location: 'Delhi',
    service: 'Tarot Reading',
    rating: 5,
    review: "Was skeptical at first — but the tarot reading I got on NovaSathi was shockingly accurate. The reader identified patterns in my relationship that I'd been ignoring. It pushed me to make a decision I'd been avoiding for 2 years. Life-changing, honestly.",
  },
  {
    name: 'Vikash T.',
    location: 'Pune',
    service: 'Numerology',
    rating: 5,
    review: "The numerology session helped me understand why I keep repeating the same patterns in business. Understanding my life path number was eye-opening. NovaSathi made it so simple and accessible — I've already referred 4 friends.",
  },
  {
    name: 'Sneha R.',
    location: 'Chennai',
    service: 'Vedic Astrology',
    rating: 5,
    review: "What I love most is the privacy. I didn't want anyone to know I was consulting an astrologer — NovaSathi's phone masking means the expert never got my number. The reading itself was exceptional. I've already booked a second session.",
  },
  {
    name: 'Arjun P.',
    location: 'Hyderabad',
    service: 'Vastu',
    rating: 5,
    review: "Had persistent issues in my home and office that no one could explain. The Vastu consultation identified the exact problem areas. After the recommended changes, things genuinely shifted. NovaSathi connected me with an expert who actually knew what they were talking about.",
  },
]

const StarRating = ({ rating }) => (
  <div style={{ display: 'flex', gap: '3px' }}>
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} fill={i < rating ? '#f99c00' : 'transparent'} color={i < rating ? '#f99c00' : 'rgba(255,255,255,0.2)'} />
    ))}
  </div>
)

export default function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [testimonials, setTestimonials] = useState(placeholderTestimonials)

  useEffect(() => {
    axios.get('/api/testimonials').then(res => {
      if (res.data.data?.length > 0) setTestimonials(res.data.data)
    }).catch(() => {})
  }, [])

  return (
    <section
      id="reviews"
      ref={ref}
      className="ns-section bg-alt"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="ns-container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div
          style={{ textAlign: 'center', marginBottom: '24px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ns-label" style={{ marginBottom: '10px' }}>
            💬 Real Stories
          </div>
          <h2 className="section-headline" style={{ marginBottom: '10px', color: 'var(--text-primary)' }}>
            Lives transformed by{' '}
            <span className="gradient-text">real guidance</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.55 }}>
            Thousands of people have found clarity, peace, and direction through NovaSathi. Here's what they say.
          </p>

          {/* Rating summary */}
          <button
            type="button"
            onClick={() => selectServiceAndScroll('General Inquiry')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '14px',
              padding: '8px 18px',
              background: 'var(--amber-subtle)',
              border: '1px solid var(--border-amber)',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
          >
            <div style={{ display: 'flex', gap: '3px' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f99c00" color="#f99c00" />)}
            </div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>4.9/5</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Average rating from consultations →</span>
          </button>
        </motion.div>

        {/* Testimonials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="ns-card"
              role="button"
              tabIndex={0}
              onClick={() => selectServiceAndScroll(t.service)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll(t.service) }}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              style={{ padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <StarRating rating={t.rating} />
                  <span style={{ fontSize: '11px', color: 'var(--purple-500)', fontWeight: 600, padding: '2px 8px', background: 'var(--purple-subtle)', borderRadius: '12px' }}>{t.service}</span>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '14px', fontStyle: 'italic' }}>
                  "{t.review}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg, var(--purple-500), var(--amber-500))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: '#white', flexShrink: 0 }}>
                    {t.name?.[0] || '?'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.location}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <StarRating rating={t.rating || 5} />
                  <div style={{ fontSize: '11px', color: 'var(--purple-500)', fontWeight: 600 }}>{t.service} →</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .testimonials-masonry { columns: 2 !important; } }
        @media (max-width: 600px) { .testimonials-masonry { columns: 1 !important; } }
      `}</style>
    </section>
  )
}
