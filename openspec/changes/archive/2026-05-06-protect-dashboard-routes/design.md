# Design: Dashboard route guard implementation

## Auth state

Add a small `AuthService` that manages authenticated state using a signal and optional persistent storage.
The service will expose:
- `isAuthenticated()` — current auth state
- `login()` — set authenticated state
- `logout()` — clear authenticated state

The guard should depend on this service and check `isAuthenticated()` before allowing access.

## AuthGuard

Create an `AuthGuard` that implements both `CanActivate` and `CanActivateChild`.
- If the user is authenticated, allow navigation.
- If the user is not authenticated, route to `/auth/login` and return `false`.

Apply the guard to the dashboard route configuration so the shell and all child routes are protected.

## Route configuration

Update `src/app/app.routes.ts`:
- Add `canActivate: [AuthGuard]` to the `dashboard` route
- Add `canActivateChild: [AuthGuard]` to the `dashboard` route

This preserves the existing lazy-loaded dashboard structure while protecting all nested pages.

## Login integration

Update `src/app/pages/auth/login/login.ts` to use the auth service on successful fake login.
When credentials are valid, call `authService.login()` before navigating to `/dashboard/home`.

## Failure handling

If the guard denies access, the user should return to the login screen without seeing protected content.
Show the existing fake login error when invalid credentials are entered.

## Testing

Add or extend tests to cover:
- `AuthGuard` allows navigation when authenticated
- `AuthGuard` redirects to `/auth/login` when unauthenticated
- login component calls auth service and navigates on success
