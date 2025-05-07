import React, { useEffect } from 'react';
import useWebSocket from '@/hooks/useWebSocket';

import { StatsDisplay } from '@/components/dashboard/StatsDisplay';
import type { Logs } from '@/lib/types';
import SelectionTable from '@/components/dashboard/SelectionTable';
import Consola from '@/components/dashboard/Console';
import Figure from '@/components/Figure';

const Dashboard: React.FC = () => {

    // WebSocket connection to the server
    const { message, send } = useWebSocket("/ws");

    const [logs, setLogs] = React.useState<Logs[]>([]);
    const [messages, setMessages] = React.useState<string[]>([]);

    // Handle incoming messages
    useEffect(() => {
        if (!message) return;

        try {
            const messageData: any = JSON.parse(String(message[message.length - 1]));

            if (messageData.operation === "status update") {
                const log: Logs = messageData;
                setLogs((prevLogs) => [...prevLogs, log]);
            } else {
                setMessages((prevMessages) => [...prevMessages, String(message[message.length - 1])]);
            }
        } catch (error) {
            console.error("Error parsing message:", error, message);
        }
    }, [message]);

    const handleClick = (state: string, elevation: number) => {
        const packet = {
            type: 'setState',
            newState: state,
            elevation: elevation
        };
        send(JSON.stringify(packet));
    };

    const handleTargetLevitation = (targetElevation: number) => {
        if (targetElevation < 0) {
            console.error("Target elevation cannot be negative.");
            return;
        }

        send(JSON.stringify({ type: 'setElevation', elevation: targetElevation }));
        console.log(`Setting target elevation to ${targetElevation} cm.`);
        // Additional logic to handle target elevation can be added here
    };

    return (
        <div className="flex h-full w-full flex-col gap-4 md:gap-6 p-0">
            <div className="flex flex-1 flex-col m-0 p-0">
                <div className="@container/main flex flex-1 flex-col gap-2 m-0 p-0">
                    <div className="flex flex-col gap-4 py-4 md:gap-3 md:py-3 m-0 p-0">
                        <StatsDisplay stats={logs[logs.length - 1]} handleClick={handleClick} handleTargetLevitation={handleTargetLevitation} />
                    </div>
                </div>
            </div>

            <SelectionTable latestData={logs} />

            {/* Consola y Figure utilizando el grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 px-4 lg:px-6 w-full mx-auto">
                <div className="col-span-3">
                    <Consola messages={messages} />
                </div>

                <Figure
                    minDistance={0}
                    maxDistance={100}
                    currentDistance={logs.length > 0 ? logs[logs.length - 1]?.data?.elevation || 0 : 0}
                />
            </div>


        </div>
    );
};

export default Dashboard;
