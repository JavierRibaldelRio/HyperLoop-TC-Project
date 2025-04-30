// server/sockets/websocket.js
import { WebSocketServer, WebSocket } from 'ws';
import { getCurrentState, setMachineState } from '../app/services/levitationService.js';

export function setupWebSocketServer(server) {
    const wss = new WebSocketServer({ server });

    // Gestión de nuevas conexiones
    wss.on('connection', (ws, req) => {
        console.log('Client WebSocket connected');

        // Recibir mensajes de cliente
        ws.on('message', (raw) => {

            console.log(raw)

            let packet;
            try {
                packet = JSON.parse(raw);
            } catch (err) {
                console.error('The JSON is invalid:', raw);
                return;
            }

            if (packet.type === 'setState') {
                const { newState, elevation } = packet;
                const res = setMachineState(newState, elevation);
                console.log(res);

                ws.send(JSON.stringify({
                    type: 'response',
                    message: res,
                }));
            }

        });

        // Cierre de conexión
        ws.on('close', () => {
            console.log('Client WebSocket disconnected');
        });

        // Errores de socket
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });

    // Enviar el estado completo cada segundo
    const intervalId = setInterval(() => {
        const fullState = getCurrentState();

        const packet = {
            id: 'data',
            ts: Date.now(),
            data: {
                elevation: fullState.elevation,
                voltage: fullState.voltage,
                current: fullState.current,
                targetElevation: fullState.targetElevation,
            },
            phase: fullState.state,
        };


        console.log('packet :>> ', packet);
        const serialized = JSON.stringify(packet);

        for (const client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(serialized);
            }
        }
    }, 2000);

    // Opcional: limpiar el intervalo cuando el servidor se cierre
    server.on('close', () => {
        clearInterval(intervalId);
    });
}
