export const GET_CHART_DATA = `
  query GetChartDataTimestamp {
    getCharts {
      timestamp
      chartData {
        chartId
        data {
          timestamp
          values
        }
      }
    }
  }
`;
