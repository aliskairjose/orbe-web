import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface MonthlyStats {
  month: string;
  calls: number; // Porcentaje
}

@Component({
  selector: 'app-annual-time-chart',
  imports: [CommonModule],
  templateUrl: './annual-time-chart.html',
  styleUrl: './annual-time-chart.css',
})
export class AnnualTimeChart {
  stats: MonthlyStats[] = [
    { month: 'Ene', calls: 30 },
    { month: 'Feb', calls: 25 },
    { month: 'Mar', calls: 45 },
    { month: 'Abr', calls: 20 },
    { month: 'May', calls: 50 },
    { month: 'Jun', calls: 35 },
    { month: 'Jul', calls: 42 },
    { month: 'Ago', calls: 60 },
    { month: 'Sep', calls: 15 },
    { month: 'Oct', calls: 40 },
    { month: 'Nov', calls: 55 },
    { month: 'Dic', calls: 38 },
  ];
}
