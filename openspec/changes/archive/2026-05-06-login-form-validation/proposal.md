# Proposal: Login form validation

## What
Implement a standalone login page for the existing app with a form that accepts:
- `email`
- `password`

The form must enforce:
- both fields are required
- email is a valid email address

The login action should use hardcoded fake credentials inside the component and should not call or create any external services.

## Why
The current login page is a placeholder and does not support real form entry or validation. Adding a proper login form will improve the onboarding flow and make the authentication entry point ready for later integration with actual auth logic.

## Scope
Includes:
- form inputs for email and password
- client-side validation for required fields and email format
- fake in-component credential verification
- user-visible validation and error messages
- navigation or success state after a successful fake login

Does not include:
- backend auth service integration
- token storage or persistent session management
- user registration or password recovery
