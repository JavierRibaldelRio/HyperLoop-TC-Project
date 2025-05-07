import { useEffect, useState, useRef } from 'react';
import useWebSocket from './hooks/useWebSocket';

function App() {
    const { message, send } = useWebSocket('ws://localhost:3001');
    const [elevationInput, setElevationInput] = useState(15);
    const [logs, setLogs] = useState([]);
    const consoleEndRef = useRef(null);

    // Acumula cada mensaje entrante en el log
    useEffect(() => {
        if (!message) return;
        setLogs(prev => [...prev, message]);
    }, [message]);

    // Hace auto‐scroll al final de la consola
    useEffect(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const handleSend = (state) => {
        const packet = {
            type: 'setState',
            newState: state,
            elevation: Number(elevationInput)
        };
        send(JSON.stringify(packet));
    };

    return (
        <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
            <h1>Control de Simulación</h1>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Elevación objetivo:
                    <input
                        type="number"
                        value={elevationInput}
                        onChange={e => setElevationInput(e.target.value)}
                        style={{ width: '4rem', marginLeft: '0.5rem' }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <button onClick={() => handleSend('precharging')} style={{ marginRight: '0.5rem' }}>
                    Precharge
                </button>
                <button onClick={() => handleSend('running')} style={{ marginRight: '0.5rem' }}>
                    Start
                </button>
                <button onClick={() => handleSend('stopping')}>
                    Stop
                </button>
            </div>

            <div
                style={{
                    backgroundColor: '#000',
                    color: '#0f0',
                    fontFamily: 'monospace',
                    padding: '0.5rem',
                    height: '200px',
                    overflowY: 'auto',
                    borderRadius: '4px'
                }}
            >
                {logs.map((log, i) => (
                    <div key={i} style={{ whiteSpace: 'pre-wrap' }}>
                        {log}
                    </div>
                ))}
                <div ref={consoleEndRef} />
            </div>
        </div>
    );
}

export default App;
