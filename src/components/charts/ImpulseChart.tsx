import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Point } from "systems-control-js";
import { useMemo, useState } from "react";
import { COLORS } from "../../constants/colors";

export type ImpulseChartProps = {
  impulse: Point<number>[];
};

type ChartData = {
  x: number;
  y: string;
}[];

const formatData = (data: Point<number>[]): ChartData => {
  const chartData = data.map((point) => ({
    x: point.x,
    y: point.y.toPrecision(4),
  }));
  return chartData.slice(1);
};

export const ImpulseChart = ({ impulse }: ImpulseChartProps) => {
  const [chartData, setChartData] = useState<ChartData>([]);

  useMemo(() => {
    const data = formatData(impulse);
    setChartData(data);
  }, [impulse]);

  return (
    <ResponsiveContainer height={400}>
      <LineChart
        margin={{
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
        }}
        data={chartData}
      >
        <CartesianGrid />

        <XAxis type="number" dataKey="x" name="Time" unit="s" />
        <YAxis type="number" name="Magnitude" />

        <Tooltip cursor={{ strokeDasharray: "3" }} />

        <Line
          dot={false}
          type="monotone"
          name="Impulse response"
          stroke={COLORS[2].hex}
          dataKey="y"
        ></Line>

        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};
