import { IUser } from "../../users/interfaces/user.interface";
import { IMessage } from "./message.interface";

export interface IRoom {
  _id: string;
  name: string;
  messages: IMessage[];
  members: IUser[];
  createdAt: Date;
}