import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SIDE_MENU } from '@core/constants';
import { AuthActions } from '../auth/store/auth.actions';
import { Store } from '@ngxs/store';
import { EMessage } from '@core/enums';
import { ToastService } from '@core/services';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { httpResource } from '@angular/common/http';
import { IRateExchange } from '@core/interfaces';

interface RateFormData {
  rate: number;
}
const rateFormModel = signal({
  rate: 0,
});
@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, FormRoot, FormField, CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly url = `${API_URL}/v1`;
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  
  rateResource = httpResource<IRateExchange[]>(()=>`${this.url}/rate-exchange`);
  
  protected form = form(rateFormModel, {
    submission: {
      action: async (f) => console.log(f().value()),
    },
  });

  menu = SIDE_MENU;

  isSidebarOpen = signal(false);
  isSubBarOpen = signal(false);

  user = signal({ name: 'Admin User', avatar: 'https://i.pravatar.cc/150?u=admin' });

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

  logout(): void {
    this.store.dispatch(new AuthActions.Logout()).subscribe(() => {
      this.toast.show(EMessage.GoodBye);
      this.router.navigate(['']);
    });
  }
}
