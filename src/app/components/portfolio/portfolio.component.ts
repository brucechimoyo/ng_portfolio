import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import AOS from 'aos';
import { ContentfulService } from '../../services/contentful.service';
import { CurrentProjectService } from '../../services/current-project.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit {
  projects: any[] = [];
  bsDetailModalRef!: BsModalRef;
  isLoading: boolean = true;

  constructor(
    private contentfulService: ContentfulService,
    private toastr: ToastrService,
    private bsModalService: BsModalService,
    private currentProjectIdService: CurrentProjectService,
    private cdr: ChangeDetectorRef // <-- Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    AOS.init();
    this.getAllPortfolioEntries();
  }

  trackByProjectId(index: number, project: any): string {
    return project.sys.id;
  }

  getAllPortfolioEntries() {
    this.isLoading = true;
    return this.contentfulService.getAllProjectEntries().subscribe({
      next: (value: any) => {
        this.projects = value.items;
        this.isLoading = false;
        this.cdr.markForCheck(); // <-- Ensure view updates
      },
      error: (err: any) => {
        this.toastr.error('Failed to fetch projects', 'Error');
        this.isLoading = false;
        this.cdr.markForCheck(); // <-- Ensure view updates
      },
    });
  }

  openDetailModal(id: string): void {
    this.currentProjectIdService.setCurrentProjectId(id);
    this.bsDetailModalRef = this.bsModalService.show(ProjectDetailComponent, {
      ignoreBackdropClick: true,
    });
  }

  closeDetailModal(): void {
    this.bsDetailModalRef.hide();
  }
}
