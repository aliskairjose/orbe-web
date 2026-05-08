import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  AnnualRequestServiceChart,
  AnnualTimeChart,
  AnnualUserRegister,
  UserCard,
  UserStatusPieChart,
} from '@shared/components';

import { CommonModule } from '@angular/common';
interface Metric {
  label: string;
  value: string;
}

interface RequestCount {
  type: 'Chat' | 'Llamada';
  count: number;
  color: string;
}

interface RoleCount {
  role: 'User' | 'Advisor';
  count: number;
  color: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  role: 'Advisor' | 'User';
  createdAt: string;
}
@Component({
  selector: 'app-home',
  imports: [AnnualTimeChart, AnnualRequestServiceChart, CommonModule, UserCard, AnnualUserRegister, UserStatusPieChart,],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  math = Math;
  metrics = signal<Metric[]>([
    { label: 'Total Users', value: '27' },
    { label: 'Asesores', value: '18' },
    { label: 'Acumulado Mayo', value: '$9.000,00' },
  ]);

  users: User[] = [
    {
      id: 1,
      firstName: 'Lucía',
      lastName: 'García',
      role: 'Advisor',
      createdAt: '12 May 2025',
      avatar: 'https://i.pravatar.cc/150?u=lucia',
    },
    {
      id: 2,
      firstName: 'Marcos',
      lastName: 'Ruiz',
      role: 'User',
      createdAt: '05 Jun 2025',
      avatar: 'https://i.pravatar.cc/150?u=marcos',
    },
    {
      id: 3,
      firstName: 'Elena',
      lastName: 'Sanz',
      role: 'Advisor',
      createdAt: '22 Jul 2025',
      avatar: 'https://i.pravatar.cc/150?u=elena',
    },
    {
      id: 4,
      firstName: 'Javier',
      lastName: 'López',
      role: 'User',
      createdAt: '10 Aug 2025',
      avatar: 'https://i.pravatar.cc/150?u=javier',
    },
    {
      id: 5,
      firstName: 'Sofía',
      lastName: 'Torres',
      role: 'User',
      createdAt: '18 Sep 2025',
      avatar: 'https://i.pravatar.cc/150?u=sofia',
    },
  ];

  requestCount = signal<RequestCount[]>([
    { type: 'Chat', count: 100, color: '#2563eb' },
    { type: 'Llamada', count: 35, color: '#10b981' },
  ]);

  roleCount = signal<RoleCount[]>([
    { role: 'User', count: 9, color: '#2563eb' },
    { role: 'Advisor', count: 18, color: '#10b981' },
  ]);

  totalUsers = computed(() => this.roleCount().reduce((sum, item) => sum + item.count, 0));

  totalRequests = computed(() => this.requestCount().reduce((sum, item) => sum + item.count, 0));

  userPercent = computed(() => {
    const total = this.totalUsers();
    if (!total) return 0;
    return Math.round(
      ((this.requestCount().find((item) => item.type === 'Chat')?.count ?? 0) / total) * 100,
    );
  });

  requestPercent = computed(() => {
    const total = this.totalUsers();
    if (!total) return 0;
    return Math.round(
      ((this.requestCount().find((item) => item.type === 'Chat')?.count ?? 0) / total) * 100,
    );
  });

  advisorPercent = computed(() => 100 - this.userPercent());

  readonly circumference = 2 * Math.PI * 64;

  donutOffset = computed(() => this.circumference * (1 - this.userPercent() / 100));
}

