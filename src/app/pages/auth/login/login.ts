import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected readonly loginError = signal(false);

  private readonly fakeCredentials = {
    email: 'user@example.com',
    password: 'password123',
  };

  protected get emailControl() {
    return this.loginForm.get('email');
  }

  protected get passwordControl() {
    return this.loginForm.get('password');
  }

  protected submit(): void {
    this.loginError.set(false);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value as {
      email: string;
      password: string;
    };

    if (email === this.fakeCredentials.email && password === this.fakeCredentials.password) {
      this.authService.login();
      this.router.navigate(['/dashboard/home']);
      return;
    }

    this.loginError.set(true);
  }
}
