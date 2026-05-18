import { Component, computed, input, signal } from '@angular/core';
import { IUserSummary } from '@core/interfaces';

interface RoleCount {
  role: 'User' | 'Advisor';
  count: number;
  color: string;
}
@Component({
  selector: 'app-role-distribution',
  imports: [],
  templateUrl: './role-distribution.html',
  styleUrl: './role-distribution.css',
})
export class RoleDistribution {
  summary = input<IUserSummary>();
  math = Math;

  roleCount = computed(() => {
    return [
      { role: 'User', count: this.summary()!.roleSummary.User, color: '#2563eb' },
      { role: 'Advisor', count: this.summary()!.roleSummary.Advisor, color: '#10b981' },
    ];
  });

  totalUsers = computed(() => {
    if(this.summary()?.totalRegisteredUsers){
      return this.summary()!.totalRegisteredUsers - 1
    }
    return 0;
  });

  userPercent = computed(() => {
    const total = this.totalUsers();
    if (!total) return 0;
    return Math.round(
      ((this.roleCount().find((item) => item.role === 'User')?.count ?? 0) / total) * 100,
    );
  });

  advisorPercent = computed(() => 100 - this.userPercent());

  readonly circumference = 2 * Math.PI * 64;

  donutOffset = computed(() => this.circumference * (1 - this.userPercent() / 100));
}
