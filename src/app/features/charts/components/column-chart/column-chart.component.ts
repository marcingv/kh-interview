import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [],
  templateUrl: './column-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnChartComponent {}
