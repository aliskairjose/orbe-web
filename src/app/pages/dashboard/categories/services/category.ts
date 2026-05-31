import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategory } from '@core/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Category {
  private readonly url = `${API_URL}/v1/categories`;
  private readonly http = inject(HttpClient);

  update(payload: any): Observable<ICategory> {
    const { _id, ...data } = payload;
    return this.http.patch<ICategory>(`${this.url}/${_id}`, data);
  }

  create(payload: any): Observable<ICategory> {
    return this.http.post<ICategory>(this.url, payload);
  }
}
