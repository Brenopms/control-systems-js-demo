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

export interface StepChartProps {
  step: Point<number>[];
}

type ChartData = {
  x: number;
  y: string;
}[];

const formatData = (data: Point<number>[]): ChartData => {
  const chartData = data.map((point) => ({
    x: point.x,
    y: point.y.toPrecision(4),
  }));
  return chartData;
};

export const StepChart = ({ step }: StepChartProps) => {
  const [chartData, setChartData] = useState<ChartData>([]);

  useMemo(() => {
    const data = formatData(step);
    setChartData(data);
  }, [step]);

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
          name="Step response"
          stroke={COLORS[3].hex}
          dataKey="y"
        ></Line>

        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};
