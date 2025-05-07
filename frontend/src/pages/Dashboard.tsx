import React, { useEffect, useState } from 'react';
import useWebSocket from '@/hooks/useWebSocket';
import { Button } from "@/components/ui/button";

import { StatsDisplay } from '@/components/dashboard/StatsDisplay';
import type { Logs } from '@/lib/types';
import SelectionTable from '@/components/dashboard/SelectionTable';
import Consola from '@/components/dashboard/Console';

const Dashboard: React.FC = () => {

    // WebSocket connection to the server
    const { message, send } = useWebSocket("ws://localhost:3001");

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
        <div className="flex h-full w-full flex-col gap-4  md:gap-6  p-0">
            <div className="flex flex-1 flex-col m-0 p-0">
                <div className="@container/main flex flex-1 flex-col gap-2 m-0 p-0">
                    <div className="flex flex-col gap-4 py-4 md:gap-3 md:py-3 m-0 p-0">
                        <StatsDisplay stats={logs[logs.length - 1]} handleClick={handleClick} handleTargetLevitation={handleTargetLevitation} />
                    </div>
                </div>
            </div>

            <SelectionTable latestData={logs} />

            <Consola messages={messages} />
        </div>
    );
};

export default Dashboard;
