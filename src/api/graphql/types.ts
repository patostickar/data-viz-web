export interface GqlResponse<T> {
  data: {
    getCharts: T;
  }
}
