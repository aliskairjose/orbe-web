# Design: Login form with fake credential validation

## Component design

Use the existing `Login` component as a standalone page and add a reactive form with two controls:
- `email` with `Validators.required` and `Validators.email`
- `password` with `Validators.required`

The component should also track a simple `loginError` state for invalid credentials.

## Form behavior

- The submit button is disabled until the form is valid.
- Validation messages appear for missing email, invalid email format, and missing password.
- When the form is submitted and the values match the fake credential pair, the login is considered successful.
- When credentials do not match, show a generic login error message.

## Fake credentials

Hardcode a single valid login pair in the component, for example:
- email: `user@example.com`
- password: `password123`

Do not introduce any authentication services. All validation and credential checking stays inside the component.

## Navigation

On successful fake login, navigate to the dashboard route, such as `/dashboard/home`, or otherwise update the UI with a success state. This keeps the form realistic without adding backend dependencies.

## Template and styling

Use a clean, accessible form layout with:
- visible labels for each field
- `type="email"` for the email field and `type="password"` for the password field
- a submit button with a clear label like `Log in`
- inline validation feedback for each field
- an error banner for failed credentials

Keep the CSS lightweight and focused on form spacing and readability.
