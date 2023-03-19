import { NyquistChart, Point } from "systems-control-js";
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
  nyquist: NyquistChart;
};

type ChartData = {
  points: Point<number>[];
  correspondingPoints: Point<number>[];
};

const formatData = (nyquistData: NyquistChart): ChartData => {
  const data: ChartData = {
    points: nyquistData.points.x.values.map((xValues, index) => ({
      x: xValues,
      y: nyquistData.points.y.values[index],
    })),
    correspondingPoints: nyquistData.correspondingPoints.x.values.map(
      (xValues, index) => ({
        x: xValues,
        y: nyquistData.correspondingPoints.y.values[index],
      })
    ),
  };
  return data;
};

export const NyquistPChart = ({ nyquist }: NyquistChartProps) => {
  const [chartData, setChartData] = useState<ChartData>();

  useMemo(() => {
    const data = formatData(nyquist);
    setChartData(data);
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

        <XAxis
          type="number"
          dataKey="x"
          name="Imaginary Axis"
          unit="i"
        />
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
