import { Component } from '@angular/core';
import AOS from 'aos';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  ngOnInit(){
    AOS.init();
  }

  downloadCV(){
    const link = document.createElement('a');
    link.href = 'assets/bruce_chimoyo_cv.pdf';
    link.download = 'bruce_chimoyo_cv.pdf';
    link.click();
  }
}
