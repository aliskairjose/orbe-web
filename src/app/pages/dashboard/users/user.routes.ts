import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: '',
    title: 'Usuarios',
    loadComponent: () => import('./root/root').then((m) => m.Root),
  }, {
    path: ':id',
    title: 'Detalle de Usuario',
    loadComponent: () => import('./details/details').then((m) => m.Details),
  },
];
