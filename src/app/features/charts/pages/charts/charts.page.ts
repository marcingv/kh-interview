import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ColumnChartContainerComponent
} from '../../containers/column-chart/column-chart.container';

@Component({
  selector: 'app-charts-page',
  standalone: true,
  imports: [ColumnChartContainerComponent],
  templateUrl: './charts.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsPageComponent {
}
