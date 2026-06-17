import { memo } from 'react';
import type { NewsDomain } from '@/lib/types';
import { SYMBOL_CONFIGS } from '@/lib/constants';
import GlassPanel from '@/components/shared/GlassPanel';

interface DomainHeaderProps {
  domain: NewsDomain;
}

const descriptions: Record<NewsDomain, string> = {
  international: '关注全球政治、外交与重大国际事件',
  finance: '洞察经济趋势、市场动态与投资机会',
  technology: '探索前沿科技、AI发展与数字革命',
  sports: '追踪精彩赛事、体育英雄与竞技精神',
  entertainment: '发现影视、音乐与文娱生活的魅力',
  health: '了解医学进展、养生知识与健康生活',
  education: '关注教育改革、学术研究与人才培养',
  lifestyle: '品味生活美学、城市文化与日常乐趣',
  environment: '守护地球家园、关注生态与可持续发展',
};

const DomainHeader = memo(function DomainHeader({ domain }: DomainHeaderProps) {
  const config = SYMBOL_CONFIGS.find((c) => c.domain === domain);
  if (!config) return null;

  return (
    <GlassPanel className="mb-6" ariaLabel={`${config.label}领域概览`}>
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${config.color}20` }}
          aria-hidden="true"
        >
          <span className="text-2xl">{config.emoji}</span>
        </div>
        <div>
          <h1 className="font-display text-xl text-text-primary">{config.label}</h1>
          <p className="mt-1 text-sm text-text-secondary">{descriptions[domain]}</p>
        </div>
      </div>
    </GlassPanel>
  );
});

export default DomainHeader;
