import Chart from "./Chart.tsx";
import {useChartData} from "../hooks/useChartsData.ts";

export const ChartGrid = () => {
  const { data, loading, error } = useChartData();

  if (loading) return "Loading plots...";
  if (error) return "Trying to connect to fetch plots...";

  return (
    <>
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
