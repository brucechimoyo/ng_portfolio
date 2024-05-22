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

  constructor(
    private contentfulService: ContentfulService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    AOS.init();
    this.loadBlogPosts();
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
    this.openModal()
    this.contentfulService.getAllBlogEntries().subscribe({
      next: value =>{
        this.blogPosts = value.items;
        this.closeDialog();
      },
      error: err =>{
        console.log(err);
        this.closeDialog();
      }
    })
    
  }
}
