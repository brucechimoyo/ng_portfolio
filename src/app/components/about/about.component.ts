import { Component, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import AOS from 'aos';
import { ContentfulService } from '../../services/contentful.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements AfterViewChecked {
  skills!: any[];
  groupedSkills: { [group: string]: any[] } = {};
  isLoadingSkills: boolean = true;
  aboutStats: any[] = [];
  isLoadingStats: boolean = true;
  isImageLoaded: boolean = false; // Add image loading flag
  private aosRefreshed = false;

  public personalInfo = [
    { label: 'Phone', value: '+263 778275503' },
    { label: 'City', value: 'Harare, Zimbabwe' },
    { label: 'Email', value: 'chimoyo.takura@yahoo.com' }
  ];

  public interests = [
    { icon: 'ri-robot-2-line', label: 'IoT and Robotics' },
    { icon: 'ri-robot-3-line', label: 'Artificial Intelligence' },
    { icon: 'ri-html5-line', label: 'Web Development' },
    { icon: 'ri-smartphone-line', label: 'Mobile Development' }
  ];

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

  ngAfterViewChecked() {
    if (!this.aosRefreshed && !this.isLoadingSkills && !this.isLoadingStats) {
      AOS.refresh();
      this.aosRefreshed = true;
    }
  }

  onImageLoad() {
    this.isImageLoaded = true;
    this.cdr.markForCheck();
  }

  fetchSkillData() {
    this.isLoadingSkills = true;
    this.contentfulService.getAllSkillEntries().subscribe({
      next: (data) => {
        this.skills = data.items;
        // Group skills by their 'group' property
        this.groupedSkills = this.skills.reduce((acc, skill) => {
          const group = skill.fields.group || 'Other';
          if (!acc[group]) acc[group] = [];
          acc[group].push(skill);
          return acc;
        }, {} as { [group: string]: any[] });
        this.isLoadingSkills = false;
        this.aosRefreshed = false; // allow refresh after data loads
      },
      error: (error) => {
        this.toastr.error('Failed to fetch skills', 'Error');
        this.isLoadingSkills = false;
        this.aosRefreshed = false;
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
        this.aosRefreshed = false; // allow refresh after data loads
      },
      error: (error) => {
        this.toastr.error('Failed to fetch stats', 'Error');
        this.isLoadingStats = false;
        this.cdr.markForCheck();
        this.aosRefreshed = false;
      }
    });
  }
}
