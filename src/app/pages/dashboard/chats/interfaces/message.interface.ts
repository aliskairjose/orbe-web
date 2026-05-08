import { IUser } from "../../users/interfaces/user.interface";

export interface IMessage {
  _id: string;
  message: string;
  sender: IUser;
  createdAt: Date;
}