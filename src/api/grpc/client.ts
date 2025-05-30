import {GRPC_PORT, SERVER_URL} from "../../lib/constants/env";
import {ChartServiceClient} from "../../../models/ChartsServiceClientPb.ts";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {ChartData} from "../../../models/charts_pb";

// Initialize gRPC client
const client = new ChartServiceClient(`${SERVER_URL}:${GRPC_PORT}`,);

export const getGrpcFetcher = (): { fetcher: (url?: string) => Promise<Array<ChartData>> } => {
    return {
        fetcher: async (): Promise<Array<ChartData>> => {
            return new Promise((resolve, reject) => {
                client.getChartData(new Empty(), {}, (err, response) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(response.getItemsList());
                });
            });
        }
    };
};
