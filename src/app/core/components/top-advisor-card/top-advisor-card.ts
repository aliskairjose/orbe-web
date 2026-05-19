import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IAdvisor } from '@core/interfaces';

@Component({
  selector: 'app-top-advisor-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './top-advisor-card.html',
  styleUrl: './top-advisor-card.css',
})
export class TopAdvisorCard {
  user = input.required<Partial<IAdvisor>>();
}
