import { Routes } from '@angular/router';

export const dashboarRoutes: Routes = [
  {
    path: '',
    title: 'Resumen General',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'home',
    title: 'Resumen General',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'users',
    title: 'Usuarios',
    loadComponent: () => import('./users/users').then((m) => m.Users),
    loadChildren: () => import('./users/user.routes').then((m) => m.userRoutes),
  },

  {
    path: 'categories',
    title: 'Categorías',
    loadComponent: () => import('./categories/categories').then((m) => m.Categories),
  },
  {
    path: 'banks',
    title: 'Bancos',
    loadComponent: () => import('./banks/banks').then((m) => m.Banks),
  },
  {
    path: 'bank-accounts',
    title: 'Cuentas Bancarias',
    loadComponent: () => import('./bank-accounts/bank-accounts').then((m) => m.BankAccounts),
  },
  {
    path: 'legals',
    title: 'Legales',
    loadComponent: () => import('./legals/legals').then((m) => m.Legals),
  },
  {
    path: 'plans',
    title: 'Planes',
    loadComponent: () => import('./plans/plans').then((m) => m.Plans),
  },
  {
    path: 'transactions',
    title: 'Transacciones',
    loadComponent: () => import('./transactions/transactions').then((m) => m.Transactions),
  },
  {
    path: 'chats',
    title: 'Chats',
    loadComponent: () => import('./chats/chats').then((m) => m.Chats),
  },
  {
    path: 'notifications',
    title: 'Notificaciones',
    loadComponent: () => import('./notifications/notifications').then((m) => m.Notifications),
  },
];
