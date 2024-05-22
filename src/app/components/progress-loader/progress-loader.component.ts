import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-progress-loader',
  templateUrl: './progress-loader.component.html',
  styleUrl: './progress-loader.component.css',
})
export class ProgressLoaderComponent {
  constructor(public bsModalRef: BsModalRef) {}

  close(): void {
    this.bsModalRef.hide();
  }
}
