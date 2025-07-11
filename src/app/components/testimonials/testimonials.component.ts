import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ContentfulService } from '../../services/contentful.service';
import { ToastrService } from 'ngx-toastr';
import AOS from 'aos';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials: any[] = [];
  isLoading: boolean = true;
  currentIndex: number = 0;
  private intervalId: any;
  private touchStartX = 0;

  constructor(
    private contentfulService: ContentfulService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    AOS.init();
    this.fetchTestimonialData();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchTestimonialData(): void {
    this.isLoading = true;
    this.contentfulService.getAllTestimonialEntries().subscribe({
      next: (data) => {
        this.testimonials = data.items;
        this.isLoading = false;
        this.currentIndex = 0;
        this.startAutoScroll();
      },
      error: (error) => {
        this.toastr.error('Failed to fetch testimonials', 'Error');
        this.isLoading = false;
      }
    });
  }

  startAutoScroll(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.nextTestimonial();
    }, 4000);
  }

  nextTestimonial(): void {
    if (this.testimonials.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    }
  }

  previousTestimonial(): void {
    if (this.testimonials.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    }
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const diffX = touchEndX - this.touchStartX;
    if (diffX > 50) {
      this.previousTestimonial();
    } else if (diffX < -50) {
      this.nextTestimonial();
    }
  }
} 