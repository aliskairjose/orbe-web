import { Component, signal } from '@angular/core';
import {
  AnnualRequestServiceChart,
  AnnualTimeChart,
  AnnualUserRegister,
  RequestMonth,
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
  imports: [AnnualTimeChart, AnnualRequestServiceChart, CommonModule, UserCard, AnnualUserRegister, UserStatusPieChart,RoleDistribution, RequestMonth, TopAdvisorCard, RequestStatusHorBar],
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

  users: User[] = [
    {
      id: '1',
      firstName: 'Lucía',
      lastName: 'García',
      role: 'Advisor',
      createdAt: '12 May 2025',
      avatar: 'https://i.pravatar.cc/150?u=lucia',
    },
    {
      id: '2',
      firstName: 'Marcos',
      lastName: 'Ruiz',
      role: 'User',
      createdAt: '05 Jun 2025',
      avatar: 'https://i.pravatar.cc/150?u=marcos',
    },
    {
      id: '3',
      firstName: 'Elena',
      lastName: 'Sanz',
      role: 'Advisor',
      createdAt: '22 Jul 2025',
      avatar: 'https://i.pravatar.cc/150?u=elena',
    },
    {
      id: '4',
      firstName: 'Javier',
      lastName: 'López',
      role: 'User',
      createdAt: '10 Aug 2025',
      avatar: 'https://i.pravatar.cc/150?u=javier',
    },
    {
      id: '5',
      firstName: 'Sofía',
      lastName: 'Torres',
      role: 'User',
      createdAt: '18 Sep 2025',
      avatar: 'https://i.pravatar.cc/150?u=sofia',
    },
  ];


  summary = httpResource<IUserSummary>(()=>`${this.url}dashboard/users/summary`);
  newReg = httpResource<IUser[]>(()=>`${this.url}dashboard/new-registrations`);
  top = httpResource<IUser[]>(()=>`${this.url}dashboard/top-rated-advisors`);
  postulate = httpResource<IUser[]>(()=>`${this.url}dashboard/nominated-advisors`);



}

