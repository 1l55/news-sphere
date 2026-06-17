import { memo, type ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  role?: string;
}

const GlassPanel = memo(function GlassPanel({
  children,
  className = '',
  ariaLabel,
  role,
}: GlassPanelProps) {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-lg ${className}`}
      role={role ?? 'region'}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
});

export default GlassPanel;
