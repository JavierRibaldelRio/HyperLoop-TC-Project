import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

import type { Message } from "@/lib/types";

import { EyeClosed, EyeOff, Download } from "lucide-react";

const Consola: React.FC<{ messages: Message[] }> = ({ messages }) => {
    const consoleEndRef = useRef<HTMLDivElement | null>(null);
    const [showOnlyErrors, setShowOnlyErrors] = React.useState(false);

    // Scroll to the bottom of the console when new messages arrive
    useEffect(() => {
        const el = consoleEndRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages, showOnlyErrors]);

    const filteredMessages = showOnlyErrors
        ? messages.filter(msg => msg.type.toLowerCase() === 'error')
        : messages;

    return (
        <Card className="h-65 col sm:col-span-1 flex flex-col p-2">
            {/* Cabecera fija con flex */}
            <CardHeader className="flex-none mt-4 flex flex-row items-center justify-between">
                <CardTitle>Console</CardTitle>
                <div className="flex flex-row gap-2 items-center">
                    <Button
                        className={`px-3 py-1 rounded text-xs border ${showOnlyErrors ? 'bg-red-500 text-white border-red-500' : 'border-red-500 text-red-500'}`}
                        variant="outline"
                        style={showOnlyErrors ? { backgroundColor: '#ef4444', color: '#fff', borderColor: '#ef4444' } : { borderColor: '#ef4444', color: '#ef4444' }}
                        onClick={() => setShowOnlyErrors(prev => !prev)}
                    >
                        {showOnlyErrors ? (
                            <>
                                <EyeOff className="inline-block w-4 h-4 mr-1" />
                                Show All
                            </>
                        ) : (
                            <>
                                <EyeClosed className="inline-block w-4 h-4 mr-1" />
                                Show Only Errors
                            </>
                        )}
                    </Button>
                    <Button
                        className="px-3 py-1 rounded text-xs border border-blue-500 text-blue-500"
                        variant="outline"
                        style={{ borderColor: '#3b82f6', color: '#3b82f6' }}
                        onClick={() => {
                            const data = filteredMessages.map(msg => ({
                                time: msg.ts ? new Date(msg.ts).toLocaleTimeString() : "--:--:--",
                                type: msg.type,
                                message: msg.message
                            }));
                            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = "console-output.json";
                            a.click();
                            URL.revokeObjectURL(url);
                        }}
                    >
                        <Download className="inline-block w-4 h-4 mr-1" />
                        Download Output
                    </Button>
                </div>
            </CardHeader>
            {/* Contenido desplazable */}
            <CardContent className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-2" ref={consoleEndRef}>
                <div className="flex flex-col gap-2">
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((msg, index) => {
                            const colorClass = msg.type.toLowerCase() === 'error' ? 'text-red-500' : 'text-muted-foreground';
                            return (
                                <div
                                    key={index}
                                    className={`text-sm ${colorClass}`}
                                >
                                    <span className={`mr-2 text-xs ${colorClass}`}>
                                        [{msg.ts ? new Date(msg.ts).toLocaleTimeString() : "--:--:--"}]
                                    </span>
                                    {msg.message}
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-muted-foreground">No messages available</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default Consola;