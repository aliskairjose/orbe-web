import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { MONTHS } from '@core/constants';

export interface Response {
  name: string;
  data: number[];
}

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
  protected currentYear = new Date().getFullYear();
  private readonly months = MONTHS;
  protected resource = httpResource<Response[]>(
    () => `${API_URL}/v1/request-logs/summary/monthly-type/2026`,
  );

  stats = computed(() => {
    if (this.resource.hasValue()) {
      const texts = this.resource.value().find((item) => item.name === 'Chat')!.data;
      const voice = this.resource.value().find((item) => item.name === 'Voice')!.data;
      const video = this.resource.value().find((item) => item.name === 'Video')!.data;

      return this.months.map((mes, index) => {
        return {
          month: mes,
          chat: texts[index],
          calls: voice[index],
          video: video[index],
        };
      });
    }
    return null;
  });
}
