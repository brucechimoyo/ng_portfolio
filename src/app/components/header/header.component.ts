import { Component } from '@angular/core';
import AOS from 'aos';
import { ContentfulService } from '../../services/contentful.service';
import { mySpecialties } from '../../constants/specialties';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private contentfulService: ContentfulService) { }
  
  specialties: string[] = mySpecialties;

  ngOnInit(){
    AOS.init();
  }
}
