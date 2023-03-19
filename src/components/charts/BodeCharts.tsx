import { bode, BodeChart, Point } from "systems-control-js";
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

export type BodeChartProps = {
  bode: BodeChart;
};

type ChartData = {
  magnitude: Point<number>[];
  phase: Point<number>[];
};

const formatData = (bodeData: BodeChart): ChartData => {
  const data: ChartData = {
    magnitude: bodeData.magnitude.x.values.map((xValue, index) => ({
      x: Math.log(xValue),
      y: bodeData.magnitude.y.values[index],
    })),
    phase: bodeData.phase.x.values.map((xValue, index) => ({
      x: Math.log(xValue),
      y: bodeData.phase.y.values[index],
    })),
  };

  return data;
};

export const BodeCharts = ({ bode }: BodeChartProps) => {
  const [chartData, setChartData] = useState<ChartData>();

  useMemo(() => {
    const data = formatData(bode);
    setChartData(data);
  }, [bode]);

  return (
    <div className="px-4 py-6 md:p-6 sm:p-8 lg:flex-auto items-center flex flex-col">
      <ResponsiveContainer height={300}>
        <LineChart
          margin={{
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
          }}
          data={chartData?.magnitude}
        >
          <CartesianGrid />

          <XAxis type="number" dataKey="x" name="Frequency (log)" unit="log10" />
          <YAxis type="number" name="Magnitude" unit="db" />

          <Tooltip cursor={{ strokeDasharray: "3" }} />

          <Line
            dot={false}
            type="monotone"
            name="Bode Magnitude"
            stroke={COLORS[1].hex}
            dataKey="y"
          ></Line>

          <Legend />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer height={300}>
        <LineChart
          margin={{
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
          }}
          data={chartData?.phase}
        >
          <CartesianGrid />

          <XAxis type="number" dataKey="x" name="Frequency (log)" unit="log10"/>
          <YAxis type="number" name="Phase" unit="°"  />

          <Tooltip cursor={{ strokeDasharray: "3" }} />

          <Line
            dot={false}
            type="monotone"
            name="Bode Phase"
            stroke={COLORS[0].hex}
            dataKey="y"
          ></Line>

          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
