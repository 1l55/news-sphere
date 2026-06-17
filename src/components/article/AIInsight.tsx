'use client';

import { useEffect, useState, memo, useCallback } from 'react';
import GlassPanel from '@/components/shared/GlassPanel';
import { useNewsStore } from '@/stores/useNewsStore';
import { generateInsight, type AIInsight as AIInsightType } from '@/services/ai-service';

const defaultInsight: AIInsightType = {
  key: '正在分析文章核心要点...',
  background: '正在检索相关背景知识...',
  viewpoints: '正在整理多方观点...',
};

const AIInsight = memo(function AIInsight({ articleId }: { articleId: string }) {
  const [insight, setInsight] = useState<AIInsightType>(defaultInsight);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');
  const articleState = useNewsStore(useCallback((s) => s.articleState, []));

  useEffect(() => {
    if (articleState.status !== 'success') return;
    const article = articleState.data;
    setStatus('loading');
    setInsight(defaultInsight);
    generateInsight(articleId, article.title, article.content)
      .then((data) => { setInsight(data); setStatus('ready'); })
      .catch(() => { setInsight(defaultInsight); setStatus('fallback'); });
  }, [articleId, articleState]);

  const isLoading = status === 'loading';

  return (
    <GlassPanel className="sticky top-6" ariaLabel="AI 洞察面板">
      <h3 className="mb-4 flex items-center gap-2 font-body font-medium text-text-primary">
        <span aria-hidden="true">🤖</span> AI 洞察
      </h3>
      <div className="space-y-4 text-sm">
        <div className={`rounded-lg border border-accent/20 bg-accent/5 p-3 transition-opacity ${isLoading ? 'animate-pulse' : ''}`}>
          <p className="mb-1 font-medium text-accent">💡 核心要点</p>
          <p className="text-text-secondary">{insight.key}</p>
        </div>
        <div className={`rounded-lg border border-white/5 bg-bg-primary/50 p-3 transition-opacity ${isLoading ? 'animate-pulse' : ''}`}>
          <p className="mb-1 font-medium text-text-primary">📚 背景知识</p>
          <p className="text-text-tertiary">{insight.background}</p>
        </div>
        <div className={`rounded-lg border border-white/5 bg-bg-primary/50 p-3 transition-opacity ${isLoading ? 'animate-pulse' : ''}`}>
          <p className="mb-1 font-medium text-text-primary">📊 多方观点</p>
          <p className="text-text-tertiary">{insight.viewpoints}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-text-tertiary">* 以上内容由 NewsSphere AI 生成，仅供参考</p>
    </GlassPanel>
  );
});

export default AIInsight;
