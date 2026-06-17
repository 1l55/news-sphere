'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

interface ArticleBodyProps {
  content: string;
}

const ArticleBody = memo(function ArticleBody({ content }: ArticleBodyProps) {
  if (!content) {
    return (
      <div className="py-12 text-center text-text-secondary">
        <p className="text-sm">暂无正文内容</p>
      </div>
    );
  }

  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <div className="prose-custom">
      {paragraphs.map((para, i) => (
        <motion.p
          key={i}
          className={`mb-4 font-body leading-relaxed text-text-primary ${
            i === 0 ? 'first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:leading-none first-letter:text-accent' : ''
          }`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          {para}
        </motion.p>
      ))}
    </div>
  );
});

export default ArticleBody;
