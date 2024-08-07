import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal
} from '@angular/core';
import {
  ColumnChartComponent
} from '../../components/column-chart/column-chart.component';
import { ColumnChart } from '../../models/column-chart.model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ChartsService } from '../../services/charts.service';
import {
  catchError,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
  tap
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-column-chart-container',
  standalone: true,
  imports: [ColumnChartComponent, NgTemplateOutlet],
  templateUrl: './column-chart.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnChartContainerComponent {
  private service = inject(ChartsService);

  public chartId = input.required<ColumnChart['id']>();

  public chartData = signal<ColumnChart['data']>([]);

  public isLoadingData = signal<boolean>(false);

  public loadingError = signal<string | null>(null);

  private chartId$: Observable<ColumnChart['id']> = toObservable(this.chartId);

  public constructor() {
    this.chartId$.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.isLoadingData.set(true);
        this.loadingError.set(null);
      }),
      switchMap((id) => {
        return this.service.getColumnChartDataById(id).pipe(
          tap((chartData) => {
            this.isLoadingData.set(false);
            this.chartData.set(chartData);
          }),
          catchError((error: HttpErrorResponse) => {
            this.loadingError.set(error.message);
            this.isLoadingData.set(false);

            return of();
          })
        );
      }),
      takeUntilDestroyed()
    ).subscribe();
  }
}
