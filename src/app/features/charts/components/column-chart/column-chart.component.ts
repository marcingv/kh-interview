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
import { JsonPipe } from '@angular/common';
import { ChartBarBgColorPipe } from '../../pipes/chart-bar-bg-color.pipe';

interface GroupedChartData {
  [year: number]: Array<ColumnChartDataElement>;
}


@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [
    JsonPipe,
    ChartBarBgColorPipe
  ],
  templateUrl: './column-chart.component.html',
  styleUrl: './column-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnChartComponent {
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
