export interface IRoom {
  _id: string;
  name: string;
  messages: IMessage[];
  members: IUser[];
  createdAt: Date;
}