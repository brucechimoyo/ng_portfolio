import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogCommentsService {
  private url: string = environment.backend_url;
  constructor(private http: HttpClient) {}

  // Create a comment in the database
  // @Arg: comment: Comment
  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.url}comments`, comment);
  }

  // Fetch all comments belonging to a blog by Id
  fetchCommentsByBlog(blogId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}comments/${blogId}`);
  }
}
