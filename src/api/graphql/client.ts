import {GET_CHART_DATA} from "./queries.ts";
import {ChartData} from "./_generated_/types.ts";
import {ENABLE_BODY_SIZE_MEASURE} from "../../lib/constants/env.ts";


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

      let data: Array<ChartData> = [];
      let rawSize = 0;

      if (ENABLE_BODY_SIZE_MEASURE == "true") {
        const blob = await response.blob();
        rawSize = blob.size;
        data = JSON.parse(await blob.text()).data?.getCharts;

      } else {

        data = (await response.json()).data?.getCharts;
      }
      return [data, rawSize];
    }
  };
};
