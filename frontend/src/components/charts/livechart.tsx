import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useTheme } from "../theme-provider";
import type { Logs } from "@/lib/types";



type ChartPoint = {
    time: string;
    elevation: number;
    targetElevation: number;
    voltage: number;
    current: number;
};

export default function LiveChart({ latestData, additionalSettings, style }: { latestData: Logs[] | null; additionalSettings: { yAxisDomain: [number, number]; lineColor: string; yAxisLabel: string, dataKey: keyof Logs } | any, style?: React.CSSProperties }) {
    const { theme } = useTheme();
    const [chartData, setChartData] = useState<ChartPoint[]>([]);

    // Efecto que añade el nuevo dato a la gráfica cada vez que cambia `latestData`
    useEffect(() => {
        if (!latestData || latestData.length === 0) return;

        const newPoint: ChartPoint = {
            time: new Date(latestData[latestData.length - 1].ts).toLocaleTimeString(),
            elevation: latestData[latestData.length - 1].data.elevation,
            targetElevation: latestData[latestData.length - 1].data.targetElevation,
            voltage: latestData[latestData.length - 1].data.voltage,
            current: latestData[latestData.length - 1].data.current,
        };

        setChartData((prev) => {
            const updatedData = [...prev, newPoint];
            return updatedData.length > 100 ? updatedData.slice(updatedData.length - 100) : updatedData;
        });
    }, [latestData]);

    // Estilo según tema
    const isDark = theme === "dark";
    const gridColor = isDark ? "#444" : "#ccc";
    const labelColor = isDark ? "#ddd" : "#333";
    const tooltipBg = isDark ? "#1f1f1f" : "#fff";

    return (
        <div className="w-full" style={{ height: '16rem', ...style }}>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    key={theme}
                >
                    <CartesianGrid stroke={gridColor} />
                    <XAxis dataKey="time" stroke={labelColor} minTickGap={20} />
                    <YAxis
                        stroke={labelColor}
                        domain={additionalSettings.yAxisDomain}
                        label={{
                            value: additionalSettings.yAxisLabel,
                            angle: -90,
                            position: "insideLeft",
                            style: { fill: labelColor, textAnchor: "end" },
                            dx: 10 // Ajuste hacia la derecha
                        }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: tooltipBg,
                            color: labelColor,
                            border: "none",
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey={additionalSettings.dataKey}
                        stroke={additionalSettings.lineColor}
                        strokeWidth={7} // Increased the line thickness
                        dot={false}
                        name={additionalSettings.yAxisLabel}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
