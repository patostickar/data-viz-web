export const GET_CHART_DATA = `
  query GetChartDataTimestamp {
    getCharts {
        chartId
        data {
          timestamp
          values
        }
      }
    }
`;
