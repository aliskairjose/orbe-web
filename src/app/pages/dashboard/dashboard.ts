import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly router = inject(Router);
  isSidebarOpen = signal(false);
  user = signal({ name: 'Admin User', avatar: 'https://i.pravatar.cc/150?u=admin' });
  rate = signal<number>(3800);

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

  updateRate(): void {
    // Simulate rate update
    this.rate.set(4000 + Math.floor(Math.random() * 1000));
  }
}
