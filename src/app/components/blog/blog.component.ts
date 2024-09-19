import { Component } from '@angular/core';
import AOS from 'aos';
import BlogItem from '../../interfaces/BlogItem';
import { ContentfulService } from '../../services/contentful.service';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProgressLoaderComponent } from '../progress-loader/progress-loader.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  blogPosts$!: Observable<any>;
  bsModalRef!: BsModalRef;
  blogPosts!: any[];
  blogCategories!: any[];

  constructor(
    private contentfulService: ContentfulService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    AOS.init();
    this.loadBlogCategories();
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

  loadBlogPosts(): void {
    this.openModal();
    this.contentfulService.getAllBlogEntries().subscribe({
      next: (value) => {
        this.blogPosts = value.items;
        this.closeDialog();
      },
      error: (err) => {
        this.closeDialog();
      },
    });
    this.closeDialog();
  }

  loadBlogCategories() {
    this.openModal();
    this.contentfulService.getAllBlogCategoryEntries().subscribe({
      next: (value) => {
        this.blogCategories = value.items.map((item) => item.fields['name']);
        this.blogCategories = [...new Set(this.blogCategories)];
        this.loadBlogPosts();
        this.closeDialog();
      },
      error: (err) => {
        this.closeDialog();
      },
    });
    this.closeDialog();
  }

  toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  filterBlogs(category: string): void {
    this.openModal();
    this.contentfulService.getAllBlogEntries().subscribe({
      next: (value) => {
        this.blogPosts = value.items;
        this.blogPosts = this.blogPosts.filter(
          (item) => item.fields.category.fields.name === category
        );
        this.closeDialog();
      },
      error: (err) => {
        this.closeDialog();
      },
    });
    this.closeDialog();
  }
}
