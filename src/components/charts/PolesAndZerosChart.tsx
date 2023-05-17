import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Complex } from "control-systems-js";
import { COLORS } from '../../constants/colors';

interface PolesAndZerosChartProps {
  zeros: Complex[];
  poles: Complex[];
  color?: string;
}

export const PolesAndZerosChart = ({
  zeros,
  poles,
}: PolesAndZerosChartProps) => {
  return (
    <ResponsiveContainer height={400}>
      <ScatterChart
        margin={{
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
        }}
      >
        <CartesianGrid />

        <XAxis type="number" dataKey="re" name="real" />
        <YAxis type="number" dataKey="im" name="imaginary" unit="i" />

        <Tooltip cursor={{ strokeDasharray: "3" }} />
        <Scatter name="Poles" data={poles} fill={COLORS[3].hex} shape="cross" />
        <Scatter name="Zeros" data={zeros} fill={COLORS[4].hex} shape="circle" />

        <Legend />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
