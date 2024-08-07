import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal
} from '@angular/core';
import {
  ColumnChartContainerComponent
} from '../../containers/column-chart/column-chart.container';
import type { ColumnChart } from '../../models/column-chart.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-charts-page',
  standalone: true,
  imports: [ColumnChartContainerComponent, JsonPipe],
  templateUrl: './charts.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsPageComponent {
  public chartsIds = signal<Array<ColumnChart['id']>>([
    'test1',
    'test2',
  ]);
}
