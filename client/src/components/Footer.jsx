import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

const footerLinks = {
  Platform: [
    { label: 'Vedic Astrology', service: 'Vedic Astrology' },
    { label: 'Tarot Reading', service: 'Tarot Reading' },
    { label: 'Numerology', service: 'Numerology' },
    { label: 'Vastu Shastra', service: 'Vastu' },
    { label: 'Dil Ki Baat', service: 'Dil Ki Baat' },
  ],
  Company: [
    { label: 'About NovaSathi', href: 'https://novasathi.com/about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why NovaSathi', href: '#why-novasathi' },
    { label: 'Become an Expert', href: 'https://novasathi.com' },
  ],
  Support: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Privacy Policy', href: 'https://novasathi.com/privacy' },
    { label: 'Terms & Conditions', href: 'https://novasathi.com/terms' },
  ],
}

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const handleLinkClick = (e, link) => {
    if (link.service) {
      e.preventDefault()
      selectServiceAndScroll(link.service)
    } else if (link.href && link.href.startsWith('#')) {
      e.preventDefault()
      scrollToSection(link.href)
    }
  }

  return (
    <footer
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, var(--bg-alt) 0%, #03040a 100%)',
        borderTop: '1px solid var(--border-default)',
        padding: '80px 24px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="ns-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
              style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '20px', textDecoration: 'none' }}
            >
              <div style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--purple-500)',
                boxShadow: '0 0 20px var(--purple-glow)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                background: '#06070f',
                flexShrink: 0,
              }}>
                <img
                  src="/logo.jpg"
                  alt="Nova Sathi"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </div>
            </a>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '280px', marginBottom: '24px' }}>
              Your Spiritual Companion — connecting you with verified astrologers, tarot readers, numerologists, and emotional wellness counselors. Available 24/7, completely private.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { emoji: '📘', label: 'Facebook', href: 'https://novasathi.com' },
                { emoji: '📸', label: 'Instagram', href: 'https://novasathi.com' },
                { emoji: '🐦', label: 'Twitter', href: 'https://novasathi.com' },
                { emoji: '▶️', label: 'YouTube', href: 'https://youtube.com' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--purple-subtle)'; e.currentTarget.style.borderColor = 'var(--border-purple)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-surface)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
                >
                  {s.emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--purple-500)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>{section}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map(link => (
                  <a
                    key={link.label}
                    href={link.href || '#contact'}
                    onClick={(e) => handleLinkClick(e, link)}
                    target={link.href && link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href && link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          style={{ padding: '20px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '12px', marginBottom: '40px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-secondary)' }}>Disclaimer:</strong> NovaSathi provides spiritual guidance and peer emotional support services for entertainment and informational purposes only. Services are not a substitute for professional medical, psychological, legal, or financial advice. NovaSathi's "Dil Ki Baat" service is not a crisis helpline. If you are experiencing a mental health emergency, please contact emergency services or a certified mental health professional immediately.
          </p>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--border-default)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} NovaSathi. All rights reserved.
          </span>

          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'Privacy Policy', href: 'https://novasathi.com/privacy' },
              { label: 'Terms & Conditions', href: 'https://novasathi.com/terms' },
              { label: 'Disclaimer', href: 'https://novasathi.com' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Made with</span>
            <span style={{ color: 'var(--amber-500)' }}>✨</span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>in India</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
