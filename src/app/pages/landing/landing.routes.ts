import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'faq',
    loadComponent: () => import('./faq/faq').then((m) => m.Faq),
  },
  {
    path: 'user-policies',
    loadComponent: () => import('./user-policy/user-policy').then((m) => m.UserPolicy),
  },
  {
    path: 'advisor-policy',
    loadComponent: () => import('./advisor-policy/advisor-policy').then((m) => m.AdvisorPolicy),
  },
  {
    path: 'privacy-policies',
    loadComponent: () => import('./privacy-policies/privacy-policies').then((m) => m.PrivacyPolicies),
  },
  
];
