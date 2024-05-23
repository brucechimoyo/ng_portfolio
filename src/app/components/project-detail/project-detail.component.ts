import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component } from '@angular/core';
import { CurrentProjectService } from '../../services/current-project.service';
import { ContentfulService } from '../../services/contentful.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProgressLoaderComponent } from '../progress-loader/progress-loader.component';
import { ToastrService } from 'ngx-toastr';
import { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
})
export class ProjectDetailComponent {
  project!: any;
  safeContent!: SafeHtml;

  constructor(
    public bsModalRef: BsModalRef,
    private contentfulService: ContentfulService,
    private currentProjectService: CurrentProjectService,
    private bsModal: BsModalService,
    private loadingBsModalRef: BsModalRef,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title } = node.data['target'].fields;
        const imageUrl = file.url;
        return `<img class="embedded-image" src="${imageUrl}" alt="${title}" />`;
      },
    },
  };

  ngOnInit(): void {
    const projectId = this.currentProjectService.getCurrentProjectId();
    this.fetchProjectById(projectId);
  }

  fetchProjectById(id: string): void {
    this.openModal();
    this.currentProjectService.setCurrentProjectId(id);
    this.contentfulService.getProjectEntry(id).subscribe({
      next: (value: any) => {
        this.project = value.items[0];
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(
          documentToHtmlString(
            this.project.fields.projectDescription,
            this.options
          )
        );
      },
      error: (err: any) => {
        this.showError('Failed to fetch project detail');
      },
      complete: () => {
        this.closeModal();
      },
    });
  }

  showError(message: string): void {
    this.toastr.error(message, 'Error');
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success');
  }

  openModal(): void {
    this.loadingBsModalRef = this.bsModal.show(ProgressLoaderComponent, {
      ignoreBackdropClick: true,
      keyboard: false,
    });
  }

  closeModal(): void {
    this.loadingBsModalRef.hide();
  }
}
