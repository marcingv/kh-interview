import {
  HttpErrorResponse,
  HttpResponse,
  type HttpEvent,
  type HttpHandlerFn,
  type HttpInterceptorFn,
  type HttpRequest,
} from '@angular/common/http';
import { of, throwError, type Observable } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { COLUMN_CHART_DATA_MOCK } from '../mocks/column-chart-data.mock';

export const columnChartDataMockInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (
    request.method === 'GET' &&
    request.url.startsWith('/api/column-chart-data')
  ) {
    const responseDelayMs = Math.floor(Math.random() * 1001) + 1000;
    const isRequestSuccessful = Math.random() < 0.9;

    return of(COLUMN_CHART_DATA_MOCK).pipe(
      delay(responseDelayMs),
      concatMap((response) =>
        isRequestSuccessful ?
          of(
            new HttpResponse({
              body: response,
              status: 200,
            }),
          )
        : throwError(
            () =>
              new HttpErrorResponse({
                error: 'Internal error',
                status: 501,
              }),
          ),
      ),
    );
  }

  return next(request);
};
