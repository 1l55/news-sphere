import type { SymbolConfig, StarConnection } from './types';
export { MOCK_ARTICLES, getArticlesByDomain, getArticleById, getHeadlinesByDomain, getRelatedArticles } from './mock-data';
export type { NewsArticle, NewsDomain } from './types';

export const SYMBOL_CONFIGS: SymbolConfig[] = [
  { domain: 'international', label: '国际', emoji: '🌍', color: '#4A90D9', svgPath: '/images/symbols/globe.svg', position: { x: 18, y: 12 } },
  { domain: 'finance', label: '财经', emoji: '📈', color: '#F5A623', svgPath: '/images/symbols/scale.svg', position: { x: 50, y: 8 } },
  { domain: 'technology', label: '科技', emoji: '🚀', color: '#50E3C2', svgPath: '/images/symbols/prism.svg', position: { x: 82, y: 12 } },
  { domain: 'sports', label: '体育', emoji: '⚽', color: '#E86363', svgPath: '/images/symbols/torch.svg', position: { x: 10, y: 40 } },
  { domain: 'entertainment', label: '娱乐', emoji: '🎬', color: '#BD10E0', svgPath: '/images/symbols/mask.svg', position: { x: 40, y: 36 } },
  { domain: 'health', label: '健康', emoji: '💚', color: '#7ED321', svgPath: '/images/symbols/tree-of-life.svg', position: { x: 72, y: 40 } },
  { domain: 'education', label: '教育', emoji: '📚', color: '#4A90D9', svgPath: '/images/symbols/ink-bottle.svg', position: { x: 90, y: 70 } },
  { domain: 'lifestyle', label: '生活', emoji: '🏠', color: '#F8A5C2', svgPath: '/images/symbols/coffee-cup.svg', position: { x: 55, y: 72 } },
  { domain: 'environment', label: '环境', emoji: '🌿', color: '#50C878', svgPath: '/images/symbols/amber.svg', position: { x: 20, y: 75 } },
];

export const STAR_CONNECTIONS: StarConnection[] = [
  { from: 'international', to: 'finance' },
  { from: 'international', to: 'technology' },
  { from: 'finance', to: 'technology' },
  { from: 'technology', to: 'education' },
  { from: 'technology', to: 'health' },
  { from: 'health', to: 'lifestyle' },
  { from: 'health', to: 'environment' },
  { from: 'sports', to: 'entertainment' },
  { from: 'entertainment', to: 'lifestyle' },
  { from: 'environment', to: 'lifestyle' },
];

export const VALID_DOMAINS = ['international', 'finance', 'technology', 'sports', 'entertainment', 'health', 'education', 'lifestyle', 'environment'] as const;
