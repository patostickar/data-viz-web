import useSWR from 'swr';
import {useMetrics} from "../../metrics/context/MetricsProvider.tsx";
import {useProtocol} from "../../protocol/context/protocolContext.tsx";
import {ChartDataTimestamp} from "../../../api/graphql/_generated_/types.ts";
import {getGraphQLFetcher} from "../../../api/graphql/client.ts";
import {getRestFetcher} from "../../../api/rest/client.ts";
import {GRAPHQL_PORT, REST_PORT, SERVER_URL} from "../../../lib/constants/env.ts";

export function useChartData() {
  const {trackApiRequest} = useMetrics();
  const {connectionType} = useProtocol();

  const fetcher = async (url: string) => {
    const client = connectionType === 'graphql'
      ? getGraphQLFetcher()
      : getRestFetcher();

    return trackApiRequest(() => client.fetcher(url));
  };

  const {data, error, isLoading} = useSWR<ChartDataTimestamp>(
    connectionType === 'graphql'
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
    data: data?.chartData,
    loading: isLoading,
    error,
  };
}
