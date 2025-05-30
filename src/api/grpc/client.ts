import {GRPC_PORT, SERVER_URL} from "../../lib/constants/env";
import {ChartServiceClient} from "../../../models/ChartsServiceClientPb.ts";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {ChartData} from "../../../models/charts_pb";

// Initialize gRPC client
const client = new ChartServiceClient(`${SERVER_URL}:${GRPC_PORT}`,);

export const getGrpcFetcher = (): { fetcher: () => Promise<[Array<ChartData>, number]> } => {
    return {
        fetcher: async (): Promise<[Array<ChartData>, number]> => {
            return new Promise((resolve, reject) => {
                client.getChartData(new Empty(), {}, (err, response) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const data = response.getItemsList();
                    const serializedSize = response.serializeBinary().length;

                    resolve([data, serializedSize]);
                });
            });
        }
    };
};
