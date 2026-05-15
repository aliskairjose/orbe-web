import { Component, computed, signal } from '@angular/core';

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
  math = Math;

  roleCount = signal<RoleCount[]>([
    { role: 'User', count: 9, color: '#2563eb' },
    { role: 'Advisor', count: 18, color: '#10b981' },
  ]);

  
  totalUsers = computed(() => this.roleCount().reduce((sum, item) => sum + item.count, 0));


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
