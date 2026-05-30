import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPlan } from '@core/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private readonly http = inject(HttpClient);

  update(id:string, body: Partial<IPlan>): Observable<any>{
    return this.http.patch(`${API_URL}/v1/plan/${id}`, body);
  }

}
