import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-status-pie-chart',
  imports: [CommonModule],
  templateUrl: './user-status-pie-chart.html',
  styleUrl: './user-status-pie-chart.css',
})
export class UserStatusPieChart {
  stats = {
    activos: 45,
    inactivos: 25,
    suspendidos: 20,
    bloqueados: 10
  };

  // Generamos el string del conic-gradient dinámicamente
  get chartStyle() {
    const s = this.stats;
    return {
      background: `conic-gradient(
        #10b981 0% ${s.activos}%, 
        #f59e0b ${s.activos}% ${s.activos + s.inactivos}%, 
        #ef4444 ${s.activos + s.inactivos}% ${s.activos + s.inactivos + s.suspendidos}%, 
        #6b7280 ${s.activos + s.inactivos + s.suspendidos}% 100%
      )`
    };
  }
}
