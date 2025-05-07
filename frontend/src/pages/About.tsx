import React from 'react';

const About: React.FC = () => {
    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold">Grupo C – Magnetic Levitation Simulation Project</h1>

            <p className="text-justify leading-relaxed">
                This application simulates a one-degree-of-freedom magnetic levitation system, enabling real-time monitoring and dynamic
                control of its behavior through a WebSocket interface. The <strong>frontend</strong> is built with <strong>React</strong> and
                <strong>React Router</strong> for navigation, using <strong>Vite</strong> as the build tool for fast development.
            </p>

            <p className="text-justify leading-relaxed">
                The UI leverages <strong>shadcn/ui</strong> for accessible and styled components, and <strong>Recharts</strong> for live data visualization.
                The <strong>backend</strong> is developed with <strong>Express</strong> and <strong>WebSocket</strong>, serving a modular simulation engine
                that reproduces system states such as <code>idle</code>, <code>precharging</code>, <code>charged</code>, <code>adjusting</code>,
                <code>running</code>, and <code>stopping</code>.
            </p>

            <p className="text-justify leading-relaxed">
                Every second, the backend broadcasts the current system state—including elevation, voltage, current, target elevation, and phase—
                to all connected clients in real time. The architecture is fully event-driven and designed to support interactive educational and
                demonstrative use cases.
            </p>

            <p className="text-justify leading-relaxed">
                This project is developed by <strong>Group C</strong> as part of the <strong>Training Center</strong> program at{' '}
                <a
                    href="https://hyperloopupv.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    Hyperloop UPV
                </a>.
            </p>

            {/* Footer with GitHub link */}
            <div className="flex flex-col items-center mt-8 space-y-4">
                <a
                    href="https://github.com/JavierRibaldelRio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 underline"
                >
                    Visit my GitHub Profile
                </a>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Developed by <strong>Javier Ribal del Río</strong>
                </p>
            </div>
        </div>
    );
};

export default About;