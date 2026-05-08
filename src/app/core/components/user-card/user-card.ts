import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  role: 'Advisor' | 'User';
  createdAt: string;
}

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input.required<User>();
}
