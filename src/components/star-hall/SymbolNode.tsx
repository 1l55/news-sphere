'use client';

import { useState, lazy, Suspense, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SymbolConfig } from '@/lib/types';
import type { Symbol3DState } from '@/components/three-d/Symbol3D';

const Symbol3D = lazy(() => import('@/components/three-d/Symbol3D'));

interface SymbolNodeProps {
  config: SymbolConfig;
  onClick: (domain: string) => void;
  hasNew?: boolean;
  isSelected?: boolean;
}

const SymbolNode = memo(function SymbolNode({ config, onClick, hasNew, isSelected }: SymbolNodeProps) {
  const [show3D, setShow3D] = useState(false);

  const state: Symbol3DState = isSelected ? 'selected' : hasNew ? 'new-message' : 'idle';

  const handleClick = useCallback(() => {
    onClick(config.domain);
  }, [onClick, config.domain]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(config.domain);
    }
  }, [onClick, config.domain]);

  const handleMouseEnter = useCallback(() => setShow3D(true), []);
  const handleMouseLeave = useCallback(() => setShow3D(false), []);

  return (
    <motion.button
      className="group relative flex flex-col items-center gap-1 rounded-2xl p-3 transition-colors"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`${config.label}新闻${hasNew ? '，有新消息' : ''}`}
    >
      {/* 3D 悬浮态 */}
      <AnimatePresence>
        {show3D && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -inset-4 z-0"
          >
            <Suspense fallback={<div className="flex h-full items-center justify-center text-3xl">{config.emoji}</div>}>
              <Symbol3D domain={config.domain} state={state} size={0.9} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 静态态：emoji SVG */}
      <motion.div
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: `radial-gradient(circle, ${config.color}20, transparent)`,
          boxShadow: isSelected ? `0 0 30px ${config.color}60, 0 0 60px ${config.color}30` : `0 0 15px ${config.color}15`,
        }}
        animate={hasNew ? { boxShadow: [`0 0 15px ${config.color}20`, `0 0 35px ${config.color}50`, `0 0 15px ${config.color}20`] } : {}}
        transition={hasNew ? { repeat: Infinity, duration: 2 } : {}}
      >
        <img src={config.svgPath} alt={config.label} className="h-8 w-8" style={{ filter: `drop-shadow(0 0 4px ${config.color}80)` }} />
      </motion.div>

      <motion.span
        className="relative z-10 font-body text-xs font-medium"
        style={{ color: config.color }}
      >
        {config.label}
        {hasNew && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-1 inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: config.color, boxShadow: `0 0 6px ${config.color}` }}
          />
        )}
      </motion.span>
    </motion.button>
  );
});

export default SymbolNode;
