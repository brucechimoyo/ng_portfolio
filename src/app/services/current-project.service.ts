import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentProjectService {
  constructor() {}

  private projectId: string = '';

  getCurrentProjectId(): string {
    return this.projectId;
  }

  setCurrentProjectId(id: string) {
    this.projectId = id;
  }

  hasProjectId(): boolean {
    return this.projectId.length > 0 ? true : false;
  }

  clearProjectId(): void {
    this.projectId = '';
  }
}
