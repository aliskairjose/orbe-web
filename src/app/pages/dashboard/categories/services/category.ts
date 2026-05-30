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

  update(id: string, data: Partial<ICategory>): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, data);
  }
}
