import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAdvisor, IUser } from '@core/interfaces';
import { IProfile } from '@core/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly url = `${API_URL}/v1/users`;
  private readonly http = inject(HttpClient);

  update(id: string, payload: Partial<IUser | IAdvisor>): Observable<IUser | IAdvisor> {
    return this.http.patch<IUser | IAdvisor>(`${this.url}/${id}`, payload);
  }

  updateStatus(id: string, payload: Partial<IUser | IAdvisor>): Observable<IUser | IAdvisor> {
    return this.http.patch<IUser | IAdvisor>(`${this.url}/advisor/status/${id}`, payload);
  }

  updateAdvisor(id: string, payload: Partial<IProfile>): Observable<IProfile> {
    return this.http.patch<IProfile>(`${this.url}/advisor/${id}`, payload);
  }
}
