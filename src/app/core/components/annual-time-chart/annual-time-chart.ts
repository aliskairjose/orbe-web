import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, Input, input, signal } from '@angular/core';
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
  @Input() id!: string;

  private readonly months = MONTHS;
  protected currentYear = new Date().getFullYear();

  private readonly url = `${API_URL}/v1/time-register/accumulated-time/${this.id}`;

  protected resource = httpResource<Response[]>(() => this.url);

  stats = computed(() => {
    if (this.resource.hasValue()) {
      const texts = this.resource.value().find((item) => item.name === 'Chat')!.data;
      const voice = this.resource.value().find((item) => item.name === 'Voice')!.data;
      const video = this.resource.value().find((item) => item.name === 'Video')!.data;

      return this.months.map((mes, index) => {
        const total = texts[index] + voice[index] + video[index];
        const textPercent = (texts[index] / total) * 100;
        const voicePercent = (voice[index] / total) * 100;
        const videoPercent = (video[index] / total) * 100;
        return {
          month: mes,
          texto: textPercent,
          llamada: voicePercent,
          video: videoPercent,
        };
      });
    }
    return null;
  });
}
