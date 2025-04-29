import express from "express";
import http from "http";
import { WebSocketServer } from "ws";


const PORT = process.env.PORT || 3001; // Port for the server

// Cretion of the Express-http server 
const app = express();                          // Express server
const server = http.createServer(app);          // HTTP server above Express server

// Creation of the WebSocket
const wss = new WebSocketServer({ server });

// Starting the WebSocket server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);


