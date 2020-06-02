import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/graphics', title: 'Gráficos', icon: 'media-2_sound-wave', class: '' },
  { path: '/maps', title: 'Mapa', icon: 'location_map-big', class: '' },

  { path: '/messages', title: 'Mensajes', icon: 'ui-1_email-85', class: '' },
  { path: '/contacts', title: 'Contactos', icon: 'design_bullet-list-67', class: '' },
  { path: '/calendar', title: 'Calendario', icon: 'ui-1_calendar-60', class: '' },
  { path: '/user-profile', title: 'Cuenta', icon: 'users_single-02', class: '' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
