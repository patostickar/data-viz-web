import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { PerformanceMetrics } from "../types";
import { COLORS } from "../consts";

export function PayloadSizeChart({ data }: { data: PerformanceMetrics[] }) {
  const chartData = data.slice(-20);

  return (
    <ResponsiveContainer width={"100%"} height={200}>
      <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
          tick={{ fontSize: 10 }}
        />
        <YAxis tickFormatter={(tick) => `${(tick / 1024).toFixed(1)}KB`} tick={{ fontSize: 10 }} />
        <Tooltip
          formatter={(value: number) => [`${(value / 1024).toFixed(2)} KB`, "Payload Size"]}
          labelFormatter={(label) => new Date(label).toLocaleTimeString()}
        />
        <Line
          type="monotone"
          dataKey="payloadSize"
          stroke={COLORS[COLORS.length - 2]}
          isAnimationActive={false}
          dot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
