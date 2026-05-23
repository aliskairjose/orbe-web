import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthSelectors } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-landing',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  baseUrl = API_URL;
  env = ENV;

  private store = inject(Store);

  protected readonly accessButtonTitle = this.store.selectSnapshot(AuthSelectors.isAuthenticated)
    ? 'Dashboard'
    : 'Iniciar sesión';
}
