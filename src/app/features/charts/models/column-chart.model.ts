interface ColumnChartDataElement {
  x: number; // e.g. 2019
  y: number | null; // [0, 100]
  label: string; // e.g. 'Rating 1'
}

export interface ColumnChart {
  id: string;
  data: Array<ColumnChartDataElement>;
}
