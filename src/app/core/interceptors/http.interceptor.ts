import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError, map, throwError } from 'rxjs';
import { AuthSelectors } from 'src/app/pages/auth/store/auth.selectors';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerErrorDictionary } from '@core/dictionaries';
import { ToastService } from '@core/services';
import { ERoutes } from '@core/enums';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const store = inject(Store);
  const toast = inject(ToastService);
  // const spinner = inject(NgxSpinnerService);

  const token: Signal<string | null> = store.selectSignal(AuthSelectors.token);

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token()}`,
    },
  });

  // spinner.show();

  return next(cloneRequest).pipe(
    map((event: HttpEvent<unknown>) => {
      // if (event instanceof HttpResponse) spinner.hide();
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        // spinner.hide();
        switch (error.status) {
          case 400:
            toast.show(ServerErrorDictionary[400], 'error');
            break;
          case 401:
            toast.show(ServerErrorDictionary[401], 'error');
            router.navigate([`auth/${ERoutes.Login}`]);
            break;
          case 403:
            toast.show(ServerErrorDictionary[403], 'error');
            router.navigate([`auth/${ERoutes.Login}`]);
            break;
          case 404:
            toast.show(ServerErrorDictionary[404], 'error');
            break;
          case 500:
            toast.show(ServerErrorDictionary[500], 'error');
            break;
          // You can handle more status codes here as needed
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', error);
      }
      return throwError(() => error);
    })
  );
};