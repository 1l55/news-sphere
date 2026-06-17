/**
 * 简易内存缓存 — 支持 TTL 过期
 * P2 升级为 Redis
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();

export const cache = {
  get<T>(key: string): T | null {
    const entry = store.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      store.delete(key);
      return null;
    }
    return entry.data;
  },

  set<T>(key: string, data: T, ttlMs: number): void {
    store.set(key, { data, expiresAt: Date.now() + ttlMs });
  },

  del(key: string): void {
    store.delete(key);
  },

  keys(): string[] {
    return Array.from(store.keys());
  },

  clear(): void {
    store.clear();
  },
};
