export type NewsDomain = 'international' | 'finance' | 'technology' | 'sports' | 'entertainment' | 'health' | 'education' | 'lifestyle' | 'environment';
export type TimeOfDay = 'morning' | 'evening';

export interface NewsArticle {
  id: string; title: string; summary: string; content: string; source: string;
  domain: NewsDomain; subTags: string[]; importance: number; publishedAt: string;
  edition: TimeOfDay; readingTime: number; imageUrl?: string; relatedIds: string[];
}

export interface ReadingRecord { articleId: string; readAt: string; completed: boolean; saved: boolean; }

export interface UserPreference {
  favoriteDomains: NewsDomain[]; readingHistory: ReadingRecord[];
  edition: 'both' | 'morning' | 'evening'; notificationEnabled: boolean; theme: 'dark';
}

export type AsyncState<T> =
  | { status: 'idle' } | { status: 'loading' }
  | { status: 'success'; data: T } | { status: 'error'; error: string } | { status: 'empty' };

export interface SymbolConfig {
  domain: NewsDomain; label: string; emoji: string; color: string;
  svgPath: string; position: { x: number; y: number };
}

export interface StarConnection { from: NewsDomain; to: NewsDomain; }
