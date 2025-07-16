import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import Comment from '../../interfaces/Comment';
import CommentMapper from '../../utils/comment.mapper';
import { BlogCommentsService } from '../../services/blog-comments.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProgressLoaderComponent } from '../progress-loader/progress-loader.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  commentsForm!: FormGroup;
  bsModalRef!: BsModalRef;

  @Input()
  commentData!: Comment[];

  @Input()
  blogId!: string;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private commentService: BlogCommentsService
  ) {}

  ngOnInit(): void {
    this.initializeCommentsForm();
  }

  initializeCommentsForm(): void {
    this.commentsForm = this.fb.group({
      name: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  openModal(): void {
    this.bsModalRef = this.modalService.show(ProgressLoaderComponent, {
      ignoreBackdropClick: true,
      keyboard: false,
    });
  }

  closeModal(): void{
    this.bsModalRef.hide();
  }

  postComment(): void {
    let postBody = CommentMapper.mapToCreateComment(
      this.commentsForm.value.comment,
      this.blogId,
      this.commentsForm.value.name
    );
    this.postBlogComment(postBody)
  }

  postBlogComment(comment: any): void {
    this.openModal();
    this.commentService.createComment(comment).subscribe({
      next: (value) => {
        this.toastr.success('Comment posted successfully', 'Success');
        this.closeModal();
        // Immediately update the comments list
        if (this.commentData) {
          this.commentData.unshift(value);
        }
        this.commentsForm.reset();
      },
      error: (err) => {
        this.closeModal();
        this.toastr.error("Failed to post comment", 'Error');
      },
    });
  }
}
