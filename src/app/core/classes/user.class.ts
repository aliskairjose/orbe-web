export class Advisor {
  dbUser: IDBUser;

  constructor(advisor: IDBUser) {
    this.dbUser = advisor;
  }

  public get advisor(): IAdvisor {
    const { advisor,...rest } = this.dbUser;

    return {...rest,...advisor };
  }

  public get user(): IUser{
    const {
        advisor,
        rateAvg,
        language,
        bankAccount,
        rateStats,
        ...rest
    } = this.dbUser;

    return rest;
  }
}
