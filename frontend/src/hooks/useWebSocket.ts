import { useEffect, useRef, useState } from "react";

type WebSocketMessage = string | ArrayBuffer | Blob;

type UseWebSocketReturn = {
    message: WebSocketMessage[];
    send: (msg: string) => void;
};

const useWebSocket = (url: string): UseWebSocketReturn => {
    const socketRef = useRef<WebSocket | null>(null);
    const [message, setMessage] = useState<WebSocketMessage[]>([]);

    useEffect(() => {
        const socket = new WebSocket(url);
        socketRef.current = socket;

        // Connection established
        socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        // Receive message
        socket.onmessage = (e) => {
            setMessage((prevMessages) => [...prevMessages, e.data]);
        };

        // Error handling
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            socket.close();
            console.log("WebSocket connection closed");
        };
    }, [url]);

    const send = (msg: string) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(msg);
        } else {
            console.warn('WebSocket not connected');
        }
    };

    return { message, send };
};

export default useWebSocket;