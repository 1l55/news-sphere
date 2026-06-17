'use client';

import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { NewsArticle, NewsDomain } from '@/lib/types';
import NewsCard from '@/components/shared/NewsCard';
import LoadingState from '@/components/shared/LoadingState';
import EmptyState from '@/components/shared/EmptyState';

const NewsListItem = memo(function NewsListItem({ article }: { article: NewsArticle }) {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/article/${article.id}`);
  }, [router, article.id]);
  return <NewsCard article={article} size="md" onClick={handleClick} />;
});

interface NewsListProps {
  articles: NewsArticle[];
  loading?: boolean;
  emptyMessage?: string;
  domain: NewsDomain;
}

const NewsList = memo(function NewsList({
  articles,
  loading = false,
  emptyMessage = '该分类暂无文章',
  domain: _domain,
}: NewsListProps) {
  if (loading) {
    return <LoadingState message="正在加载文章..." />;
  }

  if (articles.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 desktop:grid-cols-2" role="list" aria-label="文章列表">
      {articles.map((article, i) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          role="listitem"
        >
          <NewsListItem article={article} />
        </motion.div>
      ))}
    </div>
  );
});

export default NewsList;
