import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBankAccount } from '@core/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private readonly http = inject(HttpClient);

  create(body: any): Observable<IBankAccount>{
    return this.http.post<IBankAccount>(`${API_URL}/v1/bank-account`, body );
  }

  update(payload: any): Observable<IBankAccount>{
    const { _id, ...body } = payload;
    return this.http.patch<IBankAccount>(`${API_URL}/v1/bank-account/${_id}`, body );
  }
}
