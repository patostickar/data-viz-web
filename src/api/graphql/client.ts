import {GET_CHART_DATA} from "./queries.ts";
import {ChartData} from "./_generated_/types.ts";


export const getGraphQLFetcher = (): {fetcher: (url?: string) => Promise<[Array<ChartData>, number]>} => {
  return {
    fetcher: async (url?: string): Promise<[Array<ChartData>, number]> => {
      const response = await fetch(url!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({query: GET_CHART_DATA, variables: {}}),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const blob = await response.blob();
      const rawSize = blob.size;

      const data = JSON.parse(await blob.text()).data?.getCharts;

      return [data, rawSize];
    }
  };
};
