import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Signal
} from '@angular/core';
import { DataSeries, DataSeriesName } from './models/column-chart-data';
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
  private readonly FALLBACK_BG_COLOR: string = 'bg-gray-300';

  public cssClass = input<string>('');
  public chartHeightPx = input<number>(400);
  public dataSeries = input.required<DataSeries[]>();
  public dataSeriesBgColors = input<string[]>([
    'bg-violet-400',
    'bg-rose-400',
    'bg-orange-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-gray-400',
    'bg-pink-400',
  ]);

  public seriesLabels = computed(() => {
    return this.dataSeries().map((oneDataSeries) => oneDataSeries.name);
  });

  public seriesLabelColorClass = computed(() => {
    const seriesColors: { [seriesName: DataSeriesName]: string } = {};

    const colorsSet = this.dataSeriesBgColors();
    this.seriesLabels().forEach((seriesName: string, index: number) => {
      seriesColors[seriesName] = colorsSet.length ? colorsSet[index % colorsSet.length] : this.FALLBACK_BG_COLOR;
    });

    return seriesColors;
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

  public xAxisData = computed(() => this.prepareXDataSeries(this.dataSeries()));

  private prepareXDataSeries(dataSeries: DataSeries[]) {
    const xDataMap: {
      [x: number]: { [seriesName: DataSeriesName]: number[] }
    } = {};

    dataSeries.forEach((oneDataSeries: DataSeries) => {
      oneDataSeries.data.forEach((data) => {
        const x = data.x;
        const y = data.y;

        if (y === null) {
          return;
        }

        if (!xDataMap[x]) {
          xDataMap[x] = {};
        }

        if (!xDataMap[x][oneDataSeries.name]) {
          xDataMap[x][oneDataSeries.name] = [y];
        } else {
          xDataMap[x][oneDataSeries.name].push(y);
        }
      });
    });

    const normalizedDataMap: {
      [x: number]: { [seriesName: DataSeriesName]: number }
    } = {};
    for (let x in xDataMap) {
      const xSeriesData: {
        [seriesName: DataSeriesName]: number[]
      } = xDataMap[x];

      if (!normalizedDataMap[x]) {
        normalizedDataMap[x] = {};
      }

      for (let seriesName in xSeriesData) {
        const yValues: number[] = xSeriesData[seriesName];
        const yValuesSum = yValues.reduce((prev: number, current: number) => {
          return prev + current;
        }, 0);

        if (!normalizedDataMap[x][seriesName]) {
          normalizedDataMap[x][seriesName] = yValuesSum / yValues.length;
        }
      }
    }

    const orderedXValues: number[] = Object.keys(normalizedDataMap).map((x) => +x).sort();
    const res: {
      [x: number]: Array<{ seriesName: DataSeriesName, y: number }>
    } = {};

    orderedXValues.forEach((x: number) => {
      const xDataSeries = normalizedDataMap[x];
      res[x] = [];

      for (let dataSeriesName in xDataSeries) {
        res[x].push({
          seriesName: dataSeriesName,
          y: xDataSeries[dataSeriesName]
        });
      }
    });

    return res;
  }
}
