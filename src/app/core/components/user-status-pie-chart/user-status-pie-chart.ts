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
        oklch(92.5% 0.084 155.995) 0% ${s.activos}%, 
        oklch(78.5% 0.115 274.713) ${s.activos}% ${s.activos + s.inactivos}%, 
        oklch(82.8% 0.111 230.318) ${s.activos + s.inactivos}% ${s.activos + s.inactivos + s.suspendidos}%, 
        oklch(87.2% 0.01 258.338) ${s.activos + s.inactivos + s.suspendidos}% 100%
      )`
    };
  }
}
