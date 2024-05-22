import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  constructor() {}

  private client = createClient({
    space: environment.contentful.space,
    accessToken: environment.contentful.accessToken,
  });

  private blogsUrl: string = `https://cdn.contentful.com/spaces/${environment.contentful.space}/environments/master/entries?access_token=${environment.contentful.accessToken}&content_type=${environment.blogsContentTypeId}`;
  private skillUrl: string = `https://cdn.contentful.com/spaces/${environment.contentful.space}/environments/master/entries?access_token=${environment.contentful.accessToken}&content_type=${environment.skillContentTypeId}`;
  private testimonialUrl: string = `https://cdn.contentful.com/spaces/${environment.contentful.space}/environments/master/entries?access_token=${environment.contentful.accessToken}&content_type=${environment.testimonialContentTypeId}`;


  // BLOG SERVICE METHODS
  getAllBlogEntries() {
    return from(
      this.client.getEntries({ content_type: environment.blogsContentTypeId })
    );
  }

  getBlogEntry(id: string) {
    return from(
      this.client.getEntries({
        content_type: environment.blogsContentTypeId,
        'sys.id': id,
      })
    );
  }

  getRichTextDocument(id: any): Observable<Entry<any>> {
    return from(this.client.getEntry(id));
  }

  // SKILL SERVICE METHODS
  getAllSkillEntries() {
    return from(
      this.client.getEntries({ content_type: environment.skillContentTypeId })
    );
  }

  getSkillEntry(id: string) {
    return from(
      this.client.getEntries({
        content_type: environment.skillContentTypeId,
        'sys.id': id,
      })
    );
  }

  // TESTIMONIAL SERVICE METHODS
  getAllTestimonialEntries() {
    return from(
      this.client.getEntries({ content_type: environment.testimonialContentTypeId })
    );
  }
}
