'use client';

import { useRef, memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { NewsArticle } from '@/lib/types';
import NewsCard from '@/components/shared/NewsCard';

const CarouselItem = memo(function CarouselItem({ article }: { article: NewsArticle }) {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/article/${article.id}`);
  }, [router, article.id]);
  return <NewsCard article={article} size="md" onClick={handleClick} />;
});

interface NewsCarouselProps {
  articles: NewsArticle[];
}

const NewsCarousel = memo(function NewsCarousel({ articles }: NewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  }, []);

  if (articles.length === 0) return null;

  return (
    <div className="relative mb-8" role="region" aria-label="精选头条轮播">
      <h2 className="mb-3 font-display text-lg text-text-primary">精选头条</h2>

      <button
        onClick={() => scrollBy('left')}
        className="absolute -left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-bg-secondary text-text-secondary transition-colors hover:border-accent hover:text-accent"
        aria-label="向左滚动头条"
      >
        ‹
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        role="list"
        aria-label="头条文章列表"
      >
        {articles.map((article) => (
          <div key={article.id} className="min-w-[280px] shrink-0" role="listitem">
            <CarouselItem article={article} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollBy('right')}
        className="absolute -right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-bg-secondary text-text-secondary transition-colors hover:border-accent hover:text-accent"
        aria-label="向右滚动头条"
      >
        ›
      </button>
    </div>
  );
});

export default NewsCarousel;
