import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ColumnChart } from '../../models/column-chart.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './column-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnChartComponent {
  public data = input.required<ColumnChart['data']>();
}
