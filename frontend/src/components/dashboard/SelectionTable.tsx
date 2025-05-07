import React, { useState } from "react";
import LiveChart from "../charts/livechart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type { Logs } from "@/lib/types";

const SelectionTable: React.FC<{ latestData: Logs[] }> = ({ latestData }) => {
    const [selectedMetric, setSelectedMetric] = useState<keyof typeof metricSettings>("elevation");

    const metricSettings = {
        elevation: {
            yAxisDomain: [0, 100],
            lineColor: "#8884d8",
            yAxisLabel: "Elevation (cm)",
            dataKey: "elevation",
        },
        voltage: {
            yAxisDomain: [0, 400],
            lineColor: "#ffc658",
            yAxisLabel: "Voltage (V)",
            dataKey: "voltage",
        },
        current: {
            yAxisDomain: [-20, 20],
            lineColor: "#ff7300",
            yAxisLabel: "Current (A)",
            dataKey: "current",
        },
    };

    return (
        <Card className="w-[80%] mx-auto h-full">
            <CardContent className="h-full flex flex-col">
                <div className="flex flex-col gap-4 flex-grow">
                    <Select onValueChange={(value) => setSelectedMetric(value as keyof typeof metricSettings)}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select Metric" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="elevation">Elevation</SelectItem>
                            <SelectItem value="voltage">Voltage</SelectItem>
                            <SelectItem value="current">Current</SelectItem>
                        </SelectContent>
                    </Select>

                    <LiveChart
                        latestData={latestData}
                        additionalSettings={metricSettings[selectedMetric]}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default SelectionTable;