import {GET_CHART_DATA} from "./queries.ts";
import {ChartDataTimestamp} from "./_generated_/types.ts";

export const getGraphQLFetcher = () => {
  return {
    fetcher: async (url: string): Promise<ChartDataTimestamp> => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: GET_CHART_DATA, variables: {}}),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      return result.data?.getCharts;
    }
  };
};
