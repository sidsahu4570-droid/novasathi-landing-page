import React, { useState } from 'react';

/**
 * MicroFAQ — Section 8 (Compact 4-Question Accordion)
 * Resolves remaining hesitation around cost, privacy, contact medium, and expert verification.
 */
export default function MicroFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What birth details do I need for my consultation?",
      a: "You'll need your date of birth, exact birth time, and birthplace (city/town). These details allow the astrologer to generate your exact birth chart (Kundli)."
    },
    {
      q: "Is my consultation completely private and confidential?",
      a: "Yes. All conversations are 100% private and confidential between you and your astrologer."
    },
    {
      q: "What areas of life can I ask about?",
      a: "You can ask about career, business decisions, love, relationships, marriage compatibility, finances, and important life timing."
    },
    {
      q: "Are the astrologers verified?",
      a: "Yes. All astrologers undergo thorough background checks, credentials review, and expertise verification."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-faq content-container">
      <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
      <p className="section-subtitle" style={{ textAlign: 'center' }}>
        Quick answers to help you get started with confidence.
      </p>

      <div className="faq-list">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`glass-card faq-item ${isOpen ? 'open' : ''}`}
              onClick={() => toggleFAQ(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleFAQ(idx)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
              </div>

              {isOpen && (
                <div className="faq-answer">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
