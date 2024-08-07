import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColumnChartComponent } from '../../components/column-chart/column-chart.component';

@Component({
  selector: 'app-column-chart-container',
  standalone: true,
  imports: [ColumnChartComponent],
  templateUrl: './column-chart.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnChartContainerComponent {}
