import express from "express";
import http from "http";

import { setupWebSocketServer } from "./sockets/websocket.js"; // Import the WebSocket server setup function

const PORT = process.env.PORT || 3001; // Port for the server

// Cretion of the Express-http server 
const app = express();                          // Express server
const server = http.createServer(app);          // HTTP server above Express server


// WebSocket server
setupWebSocketServer(server);



// Starting the WebSocket server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);


