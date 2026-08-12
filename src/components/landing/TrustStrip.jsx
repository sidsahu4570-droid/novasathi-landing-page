import React from 'react';

/**
 * TrustStrip — Section 5 (Compact Trust Indicator Strip)
 * Reinforces safety, privacy, and zero risk in one elegant horizontal glass pill bar.
 */
export default function TrustStrip() {
  const items = [
    { icon: '🎁', text: '5 MIN FREE' },
    { icon: '🛡️', text: 'VERIFIED EXPERTS' },
    { icon: '🔒', text: 'PRIVATE CONVERSATIONS' },
    { icon: '💳', text: 'SECURE PAYMENTS' }
  ];

  return (
    <div className="trust-strip-container content-container">
      <div className="trust-strip">
        {items.map((item, idx) => (
          <React.Fragment key={item.text}>
            <div className="trust-strip-item">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
            {idx < items.length - 1 && (
              <span className="trust-strip-divider" aria-hidden="true">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
