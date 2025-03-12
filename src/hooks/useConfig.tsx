import useSWR from "swr";
import { AppConfig } from "../models.ts";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then((res) => res.json());

export function useConfig() {
  const { data, error, isLoading } = useSWR<[AppConfig]>(`${SERVER_URL}:${SERVER_PORT}/config`, fetcher, {
    refreshInterval: 1000,
  });

  return {
    data,
    isLoading,
    isError: error,
  };
}
