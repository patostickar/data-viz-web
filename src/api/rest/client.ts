import {ChartData} from "../graphql/_generated_/types.ts";
import {ENABLE_BODY_SIZE_MEASURE} from "../../lib/constants/env.ts";

export const getRestFetcher = (): { fetcher: (url?: string) => Promise<[Array<ChartData>, number]> } => {
  return {
    fetcher: async (url?: string): Promise<[Array<ChartData>, number]> => {
      const response = await fetch(url!);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      let data: Array<ChartData>;
      let rawSize = 0;
      if (ENABLE_BODY_SIZE_MEASURE == "true") {
        const blob = await response.blob();
        rawSize = blob.size;
        data = JSON.parse(await blob.text());
      } else {
        console.log("world")
        data = await response.json();
      }
      return [data, rawSize];
    }
  };
};
