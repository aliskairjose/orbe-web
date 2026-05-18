import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IUser } from '@core/interfaces';


@Component({
  selector: 'app-user-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input.required<IUser>();
}
