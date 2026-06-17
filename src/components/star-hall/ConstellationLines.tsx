'use client';

import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { STAR_CONNECTIONS, SYMBOL_CONFIGS } from '@/lib/constants';

const ConstellationLines = memo(function ConstellationLines() {
  const lines = useMemo(() => {
    return STAR_CONNECTIONS.map((conn) => {
      const from = SYMBOL_CONFIGS.find((c) => c.domain === conn.from);
      const to = SYMBOL_CONFIGS.find((c) => c.domain === conn.to);
      if (!from || !to) return null;

      const dx = to.position.x - from.position.x;
      const dy = to.position.y - from.position.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      return {
        id: `${conn.from}-${conn.to}`,
        from,
        to,
        length,
        angle,
        x: from.position.x,
        y: from.position.y,
      };
    }).filter(Boolean) as Array<{
      id: string;
      from: { color: string };
      to: { color: string };
      length: number;
      angle: number;
      x: number;
      y: number;
    }>;
  }, []);

  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full tablet:block"
      style={{ zIndex: 1 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        {lines.map((line) => (
          <linearGradient key={`grad-${line.id}`} id={`grad-${line.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={line.from.color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={line.to.color} stopOpacity={0.3} />
          </linearGradient>
        ))}
      </defs>

      {lines.map((line, i) => (
        <motion.line
          key={line.id}
          x1={line.x}
          y1={line.y}
          x2={line.x + Math.cos(line.angle * Math.PI / 180) * line.length}
          y2={line.y + Math.sin(line.angle * Math.PI / 180) * line.length}
          stroke={`url(#grad-${line.id})`}
          strokeWidth="0.1"
          strokeDasharray="0.5 1"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.5, 0.2], strokeDashoffset: [0, -3] }}
          transition={{
            opacity: { repeat: Infinity, duration: 3, delay: i * 0.3 },
            strokeDashoffset: { repeat: Infinity, duration: 8 },
          }}
          style={{ filter: 'blur(1px)' }}
        />
      ))}
    </svg>
  );
});

export default ConstellationLines;
