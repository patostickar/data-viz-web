export interface AppConfig {
    numCharts: number;
    numPoints: number;
}

export interface DataPoint {
    timestamp: string;
    value: number;
}

export interface ChartData {
    chartId: number;
    data: DataPoint[];
}

export interface PerformanceMetrics {
    requestTime: number;
    payloadSize: number;
    timestamp: number;
}
