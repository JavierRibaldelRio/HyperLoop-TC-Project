import React, { useEffect, useState } from 'react';
import useWebSocket from '@/hooks/useWebSocket';
import { StatsDisplay } from '@/components/dashboard/StatsDisplay';
import type { Logs } from '@/lib/types';
import SelectionTable from '@/components/dashboard/SelectionTable';
import RecordButtons from '@/components/Record-Buttons';
import { saveAs } from 'file-saver'; // Importación corregida

const Record: React.FC = () => {

    // WebSocket connection to the server
    const { message, send } = useWebSocket("ws://localhost:3001");

    const [logs, setLogs] = React.useState<Logs[]>([]);
    const [messages, setMessages] = React.useState<string[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedLogs, setRecordedLogs] = useState<Logs[]>([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

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
            console.error("La elevación objetivo no puede ser negativa.");
            return;
        }

        send(JSON.stringify({ type: 'setElevation', elevation: targetElevation }));
        console.log(`Estableciendo la elevación objetivo a ${targetElevation} cm.`);
        // Aquí puedes agregar lógica adicional para manejar la elevación objetivo
    };

    // Iniciar o detener la grabación
    const toggleRecording = () => {
        if (isRecording) {
            setIsRecording(false);
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
            exportToCSV();
        } else {
            setIsRecording(true);
            setElapsedTime(0);
            const id = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
            setIntervalId(id);
        }
    };

    // Grabar los logs mientras está activo
    useEffect(() => {
        if (isRecording && logs.length > 0) {
            setRecordedLogs((prev) => [...prev, logs[logs.length - 1]]);
        }
    }, [logs, isRecording]);

    // Exportar los datos grabados a un archivo CSV
    const exportToCSV = () => {
        if (recordedLogs.length === 0) return;

        const expandedLogs = recordedLogs.map((log) => {
            const { data, ...rest } = log;
            const expandedData = data
                ? Object.entries(data).reduce((acc, [key, value]) => {
                    acc[`data_${key}`] = value; // Prefijar las claves de `data` con `data_`
                    return acc;
                }, {} as Record<string, any>)
                : {};
            return { ...rest, ...expandedData };
        });

        const headers = Object.keys(expandedLogs[0]).join(",");
        const rows = expandedLogs.map((log) =>
            Object.values(log).map((value) => `"${String(value)}"`).join(",") // Convertir todos los valores a string y separarlos en columnas
        );
        const csvContent = [headers, ...rows].join("\n");

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split("T")[0]; // Formato YYYY-MM-DD
        const formattedTime = currentDate.toTimeString().split(" ")[0].replace(/:/g, "-"); // Formato HH-MM-SS
        const fileName = `recorded_logs_${formattedDate}_${formattedTime}.csv`;

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, fileName);
    };

    return (
        <div className="flex h-full w-full flex-col gap-4  md:gap-6  p-0">
            <RecordButtons
                isRecording={isRecording}
                elapsedTime={elapsedTime}
                toggleRecording={toggleRecording}
            />
            <div className="flex flex-1 flex-col m-0 p-0">
                <div className="@container/main flex flex-1 flex-col gap-2 m-0 p-0">
                    <div className="flex flex-col gap-4 py-4 md:gap-3 md:py-3 m-0 p-0">
                        <StatsDisplay stats={logs[logs.length - 1]} handleClick={handleClick} handleTargetLevitation={handleTargetLevitation} />
                    </div>
                </div>
            </div>

            <SelectionTable latestData={logs} />
        </div>
    );
};

export default Record;
