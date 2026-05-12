import { IDBUser, IUser } from '@core/interfaces';
import { DBUser } from './bduser.class';

export class User extends DBUser {
  dbUser: IDBUser;

  constructor(dbUser: IDBUser) {
    super(dbUser);
    this.dbUser = dbUser;
  }

  public get profile(): IUser {
    const { advisor, rateAvg, language, bankAccount, rateStats, ...rest } = this.dbUser;
    return rest;
  }
}