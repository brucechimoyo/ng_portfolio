import { Component } from '@angular/core';
import AOS from 'aos';
import { ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      transition('out => in', [animate('300ms ease-in-out')]),
      transition('in => out', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class NavbarComponent {
  selectedLinkIndex!: number;
  menuExpanded: boolean = false;
  menuState: string = 'out';

  constructor(private router: Router) {}
  navbarMenus: any = [
    {
      name: 'Home',
      route: '/',
      index: 1,
    },
    {
      name: 'About',
      route: '/about',
      index: 2,
    },
    {
      name: 'Resume',
      route: '/resume',
      index: 3,
    },
    {
      name: 'Portfolio',
      route: '/portfolio',
      index: 4,
    },
    {
      name: 'Blog',
      route: '/blog',
      index: 5,
    },
    {
      name: 'Contact',
      route: '/contact',
      index: 6,
    },
  ];
  ngOnInit() {
    AOS.init();
  }

  selectLink(index: number, route: string) {
    this.selectedLinkIndex = index;
    this.menuExpanded = false;
    this.router.navigate([route]);
  }

  toggleClicked() {
    this.menuExpanded = !this.menuExpanded;
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
