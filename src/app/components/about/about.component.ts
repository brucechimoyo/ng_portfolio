import { Component, ChangeDetectorRef } from '@angular/core';
import AOS from 'aos';
import { ContentfulService } from '../../services/contentful.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  skills!: any[];
  isLoadingSkills: boolean = true;
  aboutStats: any[] = [];
  isLoadingStats: boolean = true;

  constructor(
    private contentfulService: ContentfulService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    AOS.init();
    this.fetchSkillData();
    this.fetchAboutStats();
  }

  fetchSkillData() {
    this.isLoadingSkills = true;
    this.contentfulService.getAllSkillEntries().subscribe({
      next: (data) => {
        this.skills = data.items;
        this.isLoadingSkills = false;
      },
      error: (error) => {
        this.toastr.error('Failed to fetch skills', 'Error');
        this.isLoadingSkills = false;
      }
    });
  }

  fetchAboutStats() {
    this.isLoadingStats = true;
    this.contentfulService.getAboutStats().subscribe({
      next: (data) => {
        this.aboutStats = data.items.map((item: any) => item.fields);
        this.isLoadingStats = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.toastr.error('Failed to fetch stats', 'Error');
        this.isLoadingStats = false;
        this.cdr.markForCheck();
      }
    });
  }
}
