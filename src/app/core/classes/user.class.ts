import { IDBUser, IUser } from '@core/interfaces';
import { DBUser } from './bduser.class';

export class User extends DBUser<IUser> {
  user: IUser;

  constructor(user: IUser) {
    super(user);
    this.user = user;
  }

  public get profile(): IUser {
    return this.user;
  }

}
