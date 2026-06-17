'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import StarField from '@/components/star-hall/StarField';
import ParticlesBackground from '@/components/star-hall/ParticlesBackground';
import ConstellationLines from '@/components/star-hall/ConstellationLines';
import StarRain from '@/components/star-hall/StarRain';
import TimeIndicator from '@/components/star-hall/TimeIndicator';

// Dynamic import: SymbolCluster contains Three.js — avoid blocking first paint
const SymbolCluster = dynamic(() => import('@/components/star-hall/SymbolCluster'), {
  ssr: false,
  loading: () => (
    <div className="relative z-10 mt-12 flex items-center justify-center">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-3 w-3 animate-pulse rounded-full bg-accent/50"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  ),
});

export default function Home() {
  const [showRain, setShowRain] = useState(false);

  const triggerRain = useCallback(() => {
    setShowRain(true);
  }, []);

  const handleRainComplete = useCallback(() => {
    setShowRain(false);
  }, []);

  // First visit: show star rain ceremony
  useEffect(() => {
    const seen = typeof window !== 'undefined' && localStorage.getItem('newssphere-star-rain-seen');
    if (!seen) setShowRain(true);
  }, []);

  // Focus management: move focus to main content on mount
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-primary pb-14">
      {/* Background layers */}
      <StarField />
      <ParticlesBackground />

      {/* Constellation connections */}
      <ConstellationLines />

      {/* Title */}
      <motion.div
        className="relative z-10 w-full pt-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-4xl tracking-tight text-text-primary">
          NewsSphere
        </h1>
        <p className="mt-2 font-body text-sm text-text-secondary">
          新闻不是信息流，而是一个有生命的世界
        </p>
      </motion.div>

      {/* Symbol Cluster — dynamically loaded (contains Three.js) */}
      <SymbolCluster />

      {/* Bottom bar */}
      <TimeIndicator />

      {/* Star Rain ceremony */}
      <StarRain show={showRain} onComplete={handleRainComplete} />

      {/* Refresh hint */}
      <button
        onClick={triggerRain}
        className="absolute bottom-16 right-4 z-30 rounded-full border border-white/10 p-2 text-text-tertiary opacity-50 transition-opacity hover:opacity-100 hover:border-accent/50"
        title="刷新星尘"
        aria-label="刷新星尘，触发星降仪式"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 2v2M8 12v2M2 8h2M12 8h2M4.5 4.5l1.5 1.5M10 10l1.5 1.5M11.5 4.5l-1.5 1.5M6 10l-1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </main>
  );
}
