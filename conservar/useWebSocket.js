import { useEffect, useRef, useState } from "react";

const useWebSocket = (url) => {
    const socketRef = useRef(null);
    const [message, setMessage] = useState([]);

    useEffect(() => {

        const socket = new WebSocket(url);
        socketRef.current = socket;

        // Connection established
        socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        // Receive message
        socket.onmessage = (e) => { setMessage(e.data) };

        // Error handling
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            socket.close();
            console.log("WebSocket connection closed");
        };



    }, [url]);

    const send = (msg) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(msg);
        } else {
            console.warn('WebSocket not connected');
        }
    };


    return { message, send };
}

export default useWebSocket;