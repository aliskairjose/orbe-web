import { AfterViewInit, Component, computed, inject, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthSelectors } from '../auth/store/auth.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements AfterViewInit, OnDestroy {
  protected readonly year = new Date().getFullYear();
  private destroy$ = new Subject<void>();

  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  

  protected readonly accessButtonTitle = this.store.selectSnapshot(AuthSelectors.isAuthenticated)
    ? 'Dashboard'
    : 'Iniciar sesión';  
    
  protected goTo = this.store.selectSnapshot(AuthSelectors.isAuthenticated)
    ? ['dashboard']
    : ['auth', 'login'];

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
