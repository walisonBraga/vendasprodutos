import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  positionOptions = [
    {
      label: 'Bottom',
      value: 'bottom'
    },
    {
      label: 'Top',
      value: 'top'
    },
    {
      label: 'Left',
      value: 'left'
    },
    {
      label: 'Right',
      value: 'right'
    }
  ];

  ngOnInit() {
    this.items = [
      {
        label: 'Login',
        icon: '../../../assets/img_navbar/login.png',
        routerLink: '/login'
      },
      {
        label: 'App Store',
        icon: '../../../assets/img_navbar/register.png',
        routerLink: '/register'
      },
      {
        label: 'home',
        icon: '../../../assets/img_navbar/home.png',
        routerLink: '/'
      }
    ];
  }
}
