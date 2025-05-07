import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Consola: React.FC<{ messages: string[] }> = ({ messages }) => {
    const consoleEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = consoleEndRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages]);

    return (
        <Card className="h-65 col sm:col-span-1 flex flex-col p-2">
            {/* Cabecera fija con flex */}
            <CardHeader className="flex-none mt-4">
                <CardTitle>Console</CardTitle>
            </CardHeader>
            {/* Contenido desplazable */}
            <CardContent className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-2" ref={consoleEndRef}>
                <div className="flex flex-col gap-2">
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`text-sm ${message.toLowerCase().includes('error') ? 'text-red-500' : 'text-muted-foreground'}`}
                            >
                                {message}
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No messages available</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default Consola;