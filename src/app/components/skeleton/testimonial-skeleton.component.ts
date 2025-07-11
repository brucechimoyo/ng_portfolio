import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonial-skeleton',
  templateUrl: './testimonial-skeleton.component.html',
  styleUrls: ['./testimonial-skeleton.component.css']
})
export class TestimonialSkeletonComponent {
  // Generate multiple skeleton items for loading state
  skeletonItems = Array(3).fill(0);
} 