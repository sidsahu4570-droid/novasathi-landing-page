import React, { useState } from 'react';

/**
 * MicroFAQ — Section 8 (Compact 4-Question Accordion)
 * Resolves remaining hesitation around cost, privacy, contact medium, and expert verification.
 */
export default function MicroFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Is the first consultation really free?",
      a: "Yes. Your first 5 minutes are free. Applicable per-minute charges apply after that."
    },
    {
      q: "Can I talk privately?",
      a: "Yes. NovaSathi is designed around private and confidential conversations."
    },
    {
      q: "Can I choose chat or call?",
      a: "Yes. Available experts can be contacted through chat, call and, where supported, video."
    },
    {
      q: "Are the experts verified?",
      a: "Yes. NovaSathi uses KYC and skill verification for its experts."
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
