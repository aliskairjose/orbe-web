
export interface IUserSummary {
  roleSummary: IRoleSummary;
  currentMonthRegisteredUsers: number;
  totalRegisteredUsers: number;
}

export interface IRoleSummary {
  User: number;
  Admin: number;
  Advisor: number;
}

export interface IAccumulatedTime {
  name: string;
  data: number[];
}