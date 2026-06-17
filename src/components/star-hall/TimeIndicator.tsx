'use client';

import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import type { TimeOfDay } from '@/lib/types';

function detectTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'morning' : 'evening';
}

const TimeIndicator = memo(function TimeIndicator() {
  const [time, setTime] = useState<string>('');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');

  useEffect(() => {
    setTimeOfDay(detectTimeOfDay());
    const update = () => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    };
    update();
    const interval = setInterval(update, 60000);
    const todInterval = setInterval(() => setTimeOfDay(detectTimeOfDay()), 300000);
    return () => { clearInterval(interval); clearInterval(todInterval); };
  }, []);

  const isMorning = timeOfDay === 'morning';
  const greeting = isMorning ? '🌅 晨间启明' : '🌙 夜间星语';
  const subtitle = isMorning ? 'Morning Brief' : 'Night Review';

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-20 border-t bg-bg-primary/85 backdrop-blur-md"
      style={{ borderColor: isMorning ? 'rgba(100, 181, 246, 0.1)' : 'rgba(206, 147, 216, 0.1)' }}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
      role="status"
      aria-label={`当前时间 ${time}，${greeting}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2.5">
        <div className="flex items-center gap-3">
          <span className="font-body text-xs font-medium text-text-primary">{greeting}</span>
          <span className="font-mono text-xs text-text-tertiary">{subtitle}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-text-tertiary">
          <span>{time}</span>
          <span className="h-1 w-1 rounded-full bg-text-tertiary" aria-hidden="true" />
          <span>上次更新 {time || '09:00'}</span>
        </div>
      </div>
    </motion.div>
  );
});

export default TimeIndicator;
