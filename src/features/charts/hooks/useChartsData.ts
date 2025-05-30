import useSWR from 'swr';
import {useMetrics} from "../../metrics/context/MetricsProvider.tsx";
import {ChartData} from "../../../api/graphql/_generated_/types.ts";
import {getGraphQLFetcher} from "../../../api/graphql/client.ts";
import {getRestFetcher} from "../../../api/rest/client.ts";
import {useRouterState} from "@tanstack/react-router";
import {getGrpcFetcher} from "../../../api/grpc/client.ts";
import {ChartData as GrpcChartData} from '../../../api/grpc/_generated_/charts.ts';
import {GRAPHQL_PORT, GRPC_PORT, REST_PORT, SERVER_URL} from "../../../lib/constants/env.ts";

export function useChartData() {
  const {trackApiRequest} = useMetrics();
  const routerState = useRouterState();

  const isGraphQL = routerState.location.pathname === "/graphql";
  const isRest = routerState.location.pathname === "/rest";
  const isGrpc = routerState.location.pathname === "/grpc";

  const getCacheKey = () => {
    if (isGraphQL) {
      return `${SERVER_URL}:${GRAPHQL_PORT}/graphql`;
    } else if (isRest) {
      return `${SERVER_URL}:${REST_PORT}/data`;
    } else if (isGrpc) {
      return `grpc:${SERVER_URL}:${GRPC_PORT}`;
    }
    return null;
  };

  const fetcher = async (url: string): Promise<[Array<ChartData | GrpcChartData>, number]> => {
    if (isGraphQL) {
      const client = getGraphQLFetcher();
      return trackApiRequest(() => client.fetcher(url));
    } else if (isRest) {
      const client = getRestFetcher();
      return trackApiRequest(() => client.fetcher(url));
    } else if (isGrpc) {
      const client = getGrpcFetcher();
      return trackApiRequest(() => client.fetcher());
    }
    throw new Error('Invalid API type');
  };

  const {data, error, isLoading} = useSWR<[Array<ChartData | GrpcChartData>, number]>(
    getCacheKey(),
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      errorRetryInterval: 1000,
    }
  );

  return {
    data: data?.[0] as Array<ChartData>, // Extract just the data
    loading: isLoading,
    error,
  };
}
