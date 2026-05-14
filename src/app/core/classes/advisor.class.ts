import { IAdvisor } from '@core/interfaces/user';
import { DBUser } from './bduser.class';

export class Advisor extends DBUser<IAdvisor> {
  user: IAdvisor;

  constructor(user: IAdvisor) {
    super(user);
    this.user = user;
  }

  public get profile(): IAdvisor {
    return this.user;
  }
}