import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBank } from '@core/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private readonly url = `${API_URL}/v1/bank`;

  private readonly http = inject(HttpClient);

  update(data: Partial<IBank>): Observable<IBank> {
    const { _id, ...rest } = data;
    return this.http.patch<IBank>(`${this.url}/${data._id}`, rest);
  }

  create(data: Partial<IBank>): Observable<IBank> {
    return this.http.post<IBank>(this.url, data);
  }
}
