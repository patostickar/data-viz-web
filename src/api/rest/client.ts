import {ChartData} from "../graphql/_generated_/types.ts";

export const getRestFetcher = () => {
  return {
    fetcher: async (url: string): Promise<Array<ChartData>> => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json();
    }
  };
};
