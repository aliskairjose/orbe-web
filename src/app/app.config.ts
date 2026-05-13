import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { withNgxsWebSocketPlugin } from '@ngxs/websocket-plugin';
import { provideStore } from '@ngxs/store';
import { environment } from '@envs/environment.development';
import { AuthStates } from './pages/auth/store/auth.states';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from '@core/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideRouter(routes),
    provideStore(
      [AuthStates],
      {
        developmentMode: !environment.production,
      },
      // withNgxsLoggerPlugin(),
      // withNgxsRouterPlugin(),
      withNgxsStoragePlugin({ keys: [AuthStates] }),
      withNgxsWebSocketPlugin({ url: API_SOCKET }),
    ),
  ],
};
