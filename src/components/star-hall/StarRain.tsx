'use client';

import { useEffect, useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RITUAL_DURATION = 3000;
const HAS_SEEN_KEY = 'newssphere-star-rain-seen';

interface Props {
  show: boolean;
  onComplete: () => void;
}

const StarRain = memo(function StarRain({ show, onComplete }: Props) {
  const [phase, setPhase] = useState<'dim' | 'shower' | 'brighten' | 'done'>('done');

  const handleComplete = useCallback(() => {
    setPhase('done');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (!show) {
      if (typeof window !== 'undefined' && !localStorage.getItem(HAS_SEEN_KEY)) {
        localStorage.setItem(HAS_SEEN_KEY, 'true');
        return;
      }
      if (phase !== 'done') setPhase('done');
      return;
    }
    setPhase('dim');
    const t1 = setTimeout(() => setPhase('shower'), 400);
    const t2 = setTimeout(() => setPhase('brighten'), 1600);
    const t3 = setTimeout(() => { handleComplete(); }, RITUAL_DURATION);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [show, handleComplete, phase]);

  return (
    <AnimatePresence>
      {(show || phase !== 'done') && (
        <>
          {/* 暗化遮罩 */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-40"
            animate={{ background: phase === 'dim' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)' }}
            transition={{ duration: 0.6 }}
            aria-hidden="true"
          />

          {/* 流星粒子 */}
          {phase === 'shower' && (
            <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute h-0.5 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #E8C547, #FFF)',
                    top: `${20 + Math.random() * 40}%`,
                    left: 0,
                    width: `${80 + Math.random() * 40}px`,
                  }}
                  initial={{ x: '-10%', y: 0, opacity: 0 }}
                  animate={{ x: '110%', y: -20 - Math.random() * 30, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.0 + Math.random() * 0.5, delay: i * 0.2, ease: 'easeIn' }}
                />
              ))}

              {/* 金色光晕 */}
              <motion.div
                className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: 'radial-gradient(circle, #E8C547, transparent)' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 20, 40], opacity: [0, 0.4, 0] }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />
            </div>
          )}

          {/* 更新时间戳 */}
          <motion.div
            className="pointer-events-none fixed bottom-16 z-50 w-full text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'brighten' ? 1 : 0, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-live="polite"
          >
            <p className="font-mono text-sm text-accent">✦ 星尘更新完毕 ✦</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default StarRain;
