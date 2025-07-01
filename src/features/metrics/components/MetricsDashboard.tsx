import {PayloadSizeChart} from "./PayloadSizeChart.tsx";
import {RequestTimeChart} from "./RequestTimeChart.tsx";
import {useMetrics} from "../context/MetricsProvider.tsx";
import {modeFast} from "simple-statistics";

export function MetricsDashboard() {
  const {metrics} = useMetrics();
  // for some reason the first metric is always much bigger than the remaining ones
  const skipFirstMetric = metrics.slice(1);
  const modeRequestTime = skipFirstMetric.length > 0 && modeFast(skipFirstMetric.map((metric) => metric.requestTime));
  const modePayloadSize = skipFirstMetric.length > 0 && modeFast(skipFirstMetric.map((metric) => metric.payloadSize));

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
      <div
        className="chart-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}>
        <div>
          <h3 className="font-semibold">Request Time</h3>
          <p>Mode: {modeRequestTime && modeRequestTime.toFixed(2)} ms</p>
          <RequestTimeChart data={skipFirstMetric}/>
        </div>
        <div>
          <h3 className="font-semibold">Payload Size</h3>
          <p>Mode: {(modePayloadSize && (modePayloadSize / 1024).toFixed(2))} KB</p>
          <PayloadSizeChart data={skipFirstMetric}/>
        </div>
      </div>
    </div>
  );
}
