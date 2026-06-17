'use client';

import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { NewsArticle } from '@/lib/types';
import { useUserStore } from '@/stores/user-store';
import NewsCard from '@/components/shared/NewsCard';

interface HeadlineCardProps {
  article: NewsArticle;
}

const HeadlineCard = memo(function HeadlineCard({ article }: HeadlineCardProps) {
  const router = useRouter();
  const toggleSave = useUserStore((s) => s.toggleSave);
  const isSaved = useUserStore((s) => s.isSaved);

  const handleClick = useCallback(() => {
    router.push(`/article/${article.id}`);
  }, [router, article.id]);

  const handleToggleSave = useCallback(() => {
    toggleSave(article.id);
  }, [toggleSave, article.id]);

  return (
    <div className="mb-6">
      <NewsCard
        article={article}
        size="lg"
        onClick={handleClick}
        onToggleSave={handleToggleSave}
        isSaved={isSaved(article.id)}
      />
    </div>
  );
});

export default HeadlineCard;
