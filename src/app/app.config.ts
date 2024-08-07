import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';
import {
  type ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection
} from '@angular/core';
import {
  provideAnimationsAsync
} from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ROUTES } from './app.routes';
import {
  columnChartDataMockInterceptor
} from './features/charts/interceptors/column-chart-data-mock.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true
    }),
    provideRouter(ROUTES),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([columnChartDataMockInterceptor])
    ),
    provideStore(),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ]
};
