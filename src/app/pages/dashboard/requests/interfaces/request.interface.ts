export interface IRequestByAsesor{
  _id: string;
  totalRequests: number;
  accepted: number;
  rejected: number;
  asesor: IRequestUser;
}

interface IRequestUser {
  avatar: string;
  name: string;
  lastName: string;
  email: string;
}