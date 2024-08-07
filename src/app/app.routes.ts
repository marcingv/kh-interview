import type { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout';

export const ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/charts/charts.routes').then((module) => module.ROUTES),
  },
];
