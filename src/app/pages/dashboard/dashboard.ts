import { CurrencyPipe } from '@angular/common';
import { Component, DOCUMENT, inject, input, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SIDE_MENU } from '@core/constants';
import { AuthActions } from '../auth/store/auth.actions';
import { Store } from '@ngxs/store';
import { EMessage } from '@core/enums';
import { ToastService } from '@core/services';
import { form, FormField, FormRoot, min, required } from '@angular/forms/signals';
import { httpResource } from '@angular/common/http';
import { IRateExchange } from '@core/interfaces';
import { HSOverlay } from 'flyonui/flyonui';
import { DashboardService } from '@core/services/dashboard';
import { AuthSelectors } from '../auth/store/auth.selectors';
import { Title } from '@angular/platform-browser';

interface RateFormData {
  rate: number;
}
const rateFormModel = signal<RateFormData>({
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
  titleService = inject(Title);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly service = inject(DashboardService);
  private document = inject(DOCUMENT);

  protected rate = signal<number>(0);

  protected readonly currentYear = new Date().getFullYear();
  protected readonly rateResource = httpResource<IRateExchange>(() => `${this.url}/rate-exchange`, {
    parse: (raw: any) => {
      this.rate.set(raw[0].currentRate);
      rateFormModel.set({
        rate: this.rate(),
      })
      return raw[0];
    },
  });

  protected form = form(
    rateFormModel,
    (validator) => {
      min(validator.rate, 1, { message: 'El valor no puede ser cero' });
      required(validator.rate, { message: 'El campo es obligatorio' });
    },
    {
      submission: {
        action: async (f) => this.updateRate(this.rateResource.value()!._id, f().value()),
      },
    },
  );

  protected menu = SIDE_MENU;
  protected isSidebarOpen = signal(false);
  protected isSubBarOpen = signal(false);
  protected userLogged = this.store.selectSnapshot(AuthSelectors.userLogged);

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
    this.openAuthModal();
  }

  openRateModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#rate-modal')!);
    modal.open();
  }

  closeRateModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#rate-modal')!);
    modal.close();
  }

  openAuthModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#auth-modal')!);
    modal.open();
  }
  closeAuthModal(isLogout: boolean): void {
    const modal = new HSOverlay(this.document.querySelector('#auth-modal')!);
    modal.close();

    if (isLogout) {
      this.store.dispatch(new AuthActions.Logout()).subscribe(() => {
        this.toast.show(EMessage.GoodBye);
        this.router.navigate(['']);
      });
    }
  }

  private updateRate(id: string, f: RateFormData): void {
    this.closeRateModal();
    this.service.updateRate(id, f.rate).subscribe((res) => {
      this.rate.set(res.currentRate);
      rateFormModel.set({
        rate: this.rate(),
      });
    });
  }
}
