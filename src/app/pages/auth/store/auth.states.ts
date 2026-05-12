import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { AuthActions } from './auth.actions';
import { Auth } from '../../../core/services/auth';
import { AuthStateModel } from './auth.models';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    user: null,
  },
})
@Injectable()
export class AuthStates {
  #authService = inject(Auth);

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, action: AuthActions.Login) {
    return this.#authService.login(action.payload).pipe(
      tap((result: any) => {
        ctx.patchState({
          token: result.token,
          user: result.user,
        });
      })
    );
  }

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.#authService.logout().pipe(
      tap(() => {
        ctx.setState({
          token: null,
          user: null,
        });
      })
    );
  }
  
}