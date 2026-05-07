# Tasks: Login form validation

1. Update `src/app/pages/auth/login/login.ts`
   - import `FormBuilder`, `Validators`, and `ReactiveFormsModule`
   - build a reactive login form with `email` and `password`
   - implement hardcoded fake credential validation inside the component
   - add a `loginError` state and handle successful login
   - include `Router` navigation to `/dashboard/home` on success
   - [x] Task complete

2. Update `src/app/pages/auth/login/login.html`
   - replace the placeholder text with a real form
   - render email and password inputs with labels
   - show required/email validation messages
   - disable submit until the form is valid
   - display a generic login error when credentials fail
   - [x] Task complete

3. Update `src/app/pages/auth/login/login.css`
   - add basic form layout and spacing styles
   - ensure the form is readable and accessible
   - [x] Task complete

4. Update or add tests in `src/app/pages/auth/login/login.spec.ts`
   - verify the component creates successfully
   - add coverage for form validation and fake login behavior
   - [x] Task complete
