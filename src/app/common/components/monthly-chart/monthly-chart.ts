import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-monthly-chart',
  imports: [],
  templateUrl: './monthly-chart.html',
  styleUrl: './monthly-chart.css',
})
export class MonthlyChart {
  monthlyData = signal([
    { month: 'Ene', users: 45, advisors: 20 },
    { month: 'Feb', users: 55, advisors: 25 },
    { month: 'Mar', users: 70, advisors: 30 },
    { month: 'Abr', users: 65, advisors: 45 },
    { month: 'May', users: 80, advisors: 40 },
    { month: 'Jun', users: 95, advisors: 50 },
    { month: 'Jul', users: 110, advisors: 60 },
    { month: 'Ago', users: 100, advisors: 55 },
    { month: 'Sep', users: 90, advisors: 48 },
    { month: 'Oct', users: 120, advisors: 70 },
    { month: 'Nov', users: 130, advisors: 75 },
    { month: 'Dic', users: 150, advisors: 85 },
  ]);

  // Buscamos el valor máximo para escalar las barras al 100% del contenedor
  maxVal = computed(() => {
    const allValues = this.monthlyData().flatMap(d => [d.users, d.advisors]);
    return Math.max(...allValues);
  });
}

