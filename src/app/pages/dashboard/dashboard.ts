import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLinkActive, RouterLink,],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly router = inject(Router);
  isSidebarOpen = signal(false);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isSidebarOpen()) {
        this.isSidebarOpen.set(false);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen.update((isOpen) => !isOpen);
  }
}
