import useSWR from "swr";
import { SERVER_PORT, SERVER_URL } from "../consts.ts";
import { PerformanceMetrics, ChartDataTimestamp, ChartData } from "../models.ts";
import { Protocol } from "../context/protocolContext.tsx";

const metricsHistory: PerformanceMetrics[] = [];

const restFetcher = async (url: string, init?: RequestInit) => {
  const response = await fetch(url, init);
  const responseText = await response.text();
  const payloadSize = new Blob([responseText]).size;
  const json: ChartDataTimestamp = JSON.parse(responseText);

  const now = Date.now();
  const requestTime = now - json.timestamp;

  metricsHistory.push({
    requestTime,
    payloadSize,
    timestamp: now,
  });

  if (metricsHistory.length > 20) {
    metricsHistory.shift();
  }

  return json.chartData;
};

const graphqlFetcher = async (url: string, query: string) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const responseText = await response.text();
  const payloadSize = new Blob([responseText]).size;
  const json: ChartDataTimestamp = JSON.parse(responseText);

  const now = Date.now();
  const requestTime = now - json.timestamp;

  metricsHistory.push({
    requestTime,
    payloadSize,
    timestamp: now,
  });

  if (metricsHistory.length > 20) {
    metricsHistory.shift();
  }

  return json.chartData;
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
