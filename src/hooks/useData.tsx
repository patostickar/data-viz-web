import useSWR from "swr";
import { SERVER_PORT, SERVER_URL } from "../consts.ts";
import { PerformanceMetrics, ChartData } from "../models.ts";
import { Protocol } from "../context/protocolContext.tsx";

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

  return JSON.parse(responseText);
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

  return JSON.parse(responseText);
};

export function useData(connectionType: Protocol) {
  let path: string;
  let fetcher;

  switch (connectionType) {
    case "rest":
      path = "data";
      fetcher = restFetcher;
      break;
    case "graphql":
      path = "graphql";
      fetcher = (url: string) => graphqlFetcher(url, "{ yourGraphQLQuery }");
      break;
  }
  const { data, error, isLoading } = useSWR<ChartData[]>(`${SERVER_URL}:${SERVER_PORT}/${path}`, fetcher, {
    refreshInterval: 1000,
    shouldRetryOnError: true,
    errorRetryInterval: 1000,
  });

  return {
    data,
    isLoading,
    isError: error,
    metrics: metricsHistory,
  };
}
