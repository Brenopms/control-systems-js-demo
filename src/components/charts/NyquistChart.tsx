import { NyquistData, Point } from "systems-control-js";
import { useMemo, useState } from "react";
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
import { COLORS } from "../../constants/colors";

export type NyquistChartProps = {
  nyquist: NyquistData;
};

type ChartData = {
  points: Point<number>[];
  correspondingPoints: Point<number>[];
};

export const NyquistChart = ({ nyquist }: NyquistChartProps) => {
  const [chartData, setChartData] = useState<ChartData>();

  useMemo(() => {
    setChartData(nyquist);
  }, [nyquist]);

  return (
    <ResponsiveContainer height={400}>
      <LineChart
        margin={{
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
        }}
      >
        <CartesianGrid />

        <XAxis type="number" dataKey="x" name="Imaginary Axis" unit="i" />
        <YAxis type="number" name="Real Axis" />

        <Tooltip cursor={{ strokeDasharray: "3" }} />

        <Line
          dot={false}
          type="monotone"
          name="Points"
          stroke={COLORS[4].hex}
          data={chartData?.points}
          dataKey="y"
        ></Line>

        <Line
          dot={false}
          type="monotone"
          name="Corresponding Points"
          stroke={COLORS[5].hex}
          data={chartData?.correspondingPoints}
          dataKey="y"
        ></Line>

        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};
