'use client';

import { memo } from 'react';
import type { NewsArticle } from '@/lib/types';
import { SYMBOL_CONFIGS } from '@/lib/constants';

interface NewsCardProps {
  article: NewsArticle;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  onToggleSave?: () => void;
  isSaved?: boolean;
  isRead?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'p-3 text-xs',
  md: 'p-4 text-sm',
  lg: 'p-6 text-base',
};

const NewsCard = memo(function NewsCard({
  article,
  size = 'md',
  onClick,
  onToggleSave,
  isSaved = false,
  isRead = false,
  className = '',
}: NewsCardProps) {
  const config = SYMBOL_CONFIGS.find((c) => c.domain === article.domain);

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group cursor-pointer rounded-xl border border-white/5 bg-bg-secondary transition-all hover:border-white/10 hover:bg-bg-tertiary ${sizeClasses[size]} ${isRead ? 'opacity-50' : ''} ${className}`}
      role="article"
      tabIndex={0}
      aria-label={`文章: ${article.title}${isRead ? '（已读）' : ''}`}
    >
      <div className="flex items-start gap-3">
        {config && (
          <span
            className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-xs"
            style={{ backgroundColor: `${config.color}20`, color: config.color }}
          >
            {config.emoji} {config.label}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className={`font-medium text-text-primary ${size === 'lg' ? 'text-lg' : 'text-sm'}`}>
            {article.title}
          </h3>
          {(size === 'md' || size === 'lg') && (
            <p className="mt-1 line-clamp-2 text-text-secondary">{article.summary}</p>
          )}
          <div className="mt-2 flex items-center gap-2 text-xs text-text-tertiary">
            <span>{article.source}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime} 分钟</span>
          </div>
        </div>
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className="shrink-0 text-lg transition-colors hover:scale-110"
            aria-label={isSaved ? '取消收藏' : '收藏文章'}
          >
            {isSaved ? '⭐' : '☆'}
          </button>
        )}
      </div>
    </div>
  );
});

export default NewsCard;
