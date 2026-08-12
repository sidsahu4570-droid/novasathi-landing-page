import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Star } from 'lucide-react'
import { scrollToSection } from '../utils/navigation'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#features' },
  { label: 'Why NovaSathi', href: '#why-novasathi' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollToSection(href)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-scrolled' : ''}`}
        style={{
          background: scrolled ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(109, 74, 255, 0.12)',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="ns-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: scrolled ? '54px' : '62px', transition: 'height 0.3s ease' }}>

            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            >
              <div style={{
                width: scrolled ? 36 : 40,
                height: scrolled ? 36 : 40,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--purple-500)',
                boxShadow: '0 0 16px var(--purple-glow)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                background: '#06070f',
                flexShrink: 0,
                transition: 'all 0.3s ease',
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

            {/* Desktop Nav Links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="hidden-mobile">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '6px 14px',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--purple-subtle)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden-mobile">
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
                Get Started Free
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="show-mobile"
              style={{
                background: 'var(--purple-subtle)',
                border: '1px solid var(--border-purple)',
                borderRadius: '10px',
                padding: '8px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'none',
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              padding: '90px 24px 40px',
              background: 'rgba(6, 7, 15, 0.98)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
            }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '20px',
                    fontWeight: 600,
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-default)',
                    background: 'var(--bg-surface)',
                  }}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary"
              style={{ textAlign: 'center', fontSize: '16px', padding: '16px 24px', width: '100%' }}
            >
              Get Started Free ✨
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
