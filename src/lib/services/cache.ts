interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class CacheManager {
  private static cache = new Map<string, CacheItem<any>>();
  private static defaultTTL = 3600000;

  static set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  static get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  static size(): number {
    return this.cache.size;
  }
}