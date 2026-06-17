'use client';

import { useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNewsStore } from '@/stores/useNewsStore';
import { useUserStore } from '@/stores/useUserStore';
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleBody from '@/components/article/ArticleBody';
import AIInsight from '@/components/article/AIInsight';
import RelatedNews from '@/components/article/RelatedNews';
import LoadingState from '@/components/shared/LoadingState';
import ErrorState from '@/components/shared/ErrorState';

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { articleState, relatedState, loadArticle, loadRelated } = useNewsStore();
  const { markAsRead, toggleSave, isSaved } = useUserStore();

  useEffect(() => { loadArticle(id); }, [id, loadArticle]);

  useEffect(() => {
    if (articleState.status === 'success') {
      markAsRead(id);
      loadRelated(articleState.data.relatedIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleState.status, id, markAsRead, loadRelated]);

  // Focus main content on mount
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
  }, [id]);

  // Escape key to go back
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') router.push('/'); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router]);

  const handleRetryArticle = useCallback(() => {
    loadArticle(id);
  }, [id, loadArticle]);

  const handleGoHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleToggleSave = useCallback((articleId: string) => {
    toggleSave(articleId);
  }, [toggleSave]);

  if (articleState.status === 'loading') return <LoadingState message="正在加载文章..." />;
  if (articleState.status === 'error') return <div className="min-h-screen bg-bg-primary"><div className="mx-auto max-w-4xl px-4 py-8"><ErrorState message={articleState.error} onRetry={handleRetryArticle} /></div></div>;
  if (articleState.status === 'empty') return <div className="min-h-screen bg-bg-primary"><div className="mx-auto max-w-4xl px-4 py-8"><ErrorState message="文章未找到" onRetry={handleGoHome} /></div></div>;
  if (articleState.status !== 'success') return null;

  const article = articleState.data;
  const relatedArticles = relatedState.status === 'success' ? relatedState.data : [];

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="sticky top-0 z-30 border-b border-white/5 bg-bg-primary/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4 text-sm">
            <Link href={`/${article.domain}`} className="text-text-secondary transition-colors hover:text-accent" aria-label={`返回${article.domain}领域`}>← 返回领域</Link>
            <span className="text-text-tertiary" aria-hidden="true">|</span>
            <span className="text-xs text-text-tertiary">按 Esc 返回星空</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <article className="flex flex-col gap-8 desktop:flex-row" aria-labelledby="article-title">
          <div className="min-w-0 flex-1">
            <ArticleHeader article={article} isSaved={isSaved(article.id)} onToggleSave={() => handleToggleSave(article.id)} />
            <ArticleBody content={article.content} />
            <div className="mt-8"><RelatedNews articles={relatedArticles} /></div>
          </div>
          <aside className="w-full desktop:w-80 desktop:shrink-0" aria-label="AI 洞察边栏">
            <AIInsight articleId={article.id} />
          </aside>
        </article>
      </div>
    </div>
  );
}
