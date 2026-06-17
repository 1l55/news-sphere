'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { NewsDomain } from '@/lib/types';
import { VALID_DOMAINS } from '@/lib/constants';
import { useNewsStore } from '@/stores/useNewsStore';
import DomainHeader from '@/components/domain/DomainHeader';
import HeadlineCard from '@/components/domain/HeadlineCard';
import NewsCarousel from '@/components/domain/NewsCarousel';
import TagFilter from '@/components/domain/TagFilter';
import NewsList from '@/components/domain/NewsList';
import LoadingState from '@/components/shared/LoadingState';
import ErrorState from '@/components/shared/ErrorState';

const ALL_TAG = '全部';

export default function DomainPage() {
  const params = useParams();
  const router = useRouter();
  const domain = params.domain as string;
  const isValid = useMemo(() => VALID_DOMAINS.includes(domain as never), [domain]);
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const { headlineState, listState, loadHeadlines, loadNewsList } = useNewsStore();

  useEffect(() => {
    if (!isValid) return;
    loadHeadlines(domain as NewsDomain);
    loadNewsList(domain as NewsDomain);
  }, [domain, isValid, loadHeadlines, loadNewsList]);

  // Focus main content on route change
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
  }, [domain]);

  const headlines = headlineState.status === 'success' ? headlineState.data : [];
  const allArticles = listState.status === 'success' ? listState.data : [];

  const allTags = useMemo(() => {
    const set = new Set<string>();
    allArticles.forEach((a) => a.subTags.forEach((t) => set.add(t)));
    return [ALL_TAG, ...Array.from(set)];
  }, [allArticles]);

  const carouselArticles = headlines.length > 1 ? headlines : allArticles.slice(0, 4);
  const filteredArticles = activeTag === ALL_TAG ? allArticles : allArticles.filter((a) => a.subTags.includes(activeTag));

  const handleTagChange = useCallback((tag: string) => {
    setActiveTag(tag);
  }, []);

  const handleRetryHeadlines = useCallback(() => {
    loadHeadlines(domain as NewsDomain);
  }, [domain, loadHeadlines]);

  const handleGoHome = useCallback(() => {
    router.push('/');
  }, [router]);

  if (!isValid) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <ErrorState message={`未知领域: ${domain}`} onRetry={handleGoHome} />
        </div>
      </div>
    );
  }

  if (headlineState.status === 'loading' && listState.status === 'loading') {
    return <LoadingState message="正在加载领域..." />;
  }

  if (headlineState.status === 'error') {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <ErrorState message={headlineState.error} onRetry={handleRetryHeadlines} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-accent"
          aria-label="返回星空大厅"
        >
          ← 返回星空
        </Link>
        <h1 className="sr-only">{domain} 领域新闻</h1>
        <DomainHeader domain={domain as NewsDomain} />
        {headlines.length > 0 && <HeadlineCard article={headlines[0]} />}
        {carouselArticles.length > 0 && (
          <NewsCarousel articles={carouselArticles} />
        )}
        <TagFilter tags={allTags} activeTag={activeTag} onTagChange={handleTagChange} />
        <NewsList articles={filteredArticles} loading={listState.status === 'loading'} domain={domain as NewsDomain} />
      </div>
    </div>
  );
}
