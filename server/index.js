import express from "express";
import http from "http";
import { WebSocketServer } from "ws";


const PORT = process.env.PORT || 3001; // Port for the server

// Cretion of the Express-http server 
const app = express();                          // Express server
const server = http.createServer(app);          // HTTP server above Express server

// Creation of the WebSocket
const wss = new WebSocketServer({ server });

// WebSocket: gestión de conexiones
wss.on('connection', (ws, req) => {
    console.log('🔌 Cliente WebSocket conectado');

    // Responder a mensajes entrantes
    ws.on('message', (message) => {
        console.log('📩 Mensaje recibido:', message.toString());

        // Ejemplo: Eco (responder el mismo mensaje al cliente)
        ws.send(`Echo: ${message}`);
    });

    // Manejar cierre de conexión
    ws.on('close', () => {
        console.log('🔴 Cliente WebSocket desconectado');
    });

    // Manejar errores
    ws.on('error', (error) => {
        console.error('⚠️ Error en WebSocket:', error);
    });
});


// Starting the WebSocket server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);


