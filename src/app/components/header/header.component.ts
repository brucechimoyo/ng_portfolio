import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import AOS from 'aos';
import { ContentfulService } from '../../services/contentful.service';
import { mySpecialties } from '../../constants/specialties';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }
  
  specialties: string[] = mySpecialties;

  ngOnInit(){
    AOS.init();
  }
}
