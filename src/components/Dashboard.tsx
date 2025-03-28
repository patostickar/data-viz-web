import Chart from "./Chart";
import { useData } from "../hooks/useData";
import { MetricsDashboard } from "./metrics/MetricsDashboard";
import { useProtocol } from "../hooks/useProtocol";
import {Settings} from "./Settings.tsx";

export const Dashboard = () => {
  const { connectionType } = useProtocol();
  const { data, isLoading, isError } = useData(connectionType);

  if (isLoading) return "Loading plots...";
  if (isError) return "Trying to connect to fetch plots...";

  return (
    <>
      <Settings />
      <MetricsDashboard />
      <h2 className="text-xl font-bold mb-4">Charts</h2>
      <div
        className="chart-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {data?.map((chartData, index) => (
          <div key={chartData.chartId} className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <div className="h-64">
              <Chart data={chartData.data} index={index} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
