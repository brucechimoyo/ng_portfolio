import { Component } from '@angular/core';
import AOS from 'aos';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProgressLoaderComponent } from '../progress-loader/progress-loader.component';
import { ContentfulService } from '../../services/contentful.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  bsModalRef!: BsModalRef;
  skills!: any[];
  testimonials: any[] = [];
  currentTestimonial: any;
  private intervalId: any;

  constructor(
    private modalService: BsModalService,
    private contentfulService: ContentfulService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    AOS.init();
    this.fetchSkillData();
    this.startInterval();
  }

  startInterval(): void {
    this.intervalId = setInterval(() => {
      this.nextClicked();
    }, 5000);
  }

  fetchSkillData() {
    this.openModal();
    this.contentfulService.getAllSkillEntries().subscribe({
      next: (data) => {
        this.skills = data.items;
        console.log(this.skills);
        this.closeModal();
      },
      error: (error) => {
        this.toastr.error('Failed to fetch skills', 'Error');
        this.closeModal();
      },
      complete: () => {
        this.fetchTestimonialData();
      }
    });
  }

  fetchTestimonialData(): void{
    this.openModal();
    this.contentfulService.getAllTestimonialEntries().subscribe({
      next: (data) => {
        console.log(data.items);
        this.testimonials = data.items;
        this.currentTestimonial = this.testimonials[0];
        console.log(this.currentTestimonial.fields.author+"Current Testimonial");
        this.closeModal();
      },
      error: (error) => {
        this.toastr.error('Failed to fetch testimonials', 'Error');
        this.closeModal();
      }
    });
  }

  nextClicked(): void{
    let i = this.testimonials.indexOf(this.currentTestimonial);
    if(i === this.testimonials.length - 1){
      this.currentTestimonial = this.testimonials[0];
    } else {
      this.currentTestimonial = this.testimonials[i + 1];
    }
  }

  previousClicked(): void{
    let i = this.testimonials.indexOf(this.currentTestimonial);
    if(i === 0){
      this.currentTestimonial = this.testimonials[this.testimonials.length - 1];
    } else {
      this.currentTestimonial = this.testimonials[i - 1];
    }
  }

  openModal(): void {
    this.bsModalRef = this.modalService.show(ProgressLoaderComponent, {
      ignoreBackdropClick: true,
      keyboard: false,
    });
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
