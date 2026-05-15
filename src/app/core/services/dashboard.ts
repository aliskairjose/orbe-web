import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConfig } from '@core/classes/app.config';
import { IRateExchange } from '@core/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  updateRate(id: string, currentRate: number): Observable<IRateExchange[]>{
    return this.http.patch<IRateExchange[]>(`${AppConfig.baseUrl(`rate-exchange`)}/${id}`, {currentRate});
  }
}
