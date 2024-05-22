import { Component } from '@angular/core';
import AOS from 'aos';
import { ContentfulService } from '../../services/contentful.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private contentfulService: ContentfulService) { }
  

  ngOnInit(){
    AOS.init();
  }
}
