import Chart from "./Chart";
import { useConnectionData } from "../hooks/useConnectionData";
import { MetricsDashboard } from "./metrics/MetricsDashboard";
import { useConnection } from "../hooks/useConnection";

export const Dashboard = () => {
  const { connectionType } = useConnection();
  const { data, isLoading, isError } = useConnectionData(connectionType);

  if (isLoading) return "Loading...";
  if (isError) return "Trying to connect to server...";

  return (
    <>
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
