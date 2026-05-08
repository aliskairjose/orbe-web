import { IUser } from "../../users/interfaces/user.interface";

export interface ITransaction {
  _id: string;
  user: Partial<IUser>;
  reference: string;
  amount: number;
  currency: string;
  paymentType: string;
  transactionType: string;
  createdAt: Date;
}