import {
  HttpErrorResponse,
  type HttpEvent,
  type HttpHandlerFn,
  type HttpInterceptorFn,
  type HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { type Observable, of, throwError } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import {
  COLUMN_CHART_DATA_MOCK_1,
  COLUMN_CHART_DATA_MOCK_2
} from '../mocks/column-chart-data.mock';
import type { ColumnChart } from '../models/column-chart.model';

const MOCKS_MAP: { [id: ColumnChart['id']]: ColumnChart['data'] } = {
  'test1': COLUMN_CHART_DATA_MOCK_1,
  'test2': COLUMN_CHART_DATA_MOCK_2,
  'emptyChart': []
};

export const columnChartDataMockInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (
    request.method === 'GET' &&
    request.url.startsWith('/api/column-chart-data')
  ) {
    const responseDelayMs = Math.floor(Math.random() * 1001) + 1000;
    const isRequestSuccessful = Math.random() < 0.9;

    const requestPaths: string[] = request.url.split('/');
    const chartId: ColumnChart['id'] = requestPaths[requestPaths.length - 1];
    const mockedData: ColumnChart['data'] = MOCKS_MAP[chartId] ?? COLUMN_CHART_DATA_MOCK_1;

    return of(mockedData).pipe(
      delay(responseDelayMs),
      concatMap((response) =>
        isRequestSuccessful ?
          of(
            new HttpResponse({
              body: response,
              status: 200
            })
          )
          : throwError(
            () =>
              new HttpErrorResponse({
                error: 'Internal error',
                status: 501
              })
          )
      )
    );
  }

  return next(request);
};
