import type { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/charts/charts.page').then(
        (module) => module.ChartsPageComponent
      )
  }
];
