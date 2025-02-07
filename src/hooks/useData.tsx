import useSWR from "swr";
import {SERVER_PORT, SERVER_URL} from "../consts.ts";

export interface DataPoint {
    timestamp: string;
    value: number;
}

interface ChartData {
    chartId: number;
    data: DataPoint[];
}

const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json());

export function useData() {
    const {data, error, isLoading} = useSWR<[ChartData]>(
        `${SERVER_URL}:${SERVER_PORT}/data`,
        fetcher,
        {
            refreshInterval: 1000,
            shouldRetryOnError: true,
            errorRetryInterval: 1000
        });

    return {
        data,
        isLoading,
        isError: error,
    };
}
