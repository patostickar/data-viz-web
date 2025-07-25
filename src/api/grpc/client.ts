import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport";
import {ENABLE_BODY_SIZE_MEASURE, GRPC_PORT, SERVER_URL} from "../../lib/constants/env";
import {ChartServiceClient} from "./_generated_/charts.client.ts";
import {ChartData, ChartDataList} from "./_generated_/charts.ts";

const transport = new GrpcWebFetchTransport({
  baseUrl: `${SERVER_URL}:${GRPC_PORT}`
})
const client = new ChartServiceClient(transport);

export const getGrpcFetcher = (): { fetcher: () => Promise<[Array<ChartData>, number]> } => {
  return {
    fetcher: async (): Promise<[Array<ChartData>, number]> => {
      const {response} = await client.getChartData({});
      const data = response.items;

      let rawSize = 0;

      if (ENABLE_BODY_SIZE_MEASURE == "true") {
        rawSize = ChartDataList.toBinary(response).length
      }

      return [data, rawSize];
    }
  };
};
