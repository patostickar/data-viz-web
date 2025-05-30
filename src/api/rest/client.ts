import {ChartData} from "../graphql/_generated_/types.ts";

export const getRestFetcher = (): { fetcher: (url?: string) => Promise<[Array<ChartData>, number]> } => {
  return {
    fetcher: async (url?: string): Promise<[Array<ChartData>, number]> => {
      const response = await fetch(url!);

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
