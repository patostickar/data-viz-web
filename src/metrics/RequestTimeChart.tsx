import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { PerformanceMetrics } from "../models.ts";
import { COLORS } from "../consts";

export function RequestTimeChart({ data }: { data: PerformanceMetrics[] }) {
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
        <YAxis tickFormatter={(tick) => `${tick.toFixed(0)}ms`} tick={{ fontSize: 10 }} />
        <Tooltip
          formatter={(value: number) => [`${value.toFixed(2)} ms`, "Request Time"]}
          labelFormatter={(label) => new Date(label).toLocaleTimeString()}
        />
        <Line
          type="monotone"
          dataKey="requestTime"
          stroke={COLORS[COLORS.length - 1]}
          isAnimationActive={false}
          dot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
