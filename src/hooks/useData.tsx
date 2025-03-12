import useSWR from "swr";
import { SERVER_PORT, SERVER_URL } from "../consts.ts";
import { PerformanceMetrics, ChartData } from "../models.ts";

const metricsHistory: PerformanceMetrics[] = [];

const fetcher = async (url: string, init?: RequestInit) => {
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

export function useData() {
  const { data, error, isLoading } = useSWR<ChartData[]>(`${SERVER_URL}:${SERVER_PORT}/data`, fetcher, {
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
