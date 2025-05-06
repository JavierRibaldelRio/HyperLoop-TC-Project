import React, { useEffect } from 'react';
import useWebSocket from '@/hooks/useWebSocket';


import { StatsDisplay } from '@/components/dashboard/StatsDisplay';
import type { Logs } from '@/lib/types';

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

            console.log('messageData :>> ', messageData);

            if (messageData.operation === "status update") {
                const log: Logs = messageData;

                console.log('log :>> ', log);
                setLogs((prevLogs) => [...prevLogs, log]);
            }

            setMessages((prevMessages) => [...prevMessages, String(message)]);
        }
        catch (error) {
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
            console.error("La elevación objetivo no puede ser negativa.");
            return;
        }


        send(JSON.stringify({ type: 'setElevation', elevation: targetElevation }));
        console.log(`Estableciendo la elevación objetivo a ${targetElevation} cm.`);
        // Aquí puedes agregar lógica adicional para manejar la elevación objetivo
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
        </div>

    );
};

export default Dashboard;
