import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import AOS from 'aos';
import BlogItem from '../../interfaces/BlogItem';
import { ContentfulService } from '../../services/contentful.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {
  blogPosts$!: Observable<any>;
  blogPosts!: any[];
  blogCategories!: any[];
  isLoading: boolean = true;
  isLoadingCategories: boolean = true;

  constructor(
    private contentfulService: ContentfulService,
    private cdr: ChangeDetectorRef // <-- Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    AOS.init();
    this.loadBlogCategories();
  }

  trackByBlogId(index: number, blog: any): string {
    return blog.sys.id;
  }

  trackByCategory(index: number, category: string): string {
    return category;
  }

  loadBlogPosts(): void {
    this.isLoading = true;
    this.contentfulService.getAllBlogEntries().subscribe({
      next: (value) => {
        this.blogPosts = value.items;
        this.isLoading = false;
        this.cdr.markForCheck(); // <-- Ensure view updates
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.markForCheck(); // <-- Ensure view updates
      },
    });
  }

  loadBlogCategories() {
    this.isLoadingCategories = true;
    this.contentfulService.getAllBlogCategoryEntries().subscribe({
      next: (value) => {
        this.blogCategories = value.items.map((item: any) => item.fields['name']);
        this.blogCategories = [...new Set(this.blogCategories)];
        this.loadBlogPosts();
        this.isLoadingCategories = false;
        this.cdr.markForCheck(); // <-- Ensure view updates
      },
      error: (err) => {
        this.isLoadingCategories = false;
        this.cdr.markForCheck(); // <-- Ensure view updates
      },
    });
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
    this.isLoading = true;
    this.contentfulService.getAllBlogEntries().subscribe({
      next: (value) => {
        this.blogPosts = value.items;
        this.blogPosts = this.blogPosts.filter(
          (item) => item.fields.category.fields.name === category
        );
        this.isLoading = false;
        this.cdr.markForCheck(); // <-- Ensure view updates
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.markForCheck(); // <-- Ensure view updates
      },
    });
  }
}
