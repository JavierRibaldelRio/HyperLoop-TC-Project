// server/sockets/websocket.js
import { WebSocketServer, WebSocket } from 'ws';
import { getCurrentState, setMachineState, setTargetElevation } from '../app/services/levitationService.js';

export function setupWebSocketServer(server) {
    const wss = new WebSocketServer({ server, path: '/ws' });

    // Gestión de nuevas conexiones
    wss.on('connection', (ws, req) => {
        console.log('Client WebSocket connected');

        // Recibir mensajes de cliente
        ws.on('message', (raw) => {

            let packet;
            try {
                packet = JSON.parse(raw);
            } catch (err) {
                console.error('The JSON is invalid:', raw);
                return;
            }

            if (packet.type === undefined) {
                console.error('The packet does not have a type:', raw);
                return;
            }

            // Validar el paquete, en función de los paquetes que puede recibir

            let response;
            switch (packet.type) {

                // Al pulsar un botón.
                case 'setState':
                    const { newState, elevation } = packet;
                    response = setMachineState(newState);

                    response.operation = 'setState';
                    break;

                // Al cambiar el input de la elevación
                case 'setElevation':
                    response = setTargetElevation(packet.elevation);

                    response.operation = 'setElevation';

                    break;

                default:
                    console.error('Unknown packet type:', packet.type);
                    response = {
                        type: 'error',
                        message: `Unknown packet type: ${packet.type}`,
                    };
                    break;




            }

            ws.send(JSON.stringify(response));

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
            operation: 'status update',
            ts: Date.now(),
            data: {
                elevation: fullState.elevation,
                voltage: fullState.voltage,
                current: fullState.current,
                targetElevation: fullState.targetElevation,
            },
            phase: fullState.state,
        };


        const serialized = JSON.stringify(packet);

        for (const client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(serialized);
            }
        }
    }, 250);

    // Opcional: limpiar el intervalo cuando el servidor se cierre
    server.on('close', () => {
        clearInterval(intervalId);
    });
}
