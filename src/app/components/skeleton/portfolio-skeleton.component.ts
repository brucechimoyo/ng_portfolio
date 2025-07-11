import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio-skeleton',
  templateUrl: './portfolio-skeleton.component.html',
  styleUrls: ['./portfolio-skeleton.component.css']
})
export class PortfolioSkeletonComponent {
  skeletonItems = Array(8).fill(0);
} 