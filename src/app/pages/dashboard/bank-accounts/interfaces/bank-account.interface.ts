import {  IBank } from "../../banks/interfaces/bank.interface";
import { IUser } from "../../users/interfaces/user.interface";

export interface IBankAccount {
  _id: string;
  type: string;
  number: string;
  bank: IBank;
  user: Pick<IUser, "name" | "lastName" | "avatar">;
}