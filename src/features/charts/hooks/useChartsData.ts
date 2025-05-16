import useSWR from 'swr';
import {useMetrics} from "../../metrics/context/MetricsProvider.tsx";
import {ChartData} from "../../../api/graphql/_generated_/types.ts";
import {getGraphQLFetcher} from "../../../api/graphql/client.ts";
import {getRestFetcher} from "../../../api/rest/client.ts";
import {GRAPHQL_PORT, REST_PORT, SERVER_URL} from "../../../lib/constants/env.ts";
import {useRouterState} from "@tanstack/react-router";

export function useChartData() {
  const {trackApiRequest} = useMetrics();
  const {location: {pathname}} = useRouterState();

  const fetcher = async (url: string) => {
    const client = pathname === '/graphql'
      ? getGraphQLFetcher()
      : getRestFetcher();

    return trackApiRequest(() => client.fetcher(url));
  };

  const {data, error, isLoading} = useSWR<Array<ChartData>>(
    pathname === '/graphql'
      ? `${SERVER_URL}:${GRAPHQL_PORT}/graphql`
      : `${SERVER_URL}:${REST_PORT}/data`,
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      errorRetryInterval: 1000,
    }
  );

  return {
    data: data,
    loading: isLoading,
    error,
  };
}
