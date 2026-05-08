export interface ICategory {
  _id: string;
  isActive: boolean;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date
}