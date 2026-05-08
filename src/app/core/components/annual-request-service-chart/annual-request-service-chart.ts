import { Component } from '@angular/core';

interface MonthlyStats {
  month: string;
  chat: number; // Porcentaje
  calls: number; // Porcentaje
}

@Component({
  selector: 'app-annual-request-service-chart',
  imports: [],
  templateUrl: './annual-request-service-chart.html',
  styleUrl: './annual-request-service-chart.css',
})
export class AnnualRequestServiceChart {
  stats: MonthlyStats[] = [
    { month: 'Ene', chat: 45, calls: 30 },
    { month: 'Feb', chat: 52, calls: 25 },
    { month: 'Mar', chat: 38, calls: 45 },
    { month: 'Abr', chat: 60, calls: 20 },
    { month: 'May', chat: 40, calls: 50 },
    { month: 'Jun', chat: 55, calls: 35 },
    { month: 'Jul', chat: 48, calls: 42 },
    { month: 'Ago', chat: 30, calls: 60 },
    { month: 'Sep', chat: 65, calls: 15 },
    { month: 'Oct', chat: 50, calls: 40 },
    { month: 'Nov', chat: 42, calls: 55 },
    { month: 'Dic', chat: 58, calls: 38 },
  ];
}
