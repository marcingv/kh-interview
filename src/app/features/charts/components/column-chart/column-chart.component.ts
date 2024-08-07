import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Signal
} from '@angular/core';
import {
  ColumnChart,
  ColumnChartDataElement
} from '../../models/column-chart.model';
import { DecimalPipe, JsonPipe, NgClass } from '@angular/common';
import { ChartBarBgColorPipe } from '../../pipes/chart-bar-bg-color.pipe';
import { tick } from '@angular/core/testing';

interface GroupedChartData {
  [year: number]: Array<ColumnChartDataElement>;
}


@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [
    JsonPipe,
    ChartBarBgColorPipe,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './column-chart.component.html',
  styleUrl: './column-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnChartComponent {
  private readonly MAX_Y_VALUE: number = 100;
  private readonly MIN_Y_VALUE: number = 0;
  private readonly DEFAULT_Y_NUM_OF_TICKS: number = 6;

  public yAxisNumOfTicks = input<number>(this.DEFAULT_Y_NUM_OF_TICKS);

  public yAxisTicks = computed(() => {
    const range: number = this.MAX_Y_VALUE - this.MIN_Y_VALUE;
    const tickDelta: number = range / (this.yAxisNumOfTicks() - 1);

    const ticks: number[] = [];
    for(let start = this.MIN_Y_VALUE; start <= this.MAX_Y_VALUE; start += tickDelta) {
      ticks.push(Math.floor(start));
    }

    return ticks.reverse();
  });

  public data = input.required<ColumnChart['data']>();

  public groupedData: Signal<GroupedChartData> = computed(() => {
    const data = this.data();
    const groupedData: GroupedChartData = {};

    data.forEach((oneDataEntry: ColumnChartDataElement) => {
      const year = oneDataEntry.x;
      let groupEntries = groupedData[year];
      if (!groupEntries) {
        groupEntries = [];
        groupedData[year] = groupEntries;
      }

      groupEntries.push(oneDataEntry);
    });

    return groupedData;
  });

  public groupedDataEntriesY = computed(() => Object.values(this.groupedData()));

  public groupedDataEntriesX = computed(() => Object.keys(this.groupedData()));

  public legend = computed(() => {
    const labels: { [label: string]: boolean } = {};
    for (let oneEntry of this.data()) {
      labels[oneEntry.label] = true;
    }

    return Object.keys(labels);
  });
}
