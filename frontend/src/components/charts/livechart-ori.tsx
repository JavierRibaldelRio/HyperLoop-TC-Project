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

export default function LiveChart({ latestData }: { latestData: Logs | null }) {
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

        setChartData((prev) => [...prev, newPoint]);
    }, [latestData]);

    // Estilo según tema
    const isDark = theme === "dark";
    const gridColor = isDark ? "#444" : "#ccc";
    const labelColor = isDark ? "#ddd" : "#333";
    const tooltipBg = isDark ? "#1f1f1f" : "#fff";

    return (
        <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} key={theme}>
                    <CartesianGrid stroke={gridColor} />
                    <XAxis dataKey="time" stroke={labelColor} minTickGap={20} />
                    <YAxis stroke={labelColor} />
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
                        dataKey="elevation"
                        stroke="#8884d8"
                        dot={false}
                        name="Elevation"
                    />
                    <Line
                        type="monotone"
                        dataKey="targetElevation"
                        stroke="#82ca9d"
                        dot={false}
                        name="Target Elevation"
                    />
                    <Line
                        type="monotone"
                        dataKey="voltage"
                        stroke="#ffc658"
                        dot={false}
                        name="Voltage"
                    />
                    <Line
                        type="monotone"
                        dataKey="current"
                        stroke="#ff7300"
                        dot={false}
                        name="Current"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
