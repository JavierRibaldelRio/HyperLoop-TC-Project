import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../theme-provider";


type DataPoint = {
  name: string;
  value: number;
};

const data: DataPoint[] = [
  { name: "A", value: 400 },
  { name: "B", value: 300 },
  { name: "C", value: 500 },
  { name: "D", value: 200 },
];

export default function ThemedChart() {
  const { theme } = useTheme()

  // Determinar si está en modo oscuro
  const isDark = theme === "dark";

  const strokeColor = isDark ? "#8884d8" : "#000000";
  const gridColor = isDark ? "#444" : "#ccc";
  const labelColor = isDark ? "#ddd" : "#333";
  const tooltipBg = isDark ? "#1f1f1f" : "#fff";

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke={gridColor} />
          <XAxis dataKey="name" stroke={labelColor} />
          <YAxis stroke={labelColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              color: labelColor,
              border: "none",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
