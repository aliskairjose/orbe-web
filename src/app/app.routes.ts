import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./pages/auth/login/login').then((m) => m.Login),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/home/home').then((m) => m.Home),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/dashboard/home/home').then((m) => m.Home),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/dashboard/users/users').then((m) => m.Users),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/dashboard/categories/categories').then((m) => m.Categories),
      },
      {
        path: 'banks',
        loadComponent: () =>
          import('./pages/dashboard/banks/banks').then((m) => m.Banks),
      },
      {
        path: 'bank-accounts',
        loadComponent: () =>
          import('./pages/dashboard/bank-accounts/bank-accounts').then((m) => m.BankAccounts),
      },
      {
        path: 'legals',
        loadComponent: () =>
          import('./pages/dashboard/legals/legals').then((m) => m.Legals),
      },
      {
        path: 'plans',
        loadComponent: () =>
          import('./pages/dashboard/plans/plans').then((m) => m.Plans),
      },
    ]
  }
];
