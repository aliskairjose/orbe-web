export abstract class DBUser{
    constructor(protected readonly dbuser: IDBUser){}

    abstract get profile(): IUser | IAdvisor

    fullName(): string {
        return `${this.dbuser.name} ${this.dbuser.lastName}`;
    }
}