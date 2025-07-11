import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {

  constructor() { }

  /**
   * Generate responsive image URLs with different sizes
   */
  getResponsiveImageUrl(originalUrl: string, width: number = 800): string {
    if (!originalUrl) return '';
    
    // For Contentful images, we can add query parameters for optimization
    if (originalUrl.includes('images.ctfassets.net')) {
      const url = new URL(originalUrl);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', '80'); // Quality
      url.searchParams.set('fm', 'webp'); // WebP format for better compression
      return url.toString();
    }
    
    return originalUrl;
  }

  /**
   * Generate multiple sizes for responsive images
   */
  getResponsiveImageSrcSet(originalUrl: string): string {
    if (!originalUrl) return '';
    
    if (originalUrl.includes('images.ctfassets.net')) {
      const sizes = [320, 480, 768, 1024, 1200];
      return sizes
        .map(size => {
          const url = new URL(originalUrl);
          url.searchParams.set('w', size.toString());
          url.searchParams.set('q', '80');
          url.searchParams.set('fm', 'webp');
          return `${url.toString()} ${size}w`;
        })
        .join(', ');
    }
    
    return originalUrl;
  }

  /**
   * Get optimized image with lazy loading attributes
   */
  getOptimizedImageAttributes(originalUrl: string, alt: string = ''): any {
    return {
      src: this.getResponsiveImageUrl(originalUrl, 800),
      srcset: this.getResponsiveImageSrcSet(originalUrl),
      alt: alt,
      loading: 'lazy',
      decoding: 'async'
    };
  }

  /**
   * Check if image is already optimized
   */
  isOptimized(url: string): boolean {
    return url.includes('w=') && url.includes('q=');
  }

  /**
   * Get placeholder image for lazy loading
   */
  getPlaceholderUrl(originalUrl: string): string {
    if (!originalUrl) return '';
    
    if (originalUrl.includes('images.ctfassets.net')) {
      const url = new URL(originalUrl);
      url.searchParams.set('w', '20');
      url.searchParams.set('q', '10');
      url.searchParams.set('blur', '10');
      return url.toString();
    }
    
    return originalUrl;
  }
} 