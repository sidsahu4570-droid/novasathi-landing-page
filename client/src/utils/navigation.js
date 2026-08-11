/**
 * Global Navigation & Event Bus Helper for NovaSathi Landing Page
 */

export const scrollToSection = (sectionId = 'contact') => {
  const target = sectionId.startsWith('#') ? sectionId : `#${sectionId}`
  const el = document.querySelector(target)
  if (el) {
    const navHeight = 84
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - navHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

export const selectServiceAndScroll = (serviceName, sectionId = 'contact') => {
  if (serviceName) {
    // Map short or alternate service names to official options in ContactForm
    let officialService = serviceName
    if (serviceName.toLowerCase().includes('astro')) officialService = 'Vedic Astrology'
    else if (serviceName.toLowerCase().includes('tarot')) officialService = 'Tarot Reading'
    else if (serviceName.toLowerCase().includes('num')) officialService = 'Numerology'
    else if (serviceName.toLowerCase().includes('vas')) officialService = 'Vastu'
    else if (serviceName.toLowerCase().includes('dil') || serviceName.toLowerCase().includes('emotional')) officialService = 'Dil Ki Baat'
    
    window.dispatchEvent(new CustomEvent('novasathi:select_service', { 
      detail: { service: officialService } 
    }))
  }
  scrollToSection(sectionId)
}
