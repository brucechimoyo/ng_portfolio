import { Component } from '@angular/core';
import AOS from 'aos';
import { ContentfulService } from '../../services/contentful.service';
import { CurrentProjectService } from '../../services/current-project.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProgressLoaderComponent } from '../progress-loader/progress-loader.component';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  projects: any[] = [];
  bsLoadingModalRef!: BsModalRef;
  bsDetailModalRef!: BsModalRef;

  constructor(
    private contentfulService: ContentfulService,
    private toastr: ToastrService,
    private bsModalService: BsModalService,
    private currentProjectIdService: CurrentProjectService
  ) {}

  ngOnInit() {
    AOS.init();
    this.getAllPortfolioEntries();
  }

  getAllPortfolioEntries() {
    this.openLoadingModal();
    return this.contentfulService.getAllProjectEntries().subscribe({
      next: (value: any) => {
        this.projects = value.items;
        this.closeLoadingModal();
      },
      error: (err: any) => {
        this.toastr.error('Failed to fetch projects', 'Error');
        this.closeLoadingModal();
      },
    });
  }

  openLoadingModal(): void {
    this.bsLoadingModalRef = this.bsModalService.show(ProgressLoaderComponent, {
      ignoreBackdropClick: true,
      keyboard: false,
    });
  }

  closeLoadingModal(): void {
    this.bsLoadingModalRef.hide();
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
