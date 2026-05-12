import { IAdvisor, IDBUser } from '@core/interfaces/user';
import { DBUser } from './bduser.class';

export class Advisor extends DBUser {
  dbUser: IDBUser;

  constructor(dbUser: IDBUser) {
    super(dbUser);
    this.dbUser = dbUser;
  }

  public get profile(): IAdvisor {
    const { advisor, ...rest } = this.dbUser;
    return { ...rest, ...advisor };
  }
}