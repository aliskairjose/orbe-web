import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPlan } from '@core/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private readonly http = inject(HttpClient);

  update(payload: Partial<IPlan>): Observable<any>{
    const { _id, ...body } = payload;
    return this.http.patch(`${API_URL}/v1/plan/${_id}`, body);
  }

  create(payload: Partial<IPlan>): Observable<IPlan> {
    return this.http.post<IPlan>(`${API_URL}/v1/plan`, payload);
  }

}
