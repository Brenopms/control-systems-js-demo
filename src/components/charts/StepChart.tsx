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
import { ChartOutput } from "systems-control-js";
import { useState } from "react";
import { useMemo } from "react";
import { COLORS } from "../../constants/colors";

export interface StepChartProps {
  step: ChartOutput;
}

type ChartData = {
  x: number;
  y: string;
}[];

const formatData = (data: ChartOutput): ChartData => {
  const chartData: ChartData = data.x.values.map((xValue, index) => {
    return {
      x: xValue,
      y: data.y.values[index].toPrecision(4),
    };
  });

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
