import { IUser } from "./user";

export interface IMessage {
  _id: string;
  message: string;
  sender: IUser;
  createdAt: Date;
}