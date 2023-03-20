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
import { RootLocusData } from "systems-control-js";
import { COLORS } from "../../constants/colors";
import { useMemo, useState } from "react";

interface RlocusChartProps {
  rlocus: RootLocusData;
}

type ChartLine = { x: number; y: number; k: number }[];

const formatData = (rlocus: RootLocusData) => {
  const lines: ChartLine[] = rlocus.roots.map((roots2) => {
    return roots2.map((root, index) => ({ ...root, k: rlocus.gains[index] }));
  });
  return lines;
};

export const RlocusChart = ({ rlocus }: RlocusChartProps) => {
  const [lines, setLines] = useState<ChartLine[]>([]);

  useMemo(() => {
    const data = formatData(rlocus);
    setLines(data);
  }, [rlocus]);

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
        <CartesianGrid strokeDasharray="3 3" />

        <YAxis name="Imaginary Axis" unit="i" />

        <Tooltip cursor={{ strokeDasharray: "3" }} />

        {lines?.map((line, i) => (
          <>
            <XAxis
              name="Real Axis"
              xAxisId={i}
              dataKey="x"
              hide={i !== 0 ? true : false}
            />
            <Line
              key={i}
              dot={false}
              type="monotone"
              name={`Root Locus ${i + 1}`}
              dataKey="y"
              stroke={COLORS[5].hex}
              data={line}
              xAxisId={i}
            />
          </>
        ))}

        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};
