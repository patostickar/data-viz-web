import "./styles.css";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import {COLORS} from "./consts.ts";
import {ChartPoint} from "./models.ts";

interface ChartProps {
  data: ChartPoint[];
  index: number;
}

export default function Chart({data, index}: ChartProps) {
  const chartData = data.map((point) => ({
    timestamp: point.timestamp,
    ...point.values,
  }));

  const plotIDs = Object.keys(data[0]?.values || {});

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart data={chartData} margin={{top: 20}} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="timestamp" padding={{left: 30, right: 30}}/>
        <YAxis/>
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
