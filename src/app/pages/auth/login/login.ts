import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthActions } from '../store/auth.actions';
import { EMessage, ERoutes } from '@core/enums';
import { email, form, FormField, required } from '@angular/forms/signals';
import { SocketService } from '../../../core/services/socket';
import { ToastService } from '@core/services';

interface LoginData {
  email: string;
  password: string;
}
const loginModel = signal<LoginData>({
  email: '',
  password: '',
});
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly socket = inject (SocketService);

  form = form(loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    const credentials = loginModel();
    this.store.dispatch(new AuthActions.Login(credentials)).subscribe(() => {
      this.socket.connect();
      this.toast.show(EMessage.Welcome);
      this.router.navigate([ERoutes.Dashboard]);
    });
  }
}
