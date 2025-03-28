import useSWR from "swr";
import {GRAPHQL_PORT, REST_PORT, SERVER_URL} from "../consts.ts";
import {ChartData, ChartDataTimestamp, GqlResponse, PerformanceMetrics} from "../models.ts";
import {Protocol} from "../context/protocolContext.tsx";
import {GET_CHART_DATA} from "../queries.ts";

const metricsHistory: PerformanceMetrics[] = [];

const updateMetrics = (payloadSize: number, timestamp: number): void => {
  const now = Date.now();
  const requestTime = now - timestamp;

  metricsHistory.push({
    requestTime,
    payloadSize,
    timestamp: now,
  });

  if (metricsHistory.length > 20) {
    metricsHistory.shift();
  }
}

const restFetcher = async (url: string, init?: RequestInit): Promise<ChartData[]> => {
  const response = await fetch(url, init);
  const responseText = await response.text();
  const payloadSize = new Blob([responseText]).size;
  const json: ChartDataTimestamp = JSON.parse(responseText);

  updateMetrics(payloadSize, json.timestamp);

  return json.chartData;
};

const graphqlFetcher = async (url: string): Promise<ChartData[]> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({query: GET_CHART_DATA, variables: {}}),
  });
  const responseText = await response.text();
  const payloadSize = new Blob([responseText]).size;
  const {data: {getCharts: {chartData, timestamp}}}: GqlResponse<ChartDataTimestamp> = JSON.parse(responseText);

  updateMetrics(payloadSize, timestamp);

  return chartData;
};

export function useData(connectionType: Protocol) {
  let path: string;
  let fetcher: (url: string, init?: RequestInit) => Promise<ChartData[]>;
  let port: number;

  switch (connectionType) {
    case "rest":
      port = REST_PORT;
      path = "data";
      fetcher = restFetcher;
      break;
    case "graphql":
      port = GRAPHQL_PORT
      path = "graphql";
      fetcher = graphqlFetcher;
      break;
  }
  const {data, error, isLoading} = useSWR<ChartData[]>(`${SERVER_URL}:${port}/${path}`, fetcher, {
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
