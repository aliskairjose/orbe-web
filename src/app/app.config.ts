import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding, withHashLocation, withInMemoryScrolling } from '@angular/router';

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
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppTitleStrategy } from '@core/strategies';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideRouter(
      routes,
      withHashLocation(),
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled', // Habilita el salto automático al ancla
        scrollPositionRestoration: 'enabled', // Restaura la posición si el usuario regresa
      }),
    ),
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
    { provide: TitleStrategy, useClass: AppTitleStrategy }
  ],
};
