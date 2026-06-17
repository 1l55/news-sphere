'use client';

import { useEffect, useRef, memo } from 'react';

const StarField = memo(function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const styleId = 'twinkle-keyframes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    const count = 40 + Math.floor(Math.random() * 60);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      const size = 1 + Math.random() * 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = 0.2 + Math.random() * 0.6;
      const duration = 1.5 + Math.random() * 3;

      star.className = 'absolute rounded-full';
      star.style.cssText = `
        left: ${x}%; top: ${y}%;
        width: ${size}px; height: ${size}px;
        background: white;
        opacity: ${opacity};
        animation: twinkle ${duration}s ease-in-out infinite;
        animation-delay: ${Math.random() * duration}s;
      `;
      fragment.appendChild(star);
    }

    container.appendChild(fragment);

    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #1E1E36 0%, #161628 50%, #0E0E1A 100%)',
      }}
      aria-hidden="true"
      role="presentation"
    />
  );
});

export default StarField;
