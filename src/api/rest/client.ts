import {ChartDataTimestamp} from "../graphql/_generated_/types.ts";

export const getRestFetcher = () => {
  return {
    fetcher: async (url: string): Promise<ChartDataTimestamp> => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json();
    }
  };
};
