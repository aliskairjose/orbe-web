# Proposal: Protect dashboard routes with guards

## What
Implement protected routing for the dashboard section and all dashboard subroutes.

Add an authentication guard that blocks access to:
- `/dashboard`
- `/dashboard/home`
- `/dashboard/users`
- `/dashboard/categories`
- `/dashboard/banks`
- `/dashboard/bank-accounts`
- `/dashboard/legals`
- `/dashboard/plans`

If the user is not authenticated, the guard should redirect them to `/auth/login`.

## Why
The dashboard currently loads without any authorization checks, so unauthenticated users can access internal pages directly.
Adding route guards enforces a clean separation between public landing/auth pages and protected dashboard content, and prepares the app for future auth integration.

## Scope
Includes:
- a reusable `AuthGuard` for dashboard route protection
- an `AuthService` or equivalent state provider to track authenticated status
- route configuration changes on `app.routes.ts` for `canActivate` and `canActivateChild`
- login flow updates so successful fake login enables dashboard access
- redirect to `/auth/login` when access is denied

Does not include:
- backend authentication or token exchange
- user roles, permissions, or authorization beyond authenticated status
- full session management beyond simple client-side auth state
