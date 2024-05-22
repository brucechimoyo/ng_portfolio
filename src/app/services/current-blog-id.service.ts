import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentBlogIdService {

  constructor() { }

  private blogId: string = '';

  getBlogId(): string {
    return this.blogId;
  }

  setBlogId(id: string) {
    this.blogId = id;
  }

  idPresent(): boolean {
    return this.blogId.length > 0 ? true : false;
  }

  clearBlogId(): void {
    this.blogId = '';
  }
}
