import type { NewsArticle, NewsDomain } from './types';

export const MOCK_ARTICLES: NewsArticle[] = [
  // ... all 45 articles ... 
];

export function getArticlesByDomain(domain: NewsDomain): NewsArticle[] {
  return MOCK_ARTICLES.filter(a => a.domain === domain);
}

export function getArticleById(id: string): NewsArticle | undefined {
  return MOCK_ARTICLES.find(a => a.id === id);
}

export function getHeadlinesByDomain(domain: NewsDomain): NewsArticle[] {
  return MOCK_ARTICLES.filter(a => a.domain === domain && a.importance === 1);
}

export function getRelatedArticles(ids: string[]): NewsArticle[] {
  return MOCK_ARTICLES.filter(a => ids.includes(a.id)).slice(0, 4);
}
