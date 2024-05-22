import { Component, Input } from '@angular/core';
import Comment from '../../interfaces/Comment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.css',
})
export class CommentItemComponent {
  @Input()
  comment!: any;

  ngOnInit(): void {
    console.log(this.comment);
  }
}
export { Comment };

