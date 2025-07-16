import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogCommentsService {
  private url: string = environment.backend_url;
  private inMemoryComments: any = {};
  constructor(private http: HttpClient) {}

  // Simulate: Create a comment in-memory
  createComment(comment: any): Observable<any> {
    if (!this.inMemoryComments[comment.blogId]) {
      this.inMemoryComments[comment.blogId] = [];
    }
    const newComment = {
      ...comment,
      id: Date.now(),
      author: comment.author || 'Guest',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.inMemoryComments[comment.blogId].unshift(newComment);
    return of(newComment);
  }

  // Simulate: Fetch all comments belonging to a blog by Id (in-memory)
  fetchCommentsByBlog(blogId: string): Observable<Comment[]> {
    return of(this.inMemoryComments[blogId] || []);
  }
}
