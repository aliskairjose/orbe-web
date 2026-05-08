import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SIDE_MENU } from '@core/constants';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly router = inject(Router);
  menu = SIDE_MENU;
  
  isSidebarOpen = signal(false);
  isSubBarOpen = signal(false);
  
  user = signal({ name: 'Admin User', avatar: 'https://i.pravatar.cc/150?u=admin' });
  rate = signal<number>(3800);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isSidebarOpen()) {
        this.isSidebarOpen.set(false);
      }
      if (event instanceof NavigationEnd && this.isSubBarOpen()) {
        this.isSubBarOpen.set(false);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen.update((isOpen) => !isOpen);
  }

  toggleSubBar() {
    this.isSubBarOpen.update((isOpen) => !isOpen);
  }

  updateRate(): void {
    // Simulate rate update
    this.rate.set(4000 + Math.floor(Math.random() * 1000));
  }
}
