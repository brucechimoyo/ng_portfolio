import { CurrentBlogIdService } from './../../services/current-blog-id.service';

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ContentfulService } from '../../services/contentful.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
})
export class BlogCardComponent {

  constructor(private currentBlogIdService:CurrentBlogIdService,private router: Router, private contentfulService: ContentfulService){}

  @Input()
  blogItem!: any;

  navigateToBlogDetail(id: string): void {
    this.currentBlogIdService.setBlogId(id);
    this.router.navigate(['/view-blog']);
  }
}
