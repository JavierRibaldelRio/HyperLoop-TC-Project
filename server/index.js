import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from 'url';
import startSimulation from "./app/services/levitationService.js";
import { setupWebSocketServer } from "./sockets/websocket.js"; // Import the WebSocket server setup function

const PORT = process.env.PORT || 3001; // Port for the server

// Cretion of the Express-http server 
const app = express();                          // Express server
const server = http.createServer(app);          // HTTP server above Express server


// Start the simulation
startSimulation();

// WebSocket server
setupWebSocketServer(server);

// Frontend static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/", express.static(path.resolve(__dirname, '../frontend/dist')));



// Starting the WebSocket server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);


