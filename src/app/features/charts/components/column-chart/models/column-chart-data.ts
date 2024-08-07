export declare type DataSeriesName = string;

export interface DataSeries {
  name: DataSeriesName;
  data: Array<{
    x: number;
    y: number | null;
  }>;
}
