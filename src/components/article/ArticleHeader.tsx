'use client';

import { memo } from 'react';
import type { NewsArticle } from '@/lib/types';
import { SYMBOL_CONFIGS } from '@/lib/constants';
import GlassPanel from '@/components/shared/GlassPanel';

interface ArticleHeaderProps {
  article: NewsArticle;
  isSaved: boolean;
  onToggleSave: () => void;
}

const ArticleHeader = memo(function ArticleHeader({ article, isSaved, onToggleSave }: ArticleHeaderProps) {
  const config = SYMBOL_CONFIGS.find((c) => c.domain === article.domain);

  const date = new Date(article.publishedAt);
  const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

  return (
    <GlassPanel className="mb-6" ariaLabel="文章信息">
      {config && (
        <span
          className="inline-block rounded-full px-3 py-1 text-xs"
          style={{ backgroundColor: `${config.color}20`, color: config.color }}
        >
          {config.emoji} {config.label}
        </span>
      )}

      <div className="mt-3 flex items-center gap-2 text-xs text-text-tertiary">
        <span>{article.source}</span>
        <span aria-hidden="true">·</span>
        <span>{dateStr}</span>
        <span aria-hidden="true">·</span>
        <span>阅读约 {article.readingTime} 分钟</span>
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <h1 id="article-title" className="font-display text-2xl text-text-primary">{article.title}</h1>
        <button
          onClick={onToggleSave}
          className="shrink-0 text-xl transition-transform hover:scale-110"
          aria-label={isSaved ? '取消收藏' : '收藏文章'}
        >
          {isSaved ? '⭐' : '☆'}
        </button>
      </div>
    </GlassPanel>
  );
});

export default ArticleHeader;
