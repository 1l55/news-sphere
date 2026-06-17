'use client';

import { memo, useCallback } from 'react';

interface TagFilterProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

const TagFilter = memo(function TagFilter({ tags, activeTag, onTagChange }: TagFilterProps) {
  const handleKeyDown = useCallback((tag: string) => (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const currentIndex = tags.indexOf(tag);
      const nextIndex = e.key === 'ArrowRight'
        ? (currentIndex + 1) % tags.length
        : (currentIndex - 1 + tags.length) % tags.length;
      const nextTag = tags[nextIndex];
      onTagChange(nextTag);
      // Focus the next tab button
      const buttons = (e.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLElement>('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    }
  }, [tags, onTagChange]);

  return (
    <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="文章分类筛选">
      {tags.map((tag) => {
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            role="tab"
            aria-selected={isActive}
            aria-label={`筛选标签: ${tag}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTagChange(tag)}
            onKeyDown={handleKeyDown(tag)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline-accent ${
              isActive
                ? 'bg-accent text-bg-primary'
                : 'border border-white/10 bg-bg-secondary text-text-secondary hover:border-white/20 hover:text-text-primary'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
});

export default TagFilter;
