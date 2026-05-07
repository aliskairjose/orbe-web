# Tasks: Protect dashboard routes

1. Create `src/app/core/auth.service.ts`
   - implement authenticated state tracking with `signal`
   - provide `isAuthenticated()`, `login()`, and `logout()` methods
   - optionally persist authentication state to local storage
   - [x] Task complete

2. Create `src/app/core/auth.guard.ts`
   - implement `CanActivate` and `CanActivateChild`
   - redirect unauthenticated users to `/auth/login`
   - return `false` for denied navigation
   - [x] Task complete

3. Update `src/app/app.routes.ts`
   - add `canActivate: [AuthGuard]` and `canActivateChild: [AuthGuard]` to the dashboard route
   - ensure the guard protects all dashboard subroutes
   - [x] Task complete

4. Update `src/app/pages/auth/login/login.ts`
   - inject `AuthService`
   - call `login()` on successful fake credentials
   - keep the existing navigation to `/dashboard/home`
   - [x] Task complete

5. Add or update tests
   - verify the guard allows access when authenticated
   - verify the guard redirects when not authenticated
   - verify login flow sets auth state and navigates
   - [x] Task complete
