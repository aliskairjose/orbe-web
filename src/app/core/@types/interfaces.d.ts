interface IBank {
  _id: string;
  name: string;
  country: string;
  isActive: boolean;
}

interface IBankAccount {
  _id: string;
  type: string;
  number: string;
  bank: IBank;
  user: Pick<IUser, 'name' | 'lastName' | 'avatar'>;
}

interface ICategory {
  _id: string;
  isActive: boolean;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IMessage {
  _id: string;
  message: string;
  sender: IUser;
  createdAt: Date;
}

interface IRoom {
  _id: string;
  name: string;
  messages: IMessage[];
  members: IUser[];
  createdAt: Date;
}

interface IPlan {
  _id: string;
  amount: number;
  bonus: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IRequestByAsesor {
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

interface IUserSummary {
  roleSummary: IRoleSummary;
  currentMonthRegisteredUsers: number;
  totalRegisteredUsers: number;
}

interface IRoleSummary {
  User: number;
  Admin: number;
  Advisor: number;
}

interface IAccumulatedTime {
  name: string;
  data: number[];
}

interface ITransaction {
  _id: string;
  user: Partial<IUser>;
  reference: string;
  amount: number;
  currency: string;
  paymentType: string;
  transactionType: string;
  createdAt: Date;
}

interface RequestLogs {
  status: string;
  createdAt: Date;
}
interface IDBUser {
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
interface IUser {
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
interface IAdvisor extends IUser {
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
interface IWallet {
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ITotalUsers {
  totalUsers: number;
  totalAsesors: number;
  totalRegister: number;
  totalNewUsers: number;
}

interface IRateStats {
  average: number;
  fiveStars: number;
  fourStars: number;
  oneStars: number;
  reviews: number;
  threeStars: number;
  twoStars: number;
}

interface ITable {
  headers: string[];
  rows: Partial<ICell>[][];
}

interface ICell {
  label: string;
  type: 'text' | 'date' | 'number' | 'boolean' | 'currency' | 'badge';
  action: Partial<IAction>;
}

interface IAction {
  isEdit: boolean;
  isDelete: boolean;
  isDetail: boolean;
}
