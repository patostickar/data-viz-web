import "./styles.css";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {DataPoint} from "./hooks/useData.tsx";
import {COLORS} from "./consts.ts";

interface ChartProps {
    data: DataPoint[];
    index: number;
}

export default function Chart({data, index}: ChartProps) {
    return (
        <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={data} margin={{top: 20}} accessibilityLayer>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="timestamp" padding={{left: 30, right: 30}}/>
                <YAxis/>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS[index % COLORS.length]}
                    activeDot={false}
                    isAnimationActive={false}
                ></Line>
            </LineChart>
        </ResponsiveContainer>
    );
}
