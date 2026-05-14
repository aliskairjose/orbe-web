import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdvisorList, UserList } from '@core/components';

export interface User {
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  registrationDate: Date;
}
@Component({
  selector: 'app-users',
  imports: [CommonModule, UserList, AdvisorList],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  activeTab: 'users' | 'advisors' = 'users';

  users: User[] = [
    {
      firstName: 'Ana',
      lastName: 'García',
      role: 'User',
      avatar: 'https://i.pravatar.cc/150?u=ana',
      registrationDate: new Date('2023-10-15'),
    },
    {
      firstName: 'Luis',
      lastName: 'Rodríguez',
      role: 'User',
      avatar: 'https://i.pravatar.cc/150?u=luis',
      registrationDate: new Date('2024-01-20'),
    },
  ];

  advisors: User[] = [
    {
      firstName: 'Carlos',
      lastName: 'Sánchez',
      role: 'Advisorr',
      avatar: 'https://i.pravatar.cc/150?u=carlos',
      registrationDate: new Date('2022-05-10'),
    },
    {
      firstName: 'Elena',
      lastName: 'Pérez',
      role: 'Advisor',
      avatar: 'https://i.pravatar.cc/150?u=elena',
      registrationDate: new Date('2023-08-12'),
    },
  ];
}
