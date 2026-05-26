import { AfterViewInit, Component, computed, inject, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthSelectors } from '../auth/store/auth.selectors';
import { Subject, takeUntil } from 'rxjs';
import { IAdvisor, IUser } from '@core/interfaces';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements AfterViewInit, OnDestroy {
  protected readonly year = new Date().getFullYear();
  private destroy$ = new Subject<void>();

  private readonly url = `${API_URL}/v1/`;
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  protected readonly top = httpResource<IAdvisor[]>(()=>`${this.url}dashboard/top-rated-advisors`);

  protected readonly accessButtonTitle = this.store.selectSnapshot(AuthSelectors.isAuthenticated)
    ? 'Dashboard'
    : 'Iniciar sesión';

    ngAfterViewInit(): void {
    this.route.fragment.pipe(takeUntil(this.destroy$)).subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          // Wrap in a minimal timeout to let dynamic content load
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
