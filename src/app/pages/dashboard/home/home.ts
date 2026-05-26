import { Component, signal } from '@angular/core';
import {
  AnnualRequestServiceChart,
  AnnualTimeChart,
  AnnualUserRegister,
  RequestMonth,
  RequestStatusAnnual,
  RequestStatusHorBar,
  RoleDistribution,
  TopAdvisorCard,
  UserCard,
  UserStatusPieChart,
} from '@core/components';

import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { IUser, IUserSummary } from '@core/interfaces';
interface Metric {
  label: string;
  value: string;
}


interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: 'Advisor' | 'User';
  createdAt: string;
}
@Component({
  selector: 'app-home',
  imports: [AnnualTimeChart, AnnualRequestServiceChart, CommonModule, UserCard, AnnualUserRegister, UserStatusPieChart,RoleDistribution, RequestMonth, TopAdvisorCard, RequestStatusHorBar, RequestStatusAnnual],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly url = `${API_URL}/v1/`;
  math = Math;
  metrics = signal<Metric[]>([
    { label: 'Total Users', value: '27' },
    { label: 'Asesores', value: '18' },
    { label: 'Acumulado Mayo', value: '$9.000,00' },
  ]);

  summary = httpResource<IUserSummary>(()=>`${this.url}dashboard/users/summary`);
  newReg = httpResource<IUser[]>(()=>`${this.url}dashboard/new-registrations`);
  top = httpResource<IUser[]>(()=>`${this.url}dashboard/top-rated-advisors`);
  postulate = httpResource<IUser[]>(()=>`${this.url}dashboard/nominated-advisors`);



}

