import { Component } from '@angular/core';
import AOS from 'aos';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  ngOnInit(){
    AOS.init();
  }
}
