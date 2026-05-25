import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'auth/verify-email/:id',
    loadComponent: () => import('./pages/auth/verify-account/verify-account').then((m) => m.VerifyAccount),
  },
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.dashboarRoutes),
  },
];
