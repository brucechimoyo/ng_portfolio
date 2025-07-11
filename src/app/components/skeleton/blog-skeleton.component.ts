import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-skeleton',
  templateUrl: './blog-skeleton.component.html',
  styleUrls: ['./blog-skeleton.component.css']
})
export class BlogSkeletonComponent {
  skeletonItems = Array(6).fill(0);
} 