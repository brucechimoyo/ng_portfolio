import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent {
  @Input() width: string = '100%';
  @Input() height: string = '20px';
  @Input() borderRadius: string = '4px';
  @Input() animation: boolean = true;
  @Input() type: 'text' | 'avatar' | 'card' | 'title' = 'text';

  get skeletonClass(): string {
    return `skeleton skeleton-${this.type} ${this.animation ? 'skeleton-animate' : ''}`;
  }

  get skeletonStyle(): object {
    return {
      width: this.width,
      height: this.height,
      borderRadius: this.borderRadius
    };
  }
} 