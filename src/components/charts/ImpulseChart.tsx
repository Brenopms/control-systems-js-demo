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

export type ImpulseChartProps = {
  impulse: ChartOutput;
};

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
