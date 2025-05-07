import React from "react";
import { Card } from "@/components/ui/card";

interface FigureProps {
    minDistance: number; // Distancia mínima del intervalo
    maxDistance: number; // Distancia máxima del intervalo
    currentDistance: number; // Distancia actual del objeto
}

const Figure: React.FC<FigureProps> = ({ minDistance, maxDistance, currentDistance }) => {
    // Calcular la posición relativa del objeto dentro del intervalo
    const normalizedPosition = Math.min(
        Math.max((currentDistance - minDistance) / (maxDistance - minDistance), 0),
        1
    );

    return (
        <Card className="relative  border-2 rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-md  items-center @container/card h-auto col-span-1 sm:col-span-1 flex justify-center p-0 m-0 h-65">
            {/* Línea vertical que representa el rango */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 dark:bg-gray-600 transform -translate-x-1/2" />

            {/* Indicador de distancia mínima */}
            <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-600 dark:text-gray-300">
                {minDistance} cm
            </div>

            {/* Indicador de distancia máxima */}
            <div className="absolute top-0 left-0 right-0 text-center text-xs text-gray-600 dark:text-gray-300">
                {maxDistance} cm
            </div>

            {/* Caja que representa el objeto levitando */}
            <div
                className="absolute w-full h-8 bg-blue-500 dark:bg-blue-400 rounded-md shadow-lg flex items-center justify-center text-white dark:text-gray-900 font-bold"
                style={{
                    bottom: `${normalizedPosition * 100}%`,
                    transition: "bottom 0.3s ease-in-out",
                }}
            >
                {currentDistance.toFixed(1)} cm
            </div>
        </Card >
    );
};

export default Figure;
