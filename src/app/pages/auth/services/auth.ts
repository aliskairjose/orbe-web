import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConfig } from '@core/classes/app.config';
import { ERole } from '@core/enums';
import { EApi } from '@core/enums/api.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  #http = inject(HttpClient);

  login(data: any): Observable<any> {
    data = { ...data, role: ERole.Admin };
    return this.#http.post(AppConfig.baseUrl(EApi.Login), data);
  }

  logout(): Observable<any> {
    return this.#http.get(AppConfig.baseUrl(EApi.Logout));
  }

  verifyAccount(token: string): Observable<any> {
    return this.#http.get(AppConfig.baseUrl(`${EApi.VerifyAccount}/${token}`));
  }
}
