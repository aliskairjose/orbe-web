import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { MONTHS } from '@core/constants';
interface MonthlyStats {
  month: string;
  aceptado: number; // Porcentaje
  rechazado: number; // Porcentaje
}

interface Response {
  name: string;
  data: number[];
}

@Component({
  selector: 'app-request-status-annual',
  imports: [],
  templateUrl: './request-status-annual.html',
  styleUrl: './request-status-annual.css',
})
export class RequestStatusAnnual {
  private readonly months = MONTHS;
  protected currentYear = new Date().getFullYear();
  private readonly url = `${API_URL}/v1/request-logs/summary/monthly-status/${this.currentYear}`;

  protected readonly resource = httpResource<Response[]>(() => this.url);

  stats = computed(() => {
    if (this.resource.hasValue()) {
      const aceptados = this.resource.value().find((item) => item.name === 'Aceptado')!.data;
      const rechazados = this.resource.value().find((item) => item.name === 'Rechazado')!.data;

      return this.months.map((mes, index) => ({
        month: mes,
        aceptado: aceptados[index],
        rechazado: rechazados[index],
      }));
    }
    return null;
  });
}
