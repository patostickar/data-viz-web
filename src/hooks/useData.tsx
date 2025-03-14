import useSWR from "swr";
import { SERVER_PORT, SERVER_URL } from "../consts.ts";
import { PerformanceMetrics, ChartData } from "../models.ts";
import { Protocol } from "../context/connectionContext.tsx";

const metricsHistory: PerformanceMetrics[] = [];

const restFetcher = async (url: string, init?: RequestInit) => {
  const startTime = performance.now();
  const response = await fetch(url, init);
  const endTime = performance.now();

  const responseText = await response.text();
  const payloadSize = new Blob([responseText]).size;

  const requestTime = endTime - startTime;

  metricsHistory.push({
    requestTime,
    payloadSize,
    timestamp: Date.now(),
  });

  if (metricsHistory.length > 20) {
    metricsHistory.shift();
  }

  const data = JSON.parse(responseText);
  return data;
};

const useRest = () => {
  return useSWR<ChartData[]>(`${SERVER_URL}:${SERVER_PORT}/data`, restFetcher, {
    refreshInterval: 1000,
    shouldRetryOnError: true,
    errorRetryInterval: 1000,
  });
};

const graphqlFetcher = async (url: string, query: string) => {
  const startTime = performance.now();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const endTime = performance.now();

  const responseText = await response.text();
  const payloadSize = new Blob([responseText]).size;

  const requestTime = endTime - startTime;

  metricsHistory.push({
    requestTime,
    payloadSize,
    timestamp: Date.now(),
  });

  if (metricsHistory.length > 20) {
    metricsHistory.shift();
  }

  const data = JSON.parse(responseText);
  return data;
};

const useGraphQL = () => {
  return useSWR<ChartData[]>(
    `${SERVER_URL}:${SERVER_PORT}/graphql`,
    (url) => graphqlFetcher(url, "{ yourGraphQLQuery }"),
    {
      refreshInterval: 1000,
      shouldRetryOnError: true,
      errorRetryInterval: 1000,
    },
  );
};
export function useData(connectionType: Protocol) {
  let data, error, isLoading;

  const restData = useRest();
  const graphQLData = useGraphQL();

  switch (connectionType) {
    case "rest":
      ({ data, error, isLoading } = restData);
      break;
    case "graphql":
      ({ data, error, isLoading } = graphQLData);
      break;
    default:
      // Handle unknown connection types
      break;
  }

  return {
    data,
    isLoading,
    isError: error,
    metrics: metricsHistory,
  };
}
