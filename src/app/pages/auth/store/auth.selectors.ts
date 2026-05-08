import { createPropertySelectors, createSelector } from '@ngxs/store';
import { AuthStateModel } from './auth.models';
import { AuthStates } from './auth.states';

export class AuthSelectors {
  private static getSlices = createPropertySelectors<AuthStateModel>(AuthStates);

  static token = createSelector(
    [AuthSelectors.getSlices.token],
    (token) => token
  );

  static isAuthenticated = createSelector(
    [AuthSelectors.getSlices.token],
    (token) => !!token
  );

  static userLogged = createSelector(
    [AuthSelectors.getSlices.user],
    (user) => user
  );

  static userRole = createSelector(
    [AuthSelectors.getSlices.user],
    (user) => user?.role
  );
}