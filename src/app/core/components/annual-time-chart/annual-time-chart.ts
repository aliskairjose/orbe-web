import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { MONTHS } from '@core/constants';

interface MonthlyStats {
  month: string;
  texto: number; // Porcentaje
  llamada: number; // Porcentaje
  video: number; // Porcentaje
}
interface Response {
  name: string;
  data: number[];
}

@Component({
  selector: 'app-annual-time-chart',
  imports: [CommonModule],
  templateUrl: './annual-time-chart.html',
  styleUrl: './annual-time-chart.css',
})
export class AnnualTimeChart {
  private readonly months = MONTHS;
  protected currentYear = new Date().getFullYear();
  private readonly url = `${API_URL}/v1/time-register/accumulated-time`;

  protected readonly resource = httpResource<Response[]>(() => this.url);

  stats = computed(() => {
    if (this.resource.hasValue()) {
      const texts = this.resource.value().find((item) => item.name === 'Texto')!.data;
      const voice = this.resource.value().find((item) => item.name === 'Voz')!.data;
      const video = this.resource.value().find((item) => item.name === 'Video')!.data;

      return this.months.map((mes, index) => {
        return {
          month: mes,
          texto: texts[index],
          llamada: voice[index],
          video: video[index],
        };
      });
    }
    return null;
  });
}
