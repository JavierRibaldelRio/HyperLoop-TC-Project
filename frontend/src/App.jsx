import useWebSocket from './hooks/useWebSocket';

function App() {
  const { message, send } = useWebSocket('ws://localhost:3001');

  return (
    <div>
      <h1>Demo WebSocket React</h1>
      <p>Mensaje recibido: {message}</p>
      <button onClick={() => send('Hola servidor')}>
        Enviar mensaje
      </button>
    </div>
  );
}

export default App;