import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  constructor(private cacheService: CacheService) {}

  private client = createClient({
    space: environment.contentful.space,
    accessToken: environment.contentful.accessToken,
  });

  private blogsUrl: string = `https://cdn.contentful.com/spaces/${environment.contentful.space}/environments/master/entries?access_token=${environment.contentful.accessToken}&content_type=${environment.blogsContentTypeId}`;
  private skillUrl: string = `https://cdn.contentful.com/spaces/${environment.contentful.space}/environments/master/entries?access_token=${environment.contentful.accessToken}&content_type=${environment.skillContentTypeId}`;
  private testimonialUrl: string = `https://cdn.contentful.com/spaces/${environment.contentful.space}/environments/master/entries?access_token=${environment.contentful.accessToken}&content_type=${environment.testimonialContentTypeId}`;
  private projectUrl: string = `https://cdn.contentful.com/spaces/${environment.contentful.space}/environments/master/entries?access_token=${environment.contentful.accessToken}&content_type=${environment.projectContentTypeId}`;
  private blogCategoryUrl: string = `https://cdn.contentful.com/spaces/${environment.contentful.space}/environments/master/entries?access_token=${environment.contentful.accessToken}&content_type=${environment.blogsCategoryTypeId}`;

  // BLOG SERVICE METHODS
  getAllBlogEntries(): Observable<any> {
    const cacheKey = 'all_blog_entries';
    const observable = from(
      this.client.getEntries({ content_type: environment.blogsContentTypeId })
    );
    return this.cacheService.cacheObservable(cacheKey, observable);
  }

  getBlogEntry(id: string): Observable<any> {
    const cacheKey = `blog_entry_${id}`;
    const observable = from(
      this.client.getEntries({
        content_type: environment.blogsContentTypeId,
        'sys.id': id,
      })
    );
    return this.cacheService.cacheObservable(cacheKey, observable);
  }

  getRichTextDocument(id: any): Observable<Entry<any>> {
    const cacheKey = `rich_text_${id}`;
    const observable = from(this.client.getEntry(id));
    return this.cacheService.cacheObservable(cacheKey, observable);
  }

  // SKILL SERVICE METHODS
  getAllSkillEntries(): Observable<any> {
    const cacheKey = 'all_skill_entries';
    const observable = from(
      this.client.getEntries({ content_type: environment.skillContentTypeId })
    );
    return this.cacheService.cacheObservable(cacheKey, observable);
  }

  getSkillEntry(id: string): Observable<any> {
    const cacheKey = `skill_entry_${id}`;
    const observable = from(
      this.client.getEntries({
        content_type: environment.skillContentTypeId,
        'sys.id': id,
      })
    );
    return this.cacheService.cacheObservable(cacheKey, observable);
  }

  // TESTIMONIAL SERVICE METHODS
  getAllTestimonialEntries(): Observable<any> {
    const cacheKey = 'all_testimonial_entries';
    const observable = from(
      this.client.getEntries({
        content_type: environment.testimonialContentTypeId,
      })
    );
    return this.cacheService.cacheObservable(cacheKey, observable);
  }

  //PORTFOLIO SERVICE METHODS
  getAllProjectEntries(): Observable<any> {
    const cacheKey = 'all_project_entries';
    const observable = from(
      this.client.getEntries({ content_type: environment.projectContentTypeId })
    );
    return this.cacheService.cacheObservable(cacheKey, observable);
  }

  getProjectEntry(id: string): Observable<any> {
    const cacheKey = `project_entry_${id}`;
    const observable = from(
      this.client.getEntries({
        content_type: environment.projectContentTypeId,
        'sys.id': id,
      })
    );
    return this.cacheService.cacheObservable(cacheKey, observable);
  }

  //BLOG CATEGORY SERVICE METHODS
  getAllBlogCategoryEntries(): Observable<any> {
    const cacheKey = 'all_blog_category_entries';
    const observable = from(
      this.client.getEntries({
        content_type: environment.blogsCategoryTypeId,
      })
    );
    return this.cacheService.cacheObservable(cacheKey, observable);
  }

  // ABOUT STATS SERVICE METHOD
  getAboutStats(): Observable<any> {
    const cacheKey = 'about_stats';
    const observable = from(
      this.client.getEntries({ content_type: environment.aboutStatsContentTypeId })
    );
    return this.cacheService.cacheObservable(cacheKey, observable);
  }

  // Clear cache methods for when data needs to be refreshed
  clearCache(): void {
    this.cacheService.clear();
  }

  clearBlogCache(): void {
    this.cacheService.delete('all_blog_entries');
  }

  clearProjectCache(): void {
    this.cacheService.delete('all_project_entries');
  }
}
