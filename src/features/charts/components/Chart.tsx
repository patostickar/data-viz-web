import "../../../lib/styles/global.css";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {ChartPoint} from "../../../api/graphql/_generated_/types.ts";
import {COLORS} from "../../../lib/constants/colors.ts";

interface ChartProps {
  data: ChartPoint[];
  index: number;
}

export default function Chart({ data, index }: ChartProps) {
  if (data.length * data[0].values.length > 10000) {
    return (
      <div className="text-2xl font-bold text-red-600">
        Too many points to display.
      </div>
    );
  }
  const chartData = data.map((point) => ({
    timestamp: point.timestamp,
    ...point.values,
  }));

  const plotIDs = Object.keys(data[0]?.values || {});

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart data={chartData} margin={{ top: 20 }} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" padding={{ left: 30, right: 30 }} />
        <YAxis />
        {plotIDs.map((plotID, i) => (
          <Line
            key={plotID}
            type="monotone"
            dataKey={plotID}
            stroke={COLORS[(index + i) % COLORS.length]}
            activeDot={false}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
