import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConfig } from '@core/classes/app.config';
import { EApi } from '@core/enums';
import { ILegal } from '@core/interfaces/legal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Legal {
  private readonly http = inject(HttpClient);

  list(): Observable<ILegal[]> {
    return this.http.get<ILegal[]>(AppConfig.baseUrl(EApi.Legal));
  }

  update(legal: ILegal): Observable<ILegal> {
    const { _id, content } = legal;
    return this.http.patch<ILegal>(AppConfig.baseUrl(`${EApi.Legal}/${_id}`), { content });
  }

  create(legal: Partial<ILegal>): Observable<ILegal> {
    return this.http.post<ILegal>(AppConfig.baseUrl(EApi.Legal), legal);
  }
}
