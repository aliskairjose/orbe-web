import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./root/root').then((m) => m.Root),
  }, {
    path: ':id',
    loadComponent: () => import('./details/details').then((m) => m.Details),
  },
];
