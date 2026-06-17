'use client';

import { memo } from 'react';
import type { NewsArticle } from '@/lib/types';
import GlassPanel from '@/components/shared/GlassPanel';
import NewsCard from '@/components/shared/NewsCard';
import EmptyState from '@/components/shared/EmptyState';

interface RelatedNewsProps {
  articles: NewsArticle[];
}

const RelatedNews = memo(function RelatedNews({ articles }: RelatedNewsProps) {
  if (articles.length === 0) {
    return (
      <GlassPanel ariaLabel="相关文章">
        <h3 className="mb-4 font-display text-lg text-text-primary">📰 相关文章</h3>
        <EmptyState message="暂无相关文章" icon="📭" />
      </GlassPanel>
    );
  }

  return (
    <GlassPanel ariaLabel="相关文章">
      <h3 className="mb-4 font-display text-lg text-text-primary">📰 相关文章</h3>
      <div className="grid grid-cols-1 gap-3 desktop:grid-cols-2" role="list">
        {articles.map((article) => (
          <div key={article.id} role="listitem">
            <NewsCard article={article} size="sm" />
          </div>
        ))}
      </div>
    </GlassPanel>
  );
});

export default RelatedNews;
