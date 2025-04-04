import {modeCalculator} from "../../../lib/utils/modeCalc.ts";
import {PayloadSizeChart} from "./PayloadSizeChart.tsx";
import {RequestTimeChart} from "./RequestTimeChart.tsx";
import {useMetrics} from "../context/MetricsProvider.tsx";

export function MetricsDashboard() {
  const {metrics} = useMetrics();

  const avgRequestTime = metrics.reduce((sum, metric) => sum + metric.requestTime, 0) / metrics.length;
  const modeRequestTime = modeCalculator(metrics.map((metric) => metric.requestTime));

  const avgPayloadSize = metrics.reduce((sum, metric) => sum + metric.payloadSize, 0) / metrics.length;
  const modePayloadSize = modeCalculator(metrics.map((metric) => metric.payloadSize));

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>

      <div
        className="chart-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        <div>
          <h3 className="font-semibold">Request Time</h3>
          <p>Average: {isNaN(avgRequestTime)? 0 : avgRequestTime.toFixed(2)} ms</p>
          <p>Mode: {modeRequestTime && modeRequestTime.toFixed(2)} ms</p>
          <RequestTimeChart data={metrics}/>
        </div>
        <div>
          <h3 className="font-semibold">Payload Size</h3>
          <p>Average: {(isNaN(avgPayloadSize) ? 0 : avgPayloadSize / 1024).toFixed(2)} KB</p>
          <p>Mode: {(modePayloadSize && modePayloadSize / 1024).toFixed(2)} KB</p>
          <PayloadSizeChart data={metrics}/>
        </div>
      </div>
      )
    </div>
  );
}
