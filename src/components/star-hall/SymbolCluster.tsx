'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import SymbolNode from './SymbolNode';
import { SYMBOL_CONFIGS } from '@/lib/constants';
import { useAppStore } from '@/stores/app-store';

export default function SymbolCluster() {
  const router = useRouter();
  const navigateToDomain = useAppStore((s) => s.navigateToDomain);

  const handleClick = useCallback((domain: string) => {
    navigateToDomain(domain as never);
    router.push(`/${domain}`);
  }, [navigateToDomain, router]);

  return (
    <>
      {/* Mobile: 3x3 grid with touch-friendly spacing */}
      <div className="relative z-10 mt-8 grid w-full max-w-sm grid-cols-3 gap-3 px-4 tablet:hidden">
        {SYMBOL_CONFIGS.map((config, i) => (
          <motion.div
            key={config.domain}
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <SymbolNode config={config} onClick={handleClick} />
          </motion.div>
        ))}
      </div>

      {/* Desktop: percentage positioning */}
      <div className="relative z-10 mt-12 hidden h-[60vh] w-full max-w-3xl tablet:block">
        {SYMBOL_CONFIGS.map((config, i) => (
          <motion.div
            key={config.domain}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${config.position.x}%`,
              top: `${config.position.y}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <SymbolNode config={config} onClick={handleClick} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
