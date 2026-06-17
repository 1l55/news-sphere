'use client';

import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { NewsArticle } from '@/lib/types';
import { SYMBOL_CONFIGS } from '@/lib/constants';

interface NewsListItemProps {
  article: NewsArticle;
  isRead: boolean;
  onClick: () => void;
}

const NewsListItem = memo(function NewsListItem({ article, isRead, onClick }: NewsListItemProps) {
  const config = SYMBOL_CONFIGS.find((c) => c.domain === article.domain);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);

  return (
    <motion.div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`flex cursor-pointer items-center gap-3 border-b border-white/5 py-3 transition-opacity ${
        isRead ? 'opacity-50' : ''
      }`}
      whileHover={{ x: 4 }}
      role="article"
      tabIndex={0}
      aria-label={`文章: ${article.title}${isRead ? '（已读）' : ''}`}
    >
      {config && (
        <div
          className="h-8 w-1 shrink-0 rounded-full"
          style={{ backgroundColor: config.color }}
          aria-hidden="true"
        />
      )}
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm text-text-primary">{article.title}</h4>
        <p className="mt-0.5 text-xs text-text-tertiary">{article.source}</p>
      </div>
    </motion.div>
  );
});

export default NewsListItem;
