import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Signal
} from '@angular/core';
import { DataSeries } from './models/column-chart-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-column-chart-v2',
  standalone: true,
  templateUrl: './column-chart-v2.component.html',
  styleUrl: './column-chart-v2.component.css',
  imports: [
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnChartV2Component {
  private readonly MAX_Y_VALUE: number = 100;
  private readonly MIN_Y_VALUE: number = 0;
  private readonly DEFAULT_Y_NUM_OF_TICKS: number = 6;

  public chartHeightPx = input<number>(400);
  public dataSeries = input.required<DataSeries[]>();

  public seriesLabels = computed(() => {
    return this.dataSeries().map((oneDataSeries) => oneDataSeries.name);
  });

  public yAxisNumOfTicks = input<number>(this.DEFAULT_Y_NUM_OF_TICKS);

  public yAxisTicks: Signal<number[]> = computed(() => {
    const range: number = this.MAX_Y_VALUE - this.MIN_Y_VALUE;
    const tickDelta: number = range / (this.yAxisNumOfTicks() - 1);

    const ticks: number[] = [];
    for (let start = this.MIN_Y_VALUE; start <= this.MAX_Y_VALUE; start += tickDelta) {
      ticks.push(Math.floor(start));
    }

    return ticks.reverse();
  });
}
