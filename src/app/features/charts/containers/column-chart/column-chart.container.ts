import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal
} from '@angular/core';
import {
  ColumnChartComponent,
  DataSeries,
  DataSeriesName
} from '../../components/column-chart';
import {
  ColumnChart,
  ColumnChartDataElement
} from '../../models/column-chart.model';
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
  imports: [ColumnChartComponent, NgTemplateOutlet, ColumnChartComponent],
  templateUrl: './column-chart.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnChartContainerComponent {
  protected readonly CHART_HEIGHT_CSS_CLASS: string = 'h-72';

  private service = inject(ChartsService);

  public chartId = input.required<ColumnChart['id']>();
  public chartDataSeries = signal<DataSeries[]>([]);
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
      switchMap((id: ColumnChart['id']) => {
        return this.service.getColumnChartDataById(id).pipe(
          tap((chartData) => {
            this.isLoadingData.set(false);
            this.chartDataSeries.set(this.mapChartData(chartData));
          }),
          catchError((error: HttpErrorResponse) => {
            this.loadingError.set(`Could not load chart "${ id }". An error occurred: ${ error.message }`);
            this.isLoadingData.set(false);

            return of();
          })
        );
      }),
      takeUntilDestroyed()
    ).subscribe();
  }

  private mapChartData(chartData: Array<ColumnChartDataElement>): DataSeries[] {
    const dataSeriesByNames: {
      [seriesName: DataSeriesName]: DataSeries
    } = {};

    chartData.reduce((
      prev: { [seriesName: DataSeriesName]: DataSeries },
      oneEntry: ColumnChartDataElement
    ) => {
      let oneDataSeries: DataSeries = prev[oneEntry.label];
      if (!oneDataSeries) {
        oneDataSeries = {
          name: oneEntry.label,
          data: []
        };
        prev[oneEntry.label] = oneDataSeries;
      }

      oneDataSeries.data.push({
        x: oneEntry.x,
        y: oneEntry.y
      });

      return prev;
    }, dataSeriesByNames);

    return Object.values(dataSeriesByNames).sort(this.sortDataSeriesByName);
  }

  private sortDataSeriesByName(a: DataSeries, b: DataSeries): number {
    return a.name.localeCompare(b.name);
  }
}
