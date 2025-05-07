import React, { useEffect, useState } from 'react';
import useWebSocket from '@/hooks/useWebSocket';
import LiveChart from '@/components/charts/livechart';
import type { Logs } from '@/lib/types';

const Charts: React.FC = () => {
    const { message } = useWebSocket("ws://localhost:3001");
    const [logs, setLogs] = useState<Logs[]>([]);

    useEffect(() => {
        if (!message) return;

        try {
            const messageData: any = JSON.parse(String(message[message.length - 1]));

            if (messageData.operation === "status update") {
                const log: Logs = messageData;
                setLogs((prevLogs) => [...prevLogs, log]);
            }
        } catch (error) {
            console.error("Error parsing message:", error, message);
        }
    }, [message]);

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
        <div className="flex flex-col gap-4 p-4">
            <LiveChart latestData={logs} additionalSettings={metricSettings.elevation} style={{ height: '30vh' }} />
            <LiveChart latestData={logs} additionalSettings={metricSettings.voltage} style={{ height: '30vh' }} />
            <LiveChart latestData={logs} additionalSettings={metricSettings.current} style={{ height: '30vh' }} />
        </div>
    );
};

export default Charts;