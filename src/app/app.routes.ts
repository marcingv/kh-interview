import type { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/charts/charts.routes').then((module) => module.ROUTES),
  },
];
