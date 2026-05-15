import { Routes } from '@angular/router';

export const dashboarRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users').then((m) => m.Users),
    loadChildren: () => import('./users/user.routes').then((m) => m.userRoutes),
  },

  {
    path: 'categories',
    loadComponent: () => import('./categories/categories').then((m) => m.Categories),
  },
  {
    path: 'banks',
    loadComponent: () => import('./banks/banks').then((m) => m.Banks),
  },
  {
    path: 'bank-accounts',
    loadComponent: () => import('./bank-accounts/bank-accounts').then((m) => m.BankAccounts),
  },
  {
    path: 'legals',
    loadComponent: () => import('./legals/legals').then((m) => m.Legals),
  },
  {
    path: 'plans',
    loadComponent: () => import('./plans/plans').then((m) => m.Plans),
  },
  {
    path: 'transactions',
    loadComponent: () => import('./transactions/transactions').then((m) => m.Transactions),
  },
  {
    path: 'chats',
    loadComponent: () => import('./chats/chats').then((m) => m.Chats),
  },
];
