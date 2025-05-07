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
        <Card className="mx-auto h-64 w-[80%]">
            <CardHeader>
                <CardTitle>Console</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto" ref={consoleEndRef}>
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