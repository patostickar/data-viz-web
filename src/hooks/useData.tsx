import useSWR from "swr";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

export interface DataPoint {
    timestamp: number;
    value: number;
}

interface ChartData {
    chartId: number;
    data: DataPoint[];
}

const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json());

export function useData() {
    const {data, error, isLoading} = useSWR<[ChartData]>(`${SERVER_URL}:${SERVER_PORT}/data`, fetcher, {refreshInterval: 1000});

    return {
        data,
        isLoading,
        isError: error,
    };
}
