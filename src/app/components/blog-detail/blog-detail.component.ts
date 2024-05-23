import { BlogCommentsService } from './../../services/blog-comments.service';
import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../services/contentful.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BLOCKS } from '@contentful/rich-text-types';
import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProgressLoaderComponent } from '../progress-loader/progress-loader.component';
import { Comment as BlogComment }  from '../comment-item/comment-item.component';
import { CurrentBlogIdService } from '../../services/current-blog-id.service';
import { ToastrService } from 'ngx-toastr';

export let browserRefresh = false;

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent implements OnInit {
  blogId!: string;
  subscription!: Subscription;
  blogItem!: any;
  safeContent!: SafeHtml;
  comments!: any[];
  bsModalRef!: BsModalRef;
  

  // Image rendering options
  options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title } = node.data['target'].fields;
        const imageUrl = file.url;
        return `<img class="embedded-image" src="${imageUrl}" alt="${title}" />`;
      },
    },
  };

  constructor(
    private contentfulService: ContentfulService,
    private sanitizer: DomSanitizer,
    private currentBlogIdService: CurrentBlogIdService,
    private commentsService: BlogCommentsService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let id = this.currentBlogIdService.getBlogId();
    this.blogId = id;
    this.loadBlogPost(id);
  }

  loadBlogPost(blogId: string): void {
    this.openModal();
    this.contentfulService.getBlogEntry(blogId).subscribe((entry: any) => {
      this.blogItem = entry.items[0];
      console.log(this.blogItem);
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(
        documentToHtmlString(entry.items[0].fields.content, this.options)
      );
      //this.loadBlogComments(blogId);
      this.closeDialog();
    });
    this.closeDialog();
  }

  openModal(): void {
    this.bsModalRef = this.modalService.show(ProgressLoaderComponent, {
      ignoreBackdropClick: true,
      keyboard: false,
    });
  }

  closeDialog(): void {
    this.bsModalRef.hide();
  }

  loadBlogComments(blogId: string): void {
    this.openModal();
    this.commentsService.fetchCommentsByBlog(blogId).subscribe({
      next: (value) => {
        this.comments = value
        this.closeDialog();
      },
      error: (err) => {
        this.closeDialog();
        this.toastr.error("Failed to load comments");
      },
    });
  }
}
