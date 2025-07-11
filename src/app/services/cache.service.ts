import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cached.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Cache with Observable
  cacheObservable<T>(
    key: string, 
    observable: Observable<T>, 
    ttl: number = this.DEFAULT_TTL
  ): Observable<T> {
    if (this.has(key)) {
      return of(this.get(key));
    }

    return observable.pipe(
      tap(data => this.set(key, data, ttl)),
      shareReplay(1)
    );
  }
} 