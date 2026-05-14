import { IUserBase } from '@core/interfaces/user';

export abstract class DBUser<T extends IUserBase> {
  protected bdUser: T;

  constructor(user: T) {
    this.bdUser = user;
  }

  abstract get profile(): T;

  fullName(): string {
    return `${this.bdUser.name} ${this.bdUser.lastName}`;
  }
}
