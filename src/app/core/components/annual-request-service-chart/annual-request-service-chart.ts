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

  // stats: MonthlyStats[] = [
  //   { month: 'Ene', chat: 45, calls: 30 },
  //   { month: 'Feb', chat: 52, calls: 25 },
  //   { month: 'Mar', chat: 38, calls: 45 },
  //   { month: 'Abr', chat: 60, calls: 20 },
  //   { month: 'May', chat: 40, calls: 50 },
  //   { month: 'Jun', chat: 55, calls: 35 },
  //   { month: 'Jul', chat: 48, calls: 42 },
  //   { month: 'Ago', chat: 30, calls: 60 },
  //   { month: 'Sep', chat: 65, calls: 15 },
  //   { month: 'Oct', chat: 50, calls: 40 },
  //   { month: 'Nov', chat: 42, calls: 55 },
  //   { month: 'Dic', chat: 58, calls: 38 },
  // ];

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
