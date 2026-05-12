import { TConnectStatus } from "@core/types";
import { IWallet } from "./wallet";
import { ERole, EStatus } from "@core/enums";
import { IBankAccount } from "./bank-account";

export interface IDBUser {
  _id: string;
  avatar: string;
  name: string;
  lastName: string;
  email: string;
  role: ERole;
  dob: Date;
  phone: string;
  country: string;
  language: string[];
  isActive: boolean;
  connectStatus: TConnectStatus;
  status: EStatus;
  socketId?: string;
  lastConnect: Date;
  createdAt: Date;
  updatedAt: Date;
  wallet: IWallet;
  rateAvg: number; // para el listado de asesores
  advisor: IAdvisor;
  bankAccount: IBankAccount;
  rateStats?: IRateStats; //Para el detalle de asesor
}
export interface IUser {
  _id: string;
  avatar: string;
  name: string;
  lastName: string;
  email: string;
  role: ERole;
  dob: Date;
  phone: string;
  country: string;
  isActive: boolean;
  connectStatus: TConnectStatus;
  status: EStatus;
  socketId?: string;
  lastConnect: Date;
  createdAt: Date;
  updatedAt: Date;
  wallet: IWallet;
}
export interface IAdvisor extends IUser {
  alias: string;
  chatPrice: number;
  callPrice: number;
  enabledCall: boolean;
  description: string;
  category: string;
  decription: string;
  experience: string;
  dniImage: string;
  dniID: string;
  dniType: string;
  videoIntro: string;
  videoIntroID: string;
  bankAccount: IBankAccount;
  language: string[];
  rateAvg: number; // para el listado de asesores
  rateStats?: IRateStats; //Para el detalle de asesor
}

export interface ITotalUsers{
  totalUsers: number;
  totalAsesors: number;
  totalRegister: number;
  totalNewUsers: number;
}

export interface IRateStats {
  average: number;
  fiveStars: number;
  fourStars: number;
  oneStars: number;
  reviews: number;
  threeStars: number;
  twoStars: number;
}