import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ColumnChart } from '../models/column-chart.model';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  readonly #httpClient = inject(HttpClient);

  getColumnChartDataById(
    id: ColumnChart['id'],
  ): Observable<ColumnChart['data']> {
    return this.#httpClient.get<ColumnChart['data']>(
      `/api/column-chart-data/${id}`,
    );
  }
}
