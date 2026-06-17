'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { STAR_CONNECTIONS, SYMBOL_CONFIGS } from '@/lib/constants';
import type { SymbolConfig } from '@/lib/types';

interface LineData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function StarConnections() {
  const positionMap = useMemo(() => {
    const map = new Map<string, SymbolConfig>();
    SYMBOL_CONFIGS.forEach((c) => map.set(c.domain, c));
    return map;
  }, []);

  const lines = useMemo<LineData[]>(() => {
    return STAR_CONNECTIONS.map((conn) => {
      const from = positionMap.get(conn.from);
      const to = positionMap.get(conn.to);
      return {
        x1: from?.position.x ?? 0,
        y1: from?.position.y ?? 0,
        x2: to?.position.x ?? 0,
        y2: to?.position.y ?? 0,
      };
    });
  }, [positionMap]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] hidden tablet:block">
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(240,237,230,0.08)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -24 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </svg>
    </div>
  );
}
