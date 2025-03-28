export interface AppConfig {
  numCharts: number;
  numPoints: number;
}

export interface ChartPoint {
  timestamp: string;
  values: { [plotID: string]: number };
}

export interface ChartData {
  chartId: number;
  data: ChartPoint[];
}

export interface ChartDataTimestamp {
  timestamp: number;
  chartData: ChartData[];
}

export interface PerformanceMetrics {
  requestTime: number;
  payloadSize: number;
  timestamp: number;
}
