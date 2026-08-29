import { Routes } from '@angular/router';

export const dashboarRoutes: Routes = [
  {
    path: '',
    title: 'Resumen General',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'admin',
    title: 'Administrador',
    loadComponent: () => import('./admin/admin').then((m) => m.Admin),
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
    path: 'advisor-payments',
    title: 'Pago a asesores',
    loadComponent: () => import('./advisor-payments/advisor-payments').then((m) => m.AdvisorPayments),
  },
  {
    path: 'chats',
    title: 'Chats',
    loadComponent: () => import('./chats/chats').then((m) => m.Chats),
  },
];
