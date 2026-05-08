import { ERole, EStatus } from "@core/enums";
import { IBankAccount } from "../../bank-accounts/interfaces/bank-account.interface";
import { TConnectStatus } from "@core/types";

export interface IUser {
  _id: string;
  avatar: string;
  name: string;
  lastName: string;
  email: string;
  role: ERole;
  dob: Date;
  phone: string,
  country: string;
  language?: string[];
  isActive: boolean;
  connectStatus: TConnectStatus;
  status?: EStatus;
  socketId?: string;
  lastConnect: Date;
  createdAt: Date;
  updatedAt: Date;
  wallet: IWallet;
  rateAvg?: number; // para el listado de asesores
  advisor?: IAdvisor;
  bankAccount?: IBankAccount;
  rateStats?: IRateStats; //Para el detalle de asesor
}

interface RequestLogs {
  status: string;
  createdAt: Date;
}
export interface IAdvisor {
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
}

export interface IWallet {
  balance: number;
  createdAt: Date;
  updatedAt: Date;
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