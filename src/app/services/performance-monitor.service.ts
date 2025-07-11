import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitorService {
  private metrics: Map<string, number> = new Map();
  private navigationStartTime: number = 0;

  constructor(private router: Router) {
    this.setupNavigationMonitoring();
  }

  private setupNavigationMonitoring() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.recordNavigationTime();
      });
  }

  startTimer(label: string): void {
    this.metrics.set(`${label}_start`, performance.now());
  }

  endTimer(label: string): number {
    const startTime = this.metrics.get(`${label}_start`);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.metrics.set(`${label}_duration`, duration);
      console.log(`Performance: ${label} took ${duration.toFixed(2)}ms`);
      return duration;
    }
    return 0;
  }

  recordNavigationTime(): void {
    if (this.navigationStartTime > 0) {
      const navigationTime = performance.now() - this.navigationStartTime;
      this.metrics.set('navigation_time', navigationTime);
      console.log(`Navigation took ${navigationTime.toFixed(2)}ms`);
    }
    this.navigationStartTime = performance.now();
  }

  getMetrics(): Map<string, number> {
    return new Map(this.metrics);
  }

  clearMetrics(): void {
    this.metrics.clear();
  }

  measureMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log('Memory Usage:', {
        usedJSHeapSize: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        totalJSHeapSize: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
      });
    }
  }

  measurePaintTime(): void {
    if ('getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach(entry => {
        console.log(`Paint: ${entry.name} took ${entry.startTime.toFixed(2)}ms`);
      });
    }
  }

  measureLargestContentfulPaint(): void {
    if ('getEntriesByType' in performance) {
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      lcpEntries.forEach(entry => {
        console.log(`LCP: ${entry.startTime.toFixed(2)}ms`);
      });
    }
  }

  measureFirstInputDelay(): void {
    if ('getEntriesByType' in performance) {
      const fidEntries = performance.getEntriesByType('first-input');
      fidEntries.forEach(entry => {
        if ('processingStart' in entry) {
          // TypeScript type guard for PerformanceEventTiming
          const eventTiming = entry as PerformanceEventTiming;
          console.log(`FID: ${eventTiming.processingStart - eventTiming.startTime}ms`);
        }
      });
    }
  }

  getPerformanceReport(): any {
    return {
      metrics: Object.fromEntries(this.metrics),
      memory: this.getMemoryInfo(),
      navigation: this.getNavigationInfo()
    };
  }

  private getMemoryInfo(): any {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        totalJSHeapSize: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
      };
    }
    return null;
  }

  private getNavigationInfo(): any {
    if ('getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0] as PerformanceNavigationTiming;
        return {
          domContentLoaded: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
          loadComplete: nav.loadEventEnd - nav.loadEventStart,
          domInteractive: nav.domInteractive - nav.fetchStart
        };
      }
    }
    return null;
  }
} 