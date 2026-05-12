import { IMessage } from "./message";
import { IUser } from "./user";

export interface IRoom {
  _id: string;
  name: string;
  messages: IMessage[];
  members: IUser[];
  createdAt: Date;
}