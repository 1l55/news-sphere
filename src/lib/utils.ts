import type { NewsDomain } from './types';
import { SYMBOL_CONFIGS } from './constants';

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth()+1}月${d.getDate()}日 ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

export function getDomainLabel(d: NewsDomain): string {
  return SYMBOL_CONFIGS.find(c => c.domain === d)?.label ?? d;
}

export function getDomainColor(d: NewsDomain): string {
  return SYMBOL_CONFIGS.find(c => c.domain === d)?.color ?? '#8B8BA3';
}

export function getDomainEmoji(d: NewsDomain): string {
  return SYMBOL_CONFIGS.find(c => c.domain === d)?.emoji ?? '📰';
}

export function estimateReadingTime(text: string): number {
  return Math.max(1, Math.ceil(text.replace(/[\s\n\r]+/g, ' ').trim().split(/\s+/).length / 300));
}
