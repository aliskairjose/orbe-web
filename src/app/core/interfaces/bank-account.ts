import { IBank } from "./bank";
import { IUser } from "./user";

export interface IBankAccount {
  _id: string;
  type: string;
  number: string;
  bank: IBank;
  user: Pick<IUser, "name" | "lastName" | "avatar" | "_id">;
}