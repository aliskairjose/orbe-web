import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-users-circular-chart',
  imports: [],
  templateUrl: './users-circular-chart.html',
  styleUrl: './users-circular-chart.css',
})
export class UsersCircularChart {

  // Datos falsos (Simulados)
  users = signal([
    { id: 1, type: 'User' },
    { id: 2, type: 'Advisor' },
    { id: 3, type: 'User' },
    { id: 4, type: 'User' },
    { id: 5, type: 'Advisor' },
    { id: 6, type: 'User' },
  ]);

  // Cálculos reactivos
  total = computed(() => this.users().length);
  userCount = computed(() => this.users().filter(u => u.type === 'User').length);
  advisorCount = computed(() => this.users().filter(u => u.type === 'Advisor').length);
  
  // Calculamos el porcentaje que ocupa el primer segmento
  userPercentage = computed(() => (this.userCount() / this.total()) * 100);
  
}
